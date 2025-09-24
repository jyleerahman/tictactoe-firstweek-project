import express from "express";
import ViteExpress from "vite-express";
import { initialGameState, makeMove, checkEndState } from "./tictactoe";

const app = express();
app.use(express.json())

let gameState = initialGameState

app.get("/message", (req, res) => res.send("Hello from express!"));
app.get("/game", (req, res) => res.send(gameState))
app.post("/move", (req, res) => {
    const { index } = req.body as { index: number }
    if (typeof index !== "number") {
        return res.status(400).json({ error: "index is required" })
    }
    gameState = makeMove(gameState, index)
    res.json(gameState)
})

ViteExpress.listen(app, 3000, () => console.log("Server is listening..."));