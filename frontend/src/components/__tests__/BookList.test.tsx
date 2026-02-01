import { render, screen } from "@testing-library/react";
import { describe, it, expect, vi } from "vitest";
import { BookList } from "../BookList";
import type { Book } from "../../api/books-api";

vi.mock("../../api/books-api", async () => {
    return {
        fetchBooks: vi.fn(),
        createBook: vi.fn(),
    };
});

import { fetchBooks } from "../../api/books-api";

const mockBooks: Book[] = [
    {
        id: "1",
        title: "Test Book",
        description: "Test description",
        imageUrl: undefined,
    },
];

describe("BookList", () => {
    it("renders books fetched from API", async () => {
        vi.mocked(fetchBooks).mockResolvedValue(mockBooks);

        render(<BookList />);

        expect(screen.getByText(/loading books/i)).toBeInTheDocument();
        expect(await screen.findByText("Test Book")).toBeInTheDocument();
    });
});
