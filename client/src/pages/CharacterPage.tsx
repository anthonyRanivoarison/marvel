import {Link, useParams} from "react-router-dom";
import axios from "axios";
import {useQuery} from "@tanstack/react-query";
import type {Character} from "@/components/templates/MarvelCard.tsx";
import {Card, CardTitle, CardContent} from "@/components/ui/card.tsx";
import {Button} from "@/components/ui/button.tsx";
import {ArrowLeft, Delete, Edit2} from "lucide-react";
import {getBaseColor} from "@/components/MarvelColor.ts";

const CharacterPage = () => {
  const params = useParams();
  const ID: string | undefined = params.id;
  const {data: character, isError, isLoading} = useQuery<Character>({
    queryKey: ["Marvel", "Character"],
    queryFn: async () => {
      const response = await axios.get(`http://localhost:8800/characters/${ID}`);
      return response.data
    }
  });

  const marvelColor: string = getBaseColor(character.name);
  console.log(marvelColor);

  const deleteCharacter = async (id: number | string): Promise<void> => {
    if (!id) console.log("Missing ID")
    const response = await axios.delete(`http://localhost:8800/characters/${id}`);
    if (response.status === 200) { /* empty */
    }
  }

  if (isLoading) return <p>Loading...</p>;
  if (isError || !character) return <p>Error loading characters</p>;

  return (
    <div className={`min-h-screen w-full bg-${marvelColor}-50`}>
      <Link
        to="/"
        className="inline-flex items-center gap-2 border text-sm border-white/50 rounded bg-white/20 backdrop-blur px-4 py-2"
      >
        <Button variant="outline" className="bg-gradient-to-r from-blue-300 to-purple-50">
          <ArrowLeft size={15}/>
          Go back
        </Button>
      </Link>

      <div className="flex items-center justify-center">
        <Card className="max-w-2xl w-md shadow-xl hover:shadow-2xl transition-shadow duration-300">
        <span className="flex items-center j-ustify-center text-xl">
          <CardTitle
            className="font-semibold bg-blue-500 rounded-full h-12 w-12 p-4">{character.name.charAt(0)}</CardTitle>
          <CardTitle className="text-xl w-full font-bold text-center">{character.name}</CardTitle>
        </span>
          <CardContent className="space-y-2 text-gray-700">
            <p><span className="font-semibold">Alias:</span> {character.realName}</p>
            <p><span className="font-semibold">Universe:</span> {character.universe}</p>
            <div className="flex justify-end space-x-4 mt-4">
              <Button
                variant="outline"
                size="sm"
                className="flex items-center"
              >
                Edit
                <Edit2/>
              </Button>
              <Button
                variant="destructive"
                size="sm"
                className="bg-red-500"
                onClick={() => deleteCharacter(character.id)}
              >
                Delete
                <Delete/>
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}

export default CharacterPage;