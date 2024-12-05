import React, { useEffect, useState } from "react";
import Image from "next/image";
import { MoyenneItem } from "@/types/moyenneItem";

const MoyenneCard = ({ item }: { item: MoyenneItem }) => {
  const [value, setValue] = useState<number | null>(null);

  useEffect(() => {
    let convertedValue = item.value;

    switch (item.name) {
      case "Température":
        convertedValue = convertedValue / 100; // Conversion en °C
        break;
      case "Humidité":
        convertedValue = convertedValue / 100; // Conversion en pourcentage
        break;
      case "Lumière":
        convertedValue = convertedValue / 1000; // Conversion en lux ou autre unité
        break;
      case "Pression atm":
        convertedValue = convertedValue / 1000; // Conversion en Bar
        break;
      case "Humidité sol":
        break;
      case "CO₂":
        break;
      default:
        convertedValue = 0;
    }

    setValue(convertedValue);
  }, [item]);

  return (
    <article className="text-center rounded-xl bg-muted/50">
      <h2>{item.name}</h2>
      <div className="rounded-full flex justify-center items-center">
        <Image
          src={item.icon as string}
          width={50}
          height={50}
          alt={item.name}
        />
      </div>
      <p>{value?.toFixed(2) ?? "0.0"} {item.unit}</p>
    </article>
  );
};

export default MoyenneCard;
