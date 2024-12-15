import {
  Menubar,
  MenubarCheckboxItem,
  MenubarContent,
  MenubarItem,
  MenubarMenu,
  MenubarRadioGroup,
  MenubarRadioItem,
  MenubarSeparator,
  MenubarShortcut,
  MenubarSub,
  MenubarSubContent,
  MenubarSubTrigger,
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

  console.log(user);

  const handleLogout = () => {
    dispatch(logout());
    router.push("/login");
  };

  return (
    <Menubar className="border-0">
      <MenubarMenu>
        <MenubarTrigger className="cursor-pointer">
          <CircleUserRound />
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
            <span className="font-bold ml-2 text-lg">Paramètres</span>
          </MenubarItem>
        </MenubarContent>
      </MenubarMenu>
    </Menubar>
  );
};

export default UserMenu;
