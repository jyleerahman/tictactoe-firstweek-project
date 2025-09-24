import express from "express";
import ViteExpress from "vite-express";
import { initialGameState, makeMove } from "./tictactoe";

const app = express();
app.use(express.json())

let gameState = initialGameState

//wire to useQuery
app.get("/game", (req, res) => res.send(gameState))

//wire to useMutation
app.post("/move", (req, res) => {
    const { index } = req.body as { index: number }
    if (typeof index !== "number") {
        return res.status(400).json({ error: "index is required" })
    }
    gameState = makeMove(gameState, index)
    res.json(gameState)
})

ViteExpress.listen(app, 3000, () => console.log("Server is listening..."));