import marvelRoutes from "./src/routes/marvelRoutes.js";
import express from "express"
import { fileURLToPath } from "url";
import { dirname } from "path"
import path from "path"

const app = express()

const __filename = fileURLToPath(import.meta.url)
const __dirname = dirname(__filename);

app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use(express.static(path.join(__dirname, './data')));

app.get("/", (req, res) => {
  res.send("Hello...This is the backend of marvel app")
});

app.use("/characters", marvelRoutes);


const PORT = 8800
app.listen(PORT, () => console.log(`Backend server started on http://localhost:${PORT}/`))