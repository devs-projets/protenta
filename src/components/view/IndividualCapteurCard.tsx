import React from "react";
import { Cable } from "lucide-react";

const IndividualCapteurCard = () => {
  return (
    <div className="grid md:grid-cols-3 gap-5 md:mx-5 mb-5">
      <div className="text-center rounded-xl bg-muted/50">
        <div className="rounded-full flex justify-center items-center">
          <Cable size={80} />
        </div>
      </div>

      <div className="flex flex-col justify-center">
        <h2 className="font-bold">Info 1</h2>
        <p>Data de l'info 1</p>
      </div>
      <div className="flex flex-col justify-center">
        <h2 className="font-bold">Info 2</h2>
        <p>Data de l'info 2</p>
      </div>
    </div>
  );
};

export default IndividualCapteurCard;
