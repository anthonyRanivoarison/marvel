import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import {
  AlertCircle,
  CheckCircle2,
  Info,
  TriangleAlert,
} from "lucide-react";
import type {JSX} from "react";

type AlertType = "info" | "success" | "warning" | "error";

interface Props {
  title: string;
  description: string;
  type?: AlertType;
}

const iconMap: Record<AlertType, JSX.Element> = {
  info: <Info className="h-4 w-4" color="blue" />,
  success: <CheckCircle2 className="h-4 w-4" color="green" />,
  warning: <TriangleAlert className="h-4 w-4" color="orange" />,
  error: <AlertCircle className="h-4 w-4" color="red" />,
};

const variantMap: Record<AlertType, "default" | "destructive"> = {
  info: "default",
  success: "default",
  warning: "default",
  error: "destructive",
};

const AlertMarvel = ({ title, description, type = "info" }: Props) => {
  return (
    <Alert variant={variantMap[type]} className="max-w-xl">
      {iconMap[type]}
      <AlertTitle>{title}</AlertTitle>
      <AlertDescription>{description}</AlertDescription>
    </Alert>
  );
};

export default AlertMarvel;