"use client";

import React, { useEffect } from "react";
import Spinner from "./Spinner";
import { useRouter } from "next/navigation";
import { Leaf } from "lucide-react";

const HomePageLoading = () => {
  const router = useRouter();

  useEffect(() => {
    setTimeout(() => {
      router.push("/dashboard/experts");
    }, 1500);
  }, []);
  return (
    <section>
      <div className="flex justify-center items-center rounded-lg">
        <div className="text-xl text-center">
          <Leaf size={80} color="green" />
          Protenta 
        </div>
      </div>
      <div className="flex justify-center my-5">
        <Spinner w={8} h={12} />
      </div>
    </section>
  );
};

export default HomePageLoading;
