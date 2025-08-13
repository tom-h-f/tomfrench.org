-- Script to create kanban columns and sample data for the workflow
-- Run this directly in Supabase SQL Editor

-- Insert the workflow columns
INSERT INTO public.columns (id, title, status, color, "order", created_at, updated_at) 
VALUES 
    ('backlog', 'Backlog', 'backlog', '#6b7280', 0, now(), now()),
    ('ready', 'Ready', 'ready', '#3b82f6', 1, now(), now()),
    ('in-progress', 'In Progress', 'in-progress', '#f59e0b', 2, now(), now()),
    ('done', 'Done', 'done', '#10b981', 3, now(), now())
ON CONFLICT (id) DO UPDATE SET
    title = EXCLUDED.title,
    status = EXCLUDED.status,
    color = EXCLUDED.color,
    "order" = EXCLUDED."order",
    updated_at = now();

-- Create sample tags (these will be associated with the current user)
INSERT INTO public.tags (id, name, color, user_id, created_at)
VALUES 
    (gen_random_uuid(), 'frontend', '#3b82f6', auth.uid(), now()),
    (gen_random_uuid(), 'backend', '#10b981', auth.uid(), now()),
    (gen_random_uuid(), 'bug', '#ef4444', auth.uid(), now()),
    (gen_random_uuid(), 'feature', '#8b5cf6', auth.uid(), now()),
    (gen_random_uuid(), 'urgent', '#f59e0b', auth.uid(), now()),
    (gen_random_uuid(), 'documentation', '#6b7280', auth.uid(), now()),
    (gen_random_uuid(), 'testing', '#06b6d4', auth.uid(), now()),
    (gen_random_uuid(), 'review', '#ec4899', auth.uid(), now())
ON CONFLICT (name, user_id) DO NOTHING;

-- Create sample tasks across all workflow stages
WITH sample_tasks AS (
    INSERT INTO public.tasks (
        id, 
        title, 
        description, 
        status, 
        priority, 
        user_id, 
        due_date, 
        created_at, 
        updated_at
    )
    VALUES 
        -- Backlog tasks
        (gen_random_uuid(), 'Implement user authentication', 'Add login/logout functionality with JWT tokens', 'backlog', 'high', auth.uid(), now() + interval '2 weeks', now() - interval '3 days', now() - interval '3 days'),
        (gen_random_uuid(), 'Setup CI/CD pipeline', 'Configure GitHub Actions for automated testing and deployment', 'backlog', 'medium', auth.uid(), now() + interval '1 month', now() - interval '2 days', now() - interval '2 days'),
        (gen_random_uuid(), 'Database schema optimization', 'Review and optimize database queries for better performance', 'backlog', 'low', auth.uid(), null, now() - interval '1 day', now() - interval '1 day'),
        
        -- Ready tasks
        (gen_random_uuid(), 'Create responsive navigation', 'Build mobile-first navigation component with hamburger menu', 'ready', 'high', auth.uid(), now() + interval '1 week', now() - interval '4 hours', now() - interval '4 hours'),
        (gen_random_uuid(), 'API error handling', 'Implement proper error handling and user feedback for API calls', 'ready', 'medium', auth.uid(), now() + interval '10 days', now() - interval '2 hours', now() - interval '2 hours'),
        
        -- In Progress tasks
        (gen_random_uuid(), 'Fix layout bug on mobile', 'Sidebar overlapping content on small screens', 'in-progress', 'urgent', auth.uid(), now() + interval '2 days', now() - interval '6 hours', now() - interval '1 hour'),
        (gen_random_uuid(), 'Implement dark mode', 'Add theme toggle and dark mode styles throughout the application', 'in-progress', 'medium', auth.uid(), now() + interval '1 week', now() - interval '1 day', now() - interval '30 minutes'),
        
        -- Done tasks
        (gen_random_uuid(), 'Setup project structure', 'Initialize Next.js project with TypeScript and Tailwind CSS', 'done', 'high', auth.uid(), null, now() - interval '1 week', now() - interval '2 days'),
        (gen_random_uuid(), 'Design system components', 'Create reusable button, input, and card components', 'done', 'medium', auth.uid(), null, now() - interval '5 days', now() - interval '1 day'),
        (gen_random_uuid(), 'User research survey', 'Conduct user interviews to understand feature requirements', 'done', 'low', auth.uid(), null, now() - interval '2 weeks', now() - interval '3 days')
    RETURNING id, title
),

-- Get tag IDs for associations
tag_ids AS (
    SELECT id, name FROM public.tags WHERE user_id = auth.uid()
)

-- Create task-tag associations
INSERT INTO public.task_tags (task_id, tag_id)
SELECT 
    t.id as task_id,
    tg.id as tag_id
FROM sample_tasks t
CROSS JOIN tag_ids tg
WHERE 
    -- Frontend tasks
    (t.title ILIKE '%navigation%' AND tg.name = 'frontend') OR
    (t.title ILIKE '%layout%' AND tg.name = 'frontend') OR
    (t.title ILIKE '%dark mode%' AND tg.name = 'frontend') OR
    (t.title ILIKE '%design system%' AND tg.name = 'frontend') OR
    
    -- Backend tasks
    (t.title ILIKE '%authentication%' AND tg.name = 'backend') OR
    (t.title ILIKE '%API%' AND tg.name = 'backend') OR
    (t.title ILIKE '%database%' AND tg.name = 'backend') OR
    
    -- Bug tasks
    (t.title ILIKE '%bug%' AND tg.name = 'bug') OR
    (t.title ILIKE '%fix%' AND tg.name = 'bug') OR
    
    -- Feature tasks
    (t.title ILIKE '%implement%' AND tg.name = 'feature') OR
    (t.title ILIKE '%create%' AND tg.name = 'feature') OR
    
    -- Urgent tasks
    (t.title ILIKE '%fix layout bug%' AND tg.name = 'urgent') OR
    
    -- Documentation
    (t.title ILIKE '%research%' AND tg.name = 'documentation') OR
    
    -- Testing/CI
    (t.title ILIKE '%CI/CD%' AND tg.name = 'testing')
ON CONFLICT (task_id, tag_id) DO NOTHING;

-- Verify the data was created
SELECT 'COLUMNS' as table_name, count(*) as record_count FROM public.columns
UNION ALL
SELECT 'TAGS' as table_name, count(*) as record_count FROM public.tags WHERE user_id = auth.uid()
UNION ALL  
SELECT 'TASKS' as table_name, count(*) as record_count FROM public.tasks WHERE user_id = auth.uid()
UNION ALL
SELECT 'TASK_TAGS' as table_name, count(*) as record_count FROM public.task_tags 
WHERE task_id IN (SELECT id FROM public.tasks WHERE user_id = auth.uid())
ORDER BY table_name;

-- Show sample of created data
SELECT 
    t.title,
    t.status,
    t.priority,
    t.due_date,
    string_agg(tags.name, ', ') as tags
FROM public.tasks t
LEFT JOIN public.task_tags tt ON t.id = tt.task_id
LEFT JOIN public.tags ON tt.tag_id = tags.id
WHERE t.user_id = auth.uid()
GROUP BY t.id, t.title, t.status, t.priority, t.due_date, t.created_at
ORDER BY t.created_at DESC; kanban columns for the workflow
-- Run this directly in Supabase SQL Editor

-- Insert the workflow columns
INSERT INTO public.columns (id, title, status, color, "order", created_at, updated_at) 
VALUES 
    ('backlog', 'Backlog', 'backlog', '#6b7280', 0, now(), now()),
    ('ready', 'Ready', 'ready', '#3b82f6', 1, now(), now()),
    ('in-progress', 'In Progress', 'in-progress', '#f59e0b', 2, now(), now()),
    ('done', 'Done', 'done', '#10b981', 3, now(), now())
ON CONFLICT (id) DO UPDATE SET
    title = EXCLUDED.title,
    status = EXCLUDED.status,
    color = EXCLUDED.color,
    "order" = EXCLUDED."order",
    updated_at = now();

-- Verify the columns were created
SELECT * FROM public.columns ORDER BY "order";
