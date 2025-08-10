import React from "react";
import {Card, CardHeader, CardContent} from "@/components/ui/card";
import {Link} from "react-router-dom";

interface Character {
  id: number;
  name: string;
  realName: string;
  universe: string;
}

interface MarvelCardProps {
  character: Character;
}

const getBaseColor = (name: string): string => {
  const lowerName = name.toLowerCase();

  if (lowerName.includes("captain america")) return "blue";
  if (lowerName.includes("spider-man") || lowerName.includes("spiderman")) return "red";
  if (lowerName.includes("iron man")) return "yellow";
  if (lowerName.includes("hulk")) return "green";
  if (lowerName.includes("thor")) return "indigo";
  if (lowerName.includes("black widow")) return "gray";
  if (lowerName.includes("doctor strange")) return "purple";
  if (lowerName.includes("black panther")) return "black";
  if (lowerName.includes("scarlet witch")) return "pink";
  return "gray";
};


const MarvelCard: React.FC<MarvelCardProps> = ({character}) => {
  const baseColor = getBaseColor(character.name);

  const gradientClass = `bg-gradient-to-r from-${baseColor}-400 to-${baseColor}-600`;

  const textColorClass = baseColor === "black" ? "text-white" : "text-gray-900";

  return (
    <Link to={`/character/${character.id}`}>
      <Card className={`${gradientClass} ${textColorClass}  bg-${baseColor}-900 hover:brightness-110 transition`}>
        <CardHeader className="font-bold">{character.name}</CardHeader>
        <CardContent>
          <p><span className="font-semibold">Alias: </span>{character.realName}</p>
          <p><span className="font-semibold">Univers: </span>{character.universe}</p>
        </CardContent>
      </Card>
    </Link>
  );

};

export default MarvelCard;