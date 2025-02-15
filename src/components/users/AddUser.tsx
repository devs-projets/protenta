import { UserPlus } from "lucide-react";
import React, { useState } from "react";
import {
  AlertDialog,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "../ui/alert-dialog";
import { Label } from "../ui/label";
import { Input } from "../ui/input";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/select";
import { EUserRole } from "@/types/userRole";
import { generateStrongPassword } from "@/lib/auth/generateRandomPassWord";
import { ICreateUser } from "@/types/user";
import { createNewUser } from "@/lib/auth/createUser";
import { toast } from "sonner";
import { useAuth } from "@/context/AuthProvider";

const AddUser = ({ setNewUser }: { setNewUser: (param: boolean) => void }) => {
  const [isDialogOpen, setIsDialogOpen] = useState<boolean>(false);
  const [firstName, setFirstName] = useState<string>("");
  const [lastName, setLastName] = useState<string>("");
  const [phone, setPhone] = useState<string>("");
  const [selectedRole, setSelectedRole] = useState<EUserRole | undefined>(
    undefined
  );
  const [generatedPassWord, setGeneratedPassWord] = useState<string>("");
  const [errors, setErrors] = useState<Record<string, string>>({});
  const { access_token } = useAuth();

  const handleValidation = (): boolean => {
    const validationErrors: Record<string, string> = {};

    if (!firstName.trim()) validationErrors.firstName = "Le prénom est requis.";
    if (!lastName.trim()) validationErrors.lastName = "Le nom est requis.";
    if (!phone.trim()) {
      validationErrors.phone = "Le téléphone est requis.";
    } else if (!/^\d+$/.test(phone)) {
      validationErrors.phone =
        "Le téléphone doit contenir uniquement des chiffres.";
    } else if (phone.length < 8 || phone.length > 13) {
      validationErrors.phone =
        "Le téléphone doit contenir entre 8 et 12 chiffres.";
    }
    if (!selectedRole) validationErrors.role = "Le rôle est requis.";
    if (!generatedPassWord.trim())
      validationErrors.password = "Le mot de passe est requis.";

    setErrors(validationErrors);

    return Object.keys(validationErrors).length === 0;
  };

  const clearStates = () => {
    setFirstName("");
    setLastName("");
    setPhone("");
    setSelectedRole(undefined);
    setGeneratedPassWord("");
  };

  const handleAddUser = async () => {
    if (!handleValidation()) return;

    if (!access_token) {
      console.error("Access token is null");
      return;
    }

    try {
      const data: ICreateUser = {
        firstName,
        lastName,
        phone,
        role: selectedRole!,
        passWord: generatedPassWord,
      };

      toast.promise(createNewUser(access_token, data), {
        loading: "Ajout de l'utilisateur en cours...",
        success: () => {
          setNewUser(true);
          clearStates();
          setIsDialogOpen(false);
          return "Utilisateur ajouté avec succès !";
        },
        error: "Erreur lors de l'ajout de l'utilisateur.",
      });
    } catch (error) {
      console.error("Erreur lors de l'ajout de l'utilisateur :", error);
      toast.error("Erreur lors de l'ajout de l'utilisateur.");
    }
  };

  const handleGeneratePassword = () => {
    const password = generateStrongPassword();
    setGeneratedPassWord(password);
  };

  return (
    <AlertDialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
      <AlertDialogTrigger
        className="flex justify-center bg-primary px-4 py-2 rounded-lg text-white text-xl cursor-pointer"
        asChild
      >
        <div>
          <UserPlus />
        </div>
      </AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Détails de l’utilisateur</AlertDialogTitle>
          <AlertDialogDescription>
            Consulter et modifier les informations de l’utilisateur
          </AlertDialogDescription>
        </AlertDialogHeader>
        <div>
          <form>
            <div className="mt-3">
              <Label htmlFor="nom" className="text-lg">
                Nom
              </Label>
              <Input
                id="nom"
                type="text"
                placeholder="Nom de l'utilisateur"
                className="text-lg"
                value={lastName}
                onChange={(e) => setLastName(e.target.value)}
              />
              {errors.lastName && (
                <p className="text-red-500 text-sm">{errors.lastName}</p>
              )}
            </div>
            <div className="mt-3">
              <Label htmlFor="prenom" className="text-lg">
                Prénom
              </Label>
              <Input
                id="prenom"
                type="text"
                placeholder="Prénom de l'utilisateur"
                className="text-lg"
                value={firstName}
                onChange={(e) => setFirstName(e.target.value)}
              />
              {errors.firstName && (
                <p className="text-red-500 text-sm">{errors.firstName}</p>
              )}
            </div>
            <div className="mt-3">
              <Label htmlFor="phone" className="text-lg">
                Téléphone
              </Label>
              <Input
                id="phone"
                type="tel"
                placeholder="Téléphone de l'utilisateur"
                className="text-lg"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
              />
              {errors.phone && (
                <p className="text-red-500 text-sm">{errors.phone}</p>
              )}
            </div>
            <div className="mt-3">
              <Label htmlFor="role" className="text-lg">
                Rôle
              </Label>
              <Select
                value={selectedRole}
                onValueChange={(value) => setSelectedRole(value as EUserRole)}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Rôle de l'utilisateur" />
                </SelectTrigger>
                <SelectContent>
                  <SelectGroup>
                    {Object.values(EUserRole)
                      .filter((role) => role !== EUserRole.SUDO)
                      .map((role) => (
                        <SelectItem
                          key={role}
                          value={role}
                          className="cursor-pointer"
                        >
                          {role}
                        </SelectItem>
                      ))}
                  </SelectGroup>
                </SelectContent>
              </Select>
              {errors.role && (
                <p className="text-red-500 text-sm">{errors.role}</p>
              )}
            </div>
            <div className="mt-3">
              <Label htmlFor="password" className="text-lg">
                Mot de passe
              </Label>
              <div className="flex items-center gap-3">
                <Input
                  id="password"
                  type="text"
                  value={generatedPassWord}
                  readOnly
                  className="text-lg"
                  placeholder="Mot de passe généré"
                />
                <button
                  type="button"
                  onClick={handleGeneratePassword}
                  className="bg-primary text-white p-2 rounded-lg"
                >
                  Générer
                </button>
              </div>
              {errors.password && (
                <p className="text-red-500 text-sm">{errors.password}</p>
              )}
            </div>
          </form>
        </div>
        <AlertDialogFooter>
          <AlertDialogCancel>Annuler</AlertDialogCancel>
          <button
            type="button"
            onClick={handleAddUser}
            className="bg-primary text-white px-4 py-2 rounded-lg"
          >
            Ajouter
          </button>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
};

export default AddUser;
