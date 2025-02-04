"use client"

import SerreListComponent from "@/components/serre/SerreListComponent";
import { useAuth } from "@/context/AuthProvider";
import { getAllSerres } from "@/lib/serre/getAllSerres";
import { ISerre } from "@/types/serre";
import React, { useEffect, useState } from "react";

const DevDashboard = () => {
  const [serres, setSerres] = useState<ISerre[]>([]);
  const [newSerreAdded, setNewSerreAdded] = useState<boolean>(false);
  const { user, access_token } = useAuth();
  const fetchSerresList = async () => {
    try {
      const data = await getAllSerres(access_token as string);
      if (data) {
        setSerres(data);
      }
    } catch (err) {
      console.error("Erreur lors du chargement des serres !");
    }
  };

  useEffect(() => {
    if (access_token) fetchSerresList();
    setNewSerreAdded(false);
  }, [access_token, newSerreAdded]);

  if (!user) return null;

  return <SerreListComponent serres={serres} user={user} setNewSerreAdded={setNewSerreAdded} />;
};

export default DevDashboard;
