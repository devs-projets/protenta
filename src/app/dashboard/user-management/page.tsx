"use client";

import React, { useEffect, useState } from "react";
import {
  PencilLine,
  Save,
  TriangleAlert,
  UserCircle2Icon,
  X,
} from "lucide-react";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { ICreateUser, IUpdateUser, User } from "@/types/user";
import { useSelector } from "react-redux";
import { RootState } from "@/store/store";
import { getAllUsers } from "@/lib/auth/allUser";
import Spinner from "@/components/Spinner";
import { useRouter } from "next/navigation";
import AddUser from "@/components/users/AddUser";
import DeleteUser from "@/components/users/DeleteUser";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { updateUser } from "@/lib/auth/updateUser";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { EUserRole } from "@/types/userRole";
import { generateStrongPassword } from "@/lib/auth/generateRandomPassWord";

const users = [
  {
    id: 1,
    name: "Jane Cooper",
    title: "Regional Paradigm Technician",
    department: "Optimization",
    status: "Active",
    role: "Expert",
    email: "jane.cooper@example.com",
    image: "https://i.pravatar.cc/150?img=1",
  },
  {
    id: 2,
    name: "John Doe",
    title: "Software Engineer",
    department: "Development",
    status: "Inactive",
    role: "User",
    email: "john.doe@example.com",
    image: "https://i.pravatar.cc/150?img=2",
  },
];

const TableRow = ({
  user,
  setDeleteUser,
  setOnUpdateUser,
  setOnUpdateUserRole,
}: {
  user: User;
  setDeleteUser: (deleteState: boolean) => void;
  setOnUpdateUser: (updateState: boolean) => void;
  setOnUpdateUserRole: (updateState: boolean) => void;
}) => {
  const [status, setStatus] = useState<string>("");
  const [updateInfos, setUpdateInfos] = useState<boolean>(false);
  const [updateRole, setUpdateRole] = useState<boolean>(false);
  const [updatePassWord, setUpdatePassWord] = useState<boolean>(false);

  // Update User infos
  const [newLastName, setNewLastName] = useState<string>(user.lastName);
  const [newFirstName, setFirstName] = useState<string>(user.firstName);
  const [newPhone, setNewPhone] = useState<string>(user.phoneNumber);
  const [newPassWordGenerated, setNewPassWordGenerated] = useState<string>("");

  // Update User role
  const [newRoleSelected, setNewRoleSelected] = useState<EUserRole>(
    user.role as EUserRole
  );

  const { access_token } = useSelector((state: RootState) => state.auth);

  const reinitUserInfo = () => {
    setNewLastName(user.lastName);
    setFirstName(user.firstName);
    setNewPhone(user.phoneNumber);
  };

  const submitNewUserInfos = async () => {
    try {
      const data: Partial<IUpdateUser> = {
        firstName: newFirstName,
        lastName: newLastName,
        phoneNumber: newPhone,
      };

      const response = await updateUser(access_token, data, user.id);

      if (response) {
        reinitUserInfo();
        setOnUpdateUser(true);
        setUpdateInfos(false);
        alert("Utilisateur mis à jour avec succès !");
      } else {
        alert(
          "Erreur lors de la mise à jour de l'utilisateur.\nVeuillez réessayer !"
        );
      }
    } catch (error) {
      console.error("Erreur lors de la mise à jour de l'utilisateur :", error);
      alert("Erreur lors de la mise à jour de l'utilisateur.");
    }
  };

  const submitNewUserRole = async () => {
    try {
      const data: Partial<IUpdateUser> = {
        role: newRoleSelected,
      };

      const response = await updateUser(access_token, data, user.id);

      if (response) {
        reinitUserInfo();
        setOnUpdateUserRole(true);
        setUpdateRole(false);
        alert("Rôle de l'utilisateur mis à jour avec succès !");
      } else {
        alert(
          "Erreur lors de la mise à jour du rôle l'utilisateur.\nVeuillez réessayer !"
        );
      }
    } catch (error) {
      console.error("Erreur lors de la mise à jour du Rôle :", error);
      alert("Erreur lors de la mise à jour du Rôle.");
    }
  };

  const handleGeneratePassword = () => {
    const password = generateStrongPassword();
    setNewPassWordGenerated(password);
  };

  const submitNewUserPassWord = async () => {
    try {
      const data: Partial<IUpdateUser> = {
        passWord: newPassWordGenerated,
      };

      const response = await updateUser(access_token, data, user.id);

      if (response) {
        setUpdatePassWord(false);
        alert(
          `Mode de passe de l'utilisateur mis à jour avec succès !\nNoueau mot de passe = ${data.passWord}`
        );
      } else {
        alert(
          "Erreur lors de la mise à jour du mot de passe de l'utilisateur.\nVeuillez réessayer !"
        );
      }
    } catch (error) {
      console.error("Erreur lors de la mise à jour du mot de passe :", error);
      alert("Erreur lors de la mise à jour du mot de passe.");
    }
  };

  useEffect(() => {
    const s = Math.random() > 0.5 ? "Active" : "Inactive";
    setStatus(s);
  }, []);

  return (
    <tr>
      <td className="px-6 py-4 whitespace-nowrap">
        <div className="flex items-center">
          <div className="flex-shrink-0 h-10 w-10">
            {/* <img
            className="h-10 w-10 rounded-full"
            src={user.image}
            alt={user.name}
          /> */}
            <UserCircle2Icon className="h-10 w-10" />
          </div>
          <div className="ml-4">
            <div className="font-medium text-gray-900">
              {user.firstName} {user.lastName}
            </div>
            <div className=" text-gray-500">{user.userName}</div>
          </div>
        </div>
      </td>
      <td className="px-6 py-4 whitespace-nowrap">
        <div className=" text-gray-900">{"Docteur"}</div>
        <div className=" text-gray-500">{"Bio-diversité"}</div>
      </td>
      <td className="px-6 py-4 whitespace-nowrap">
        <span
          className={`px-4 py-2 inline-flex leading-5 font-semibold rounded-full ${
            status === "Active"
              ? "bg-green-100 text-primary"
              : "bg-red-100 text-red-600"
          }`}
        >
          {status}
        </span>
      </td>
      <td className="px-6 py-4 whitespace-nowrap  text-gray-500">
        {user.role}
      </td>
      <td className="px-6 py-4 whitespace-nowrap  text-gray-500">
        {user.phoneNumber}
      </td>
      <td className="px-6 py-4 whitespace-nowrap  font-medium">
        <AlertDialog>
          <AlertDialogTrigger
            className="flex justify-center bg-primary px-4 py-2 rounded-lg text-white text-xl cursor-pointer"
            asChild
          >
            <div>
              <PencilLine /> Editer
            </div>
          </AlertDialogTrigger>
          <AlertDialogContent>
            <AlertDialogHeader>
              <AlertDialogTitle>Détails de l'utilisateur</AlertDialogTitle>
              <AlertDialogDescription>
                Consulter et modifier les information de l'utilisateur
              </AlertDialogDescription>
            </AlertDialogHeader>
            <Tabs defaultValue="Profil" className="w-full">
              <TabsList className="grid w-full grid-cols-2">
                <TabsTrigger value="Profil">Profil</TabsTrigger>
                <TabsTrigger value="Permissions">Permissions</TabsTrigger>
              </TabsList>

              <TabsContent value="Profil">
                <ul className="flex flex-col gap-2">
                  <li className="bg-gray-200 p-2 rounded-lg">
                    <div className="grid grid-cols-3">
                      <div className="col-span-1 py-2 px-4 bg-gray-400 rounded-lg">
                        Nom :
                      </div>
                      <div className="py-2 px-4 col-span-2">
                        {user.lastName}
                      </div>
                    </div>
                  </li>
                  <li className="bg-gray-200 p-2 rounded-lg">
                    <div className="grid grid-cols-3">
                      <div className="col-span-1 py-2 px-4 bg-gray-400 rounded-lg">
                        Prénom :
                      </div>
                      <div className="py-2 px-4 col-span-2">
                        {user.firstName}
                      </div>
                    </div>
                  </li>
                  <li className="bg-gray-200 p-2 rounded-lg">
                    <div className="grid grid-cols-3">
                      <div className="col-span-1 py-2 px-4 bg-gray-400 rounded-lg">
                        Ttire :
                      </div>
                      <div className="py-2 px-4 col-span-2">
                        Docteur Bio-Diversité
                      </div>
                    </div>
                  </li>
                  <li className="bg-gray-200 p-2 rounded-lg">
                    <div className="grid grid-cols-3">
                      <div className="col-span-1 py-2 px-4 bg-gray-400 rounded-lg">
                        Email :
                      </div>
                      <div className="py-2 px-4 col-span-2">test@gmail.com</div>
                    </div>
                  </li>
                  <li className="bg-gray-200 p-2 rounded-lg">
                    <div className="grid grid-cols-3">
                      <div className="col-span-1 py-2 px-4 bg-gray-400 rounded-lg">
                        Téléphone :
                      </div>
                      <div className="py-2 px-4 col-span-2">
                        {user.phoneNumber}
                      </div>
                    </div>
                  </li>
                </ul>
              </TabsContent>

              <TabsContent value="Permissions">
                <Accordion type="single" collapsible className="w-full">
                  <AccordionItem value="item-1">
                    <AccordionTrigger>Informations</AccordionTrigger>
                    <AccordionContent>
                      <div className="my-3">
                        {!updateInfos && <p>Nom: {user.firstName}</p>}
                        {updateInfos && (
                          <>
                            <Label htmlFor="nom" className="text-lg">
                              Nom
                            </Label>
                            <Input
                              id="nom"
                              type="text"
                              placeholder="Nom de l'utilisateur"
                              className="text-lg"
                              value={newLastName}
                              onChange={(e) => setNewLastName(e.target.value)}
                            />
                          </>
                        )}
                      </div>
                      <div className="my-3">
                        {!updateInfos && <p>Prénom: {user.lastName}</p>}
                        {updateInfos && (
                          <>
                            <Label htmlFor="prenom" className="text-lg">
                              Prénom
                            </Label>
                            <Input
                              id="prenom"
                              type="text"
                              placeholder="Nom de l'utilisateur"
                              className="text-lg"
                              value={newFirstName}
                              onChange={(e) => setFirstName(e.target.value)}
                            />
                          </>
                        )}
                      </div>
                      <div className="my-3">
                        {!updateInfos && <p>Téléphoné: {user.phoneNumber}</p>}
                        {updateInfos && (
                          <>
                            <Label htmlFor="phone" className="text-lg">
                              Téléphone
                            </Label>
                            <Input
                              id="phone"
                              type="tel"
                              placeholder="Téléphone de l'utilisateur"
                              className="text-lg"
                              value={newPhone}
                              onChange={(e) => setNewPhone(e.target.value)}
                            />
                          </>
                        )}
                      </div>
                      <div>
                        {!updateInfos && (
                          <span
                            onClick={() => setUpdateInfos(true)}
                            className="inline-block bg-primary w-full px-4 py-2 rounded-lg cursor-pointer text-center text-white my-3"
                          >
                            Modifier
                          </span>
                        )}
                        {updateInfos && (
                          <div>
                            <div className="flex justify-center items-center gap-5">
                              <button
                                type="button"
                                className="flex gap-1 justify-center items-center bg-gray-400 w-full p-2 text-white rounded-lg"
                                onClick={() => {
                                  setUpdateInfos(false);
                                  reinitUserInfo();
                                }}
                              >
                                <X />
                                Annuler
                              </button>
                              <button
                                onClick={submitNewUserInfos}
                                className="flex gap-1 justify-center items-center bg-primary w-full p-2 text-white rounded-lg"
                              >
                                <Save />
                                Enregistrer
                              </button>
                            </div>
                          </div>
                        )}
                      </div>
                    </AccordionContent>
                  </AccordionItem>
                  <AccordionItem value="item-2">
                    <AccordionTrigger>Rôle</AccordionTrigger>
                    <AccordionContent>
                      {user.userName} porte le rôle d'un {user.role}. <br />
                      Voulez vous changer son rôle ? <br />
                      {!updateRole && (
                        <span
                          onClick={() => setUpdateRole(true)}
                          className="inline-block bg-primary w-full px-4 py-2 rounded-lg cursor-pointer text-center text-white my-3"
                        >
                          Modifier
                        </span>
                      )}
                      {updateRole && (
                        <Select
                          value={newRoleSelected}
                          onValueChange={(value) =>
                            setNewRoleSelected(value as EUserRole)
                          }
                        >
                          <SelectTrigger className="my-2">
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
                      )}
                      {updateRole && (
                        <div>
                          <div className="flex justify-center items-center gap-5">
                            <button
                              type="button"
                              className="flex gap-1 justify-center items-center bg-gray-400 w-full p-2 text-white rounded-lg"
                              onClick={() => setUpdateRole(false)}
                            >
                              <X />
                              Annuler
                            </button>
                            <button
                              onClick={submitNewUserRole}
                              className="flex gap-1 justify-center items-center bg-primary w-full p-2 text-white rounded-lg"
                            >
                              <Save />
                              Enregistrer
                            </button>
                          </div>
                        </div>
                      )}
                    </AccordionContent>
                  </AccordionItem>
                  <AccordionItem value="item-3">
                    <AccordionTrigger>Mot de passe</AccordionTrigger>
                    <AccordionContent>
                      Voulez vous reinitiliser le pass de Wouri Chouf?
                      {!updatePassWord && (
                        <span
                          onClick={() => setUpdatePassWord(true)}
                          className="inline-block bg-primary w-full px-4 py-2 rounded-lg cursor-pointer text-center text-white my-3"
                        >
                          Reinitiliser
                        </span>
                      )}
                      {updatePassWord && (
                        <div className="flex items-center gap-3 my-2">
                          <Input
                            id="password"
                            type="text"
                            value={newPassWordGenerated}
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
                      )}
                      {updatePassWord && (
                        <div>
                          <div className="flex justify-center items-center gap-5">
                            <button
                              type="button"
                              className="flex gap-1 justify-center items-center bg-gray-400 w-full p-2 text-white rounded-lg"
                              onClick={() => setUpdatePassWord(false)}
                            >
                              <X />
                              Annuler
                            </button>
                            <button
                              onClick={submitNewUserPassWord}
                              className="flex gap-1 justify-center items-center bg-primary w-full p-2 text-white rounded-lg"
                            >
                              <Save />
                              Enregistrer
                            </button>
                          </div>
                        </div>
                      )}
                    </AccordionContent>
                  </AccordionItem>
                  <AccordionItem value="item-4">
                    <AccordionTrigger>Compte</AccordionTrigger>
                    <AccordionContent>
                      <p>
                        Ce compte est actif. <br />
                        Voulez vous le Supprimer ?
                      </p>
                      <DeleteUser user={user} setDeleteUser={setDeleteUser} />
                    </AccordionContent>
                  </AccordionItem>
                </Accordion>
              </TabsContent>
            </Tabs>
            <AlertDialogFooter>
              {/* <AlertDialogCancel>Fermer</AlertDialogCancel> */}
              <AlertDialogAction>Fermer</AlertDialogAction>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialog>
      </td>
    </tr>
  );
};

const Page = () => {
  const [users, setUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [newUser, setNewUser] = useState<boolean>(false);
  const [deleteUser, setDeleteUser] = useState<boolean>(false);
  const [onUpdateUser, setOnUpdateUser] = useState<boolean>(false);
  const [onUpdateUserRole, setOnUpdateUserRole] = useState<boolean>(false);

  const { access_token } = useSelector((state: RootState) => state.auth);
  const router = useRouter();

  const getUsers = async () => {
    try {
      const response = await getAllUsers(access_token);
      setUsers(response);
    } catch (err) {
      console.error("An error occurred while fetching user data", err);
      setError(
        "Une erreur est survenue lors de la récupération des données de l'utilisateur."
      );
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getUsers();
    setNewUser(false);
    setDeleteUser(false);
    setOnUpdateUserRole(false);
  }, [newUser, deleteUser, onUpdateUser, onUpdateUserRole]);

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <Spinner />
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex flex-col h-full justify-center items-center">
        <TriangleAlert size={40} />
        <p className="text-lg font-semibold my-4">{error}</p>
        <button
          className="bg-primary text-white px-4 py-2 rounded"
          onClick={() => router.refresh()}
        >
          Réessayer
        </button>
      </div>
    );
  }

  return (
    <div className="overflow-x-auto">
      <div className="flex justify-between">
        <div>
          <h1 className="font-bold text-2xl p-5">Liste des utilisateurs</h1>
        </div>
        <div className="flex items-center gap-5 mr-10">
          <h2 className="block">Ajouter un utilisateur</h2>
          <AddUser setNewUser={setNewUser} />
        </div>
      </div>
      <table className="min-w-full divide-y divide-gray-200">
        <thead className="bg-gray-50">
          <tr>
            {[
              "Nom & Prenom",
              "Titre",
              "Statut",
              "R$ole",
              "Mail | Téléphone",
              "Actions",
            ].map((header) => (
              <th
                key={header}
                scope="col"
                className={`px-6 py-3 ${
                  header === "Actions" ? "text-center" : "text-left"
                } text-xs font-medium text-gray-500 uppercase tracking-wider`}
              >
                {header}
              </th>
            ))}
          </tr>
        </thead>
        <tbody className="bg-white divide-y divide-gray-200">
          {users && users.length > 0 ? (
            users.map((user) => (
              <TableRow
                key={user.id}
                user={user}
                setDeleteUser={setDeleteUser}
                setOnUpdateUser={setOnUpdateUser}
                setOnUpdateUserRole={setOnUpdateUserRole}
              />
            ))
          ) : (
            <p>Aucun utilisateur à afficher </p>
          )}
        </tbody>
      </table>
    </div>
  );
};

export default Page;
