import { useState } from "react";
import type LandingAIADE from "landingai-ade";
import type { Book } from "../schema/books";

const BOOK_JSON_SCHEMA = JSON.stringify({
  type: "object",
  properties: {
    id: {
      type: "string",
      description: "Unique book identifier",
    },
    title: {
      type: "string",
      description: "Book title",
    },
    authors: {
      type: "array",
      items: { type: "string" },
      description: "List of author names",
    },
    publishedYear: {
      type: "integer",
      description: "Year of publication",
    },
    genres: {
      type: "array",
      items: { type: "string" },
      description: "Book genres/categories",
    },
    isbn: {
      type: "string",
      description: "ISBN number",
    },
    pages: {
      type: "integer",
      description: "Number of pages",
    },
    language: {
      type: "string",
      description: "Language code (e.g., en, es, fr)",
    },
    publisher: {
      type: "object",
      properties: {
        name: { type: "string", description: "Publisher company name" },
        location: { type: "string", description: "Publisher location" },
      },
      required: ["name", "location"],
    },
    availability: {
      type: "object",
      properties: {
        format: {
          type: "string",
          description: "Book format (hardcover, paperback, ebook, etc.)",
        },
        stock: {
          type: "integer",
          description: "Number of copies in stock",
        },
      },
      required: ["format", "stock"],
    },
    rating: {
      type: "object",
      properties: {
        average: {
          type: "number",
          description: "Average rating score (0-5)",
        },
        count: {
          type: "integer",
          description: "Total number of ratings",
        },
      },
      required: ["average", "count"],
    },
    pdfUrl: {
      type: "string",
      format: "uri",
      description:
        "URL to downloadable PDF version for testing ADE parse functionality",
    },
  },
  required: [
    "id",
    "title",
    "authors",
    "publishedYear",
    "genres",
    "isbn",
    "pages",
    "language",
    "publisher",
    "availability",
    "rating",
  ],
});

interface PdfExtractionWorkflowProps {
  client: LandingAIADE | null;
}

type ParseResponse = {
  chunks?: Array<{ markdown?: string }>;
};

type ExtractResponse = {
  extraction?: unknown;
};

const PdfExtractionWorkflow = ({ client }: PdfExtractionWorkflowProps) => {
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [status, setStatus] = useState<"idle" | "parsing" | "extracting">(
    "idle"
  );
  const [markdownPreview, setMarkdownPreview] = useState<string>("");
  const [extractedBook, setExtractedBook] = useState<Book | null>(null);
  const [error, setError] = useState<string>("");

  const bookSchemaJson = BOOK_JSON_SCHEMA;

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0] ?? null;
    setSelectedFile(file);
    setExtractedBook(null);
    setMarkdownPreview("");
    setError("");
  };

  const runWorkflow = async () => {
    if (!client) {
      setError("ADE client is not ready yet. Please wait a moment and retry.");
      return;
    }

    if (!selectedFile) {
      setError("Please choose a PDF document before running the workflow.");
      return;
    }

    try {
      setStatus("parsing");
      setError("");

      const parseFormData = new FormData();
      parseFormData.append("document", selectedFile);
      parseFormData.append("model", "dpt-2-mini");

      const parseResponse: ParseResponse = await fetch("/api/ade/parse", {
        method: "POST",
        body: parseFormData,
      }).then(async (response) => {
        if (!response.ok) {
          const message = await response.text();
          throw new Error(`Parse request failed: ${message}`);
        }
        return response.json();
      });

      const markdown =
        parseResponse.chunks
          ?.map((chunk) => chunk.markdown || "")
          .filter((chunkMarkdown) => chunkMarkdown.trim().length > 0)
          .join("\n\n") ?? "";

      if (!markdown.trim()) {
        throw new Error(
          "Parsing completed but no markdown content was returned."
        );
      }

      setMarkdownPreview(markdown.slice(0, 1200));

      setStatus("extracting");
      const markdownFile = new File([markdown], "document.md", {
        type: "text/markdown",
      });

      const extractFormData = new FormData();
      extractFormData.append("schema", bookSchemaJson);
      extractFormData.append("markdown", markdownFile);

      const extractResponse: ExtractResponse = await fetch("/api/ade/extract", {
        method: "POST",
        body: extractFormData,
      }).then(async (response) => {
        if (!response.ok) {
          const message = await response.text();
          throw new Error(`Extract request failed: ${message}`);
        }
        return response.json();
      });

      setExtractedBook((extractResponse.extraction ?? null) as Book | null);
      setStatus("idle");
    } catch (err) {
      setStatus("idle");

      if (err instanceof Error) {
        setError(err.message);
      } else {
        setError("An unknown error occurred while running the workflow.");
      }
    }
  };

  return (
    <section className="workflow-panel">
      <header>
        <h2>PDF Parsing & Extraction Workflow</h2>
        <p>
          Upload a PDF, let ADE convert it to markdown, and then extract
          structured book metadata using the Book schema powered by Zod.
        </p>
      </header>

      <div className="workflow-grid">
        <div className="workflow-step">
          <h3>1. Upload PDF</h3>
          <input
            type="file"
            accept="application/pdf"
            onChange={handleFileChange}
            disabled={status !== "idle"}
          />
          {selectedFile && (
            <p className="file-hint">
              Selected: <strong>{selectedFile.name}</strong> ({" "}
              {(selectedFile.size / 1024 / 1024).toFixed(2)} MB)
            </p>
          )}
          <button
            type="button"
            className="primary-btn"
            disabled={status !== "idle"}
            onClick={runWorkflow}
          >
            {status === "parsing"
              ? "Parsing PDF..."
              : status === "extracting"
              ? "Extracting data..."
              : "Run Workflow"}
          </button>
          {error && <p className="workflow-error">⚠️ {error}</p>}
        </div>

        <div className="workflow-step">
          <h3>2. Markdown Preview</h3>
          {markdownPreview ? (
            <pre className="markdown-preview">{markdownPreview}</pre>
          ) : (
            <p className="placeholder-text">
              Run the workflow to view the generated markdown excerpt.
            </p>
          )}
        </div>

        <div className="workflow-step">
          <h3>3. Extracted Book Metadata</h3>
          {extractedBook ? (
            <div className="extraction-result">
              <p>
                <strong>Title:</strong> {extractedBook.title || "—"}
              </p>
              <p>
                <strong>Authors:</strong>{" "}
                {extractedBook.authors?.length
                  ? extractedBook.authors.join(", ")
                  : "—"}
              </p>
              <p>
                <strong>ISBN:</strong> {extractedBook.isbn || "—"}
              </p>
              <p>
                <strong>Publisher:</strong>{" "}
                {extractedBook.publisher?.name || "—"}
              </p>
              <p>
                <strong>Published Year:</strong>{" "}
                {extractedBook.publishedYear || "—"}
              </p>
            </div>
          ) : (
            <p className="placeholder-text">
              Once extraction completes, key metadata will appear here.
            </p>
          )}
        </div>
      </div>
    </section>
  );
};

export default PdfExtractionWorkflow;
