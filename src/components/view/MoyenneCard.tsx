import React from "react";
import Image from "next/image";
import { MoyenneItem } from "../MoyennesCardList";

const MoyenneCard = ({ item }: { item: MoyenneItem }) => {
  return (
    <article className="text-center rounded-xl bg-muted/50">
      <h2 className="">{item.name}</h2>
      <div className="rounded-full flex justify-center items-center">
        <Image src={item.icon} width={100} height={100} alt={item.name} />
      </div>
      <p>{item.value === 0 ? "0.0" : item.value}</p>
    </article>
  );
};

export default MoyenneCard;
