"use client";

export default function GlobalError({ reset }: { error: Error & { digest?: string }; reset: () => void }) {
  return (
    <html lang="en">
      <body>
        <div
          style={{
            minHeight: "100vh",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            textAlign: "center",
            padding: "2rem",
            fontFamily: "sans-serif",
            background: "#FFECF2",
            color: "#393D72",
          }}
        >
          <h1 style={{ fontSize: "2rem", marginBottom: "1rem" }}>Something broke. We are fixing it!</h1>
          <p style={{ marginBottom: "2rem", maxWidth: 420 }}>
            Our little helpers have been notified. Please try again in a moment.
          </p>
          <button
            onClick={() => reset()}
            style={{
              background: "#FF4880",
              color: "#fff",
              border: "none",
              borderRadius: "999px",
              padding: "0.9rem 2rem",
              fontWeight: 700,
              cursor: "pointer",
            }}
          >
            Try Again
          </button>
        </div>
      </body>
    </html>
  );
}
