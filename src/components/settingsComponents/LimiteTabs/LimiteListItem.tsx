import React, { useEffect, useState } from "react";

const LimiteListItem = ({
  title,
  unit,
  minValue,
  maxValue,
  onMinChange,
  onMaxChange,
}: {
  title: string;
  unit: string;
  minValue: number;
  maxValue: number;
  onMinChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onMaxChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}) => {

  const userRole = localStorage.getItem("userRole");
  const isDisabled = userRole === "simple";

  return (
    <li>
      <div className="grid grid-cols-4 gap-4 p-2 my-2 items-center">
        <h3>{title}</h3>
        <p>{unit}</p>
        <input
          type="number"
          value={minValue}
          onChange={onMinChange}
          placeholder="Min"
          className="border rounded px-2 py-1"
          disabled={isDisabled}
        />
        <input
          type="number"
          value={maxValue}
          onChange={onMaxChange}
          placeholder="Max"
          className="border rounded px-2 py-1"
          disabled={isDisabled}
        />
      </div>
    </li>
  );
};

export default LimiteListItem;
