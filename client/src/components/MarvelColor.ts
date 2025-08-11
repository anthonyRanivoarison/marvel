export const getBaseColor = (name: string): string => {
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