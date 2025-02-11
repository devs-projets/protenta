import React, { SetStateAction } from "react";
import SerresList from "./SerresList";
import AddSerre from "./AddSerre";
import { ISerre } from "@/types/serre";
import { User } from "@/types/user";
import { EUserRole } from "@/types/userRole";

export interface ISerreListComponentProps {
  serres: ISerre[];
  user: User;
  setNewSerreAdded?: React.Dispatch<SetStateAction<boolean>>;
}

const SerreListComponent = ({
  serres,
  user,
  setNewSerreAdded,
}: ISerreListComponentProps) => {
  return (
    <div>
      <div className="flex justify-between items-center px-5 mt-5">
        <div>
          <h1 className="text-3xl font-bold">Liste des serres</h1>
        </div>
        {user.role === EUserRole.DEV && (
          <AddSerre setNewSerreAdded={setNewSerreAdded} />
        )}
      </div>

      <div className="my-2">
        <hr />
      </div>

      <SerresList serres={serres} />
    </div>
  );
};

export default SerreListComponent;
