import {useParams} from "react-router-dom";
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

  const redirectToFormPage = (id: number): string => window.location.href = `/form?edit=${id}`;

  const deleteCharacter = async (id: number | string): Promise<void> => {
    if (!id) console.log("Missing ID")
    const response = await axios.delete(`http://localhost:8800/characters/${id}`);
    if (response.status === 200) { /* empty */
    }
  }

  if (isLoading) return <p>Loading...</p>;
  if (isError || !character) return <p>Error loading character informations</p>;

  return (
    <div className={`w-full bg-${getBaseColor(character.name)}-200 p-4`}>
      <Button
        onClick={() => window.location.href = "/"}
      >
        <ArrowLeft size={15}/>
        Retour
      </Button>
      <div className="flex items-center justify-center h-screen">
        <Card className="max-w-2xl w-md shadow-xl hover:shadow-2xl transition-shadow duration-300">
          <div className="flex items-center gap-4 text-xl justify-center">
            <CardTitle
              className={`flex items-center justify-center font-semibold bg-${getBaseColor(character.name)}-500 rounded-full h-12 w-12 p-4 text-white`}
            >
              {character.name.charAt(0)}
            </CardTitle>
            <CardTitle className="flex-1 font-bold text-left">
              {character.name}
            </CardTitle>
          </div>
          <CardContent className="space-y-2 text-gray-700">
            <p><span className="font-semibold">Alias:</span> {character.realName}</p>
            <p><span className="font-semibold">Universe:</span> {character.universe}</p>
            <div className="flex justify-end space-x-4 mt-4">
              <Button
                variant="outline"
                size="sm"
                className="flex items-center"
                onClick={() => redirectToFormPage(character.id)}
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