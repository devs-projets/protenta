import {
  Menubar,
  MenubarContent,
  MenubarItem,
  MenubarMenu,
  MenubarTrigger,
} from "@/components/ui/menubar";
import { useAuth } from "@/context/AuthProvider";
import { logout } from "@/store/reducers/auth/authSlice";
import { RootState } from "@/store/store";
import { CircleUserRound, Settings, LogOut } from "lucide-react";
import { useRouter } from "next/navigation";
import { useDispatch, useSelector } from "react-redux";

const UserMenu = () => {
  const { user } = useAuth();
  const dispatch = useDispatch();
  const router = useRouter();

  const handleLogout = () => {
    dispatch(logout());
    router.push("/auth");
  };

  return (
    <Menubar className="border-0 w-full mt-5" asChild>
      <MenubarMenu>
        <MenubarTrigger
          className="cursor-pointer flex gap-3 items-center w-full rounded-lg p-2 border-primary"
          style={{ border: "1px solid" }}
        >
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
