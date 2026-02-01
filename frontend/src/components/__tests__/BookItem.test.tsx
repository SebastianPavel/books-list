import { render, screen, fireEvent } from "@testing-library/react";
import { BookItem } from "../BookItem";
import type { Book } from "../../api/books-api";

const mockBook: Book = {
    id: "1",
    title: "Test Book",
    description: "Test description",
    imageUrl: "invalid-url",
};

describe("BookItem", () => {
    it("toggles description visibility when button is clicked", () => {
        render(<BookItem book={mockBook} />);

        // description hidden initially
        expect(screen.queryByText("Test description")).not.toBeInTheDocument();

        // show description
        fireEvent.click(screen.getByRole("button", { name: /show description/i }));
        expect(screen.getByText("Test description")).toBeInTheDocument();

        // hide description
        fireEvent.click(screen.getByRole("button", { name: /hide description/i }));
        expect(screen.queryByText("Test description")).not.toBeInTheDocument();
    });

    it("falls back to placeholder image when image URL is invalid", () => {
        render(<BookItem book={mockBook} />);

        const image = screen.getByRole("img") as HTMLImageElement;

        // simulate image error
        fireEvent.error(image);

        expect(image.src).toContain("book-placeholder.png");
    });
});
