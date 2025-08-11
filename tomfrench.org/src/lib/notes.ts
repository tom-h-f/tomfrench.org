import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';

export interface Note {
    slug: string;
    title: string;
    content: string;
    frontmatter: Record<string, unknown>;
    category?: string;
    tags?: string[];
    date?: string;
}

const notesDirectory = path.join(process.cwd(), 'src/content/notes');

export function getAllNotes(): Note[] {
    const notes: Note[] = [];

    function readNotesFromDirectory(dir: string, category?: string): void {
        if (!fs.existsSync(dir)) return;

        const items = fs.readdirSync(dir);

        for (const item of items) {
            const fullPath = path.join(dir, item);
            const stat = fs.statSync(fullPath);

            if (stat.isDirectory()) {
                // Recursively read subdirectories
                readNotesFromDirectory(fullPath, item);
            } else if (item.endsWith('.md')) {
                const fileContents = fs.readFileSync(fullPath, 'utf8');
                const { data, content } = matter(fileContents);

                const slug = item.replace(/\.md$/, '');
                const categoryFromPath = category || path.relative(notesDirectory, path.dirname(fullPath));

                notes.push({
                    slug: categoryFromPath ? `${categoryFromPath}/${slug}` : slug,
                    title: data.title || slug,
                    content,
                    frontmatter: data,
                    category: categoryFromPath || 'general',
                    tags: data.tags || [],
                    date: data.date || null,
                });
            }
        }
    }

    readNotesFromDirectory(notesDirectory);

    // Sort by date if available, then by title
    return notes.sort((a, b) => {
        if (a.date && b.date) {
            return new Date(b.date).getTime() - new Date(a.date).getTime();
        }
        return a.title.localeCompare(b.title);
    });
}

export function getNoteBySlug(slug: string): Note | undefined {
    const notes = getAllNotes();
    return notes.find(note => note.slug === slug);
}

export function getNotesByCategory(): Record<string, Note[]> {
    const notes = getAllNotes();
    const categories: Record<string, Note[]> = {};

    notes.forEach(note => {
        const category = note.category || 'general';
        if (!categories[category]) {
            categories[category] = [];
        }
        categories[category].push(note);
    });

    return categories;
}
