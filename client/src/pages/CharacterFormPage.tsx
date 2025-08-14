import {useState, useEffect} from "react";
import {Button} from "@/components/ui/button";
import InputForm from "@/components/templates/InputForm";
import {useQuery} from "@tanstack/react-query";
import axios from "axios";
import {useLocation} from "react-router-dom";
import type {Character} from "@/components/templates/MarvelCard";
import {Globe, User, VenetianMask} from "lucide-react";
import {getBaseColor} from "@/components/MarvelColor.ts";

const CharacterFormPage = () => {
  const location = useLocation();
  const params = new URLSearchParams(location.search);
  const idForEdit: string | null = params.get("edit");

  const isEdit = Boolean(idForEdit);
  const apiUrl = isEdit
    ? `http://localhost:8800/characters/${idForEdit}/`
    : `http://localhost:8800/characters/`;

  const [name, setName] = useState("");
  const [realName, setRealName] = useState("");
  const [universe, setUniverse] = useState("");

  const {data: character, isError, isLoading} = useQuery<Character>({
    queryKey: ["character", idForEdit],
    queryFn: async () => {
      const res = await axios.get(apiUrl);
      return res.data;
    },
    enabled: isEdit,
  });

  useEffect(() => {
    if (character) {
      setName(character.name);
      setRealName(character.realName);
      setUniverse(character.universe);
    }
  }, [character]);

  const handleSubmit = async (e: React.FormEvent): Promise<void> => {
    e.preventDefault();

    try {
      if (isEdit) {
        await axios.put(apiUrl, {
          id: parseInt(idForEdit!),
          name,
          realName,
          universe,
        });
        console.log("Character updated");
      } else {
        await axios.post(apiUrl, {name, realName, universe});
        console.log("Character created");
      }
    } catch (error) {
      console.error("Error sending data", error);
    }
  };

  if (isLoading) return <p>Loading...</p>;
  if (isError) return <p>Error loading character</p>;

  const baseColor = getBaseColor(name || "default");

  return (
    <div className="flex flex-col md:flex-row min-h-screen">
      <div
        className={`w-full md:w-2/5 flex items-center bg-${baseColor}-700 justify-center text-white p-8`}
      >
        <div className="text-center">
          <h1 className="text-4xl font-extrabold mb-4 tracking-wider">
            Marvel Universe
          </h1>
          <p className="text-lg max-w-xs mx-auto">
            {isEdit
              ? "Modify your hero’s details and keep their legend alive."
              : "Create a new hero and add them to the Marvel Hall of Fame."}
          </p>
        </div>
      </div>

      <div className="w-full md:w-3/5 bg-white flex items-center justify-center p-8 md:p-12">
        <div className="w-full max-w-lg">
          <h2 className="text-3xl font-bold mb-6 dc-font text-gray-900">
            {isEdit ? "Edit your Marvel character" : "Create your own Marvel collector"}
          </h2>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="flex items-center space-x-2 border-b border-gray-300 pb-2">
              <User style={{color: baseColor}} size={20}/>
              <InputForm state={name} setState={setName} label="Name"/>
            </div>

            <div className="flex items-center space-x-2 border-b border-gray-300 pb-2">
              <VenetianMask style={{color: baseColor}} size={20}/>
              <InputForm state={realName} setState={setRealName} label="Real name"/>
            </div>

            <div className="flex items-center space-x-2 border-b border-gray-300 pb-2">
              <Globe style={{color: baseColor}} size={20}/>
              <InputForm state={universe} setState={setUniverse} label="Universe"/>
            </div>

            <Button
              type="submit"
              variant={"outline"}
              className={`w-full py-3 rounded-lg bg-${baseColor}-700 text-white font-semibold transition-colors duration-300`}
            >
              {isEdit ? "Edit" : "Submit"}
            </Button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default CharacterFormPage;
