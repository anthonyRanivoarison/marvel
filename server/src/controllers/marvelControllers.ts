import {readFile, writeFile} from "fs"
import {fileURLToPath} from "url";
import {dirname, join} from "path";

const __filename = fileURLToPath(import.meta.url)
const __dirname = dirname(__filename);

const file = join(__dirname, "../data/characters.json");

export const getCharacters = (req, res) => {
  readFile(file, "utf8", (err, data) => {
    if (err) res.status(500).send(err)
    res.json(JSON.parse(data))
  })
}

export const createNewCharacter = (req, res) => {
  const character = req.body

  if (!character) res.status(400).json({ error: "No character found to create" })

  readFile(file, (err, data) => {
    if (err) res.status(500).send(err)
    const characters = JSON.parse(data).characters;

    characters.push(character)

    writeFile(file, JSON.stringify(characters), "utf8", (err) => {
      if (err) res.status(500).send(err)
      res.status(201).send("Character created successfully")
    })
  })
}

export const getCharacterByID = (req, res) => {
  const ID = parseInt(req.params.id)

  readFile(file, "utf8", (err, data) => {
    if (err) res.status(500).send(err)

    const characters = JSON.parse(data).characters;

    characters.forEach((character) => {
      const { id, ...others }  = character;
      if (ID === id) res.status(200).json(character)
    })
    res.status(500).json({ error: "No character found" })
  })
}

export const updateCharacter = (req, res) => {
}

export const deleteCharacter = (req, res) => {
  const ID = parseInt(req.params.id)

  if (!ID) res.status(400).send("No character ID found to delete")

  readFile(file, "utf8", (err, data) => {
    if (err) res.status(500).send(err)

    const characters = JSON.parse(data).characters;

    const newCharacters = characters.filter((character) => character.id !== ID);

    writeFile(file, JSON.stringify(newCharacters), (err) => {
      if (err) res.status(500).send(err)
      res.status(200).send("Characters deleted")
    })
  })
}