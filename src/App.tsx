import { useState, useMemo } from "react";
import LandingAIADE from "landingai-ade";
import { bookDatabase } from "./data/books";
import PdfExtractionWorkflow from "./components/PdfExtractionWorkflow";
import "./App.css";

function App() {
  const [books] = useState(bookDatabase.books);
  const [selectedBook, setSelectedBook] = useState<
    (typeof bookDatabase.books)[0] | null
  >(null);

  // Check API key availability outside of effect
  const apiKey = import.meta.env.VITE_VISION_AGENT_API_KEY;
  const error = useMemo(() => {
    if (!apiKey) {
      return "VISION_AGENT_API_KEY is not configured. Please add it to your .env file.";
    }
    return "";
  }, [apiKey]);

  const adeClient = useMemo(() => {
    if (!apiKey) return null;
    try {
      const client = new LandingAIADE({
        apikey: apiKey,
      });
      console.log("ADE Client initialized successfully");
      return client;
    } catch (err) {
      console.error(
        `Failed to initialize ADE client: ${
          err instanceof Error ? err.message : "Unknown error"
        }`
      );
      return null;
    }
  }, [apiKey]);

  return (
    <main className="app-container">
      <header className="app-header">
        <h1>📚 Book Data Extraction with ADE</h1>
        <p>
          Explore classic literature from Project Gutenberg with AI-powered data
          extraction
        </p>
      </header>

      {error && (
        <div className="error-banner">
          <strong>⚠️ Error:</strong> {error}
        </div>
      )}

      {adeClient && !error && (
        <div className="status-banner">
          ✅ ADE Client Ready | {books.length} books loaded
        </div>
      )}

      <div className="content-container">
        <section className="books-section">
          <h2>Book Collection</h2>
          <div className="books-grid">
            {books.map((book) => (
              <div
                key={book.id}
                className={`book-card ${
                  selectedBook?.id === book.id ? "selected" : ""
                }`}
                onClick={() => setSelectedBook(book)}
              >
                <h3>{book.title}</h3>
                <p className="authors">{book.authors.join(", ")}</p>
                <p className="year">{book.publishedYear}</p>
                <div className="genres">
                  {book.genres.map((genre, idx) => (
                    <span key={idx} className="genre-tag">
                      {genre}
                    </span>
                  ))}
                </div>
                {book.pdfUrl && (
                  <span className="pdf-available">📄 PDF Available</span>
                )}
              </div>
            ))}
          </div>
        </section>

        {selectedBook && (
          <section className="book-details">
            <h2>Book Details</h2>
            <div className="details-content">
              <h3>{selectedBook.title}</h3>
              <p>
                <strong>Authors:</strong> {selectedBook.authors.join(", ")}
              </p>
              <p>
                <strong>Published:</strong> {selectedBook.publishedYear}
              </p>
              <p>
                <strong>Publisher:</strong> {selectedBook.publisher.name} (
                {selectedBook.publisher.location})
              </p>
              <p>
                <strong>ISBN:</strong> {selectedBook.isbn}
              </p>
              <p>
                <strong>Pages:</strong> {selectedBook.pages}
              </p>
              <p>
                <strong>Language:</strong> {selectedBook.language}
              </p>
              <p>
                <strong>Format:</strong> {selectedBook.availability.format}
              </p>
              <p>
                <strong>Stock:</strong> {selectedBook.availability.stock}
              </p>
              <p>
                <strong>Rating:</strong> {selectedBook.rating.average}/5 (
                {selectedBook.rating.count} reviews)
              </p>

              {selectedBook.pdfUrl && (
                <div className="pdf-section">
                  <a
                    href={selectedBook.pdfUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="pdf-link"
                  >
                    📥 Download PDF from Project Gutenberg
                  </a>
                </div>
              )}
            </div>
          </section>
        )}
      </div>

      {adeClient && !error && <PdfExtractionWorkflow client={adeClient} />}
    </main>
  );
}

export default App;
