import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';

export interface Note {
    slug: string;
    title: string;
    content: string;
    frontmatter: Record<string, unknown>;
    category?: string;
    subcategory?: string;
    fullPath?: string;
    tags?: string[];
    date?: string;
}

// Primary source: Obsidian vault submodule
const obsidianDirectory = path.join(process.cwd(), 'content/obsidian-vault');
// Fallback: local notes directory
const localNotesDirectory = path.join(process.cwd(), 'src/content/notes');

export function getAllNotes(): Note[] {
    const notes: Note[] = [];

    function readNotesFromDirectory(dir: string, baseCategory?: string, subcategory?: string): void {
        if (!fs.existsSync(dir)) return;

        const items = fs.readdirSync(dir);

        for (const item of items) {
            const fullPath = path.join(dir, item);
            const stat = fs.statSync(fullPath);

            if (stat.isDirectory()) {
                // Skip hidden directories and Obsidian metadata
                if (item.startsWith('.') || item === 'Templates') continue;

                // Recursively read subdirectories
                const newSubcategory = subcategory ? `${subcategory}/${item}` : item;
                readNotesFromDirectory(fullPath, baseCategory || item, newSubcategory);
            } else if (item.endsWith('.md')) {
                // Skip template files and README files
                if (item.toLowerCase().includes('template') || item.toLowerCase() === 'readme.md') continue;

                const fileContents = fs.readFileSync(fullPath, 'utf8');
                const { data, content } = matter(fileContents);

                const slug = item.replace(/\.md$/, '');
                const categoryFromPath = baseCategory || 'general';
                const fullSlug = subcategory ? `${subcategory}/${slug}` : slug;

                // Extract title from frontmatter or first heading or filename
                let title = data.title || slug;
                if (!data.title && content) {
                    const firstHeading = content.match(/^#\s+(.+)$/m);
                    if (firstHeading) {
                        title = firstHeading[1].trim();
                    }
                }

                notes.push({
                    slug: fullSlug,
                    title,
                    content,
                    frontmatter: data,
                    category: categoryFromPath,
                    subcategory,
                    fullPath,
                    tags: data.tags || [],
                    date: data.date || data.created || extractDateFromContent(content),
                });
            }
        }
    }

    // Helper function to extract date from content
    function extractDateFromContent(content: string): string | null {
        // Look for date patterns in content (YYYY-MM-DD format)
        const dateMatch = content.match(/\b(\d{4}-\d{2}-\d{2})\b/);
        return dateMatch ? dateMatch[1] : null;
    }

    // Try to read from Obsidian vault first, then fallback to local notes
    if (fs.existsSync(obsidianDirectory)) {
        // Read from main categories in Obsidian vault
        const categories = ['Study', 'Work', 'Life', 'Self-Improvement', 'Content', 'Daily'];
        categories.forEach(category => {
            const categoryPath = path.join(obsidianDirectory, category);
            if (fs.existsSync(categoryPath)) {
                readNotesFromDirectory(categoryPath, category);
            }
        });
    }

    // Also read from local notes directory as fallback/supplement
    if (fs.existsSync(localNotesDirectory)) {
        readNotesFromDirectory(localNotesDirectory);
    }

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

        // Create category key that includes subcategory for better organization
        let categoryKey = category;
        if (note.subcategory) {
            categoryKey = `${category}/${note.subcategory}`;
        }

        if (!categories[categoryKey]) {
            categories[categoryKey] = [];
        }
        categories[categoryKey].push(note);
    });

    // Sort categories alphabetically and notes within each category
    const sortedCategories: Record<string, Note[]> = {};
    Object.keys(categories).sort().forEach(key => {
        sortedCategories[key] = categories[key].sort((a, b) => {
            if (a.date && b.date) {
                return new Date(b.date).getTime() - new Date(a.date).getTime();
            }
            return a.title.localeCompare(b.title);
        });
    });

    return sortedCategories;
}
