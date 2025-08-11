import {Label} from "@/components/ui/label.tsx";
import {Input} from "@/components/ui/input.tsx";

interface InputFormProps {
  state: string | number;
  setState: (value: string) => void;
  label: string;
  color?: string;
}

const InputForm = ({state, setState, label, color}: InputFormProps) => {
  return <div className="space-y-2">
    <Label>{label}</Label>
    <Input
      value={state}
      onChange={(e) => setState(e.target.value)}
      color={color}
      required={true}
    />
  </div>
}

export default InputForm;