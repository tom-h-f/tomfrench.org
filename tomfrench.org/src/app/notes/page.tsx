import { getNotesByCategory } from "@/lib/notes";
import { NotesPageClient } from "@/components/notes-page-client";

export default function NotesPage() {
    const notesByCategory = getNotesByCategory();

    return <NotesPageClient notesByCategory={notesByCategory} />;
}
