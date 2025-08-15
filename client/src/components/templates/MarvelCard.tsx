import React from "react";
import {Card, CardHeader, CardContent} from "@/components/ui/card";
import {Link} from "react-router-dom";
import {getBaseColor} from "@/components/MarvelColor.ts";

export interface Character {
  id: number;
  name: string;
  realName: string;
  universe: string;
}

interface MarvelCardProps {
  character: Character;
}

const MarvelCard: React.FC<MarvelCardProps> = ({character}) => {
  const baseColor = getBaseColor(character.name);

  const gradientClass = `bg-gradient-to-r from-${baseColor}-400 to-${baseColor}-600`;

  return (
    <Link to={`/character/${character.id}`}>
      <Card className={`${gradientClass} text-white  bg-${baseColor}-500`}>
        <CardHeader className="font-bold dc-font">{character.name}</CardHeader>
        <CardContent>
          <p><span className="font-semibold">Alias: </span>{character.realName}</p>
          <p><span className="font-semibold">Univers: </span>{character.universe}</p>
        </CardContent>
      </Card>
    </Link>
  );

};

export default MarvelCard;