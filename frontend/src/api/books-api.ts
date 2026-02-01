export type Book = {
    id: string;
    title: string;
    description?: string;
    imageUrl?: string;
};

// didn't add it to .env for simplicity
const API_URL = "http://localhost:3001/api/books";

export async function fetchBooks(): Promise<Book[]> {
    const res = await fetch(API_URL);
    if (!res.ok) {
        throw new Error("Failed to fetch books");
    }
    return res.json();
}

export async function createBook(
    book: Omit<Book, "id">
): Promise<Book> {
    const res = await fetch(API_URL, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(book),
    });

    if (!res.ok) {
        throw new Error("Failed to create book");
    }

    return res.json();
}
