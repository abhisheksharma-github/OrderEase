import {
  Menubar,
  MenubarContent,
  MenubarTrigger,
  MenubarMenu,
  MenubarItem,
} from "./ui/menubar";
import { Link } from "react-router-dom";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "./ui/dropdown-menu";
import { FaSun as Sun, FaMoon as Moon } from "react-icons/fa";
import { Button } from "./ui/button";
import {
  HandPlatter,
  Loader2,
  Menu,
  PackageIcon,
  ShoppingCart,
  ShoppingCartIcon,
  SquareMenu,
  User,
  Utensils,
} from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetDescription,
  SheetFooter,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "./ui/sheet";
import { Separator } from "./ui/separator";

const Navbar = () => {
  const admin = true;
  const loading = false;
  const setTheme = (theme: string) => {
    if (theme === "light") {
      document.documentElement.classList.remove("dark");
      localStorage.setItem("theme", "light");
    } else if (theme === "dark") {
      document.documentElement.classList.add("dark");
      localStorage.setItem("theme", "dark");
    } else {
      document.documentElement.classList.remove("dark");
      localStorage.removeItem("theme");
    }
  };

  return (
    <div className=" mx-auto w-full ">
      <Link to="/">
        <h1 className=" text-black dark:text-white font-bold md:font-extrabold absolute top-0 left-0 m-4 text-2xl">
          OrderEase
        </h1>
      </Link>
      <div className="hidden md:flex items-center gap-5 absolute top-0 right-0 mt-4 mr-4">
        <Link
          to="/"
          className="text-black dark:text-white hover:text-orange-500"
        >
          Home
        </Link>
        <Link
          to="/profile"
          className="text-black dark:text-white hover:text-orange-500"
        >
          Profile
        </Link>
        <Link
          to="/order/status"
          className="text-black dark:text-white hover:text-orange-500"
        >
          Order
        </Link>
        {admin && (
          <Menubar>
            <MenubarMenu>
              <MenubarTrigger className="text-black dark:text-white hover:text-orange-500">
                Dashboard
              </MenubarTrigger>
              <MenubarContent>
                <MenubarItem>
                  <Link
                    to="/admin/restaurant"
                    className="text-black dark:text-white hover:text-orange-500 block mb-2"
                  >
                    Restaurant
                  </Link>
                </MenubarItem>
                <MenubarItem>
                  <Link
                    to="/admin/menu"
                    className="text-black dark:text-white hover:text-orange-500 block mb-2"
                  >
                    Menu
                  </Link>
                </MenubarItem>
                <MenubarItem>
                  <Link
                    to="/admin/order"
                    className="text-black dark:text-white hover:text-orange-500 block mb-2"
                  >
                    Orders
                  </Link>
                </MenubarItem>
                <MenubarItem>
                  <Link
                    to="/admin/Table"
                    className="text-black dark:text-white hover:text-orange-500 block mb-2"
                  >
                    TableNumber
                  </Link>
                </MenubarItem>
              </MenubarContent>
            </MenubarMenu>
          </Menubar>
        )}
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="outline" size="icon">
              <Sun className="h-[1.2rem] w-[1.2rem] rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" />
              <Moon className="absolute h-[1.2rem] w-[1.2rem] rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" />
              <span className="sr-only">Toggle theme</span>
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuItem onClick={() => setTheme("light")}>
              Light
            </DropdownMenuItem>
            <DropdownMenuItem onClick={() => setTheme("dark")}>
              Dark
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
        <Link to="/cart" className="cursor-pointer relative">
          <ShoppingCart className="text-black dark:text-white" />
          <span className="absolute -top-3 -right-0 bg-red-400 hover:bg-red-500 text-white rounded-full text-xs w-4 h-4 flex items-center justify-center">
            5
          </span>
        </Link>
        <div>
          <Avatar>
            <AvatarImage src="https://cdn-icons-png.flaticon.com/128/1144/1144709.png" />
            <AvatarFallback>Profile</AvatarFallback>
          </Avatar>
        </div>
        <div>
          {loading ? (
            <Button
              className=" bg-orange-500 hover:bg-orange-600 rounded-full "
              variant="outline"
              onClick={() => console.log("Logout")}
            >
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              Please Wait
            </Button>
          ) : (
            <Button
              className=" bg-orange-400 hover:bg-orange-500 rounded-full "
              variant="outline"
              onClick={() => console.log("Logout")}
            >
              Logout
            </Button>
          )}
        </div>
      </div>
      <div className="md:hidden">
        {/* Mobile responsive */}
        <MobileNavbar setTheme={setTheme} />
      </div>
    </div>
  );
};

export default Navbar;

interface MobileNavbarProps {
  setTheme: (theme: string) => void;
}

const MobileNavbar = ({ setTheme }: MobileNavbarProps) => {
  return (
    <Sheet>
      {/* baad mein fixed karuga isko */}
      <SheetTrigger asChild className="absolute top-2 right-2">
        <Button
          size={"icon"}
          className=" bg-gray-200 text-black hover:bg-gray-400"
          variant="outline"
        >
          <Menu size={"18"} />
        </Button>
      </SheetTrigger>
      <SheetContent>
        <SheetHeader>
          <SheetTitle className="text-center w-full">OrderEase</SheetTitle>
          <DropdownMenu>
            <DropdownMenuTrigger asChild className="absolute top-2 left-2">
              <Button variant="outline" size="icon">
                <Sun className="h-[1.2rem] w-[1.2rem] rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" />
                <Moon className="absolute h-[1.2rem] w-[1.2rem] rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" />
                <span className="sr-only">Toggle theme</span>
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuItem onClick={() => setTheme("light")}>
                Light
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => setTheme("dark")}>
                Dark
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </SheetHeader>
        <Separator className="my-2" />
        <SheetDescription className="flex-1">
          <Link
            to="/profile"
            className="flex items-center gap-4 hover:bg-gray-200 px-3 py-2 rounded-lg cursor-pointer hover:text-gray-700  text-gray-500 font-medium"
          >
            <User />
            <span>Profile</span>
          </Link>
          <Link
            to="/Order"
            className="flex items-center gap-4 hover:bg-gray-200 px-3 py-2 rounded-lg cursor-pointer hover:text-gray-700  text-gray-500 font-medium"
          >
            <HandPlatter />
            <span>Order</span>
          </Link>
          <Link
            to="/Cart"
            className="flex items-center gap-4 hover:bg-gray-200 px-3 py-2 rounded-lg cursor-pointer hover:text-gray-700 text-gray-500 font-medium"
          >
            <ShoppingCartIcon />
            <span>Cart (0)</span>
          </Link>
          <Link
            to="/Menu"
            className="flex items-center gap-4 hover:bg-gray-200 px-3 py-2 rounded-lg cursor-pointer hover:text-gray-700  text-gray-500 font-medium"
          >
            <SquareMenu />
            <span>Menu</span>
          </Link>
          <Link
            to="/Restaurant"
            className="flex items-center gap-4 hover:bg-gray-200 px-3 py-2 rounded-lg cursor-pointer hover:text-gray-700  text-gray-500  font-medium"
          >
            <Utensils />
            <span> Restaurant </span>
          </Link>
          <Link
            to="/Restaurant Order"
            className="flex items-center gap-4 hover:bg-gray-200 px-3 py-2 rounded-lg cursor-pointer hover:text-gray-700  text-gray-500 font-medium"
          >
            <PackageIcon />
            <span> Restaurant Order</span>
          </Link>
        </SheetDescription>
        <SheetFooter className="flex flex-col gap-3">
          <>
            <div className="flex flex-row items-center gap-2">
              <Avatar>
                <AvatarImage
                  src="https://cdn-icons-png.flaticon.com/128/1144/1144709.png"
                  className="h-7 w-7 mt-2"
                />
                <AvatarFallback>Profile</AvatarFallback>
              </Avatar>
              <h1 className="font-bold text-sm">
                OrderEase:Smart Restaurant Ordering System
              </h1>
            </div>
          </>
          <SheetClose asChild>
            <Button
              type="submit"
              className=" bg-orange-500 hover:bg-orange-400"
            >
              Logout
            </Button>
          </SheetClose>
        </SheetFooter>
      </SheetContent>
    </Sheet>
  );
};
