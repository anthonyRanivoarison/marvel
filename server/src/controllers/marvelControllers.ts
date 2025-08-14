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
  const character: Character = req.body

  if (!character) res.status(400).json({error: "No character found to create"})

  readFile(file, (err, data): void | Response => {
    if (err) return res.status(500).send(err);
    if (!data) return res.status(500).send("No data found");

    const characters: Character[] = JSON.parse(data.toString("utf8")).characters;
    characters.push(character)

    writeFile(file, JSON.stringify(characters), "utf8", (err) => {
      if (err) res.status(500).send(err)
      res.status(201).send("Character created successfully")
    })
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

    if (!character) return res.status(404).json({ error: "No character found" });

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

    const characters: Character[] = JSON.parse(data) || [];

    const character = characters.filter((char: Character) => char.id === ID);
    res.json([character, ID, characters])

    // if (index === -1) {
    //   res.status(404).json({error: "Character not found"});
    //   return;
    // }
    // characters[index] = {...characters[index], ...characterUpdated};

    writeFile(file, JSON.stringify({characters}, null, 2), "utf8", (writeErr) => {
      if (writeErr) {
        res.status(500).json({error: writeErr.message});
        return;
      }

      // res.status(200).json({message: "Character updated", character: characters[index]});
    });
  });
};

export const deleteCharacter = (req: Request, res: Response): void | Response => {
  const ID = req.params.id && !isNaN(parseInt(req.params.id)) ? parseInt(req.params.id) : null;

  if (ID === null || !ID) return res.status(400).send("ID parameter is missing or invalid");

  readFile(file, "utf8", (err, data) => {
    if (err) res.status(500).send(err)

    const characters: Character[] = JSON.parse(data).characters;

    const characterToDelete: Character[] = characters.filter((character: Character) => character.id !== ID);

    writeFile(file, JSON.stringify(characterToDelete), (err) => {
      if (err) res.status(500).send(err)
      res.status(200).send("Characters deleted")
    })
  })
}