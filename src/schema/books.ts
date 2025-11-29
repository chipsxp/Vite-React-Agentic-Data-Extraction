import { z } from "zod";

// Zod Schemas
export const PublisherSchema = z.object({
  name: z.string().describe("Publisher company name"),
  location: z.string().describe("Publisher location (city, country)"),
});

export const AvailabilitySchema = z.object({
  format: z
    .string()
    .describe("Book format (hardcover, paperback, ebook, etc.)"),
  stock: z.number().int().nonnegative().describe("Number of copies in stock"),
});

export const RatingSchema = z.object({
  average: z.number().min(0).max(5).describe("Average rating score (0-5)"),
  count: z.number().int().nonnegative().describe("Total number of ratings"),
});

export const BookSchema = z.object({
  id: z.string().describe("Unique book identifier"),
  title: z.string().describe("Book title"),
  authors: z.array(z.string()).describe("List of author names"),
  publishedYear: z.number().int().describe("Year of publication"),
  genres: z.array(z.string()).describe("Book genres/categories"),
  isbn: z.string().describe("ISBN number"),
  pages: z.number().int().positive().describe("Number of pages"),
  language: z.string().describe("Language code (e.g., en, es, fr)"),
  publisher: PublisherSchema,
  availability: AvailabilitySchema,
  rating: RatingSchema,
  pdfUrl: z
    .url()
    .optional()
    .describe(
      "URL to downloadable PDF version for testing ADE parse functionality"
    ),
});

export const BookDatabaseSchema = z.object({
  books: z.array(BookSchema).describe("Array of book records"),
});

// TypeScript types inferred from Zod schemas
export type Publisher = z.infer<typeof PublisherSchema>;
export type Availability = z.infer<typeof AvailabilitySchema>;
export type Rating = z.infer<typeof RatingSchema>;
export type Book = z.infer<typeof BookSchema>;
export type BookDatabase = z.infer<typeof BookDatabaseSchema>;
