import express from "express"
import marvelRoutes from "./src/routes/marvelRoutes.js";
import type { Request, Response} from "express"
import cors from "cors"

const app = express()

app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use(cors())

app.get("/", (req: Request, res: Response) => {
  res.send("Hello...This is the backend of marvel app")
});

app.use("/characters", marvelRoutes);


const PORT = 8800
app.listen(PORT, () => console.log(`Backend server started on http://localhost:${PORT}/`))