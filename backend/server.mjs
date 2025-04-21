import express from "express";
import fetch from "node-fetch";
import dotenv from "dotenv";
import cors from "cors";

dotenv.config();
const app = express();

const baseUrl = "https://api.themoviedb.org/3";
const apiKey = process.env.TMDB_API_KEY;

app.use(
  cors({
    origin: [
      "http://localhost:5173",
      "http://localhost:5000",
      "https://react-demo-code-proxy.onrender.com",
      "https://react-demo-code-front-end.onrender.com",
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

app.listen(5000, () => {
  console.log("Server is running on port 5000");
});
