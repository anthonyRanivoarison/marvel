import {useParams} from "react-router-dom";

const CharacterPage = () => {
  const params = useParams();

  const ID: string | undefined = params.id;

  return <h1>Character page {ID}</h1>
}

export default CharacterPage;