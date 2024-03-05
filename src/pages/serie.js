import { SerieCompleta } from "@/frontend/components/serieCompleta";
import Image from "next/image";

export default function Serie() {
  return (
    <div>
      <div>
        <SerieCompleta serie={serie} />
      </div>
    </div>
  );
}