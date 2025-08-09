import Router from 'express'
import {
  createNewCharacter,
  getCharacterByID,
  getCharacters,
  updateCharacter,
  deleteCharacter,
} from "../controllers/marvelControllers.js";

const marvelRoutes = Router()


// GET /characters ==> Get all characters
marvelRoutes.get("/", getCharacters)

// POST /characters ==> Create a new character
marvelRoutes.post("/", createNewCharacter)

// GET /characters/:id ==> Get a character by ID
marvelRoutes.get("/:id", getCharacterByID)

// PUT /characters/:id ==> Update a character by ID
marvelRoutes.put("/:id", updateCharacter)

// DELETE /characters/:id ==> Delete a character by ID
marvelRoutes.delete("/:id", deleteCharacter)

export default marvelRoutes;