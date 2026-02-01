import { useEffect, useState } from "react";
import { fetchBooks, createBook, type Book } from "../api/books-api";
import { BookItem } from "./BookItem";
import { BookForm } from "./BookForm";

export function BookList() {
    const [books, setBooks] = useState<Book[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        async function loadBooks() {
            try {
                const data = await fetchBooks();
                setBooks(data);
            } catch {
                setError("Failed to load books.");
            } finally {
                setLoading(false);
            }
        }

        loadBooks();
    }, []);

    async function handleCreateBook(book: Omit<Book, "id">) {
        const newBook = await createBook(book);
        setBooks((prev) => [...prev, newBook]);
    }

    if (loading) {
        return <p>Loading books...</p>;
    }

    return (
        <div>
            <h2>Add new book</h2>

            <BookForm onSubmit={handleCreateBook} />

            {error && <p className="error">{error}</p>}

            <hr />

            {books.length === 0 ? (
                <p>No books available.</p>
            ) : (
                books.map((book) => <BookItem key={book.id} book={book} />)
            )}
        </div>
    );
}
