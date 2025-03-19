// Removed unused import for Button
// Removed unused imports
// Removed unused import for Input
// Removed unused import for Label

import React, { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogTitle,
  DialogDescription,
} from "@radix-ui/react-dialog"; // Replace with the correct library or file path if different
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Loader2 } from "lucide-react";

const EditMenu = () => {
  const [editOpen, setEditOpen] = useState(false); // Added state for editOpen
  const [input, setInput] = useState({
    name: "",
    description: "",
    price: "",
    image: undefined as File | undefined,
  });

  const [loading, setLoading] = useState(false);

  const [error] = useState<{
    name?: string;
    description?: string;
    price?: string;
    image?: File;
  }>({});

  const changeEventHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setInput((prevInput) => ({ ...prevInput, [name]: value }));
  };

  const submitHandler = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setLoading(true);

    try {
      // Validate input fields
      if (!input.name || !input.description || !input.price || !input.image) {
        alert("All fields are required.");
        setLoading(false);
        return;
      }

      // Create form data for file upload
      const formData = new FormData();
      formData.append("name", input.name);
      formData.append("description", input.description);
      formData.append("price", input.price);
      formData.append("image", input.image);

      // Simulate API call
      const response = await fetch("/api/menu", {
        method: "POST",
        body: formData,
      });

      if (!response.ok) {
        throw new Error("Failed to update menu.");
      }

      alert("Menu updated successfully!");
      setInput({
        name: "",
        description: "",
        price: "",
        image: undefined,
      });
    } catch (error) {
      console.error(error);
      alert("An error occurred while updating the menu.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Dialog open={editOpen} onOpenChange={setEditOpen}>
      <DialogContent>
        <div className="dialog-header">
          <DialogTitle>Edit Menu</DialogTitle>
          <DialogDescription>
            Update your menu to keep your offerings fresh and exciting!
          </DialogDescription>
        </div>
        <form onSubmit={submitHandler} className="space-y-4">
          <div>
            <Label>Name</Label>
            <Input
              type="text"
              name="name"
              value={input.name}
              onChange={changeEventHandler}
              placeholder="Enter menu name"
            />
            {error && (
              <span className="text-xs font-medium text-red-600">
                {error.name}
              </span>
            )}
          </div>
          <div>
            <Label>Description</Label>
            <Input
              type="text"
              name="description"
              value={input.description}
              onChange={changeEventHandler}
              placeholder="Enter menu description"
            />
            {error && (
              <span className="text-xs font-medium text-red-600">
                {error.description}
              </span>
            )}
          </div>
          <div>
            <Label>Price in (Rupees)</Label>
            <Input
              type="number"
              name="price"
              value={input.price}
              onChange={changeEventHandler}
              placeholder="Enter menu price"
            />
            {error && (
              <span className="text-xs font-medium text-red-600">
                {error.price}
              </span>
            )}
          </div>
          <div>
            <Label>Upload Menu Image</Label>
            <Input
              type="file"
              name="image"
              onChange={(e) =>
                setInput({ ...input, image: e.target.files?.[0] || undefined })
              }
            />
            {error && (
              <span className="text-xs font-medium text-red-600">
                {error.image?.name}
              </span>
            )}
          </div>
          <div className="dialog-footer mt-5">
            {loading ? (
              <Button disabled className="bg-orange hover:bg-hoverOrange">
                <Loader2 className="mr-2 w-4 h-4 animate-spin" />
                Please wait
              </Button>
            ) : (
              <Button className="bg-orange hover:bg-hoverOrange">Submit</Button>
            )}
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default EditMenu;
