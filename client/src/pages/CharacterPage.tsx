import {useParams} from "react-router-dom";
import axios from "axios";
import {useQuery} from "@tanstack/react-query";
import type {Character} from "@/components/templates/MarvelCard.tsx";

const CharacterPage = () => {
  const params = useParams();
  const ID: string | undefined = params.id;
  const {data: character, isError, isLoading} = useQuery<Character>({
    queryKey: ["Marvel", "Character"],
    queryFn: async () => {
      const response = await axios.get(`http://localhost:8800/characters/${ID}`);
      console.log(response.data)
      return response.data
    }
  });

  if (isLoading) return <p>Loading...</p>;
  if (isError || !character) return <p>Error loading characters</p>;

  return <div>
    <h1 className="text-black text-5xl">{character.name}</h1>
    <span>{character.realName}</span>
    <p>{character.universe}</p>
  </div>
}

export default CharacterPage;