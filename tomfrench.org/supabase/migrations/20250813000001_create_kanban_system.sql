-- Create kanban system with proper workflow columns
-- Fresh migration with backlog/ready/in-progress/done workflow

-- Create custom types with the final enum values
CREATE TYPE task_status AS ENUM ('backlog', 'ready', 'in-progress', 'done');
CREATE TYPE task_priority AS ENUM ('low', 'medium', 'high', 'urgent');

-- Create tasks table
CREATE TABLE public.tasks (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    title TEXT NOT NULL CHECK (char_length(title) > 0 AND char_length(title) <= 100),
    description TEXT,
    status task_status NOT NULL DEFAULT 'backlog',
    priority task_priority NOT NULL DEFAULT 'medium',
    created_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc'::text, NOW()) NOT NULL,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc'::text, NOW()) NOT NULL,
    due_date TIMESTAMP WITH TIME ZONE,
    user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE
);

-- Create tags table
CREATE TABLE public.tags (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    name TEXT NOT NULL CHECK (char_length(name) > 0 AND char_length(name) <= 50),
    color TEXT,
    user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc'::text, NOW()) NOT NULL,
    UNIQUE(name, user_id)
);

-- Create task_tags junction table
CREATE TABLE public.task_tags (
    task_id UUID REFERENCES public.tasks(id) ON DELETE CASCADE,
    tag_id UUID REFERENCES public.tags(id) ON DELETE CASCADE,
    PRIMARY KEY (task_id, tag_id)
);

-- Create columns table for kanban board layout
CREATE TABLE public.columns (
    id TEXT PRIMARY KEY,
    title TEXT NOT NULL,
    status task_status NOT NULL,
    color TEXT,
    "order" INTEGER NOT NULL DEFAULT 0,
    user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc'::text, NOW()) NOT NULL,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc'::text, NOW()) NOT NULL
);

-- Insert default workflow columns
INSERT INTO public.columns (id, title, status, color, "order") VALUES
    ('backlog', 'Backlog', 'backlog', '#6b7280', 0),
    ('ready', 'Ready', 'ready', '#3b82f6', 1),
    ('in-progress', 'In Progress', 'in-progress', '#f59e0b', 2),
    ('done', 'Done', 'done', '#10b981', 3);

-- Create indexes for better performance
CREATE INDEX idx_tasks_user_id ON public.tasks(user_id);
CREATE INDEX idx_tasks_status ON public.tasks(status);
CREATE INDEX idx_tasks_created_at ON public.tasks(created_at);
CREATE INDEX idx_task_tags_task_id ON public.task_tags(task_id);
CREATE INDEX idx_task_tags_tag_id ON public.task_tags(tag_id);
CREATE INDEX idx_tags_user_id ON public.tags(user_id);
CREATE INDEX idx_columns_user_id ON public.columns(user_id);

-- Enable Row Level Security (RLS)
ALTER TABLE public.tasks ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.tags ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.task_tags ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.columns ENABLE ROW LEVEL SECURITY;

-- Create RLS policies for tasks
CREATE POLICY "Users can view their own tasks" ON public.tasks
    FOR SELECT USING (auth.uid() = user_id);

CREATE POLICY "Users can insert their own tasks" ON public.tasks
    FOR INSERT WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update their own tasks" ON public.tasks
    FOR UPDATE USING (auth.uid() = user_id);

CREATE POLICY "Users can delete their own tasks" ON public.tasks
    FOR DELETE USING (auth.uid() = user_id);

-- Create RLS policies for tags
CREATE POLICY "Users can view their own tags" ON public.tags
    FOR SELECT USING (auth.uid() = user_id);

CREATE POLICY "Users can insert their own tags" ON public.tags
    FOR INSERT WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update their own tags" ON public.tags
    FOR UPDATE USING (auth.uid() = user_id);

CREATE POLICY "Users can delete their own tags" ON public.tags
    FOR DELETE USING (auth.uid() = user_id);

-- Create RLS policies for task_tags (access through related tasks)
CREATE POLICY "Users can view task_tags for their tasks" ON public.task_tags
    FOR SELECT USING (
        EXISTS (
            SELECT 1 FROM public.tasks 
            WHERE tasks.id = task_tags.task_id 
            AND tasks.user_id = auth.uid()
        )
    );

CREATE POLICY "Users can insert task_tags for their tasks" ON public.task_tags
    FOR INSERT WITH CHECK (
        EXISTS (
            SELECT 1 FROM public.tasks 
            WHERE tasks.id = task_tags.task_id 
            AND tasks.user_id = auth.uid()
        )
    );

CREATE POLICY "Users can delete task_tags for their tasks" ON public.task_tags
    FOR DELETE USING (
        EXISTS (
            SELECT 1 FROM public.tasks 
            WHERE tasks.id = task_tags.task_id 
            AND tasks.user_id = auth.uid()
        )
    );

-- Create RLS policies for columns (public read, admin write)
CREATE POLICY "Anyone can view columns" ON public.columns
    FOR SELECT USING (true);

-- Create function to automatically update updated_at timestamp
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = TIMEZONE('utc'::text, NOW());
    RETURN NEW;
END;
$$ language 'plpgsql';

-- Create triggers for updated_at
CREATE TRIGGER update_tasks_updated_at 
    BEFORE UPDATE ON public.tasks 
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_tags_updated_at 
    BEFORE UPDATE ON public.tags 
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_columns_updated_at 
    BEFORE UPDATE ON public.columns 
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

-- Add a scheduled cleanup function for done tasks older than 24 hours
CREATE OR REPLACE FUNCTION cleanup_old_done_tasks()
RETURNS void
LANGUAGE plpgsql
SECURITY DEFINER
AS $$
BEGIN
    DELETE FROM public.tasks 
    WHERE status = 'done' 
    AND updated_at < NOW() - INTERVAL '24 hours';
END;
$$;

-- Add a function to get tasks with opacity based on age (for done tasks)
CREATE OR REPLACE FUNCTION get_tasks_with_opacity()
RETURNS TABLE (
    id uuid,
    title text,
    description text,
    status task_status,
    priority task_priority,
    due_date timestamptz,
    created_at timestamptz,
    updated_at timestamptz,
    user_id uuid,
    opacity numeric
)
LANGUAGE plpgsql
SECURITY DEFINER
AS $$
BEGIN
    RETURN QUERY
    SELECT 
        t.id,
        t.title,
        t.description,
        t.status,
        t.priority,
        t.due_date,
        t.created_at,
        t.updated_at,
        t.user_id,
        CASE 
            WHEN t.status = 'done' AND t.updated_at > NOW() - INTERVAL '24 hours' THEN 0.8
            ELSE 1.0
        END as opacity
    FROM public.tasks t
    WHERE t.user_id = auth.uid();
END;
$$;

-- Comment for documentation
COMMENT ON FUNCTION cleanup_old_done_tasks() IS 'Removes tasks that have been in done status for more than 24 hours';
COMMENT ON FUNCTION get_tasks_with_opacity() IS 'Returns tasks with calculated opacity - done tasks are at 80% opacity for 24 hours before deletion';
COMMENT ON TABLE public.tasks IS 'Kanban tasks with workflow states: backlog -> ready -> in-progress -> done';
COMMENT ON TABLE public.columns IS 'Kanban board column definitions for the workflow';
