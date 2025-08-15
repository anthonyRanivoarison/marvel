import {readFile, writeFile} from "fs"
import {fileURLToPath} from "url";
import {dirname, join} from "path";
import type {Request, Response} from "express"

interface Character {
  id: number;
  name: string;
  realName: string;
  universe: string;
}

interface CharacterObject {
  characters: Character[];
}

const __filename: string = fileURLToPath(import.meta.url);
const __dirname: string = dirname(__filename);

const file: string = join(__dirname, "../data/characters.json");

export const getCharacters = (req: Request, res: Response): void => {
  readFile(file, "utf8", (err, data) => {
    if (err) res.status(500).send(err)
    res.json(JSON.parse(data).characters)
  })
}

export const createNewCharacter = (req: Request, res: Response): void => {
  const characterToCreate: Character = req.body

  readFile(file, "utf8", (err, data) => {
    if (err) res.status(500).send(err)
    const characters = JSON.parse(data).characters;

    const id = characters.length > 0
      ? Math.max(...characters.map(c => c.id || 0)) + 1
      : 1;

    const newCharacter = { id, ...characterToCreate };
    characters.push(newCharacter);

    writeFile(file, JSON.stringify({characters}, null, 2), (err) => {
      if (err) return res.status(500).send(err);
      res.status(200).send("Character added!");
    });
  })
}

export const getCharacterByID = (req: Request, res: Response): void => {
  const ID = parseInt(req.params.id, 10);

  if (Number.isNaN(ID)) {
    res.status(400).send("ID parameter is missing or invalid");
    return;
  }

  readFile(file, "utf8", (err, data) => {
    if (err) return res.status(500).send(err);
    if (!data) return res.status(500).send("No data found");

    const parsed = JSON.parse(data);
    const characters: Character[] = parsed.characters || [];

    const character = characters.find((char) => Number(char.id) === ID);

    if (!character) return res.status(404).json({error: "No character found"});

    return res.status(200).json(character);
  });

};

export const updateCharacter = (req: Request, res: Response): void | Response => {
  const characterUpdated: Partial<Character> = req.body;
  const ID = req.params.id && !isNaN(parseInt(req.params.id)) ? parseInt(req.params.id) : null;

  if (ID === null) return res.status(400).json({error: "Invalid or missing character ID"});

  readFile(file, "utf8", (err, data) => {
    if (err) return res.status(500).json({error: err.message});
    if (!data) return res.status(500).json({error: "No data found"});

    const charObject: CharacterObject = JSON.parse(data) || {characters: []};

    const index = charObject.characters.findIndex((char: Character) => char.id === ID);

    if (index === -1) return res.status(404).json({error: "Character not found"});

    charObject.characters[index] = {
      ...charObject.characters[index],
      ...characterUpdated
    };

    writeFile(file, JSON.stringify(charObject, null, 2), "utf8", (writeErr) => {
      if (writeErr) return res.status(500).json({error: writeErr.message});

      res.status(200).json({message: "Character updated successfully"});
    });
  });
};

export const deleteCharacter = (req: Request, res: Response): void | Response => {
  const ID = req.params.id && !isNaN(parseInt(req.params.id)) ? parseInt(req.params.id) : null;

  if (ID === null || !ID) return res.status(400).send("ID parameter is missing or invalid");

  readFile(file, "utf8", (err, data) => {
    if (err) res.status(500).send(err)

    const allCharacters: Character[] = JSON.parse(data).characters;

    const newCharacters: Character[] = allCharacters.filter((character: Character) => character.id !== ID);

    writeFile(file, JSON.stringify({ characters: newCharacters }, null, 2), (err) => {
      if (err) res.status(500).send(err)
      res.status(200).send("Characters deleted")
    })
  })
}