"use client";

import Link from "next/link";
import React from "react";
import { UserRound, UserRoundCog } from "lucide-react";
import { LoginForm } from "@/components/login/LoginForm";

const Login = () => {
  return (
    <div className="flex justify-center items-center h-screen">
      <LoginForm />
      {/* <div className="mx-10">
        <Link
          onClick={() => localStorage.setItem("userRole", "simple")}
          href={"/dashboard"}
          className="text-center inline-block"
        >
          <UserRound className="bg-primary border p-5 rounded-lg shadow-lg h-72 w-72 text-white mb-5" />
          <span className="text-4xl font-bold">User Simple</span>
        </Link>
      </div>
      <div className="mx-10">
        <Link
          onClick={() => localStorage.setItem("userRole", "expert")}
          href={"/dashboard"}
          className="text-center inline-block"
        >
          <UserRoundCog className="bg-primary border p-5 rounded-lg shadow-lg h-72 w-72 text-white mb-5" />
          <span className="text-4xl font-bold">Expert</span>
        </Link>
      </div> */}
    </div>
  );
};

export default Login;
