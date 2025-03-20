// 6:40 min se start karna ha firse
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Loader2, Plus } from "lucide-react";
import { FormEvent, useState } from "react";
import EditMenu from "./EditMenu";

const AddMenu = () => {
  const [open, setOpen] = useState<boolean>(false);
  const [selectedMenu, setSelectedMenu] = useState<any>(null);
  const [editOpen, setEditopen] = useState<boolean>(false);
  const loading = false;

  const menuItems = [
    {
      id: 1,
      name: "Butter Paneer Masala",
      description:
        "Lorem ipsum dolor, sit amet consectetur adipisicing elit. Excepturi laudantium illo hic in at. Sed!",
      price: 280,
      image:
        "https://c4.wallpaperflare.com/wallpaper/924/189/172/cuisine-food-india-indian-wallpaper-preview.jpg",
    },
    {
      id: 2,
      name: "Butter Paneer Masala",
      description:
        "Lorem ipsum dolor, sit amet consectetur adipisicing elit. Excepturi laudantium illo hic in at. Sed!",
      price: 280,
      image:
        "https://c4.wallpaperflare.com/wallpaper/924/189/172/cuisine-food-india-indian-wallpaper-preview.jpg",
    },
  ];
  const [input, setInput] = useState<any>({
    name: "",
    description: "",
    price: 0,
    image: undefined,
  });
  const changeEventHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, type } = e.target;
    setInput((prevInput: any) => ({
      ...prevInput,
      [name]: type === "number" ? parseFloat(value) : value,
    }));
  };
  const submitHandler = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log(input);
  };
  return (
    <div className="max-w-6xl mx-auto my-12">
      <div className="flex justify-between items-center">
        <h1 className="font-bold md:font-extrabold text-lg md:text-2xl ">
          Available Menu
        </h1>
        <Dialog open={open} onOpenChange={setOpen}>
          <DialogTrigger>
            <Button className="bg-orange-400 hover:bg-orange-500 flex items-center ">
              <Plus className="mr-2" />
              Add Menu Here
            </Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Add a new menu</DialogTitle>
              <DialogDescription>Create your own menu here</DialogDescription>
            </DialogHeader>
            <form onSubmit={submitHandler} className="space-y-4">
              <div>
                <Label>Name</Label>
                <Input
                  type="text"
                  name="name"
                  value={input.name}
                  placeholder="Enter Menu Name"
                  onChange={changeEventHandler}
                />
              </div>
              <div>
                <Label>Description</Label>
                <Input
                  type="text"
                  name="description"
                  placeholder="Enter menu description"
                  value={input.description}
                  onChange={changeEventHandler}
                />
              </div>
              <div>
                <Label>Price in (Rupees)</Label>
                <Input
                  type="number"
                  name="price"
                  value={input.price}
                  placeholder="Enter Menu price"
                  onChange={changeEventHandler}
                />
              </div>
              <div>
                <Label>Upload Menu Image</Label>
                <Input
                  type="file"
                  name="image"
                  onChange={(e) =>
                    setInput((prevInput: any) => ({
                      ...prevInput,
                      image: e.target.files ? e.target.files[0] : undefined,
                    }))
                  }
                />
              </div>
              <DialogFooter className="mt-5">
                {loading ? (
                  <Button
                    disabled
                    className="bg-orange-400 hover:bg-orange-500"
                  >
                    <Loader2 className="mr-2 w-4 h-4 animate-spin" />
                    Please Wait
                  </Button>
                ) : (
                  <Button className="bg-orange-400 hover:bg-orange-500">
                    Submit Here
                  </Button>
                )}
              </DialogFooter>
            </form>
          </DialogContent>
        </Dialog>
      </div>
      <div className="mt-6 space-y-4">
        {menuItems.map((menu) => (
          <div
            key={menu.id}
            className="flex flex-col md:flex-row md:items-center md:space-x-4 md:p-4 shadow-md rounded-lg border"
          >
            <img
              src={menu.image}
              alt={menu.name}
              className="md:h-24 md:w-24 h-16 w-full object-cover rounded-lg"
            />
            <div className="flex-1">
              <h1 className="text-lg font-semibold text-gray-800">
                {menu.name}
              </h1>
              <p className="text-sm text-gray-600 mt-1">{menu.description}</p>
              <h2 className="text-md font-semibold mt-2">
                Price: <span className="text-orange-400"> {menu.price}</span>
              </h2>
            </div>
            <Button
              onClick={() => {
                setSelectedMenu(menuItems);
                setEditopen(true);
              }}
              size={"sm"}
              className="bg-orange-400 hover:bg-orange-500 "
            >
              Edit
            </Button>
          </div>
        ))}
      </div>
      <EditMenu
        editOpen={editOpen}
        selectedMenu={selectedMenu}
        setEditopen={setEditopen}
      />
    </div>
  );
};

export default AddMenu;
