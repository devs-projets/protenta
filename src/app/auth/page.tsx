"use client";

import React from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Leaf } from "lucide-react";
import { useEffect, useState } from "react";
import { authUserService, IUserCredentials } from "@/lib/auth/userAuth";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { useAuth } from "@/context/AuthProvider";
import { EUserRole } from "@/types/userRole";

const AuthPage = () => {
  const [userName, setUserName] = useState<string>("");
  const [passWord, setPassWord] = useState<string>("");
  const { login, user } = useAuth();
  const router = useRouter();

  const submitLogin = async () => {
    const data: IUserCredentials = { userName, passWord };
    toast.promise(authUserService(data), {
      loading: "Authentification en cours ...",
      success: (response) => {
        if (response) {
          login(response);
          return "Connecté avec succès !";
        }
      },
      error: "Erreur lors de la connexion !",
    });
  };

  useEffect(() => {
    if (user) {
      if (user.role === EUserRole.DEV) {
        router.push("/dev-dashboard");
      } else {
        router.push("/subscription");
      }
    }
  }, [user]);

  return (
    <div className="flex justify-center items-center h-screen">
      <Card
        className="mx-auto max-w-sm"
        style={{ boxShadow: "0px 0px 20px black" }}
      >
        <CardHeader>
          <CardTitle className="text-2xl flex flex-col items-center justify-center">
            <Leaf size={80} color="green" />
            Connexion
          </CardTitle>
          <CardDescription className="text-lg text-center">
            Entrez votre email ci-dessous pour vous connecter à votre compte
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid gap-4">
            <div className="grid gap-2">
              <Label htmlFor="userName" className="text-lg">
                Nom d’utilisateur
              </Label>
              <Input
                id="userName"
                type="text"
                placeholder="Saisissez votre nom d'utilisateur"
                required
                onChange={(e) => setUserName(e.target.value)}
                className="text-lg"
              />
            </div>
            <div className="grid gap-2">
              <div className="flex items-center">
                <Label htmlFor="password" className="text-lg">
                  Mot de passe
                </Label>
              </div>
              <Input
                id="password"
                type="password"
                required
                placeholder="Saisissez votre mot de passe"
                onChange={(e) => setPassWord(e.target.value)}
                className="text-lg"
              />
              <Link href="#" className="inline-block text-sm underline">
                Mot de passe oublié ?
              </Link>
            </div>
            <Button type="button" className="w-full mb-5" onClick={submitLogin}>
              Connexion
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default AuthPage;
