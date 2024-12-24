import {
  Menubar,
  MenubarContent,
  MenubarItem,
  MenubarMenu,
  MenubarTrigger,
} from "@/components/ui/menubar";
import { getCurrentUser } from "@/lib/auth/getCurrentUser";
import { logout } from "@/store/reducers/auth/authSlice";
import { RootState } from "@/store/store";
import { User } from "@/types/user";
import { CircleUserRound, Settings, LogOut } from "lucide-react";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

const UserMenu = () => {
  const [user, setUser] = useState<User>();
  const [error, setError] = useState<string | null>(null);
  const { access_token } = useSelector((state: RootState) => state.auth);
  const dispatch = useDispatch();
  const router = useRouter();

  const getUser = async () => {
    try {
      const response = await getCurrentUser(access_token);
      setUser(response);
    } catch (err) {
      console.error("An error occurred while fetching user data", err);
      setError("Une erreur est survenue lors de la récupération des données de l'utilisateur.");
    }
  };

  useEffect(() => {
    getUser();
  }, []);

  const handleLogout = () => {
    dispatch(logout());
    router.push("/login");
  };

  return (
    <Menubar className="border-0 w-full mt-5" asChild>
      <MenubarMenu>
        <MenubarTrigger className="cursor-pointer flex gap-3 items-center w-full rounded-lg p-2 border-primary" style={{border: "1px solid"}}>
          <CircleUserRound /> <span className="text-lg">{user?.userName}</span>
        </MenubarTrigger>
        <MenubarContent className="mr-5 min-w-64">
          <MenubarItem className="cursor-pointer flex flex-col items-center">
            <CircleUserRound size={60} />
            <div>
              <h2 className="text-xl font-bold ">
                {user?.firstName} {user?.lastName}
              </h2>
            </div>
          </MenubarItem>
          <MenubarItem className="cursor-pointer">
            <Settings />{" "}
            <span className="font-bold ml-2 text-lg">Paramètres</span>
          </MenubarItem>
          <MenubarItem className="cursor-pointer" onClick={handleLogout}>
            <LogOut />{" "}
            <span className="font-bold ml-2 text-lg">Déconnexion</span>
          </MenubarItem>
        </MenubarContent>
      </MenubarMenu>
    </Menubar>
  );
};

export default UserMenu;
