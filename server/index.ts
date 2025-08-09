import express from "express"
import marvelRoutes from "./src/routes/marvelRoutes.js";
import { fileURLToPath } from "url";
import path, { dirname } from "path"
import type { Request, Response} from "express"

const app = express()

const __filename = fileURLToPath(import.meta.url)
const __dirname = dirname(__filename);

app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use(express.static(path.join(__dirname, './data')));

app.get("/", (req: Request, res: Response) => {
  res.send("Hello...This is the backend of marvel app")
});

app.use("/characters", marvelRoutes);


const PORT = 8800
app.listen(PORT, () => console.log(`Backend server started on http://localhost:${PORT}/`))