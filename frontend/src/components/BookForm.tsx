import { useState } from "react";
import type { Book } from "../api/books-api";
import { isValidUrl } from "../utils/is-valid-url";

type Props = {
    onSubmit: (book: Omit<Book, "id">) => Promise<void>;
};

export function BookForm({ onSubmit }: Props) {
    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");
    const [imageUrl, setImageUrl] = useState("");
    const [error, setError] = useState<string | null>(null);
    const [submitting, setSubmitting] = useState(false);

    async function handleSubmit() {
        setError(null);

        const trimmedTitle = title.trim();
        const trimmedDescription = description.trim();
        const trimmedImageUrl = imageUrl.trim();

        if (!trimmedTitle) {
            setError("Title is required.");
            return;
        }
        if (trimmedImageUrl && !isValidUrl(trimmedImageUrl)) {
            setError("Image URL must be a valid URL.");
            return;
        }
        try {
            setSubmitting(true);

            await onSubmit({
                title: trimmedTitle,
                description: trimmedDescription || undefined,
                imageUrl: trimmedImageUrl || undefined,
            });

            setTitle("");
            setDescription("");
            setImageUrl("");
        } catch {
            setError("Failed to add new book.");
        } finally {
            setSubmitting(false);
        }
    }

    return (
        <div className="book-form">
            <label>
                Title
                <input
                    type="text"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    aria-invalid={!!error}
                />
            </label>
            <label>
                Image URL (optional)
                <input
                    type="text"
                    value={imageUrl}
                    onChange={(e) => setImageUrl(e.target.value)}
                    aria-invalid={!!error}
                />
            </label>
            <label>
                Description (optional)
                <input
                    type="text"
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                />
            </label>
            <button type="button" onClick={handleSubmit} disabled={submitting}>
                {submitting ? "Adding…" : "Add new book"}
            </button>
            {error && (
                <p className="error" role="alert">
                    {error}
                </p>
            )}
        </div>

    );
}
