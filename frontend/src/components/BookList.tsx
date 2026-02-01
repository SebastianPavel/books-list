import { useEffect, useState } from "react";
import { fetchBooks, createBook, type Book } from "../api/books-api";
import { BookItem } from "./BookItem";

export function BookList() {
    const [books, setBooks] = useState<Book[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");
    const [imageUrl, setImageUrl] = useState("");

    // initial fetch
    useEffect(() => {
        async function loadBooks() {
            try {
                const data = await fetchBooks();
                setBooks(data);
            } catch (err) {
                setError("Failed to load books.");
            } finally {
                setLoading(false);
            }
        }

        loadBooks();
    }, []);

    async function handleAddBook() {
        setError(null);

        if (!title.trim()) {
            setError("Title is required.");
            return;
        }

        try {
            const newBook = await createBook({
                title: title.trim(),
                description: description.trim() || undefined,
                imageUrl: imageUrl.trim() || undefined,
            });

            setBooks((prev) => [...prev, newBook]);

            // reset form
            setTitle("");
            setDescription("");
            setImageUrl("");
        } catch (err) {
            setError("Failed to add new book.");
        }
    }

    if (loading) {
        return <p>Loading books...</p>;
    }

    return (
        <div>
            <h2>Add new book</h2>

            <div className="book-form">
                <input
                    type="text"
                    placeholder="Title"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                />

                <input
                    type="text"
                    placeholder="Image URL (optional)"
                    value={imageUrl}
                    onChange={(e) => setImageUrl(e.target.value)}
                />

                <textarea
                    placeholder="Description (optional)"
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                />

                <button type="button" onClick={handleAddBook}>
                    Add new book
                </button>

                {error && <p className="error">{error}</p>}
            </div>

            <hr />

            {books.length === 0 ? (
                <p>No books available.</p>
            ) : (
                books.map((book) => <BookItem key={book.id} book={book} />)
            )}
        </div>
    );
}
