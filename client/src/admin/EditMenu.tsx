import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Loader2 } from "lucide-react";
import { Dispatch, SetStateAction, FormEvent, useEffect } from "react";
import { useState } from "react";

type EditMenuProps = {
  editOpen: boolean;
  setEditopen: Dispatch<SetStateAction<boolean>>;
  selectedMenu: any; // Change `any` to the proper type of your menu item
};
const EditMenu = ({ editOpen, setEditopen, selectedMenu }: EditMenuProps) => {
  const [input, setInput] = useState<any>({
    name: "",
    description: "",
    price: 0,
    image: undefined,
  });
  const submitHandler = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
  };

  const changeEventHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setInput((prevInput: any) => ({
      ...prevInput,
      [name]: name === "price" ? parseFloat(value) : value,
    }));
  };
  useEffect(() => {
    setInput({
      name: selectedMenu.name,
      description: selectedMenu.description,
      price: selectedMenu.price,
      image: undefined,
    });
  }, []);
  const loading = false;
  return (
    <Dialog open={editOpen} onOpenChange={setEditopen}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Edit Menu</DialogTitle>
          <DialogDescription>
            Update Your Menu here! Keep your offering fresh and exciting.
          </DialogDescription>
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
              <Button disabled className="bg-orange-400 hover:bg-orange-500">
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
  );
};

export default EditMenu;
