"use client";

import React, { useEffect, useState } from "react";
import { PencilLine, TriangleAlert, UserCircle2Icon } from "lucide-react";
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
import { User } from "@/types/user";
import { useSelector } from "react-redux";
import { RootState } from "@/store/store";
import { getAllUsers } from "@/lib/auth/allUser";
import Spinner from "@/components/Spinner";
import { useRouter } from "next/navigation";
import AddUser from "@/components/users/AddUser";

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

const TableRow = ({ user }: { user: User }) => {
  const [status, setStatus] = useState<string>("");
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
                      <div className="py-2 px-4 col-span-2">{user.lastName}</div>
                    </div>
                  </li>
                  <li className="bg-gray-200 p-2 rounded-lg">
                    <div className="grid grid-cols-3">
                      <div className="col-span-1 py-2 px-4 bg-gray-400 rounded-lg">
                        Prénom :
                      </div>
                      <div className="py-2 px-4 col-span-2">{user.firstName}</div>
                    </div>
                  </li>
                  <li className="bg-gray-200 p-2 rounded-lg">
                    <div className="grid grid-cols-3">
                      <div className="col-span-1 py-2 px-4 bg-gray-400 rounded-lg">
                        Ttire :
                      </div>
                      <div className="py-2 px-4 col-span-2">Docteur Bio-Diversité</div>
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
                      <div className="py-2 px-4 col-span-2">{user.phoneNumber}</div>
                    </div>
                  </li>
                </ul>
              </TabsContent>

              <TabsContent value="Permissions">
                <Accordion type="single" collapsible className="w-full">
                  <AccordionItem value="item-1">
                    <AccordionTrigger>Rôle</AccordionTrigger>
                    <AccordionContent>
                      Wouri Chouf porte le rôle d'un Dev. <br />
                      Voulez vous changer son rôle ? <br />
                      <span className="inline-block bg-primary w-full px-4 py-2 rounded-lg cursor-pointer text-center text-white my-3">
                        Modifier
                      </span>
                    </AccordionContent>
                  </AccordionItem>
                  <AccordionItem value="item-2">
                    <AccordionTrigger>Mot de passe</AccordionTrigger>
                    <AccordionContent>
                      Voulez vous reinitiliser le pass de Wouri Chouf?
                    </AccordionContent>
                  </AccordionItem>
                  <AccordionItem value="item-3">
                    <AccordionTrigger>Compte</AccordionTrigger>
                    <AccordionContent>
                      Ce compte est actif. <br />
                      Voulez vous le désactivé ? <br />
                      <span className="inline-block bg-primary w-full px-4 py-2 rounded-lg cursor-pointer text-center text-white my-3">
                        Modifier
                      </span>
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
  }, [newUser]);

  console.log(users);

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
                className={`px-6 py-3 ${header === "Actions" ? "text-center" : "text-left"} text-xs font-medium text-gray-500 uppercase tracking-wider`}
              >
                {header}
              </th>
            ))}
          </tr>
        </thead>
        <tbody className="bg-white divide-y divide-gray-200">
          {users && users.length > 0 ? (
            users.map((user) => <TableRow key={user.id} user={user} />)
          ) : (
            <p>Aucun utilisateur à afficher </p>
          )}
        </tbody>
      </table>
    </div>
  );
};

export default Page;
