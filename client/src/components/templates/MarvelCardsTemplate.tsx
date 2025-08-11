import {useQuery} from "@tanstack/react-query";
import axios from "axios";
import type {Character} from "@/components/templates/MarvelCard";
import MarvelCard from "@/components/templates/MarvelCard";

const fetchMarvels = async () => {
  const response = await axios.get("http://localhost:8800/characters");
  return response.data;
}

const MarvelCardsTemplate = () => {
  const {data: characters, isError, isLoading} = useQuery<Character[]>({
    queryKey: ["Marvel", "Characters"],
    queryFn: fetchMarvels,
  });

  if (isLoading) return <p>Loading...</p>;
  else if (isError || !characters) return <p>Error loading characters</p>;

  return (
    <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
      {characters.map((character) => (
        <MarvelCard key={character.id} character={character}/>
      ))}
    </div>
  );
};

export default MarvelCardsTemplate;
