import { Loader2 } from "lucide-react";
import type { FC } from "react";

const Spinner: FC<{ size?: number }> = ({ size = 24 }) => {
  return <Loader2 className={`animate-spin`} size={size} />;
};

export default Spinner;