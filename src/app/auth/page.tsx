"use client";

import Link from "next/link";
import React, { useState, useEffect } from "react";
import { UserRound, UserRoundCog } from "lucide-react";
import { LoginForm } from "@/components/login/LoginForm";
import { useSelector } from "react-redux";
import { RootState } from "@/store/store";
import { useRouter } from "next/navigation";
import Spinner from "@/components/Spinner";

const Login = () => {
  const [loading, setLoading] = useState<boolean>(true);
  // const { access_token } = useSelector((state: RootState) => state.auth);
  const router = useRouter();

  // console.log(access_token)

  // useEffect(() => {
  //   if (access_token) {
  //     router.push('/dashboard');
  //   } else {
  //     setLoading(false);
  //   }
  // }, [])

  // if (loading) {
  //   return (
  //     <div className="h-screen flex justify-center items-center">
  //       <Spinner />
  //     </div>
  //   )
  // }

  return (
    <div className="flex justify-center items-center h-screen">
      <LoginForm />
    </div>
  );
};

export default Login;
