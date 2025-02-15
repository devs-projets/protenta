"use client";

import React, { useEffect, useState } from "react";

const CurrentDate = () => {
  const [dateTime, setDateTime] = useState<Date | null>(null);

  useEffect(() => {
    setDateTime(new Date());
    const interval = setInterval(() => setDateTime(new Date()), 1000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="hidden lg:block text-right font-bold">
      {dateTime ? (
        <>
          {dateTime.toLocaleDateString()} {dateTime.toLocaleTimeString()}
        </>
      ) : (
        <span style={{ color: "transparent" }}>Loading...</span>
      )}
    </div>
  );
};

export default CurrentDate;
