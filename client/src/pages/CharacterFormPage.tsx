import {useState} from "react";
import {Button} from "@/components/ui/button.tsx";
import InputForm from "@/components/templates/InputForm.tsx";
import {useQuery} from "@tanstack/react-query";
import axios from "axios";

const CharacterFormPage = () => {
  const [name, setName] = useState('');
  const [realName, setRealName] = useState('');
  const [universe, setUniverse] = useState('');

  const handleSubmit = (e: Event): | void => {
    e.preventDefault();
    const {data: string, isLoading, isError} = useQuery({
      queryKey: ["characters", name],
      queryFn: async () => {
        const response = await axios.post("http://localhost:8800/characters", {
          name, realName, universe
        });
        return response.data;
      }
    })
    if (isError) console.log("Error")
    else if (isLoading) console.log("Loading");
  }

  return <div className="flex items-center w-full min-h-screen">
    <div className="bg-blue-200 w-2/6 min-h-screen"></div>
    <div className="p-8 space-y-3 w-4/6 bg-white min-h-screen">
      <h2 className="text-3xl font-bold">Create your own marvel collector</h2>
      <form onSubmit={handleSubmit} className="w-full space-y-2">
        <InputForm state={name} setState={setName} label="Name" />
        <InputForm state={realName} setState={setRealName} label="Real name" />
        <InputForm state={universe} setState={setUniverse} label="Universe" />
        <Button className="text-white px-4 py-2 bg-black">Submit</Button>
      </form>
    </div>
  </div>
}

export default CharacterFormPage;