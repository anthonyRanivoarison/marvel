import express from "express"


const app = express()


app.get("/", (req, res) => {
  res.send("Hello...This is the backend of marvel app")
});


const PORT = 8800
app.listen(PORT, () => console.log(`Server is listening on port ${PORT}`))