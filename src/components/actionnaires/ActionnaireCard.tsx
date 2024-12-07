import { IActionnaire } from "@/types/actionnaire";
import { ILatestData } from "@/types/latestDataState";
import React, { useEffect, useState } from "react";
import { extractSingleActionnaire } from "@/lib/transformDatas/extractActionnaires";

interface IActionnaireCardProps {
  item: IActionnaire;
  data: ILatestData | null;
  index: number;
}

const ActionnaireCard = ({ item, data, index }: IActionnaireCardProps) => {
  const [thisActionnaire, setThisActionnaire] = useState<any>();

  useEffect(() => {
    if (data) {
      const result = extractSingleActionnaire(data, index + 1);
      setThisActionnaire(result);
    }
  }, [data]);

  return (
    <div className="flex justify-center items-center gap-5 flex-wrap">
      <div className="bg-slate-200 w-60 h-32 shadow-lg rounded-lg flex flex-col justify-center items-center py-2 px-4">
        <h2 className="font-bold">{item.name}</h2>
        <p>{item.description}</p>
        <div>
          {thisActionnaire ? (
            <div
              className={`h-10 w-10 ${
                thisActionnaire[`S${index + 1}` as keyof ILatestData] === 0
                  ? "bg-red-500"
                  : "bg-green-500"
              } rounded-full mt-2`}
            ></div>
          ) : (
            <div className={`h-10 w-10 bg-red-500 rounded-full mt-2`}></div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ActionnaireCard;
