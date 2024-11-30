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

export function LoginForm() {
  return (
    <Card
      className="mx-auto max-w-sm"
      style={{ boxShadow: "0px 0px 20px black" }}
    >
      <CardHeader>
        <CardTitle className="text-2xl flex flex-col items-center justify-center">
          <Leaf size={80} color="green" />
          Connexion
        </CardTitle>
        <CardDescription>
          Entrez votre email ci-dessous pour vous connecter à votre compte
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="grid gap-4">
          <div className="grid gap-2">
            <Label htmlFor="email">Email</Label>
            <Input
              id="email"
              type="email"
              placeholder="m@example.com"
              required
            />
          </div>
          <div className="grid gap-2">
            <div className="flex items-center">
              <Label htmlFor="password">Mot de passe</Label>
            </div>
            <Input id="password" type="password" required />
            <Link href="#" className="inline-block text-sm underline">
              Mot de passe oublié ?
            </Link>
          </div>
          <Link
            onClick={() => localStorage.setItem("userRole", "expert")}
            href={"/dashboard"}
            className="text-center inline-block"
          >
            <Button type="button" className="w-full mb-5">
              Connexion
            </Button>
          </Link>
        </div>
        {/* <div className="mt-4 text-center text-sm">
          Don&apos;t have an account?{" "}
          <Link href="#" className="underline">
            Sign up
          </Link>
        </div> */}
      </CardContent>
    </Card>
  );
}
