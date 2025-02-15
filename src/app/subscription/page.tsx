"use client";

import { useState, useRef, useEffect, useCallback } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { TriangleAlert } from "lucide-react";
// import { activateSouscription } from "@/lib/souscription/activateSouscription";
import { validateLicense } from "@/lib/souscription/activateSouscription";
import { toast } from "sonner";
import { useAuth } from "@/context/AuthProvider";

const LICENSE_LENGTH = 18;
const GROUP_SIZE = 6;

export default function SubscriptionPage() {
  const [licenseKey, setLicenseKey] = useState(Array(LICENSE_LENGTH).fill(""));
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();
  const inputRefs = useRef<(HTMLInputElement | null)[]>([]);

  const { access_token } = useAuth();

  useEffect(() => {
    inputRefs.current = inputRefs.current.slice(0, LICENSE_LENGTH);
    inputRefs.current[0]?.focus();
  }, []);

  const setInputRef = useCallback(
    (index: number) => (el: HTMLInputElement | null) => {
      inputRefs.current[index] = el;
    },
    []
  );

  const handleInputChange = (index: number, value: string) => {
    if (value.length > 1) {
      value = value[value.length - 1];
    }

    const newLicenseKey = [...licenseKey];
    newLicenseKey[index] = value;
    setLicenseKey(newLicenseKey);

    if (value && index < LICENSE_LENGTH - 1) {
      inputRefs.current[index + 1]?.focus();
    }
  };

  const handleKeyDown = (
    index: number,
    e: React.KeyboardEvent<HTMLInputElement>
  ) => {
    if (e.key === "Backspace") {
      e.preventDefault();
      if (licenseKey[index]) {
        const newLicenseKey = [...licenseKey];
        newLicenseKey[index] = "";
        setLicenseKey(newLicenseKey);
      } else if (index > 0) {
        inputRefs.current[index - 1]?.focus();
      }
    } else if (e.key.length === 1) {
      handleInputChange(index, e.key);
    }
  };

  const handleFocus = (e: React.FocusEvent<HTMLInputElement>) => {
    e.target.select();
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError("");

    // const fullLicenseKey = licenseKey
    //   .join("")
    //   .replace(/(.{6})/g, "$1-")
    //   .replace(/-$/, "");
    const fullLicenseKey = licenseKey.join("");

    try {
      if (!access_token) {
        throw new Error("Access Token invalid !");
      }

      toast.promise(
        // activateSouscription(access_token, fullLicenseKey).then((result) => {
        validateLicense(fullLicenseKey).then((result) => {
          if (result) {
            router.push("/dashboard");
          } else {
            throw new Error(
              "Une erreur s'est produite lors de l'activation de la souscription."
            );
          }
        }),
        {
          loading: "Activation en cours ...",
          success: "Souscription activée avec succès !",
          error: (err) =>
            err.message || "Une erreur est survenue. Veuillez réessayer.",
        }
      );
    } catch (err) {
      console.error(err);
      setError("Une erreur est survenue. Veuillez réessayer.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex justify-center items-center h-screen bg-slate-100">
      <Card className="w-full max-w-5xl mx-auto">
        <CardHeader>
          <CardTitle>Activation de votre licence</CardTitle>
          <CardDescription>
            Veuillez entrer votre clé de licence pour activer votre abonnement.{" "}
            <br />
            La clé se compose de 20 caractères, répartis en 5 groupes de 5
            caractères chacun. <br />
            Assurez-vous de saisir tous les caractères, sans les tirets (-).
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="mx-auto">
              <div className="flex flex-wrap gap-1 justify-center">
                {Array.from(
                  { length: LICENSE_LENGTH / GROUP_SIZE },
                  (_, groupIndex) => (
                    <div key={groupIndex} className="flex gap-1">
                      {Array.from({ length: GROUP_SIZE }, (_, index) => {
                        const actualIndex = groupIndex * GROUP_SIZE + index;
                        return (
                          <Input
                            key={actualIndex}
                            type="text"
                            maxLength={1}
                            value={licenseKey[actualIndex]}
                            onKeyDown={(e) => handleKeyDown(actualIndex, e)}
                            onChange={(e) => console.log(e.target.value)}
                            onFocus={handleFocus}
                            ref={setInputRef(actualIndex)}
                            className="w-10 border-slate-500 text-center caret-transparent"
                            required
                          />
                        );
                      })}
                      {groupIndex < 2 && (
                        <div className="flex items-center justify-center">
                          <span className="block">-</span>
                        </div>
                      )}
                    </div>
                  )
                )}
              </div>
            </div>
            {error && (
              <div className="text-red-500 bg-red-100 p-5 rounded-lg flex gap-3">
                <TriangleAlert />
                {error}
              </div>
            )}
            <div className="flex justify-end">
              <Button
                type="submit"
                disabled={isLoading || licenseKey.some((char) => !char)}
              >
                {isLoading ? "Validation..." : "Valider la licence"}
              </Button>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
