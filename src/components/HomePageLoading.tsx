"use client";

import React, { useEffect } from "react";
import Spinner from "./Spinner";
import { useRouter } from "next/navigation";
import { Leaf } from "lucide-react";
import { useAuth } from "@/context/AuthProvider";
import { EUserRole } from "@/types/userRole";

const HomePageLoading = () => {
  const router = useRouter();
  const { user } = useAuth();

  useEffect(() => {
    setTimeout(() => {
      if (user) {
        console.log(user);
        if (user.role === EUserRole.DEV) {
          router.push("/dev-dashboard");
        } else {
          router.push("/dashboard");
        }
      } else {
        router.push("/auth")
      }
    }, 1500);
  }, [router]);

  return (
    <section>
      <div className="flex justify-center items-center rounded-lg">
        <div className="text-xl text-center flex flex-col items-center">
          <Leaf size={80} color="green" />
          <span className="block font-bold text-primary text-3xl">
            Serre du Sahel{" "}
          </span>
        </div>
      </div>
      <div className="flex justify-center my-5">
        <Spinner />
      </div>
    </section>
  );
};

export default HomePageLoading;
