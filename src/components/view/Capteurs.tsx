import React from "react";
import CardCapteur from "@/components/view/CardCapteur";
import Link from "next/link";

export interface CapteurItem {
  name: string;
  temperature: number | undefined;
  humidite: number | undefined;
  humSol: number | undefined;
  pressAtm: number | undefined;
  // TODO : Correct type
  air: undefined;
  lumiere: number | undefined;
  // TODO : Correct type
  acc: undefined;
  // TODO : Correct type
  gyro: undefined;
}

const Capteurs = () => {
  const capt: CapteurItem = {
    name: "Capteur l",
    temperature: undefined,
    humidite: undefined,
    humSol: undefined,
    pressAtm: undefined,
    air: undefined,
    lumiere: undefined,
    acc: undefined,
    gyro: undefined,
  };

  const capteurs: CapteurItem[] = [];
  for (let i = 0; i < 15; i++) {
    capteurs.push(capt);
  }

  return (
    <div className="flex justify-center items-center gap-5 flex-wrap overflow-auto">
      {capteurs.map((item, index) => (
        <Link key={"Capterur" + index} href={`/dashboard/experts/capteur/${item.name}${index + 1}`}>
          <CardCapteur
            key={item.name + index}
            item={item}
            capteurIndex={index + 1}
          />
        </Link>
      ))}
    </div>
  );
};

export default Capteurs;
