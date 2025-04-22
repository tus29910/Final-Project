import express from "express";
import fetch from "node-fetch";
import dotenv from "dotenv";
import cors from "cors";

dotenv.config();
const app = express();

const baseUrl = "https://api.themoviedb.org/3";
const apiKey = process.env.VITE_API_KEY;

app.use(
  cors({
    origin: [
      "http://localhost:5173",
      "http://localhost:5000",
      "https://react-demo-code-proxy.onrender.com",
      "https://react-demo-code-front-end.onrender.com",
      "https://cis3344-final-project-backend.onrender.com",
      "https://cis3344-final-project-frontend.onrender.com",
    ],
    methods: ["GET", "POST"],
    allowedHeaders: ["Content-Type", "Authorization"],
  })
);

app.get("/api/movies/popular", async (req, res) => {
  const { page = 1 } = req.query;
  const endpoint = `${baseUrl}/movie/popular?api_key=${apiKey}&language=en-US&page=${page}`;

  try {
    const response = await fetch(endpoint);
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    const data = await response.json();
    res.json(data);
  } catch (error) {
    console.error("Error fetching popular movies:", error);
    res.status(500).json({ error: "Failed to fetch popular movies" });
  }
});

app.get("/api/movies/search", async (req, res) => {
  const { query, page = 1 } = req.query;
  if (!query) {
    return res.status(400).json({ error: "Missing `query` parameter" });
  }

  const endpoint = `${baseUrl}/search/movie` +
                   `?api_key=${apiKey}` +
                   `&language=en-US` +
                   `&query=${encodeURIComponent(query)}` +
                   `&page=${page}`;

  try {
    const response = await fetch(endpoint);
    if (!response.ok) {
      throw new Error(`TMDb responded ${response.status}`);
    }
    const data = await response.json();
    res.json(data);
  } catch (error) {
    console.error("Error fetching search results:", error);
    res.status(500).json({ error: "Failed to search movies" });
  }
});

app.get('/api/movies/:id', async (req, res) => {
  const { id } = req.params;
  try {
    const response = await fetch(`${baseUrl}/movie/${id}?api_key=${apiKey}`);
    if (!response.ok) {
      return res
        .status(response.status)
        .json(await response.json());
    }
    const data = await response.json();
    res.json(data);
  } catch (err) {
    console.error(`Error fetching movie ${id}:`, err);
    res.status(500).json({ error: "Failed to fetch movie by ID" });
  }
});



app.listen(5000, () => {
  console.log("Server is running on port 5000");
});
