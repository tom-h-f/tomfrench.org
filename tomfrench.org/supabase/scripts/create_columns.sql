-- Script to create kanban columns for the workflow
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
