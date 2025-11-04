import React, { useState } from "react";
import "./styles.css";

export default function App() {
  const [movies, setMovies] = useState([]);
  const [title, setTitle] = useState("");
  const [comment, setComment] = useState("");
  const [rating, setRating] = useState(0);

  const addMovie = () => {
    if (!title.trim()) return;
    const newMovie = { id: Date.now(), title, comment, rating };
    setMovies([...movies, newMovie]);
    setTitle("");
    setComment("");
    setRating(0);
  };

  const removeMovie = (id) => {
    setMovies(movies.filter((movie) => movie.id !== id));
  };

  const renderStars = (count) => "⭐".repeat(count);

  return (
    <div className="App" style={{ textAlign: "center", padding: "20px" }}>
      <h1>🎬 Movies Watch List</h1>

      <div style={{ marginBottom: "15px" }}>
        <input
          type="text"
          placeholder="Movie title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          style={{ padding: "5px", margin: "5px" }}
        />
        <input
          type="text"
          placeholder="Your review"
          value={comment}
          onChange={(e) => setComment(e.target.value)}
          style={{ padding: "5px", margin: "5px" }}
        />
        <input
          type="number"
          placeholder="Stars (1–5)"
          value={rating}
          onChange={(e) =>
            setRating(Math.max(0, Math.min(5, Number(e.target.value))))
          }
          style={{ padding: "5px", margin: "5px", width: "80px" }}
        />
        <button
          onClick={addMovie}
          style={{
            padding: "8px 15px",
            borderRadius: "5px",
            cursor: "pointer",
            background: "#4CAF50",
            color: "white",
            border: "none",
          }}
        >
          Add Movie
        </button>
      </div>

      <ul style={{ listStyle: "none", padding: 0 }}>
        {movies.map((movie) => (
          <li
            key={movie.id}
            style={{
              border: "1px solid #ccc",
              margin: "10px auto",
              padding: "10px",
              width: "300px",
              borderRadius: "10px",
            }}
          >
            <h3>{movie.title}</h3>
            <p>Review: {movie.comment || "No comment"}</p>
            <p>Rating: {renderStars(movie.rating)}</p>
            <button
              onClick={() => removeMovie(movie.id)}
              style={{
                padding: "5px 10px",
                background: "red",
                color: "white",
                border: "none",
                borderRadius: "5px",
                cursor: "pointer",
              }}
            >
              Remove
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
}
