import { useState } from "react";
import { Minus, Plus } from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";
import { Button } from "./ui/button";
import {
  Table,
  TableBody,
  TableCell,
  TableFooter,
  TableHead,
  TableHeader,
  TableRow,
} from "./ui/table";
import CheckoutConfirmPage from "./CheckoutConfirmPage";

const Cart = () => {
  const [open, setOpen] = useState<boolean>(false);

  return (
    <div className="mx-auto my-12 px-4 sm:px-6 lg:px-8 max-w-full">
      <div className="flex justify-end mb-4">
        <Button variant="link">Clear All</Button>
      </div>
      <div className="overflow-x-auto w-full">
        <Table className="min-w-full table-auto">
          <TableHeader>
            <TableRow>
              <TableHead className="text-center">Item</TableHead>
              <TableHead className="text-center">Title</TableHead>
              <TableHead className="text-center">Price</TableHead>
              <TableHead className="text-center">Quantity</TableHead>
              <TableHead className="text-center">Table No</TableHead>
              <TableHead className="text-center">Total</TableHead>
              <TableHead className="text-center">Remove</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            <TableRow>
              <TableCell className="text-center">
                <Avatar>
                  <AvatarImage src="" />
                  <AvatarFallback>CN</AvatarFallback>
                </Avatar>
              </TableCell>
              <TableCell className="text-center">
                Butter Chicken Curry
              </TableCell>
              <TableCell className="text-center">280</TableCell>
              <TableCell className="text-center">
                <div className="w-fit flex items-center justify-center rounded-full border border-gray-100 dark:border-gray-800 shadow-md">
                  <Button
                    size={"icon"}
                    variant={"outline"}
                    className="rounded-full bg-gray-100 bg-orange-0 hover:bg-orange-400"
                  >
                    <Minus />
                  </Button>
                  <Button
                    size={"icon"}
                    className="font-extrabold"
                    disabled
                    variant={"outline"}
                  >
                    1
                  </Button>
                  <Button
                    size={"icon"}
                    className="rounded-full bg-orange-0 hover:bg-orange-400"
                    variant={"outline"}
                    onClick={() => console.log("Increment quantity")}
                  >
                    <Plus />
                  </Button>
                </div>
              </TableCell>
              <TableCell className="text-center">1</TableCell>
              <TableCell className="text-center">280</TableCell>
              <TableCell className="text-center">
                <Button
                  size={"sm"}
                  className="rounded-full text-gray-700 bg-orange-300 hover:bg-orange-500"
                >
                  Remove
                </Button>
              </TableCell>
            </TableRow>
          </TableBody>
          <TableFooter>
            <TableRow className="text-2xl font-bold">
              <TableCell colSpan={6} className="text-right">
                Total:
              </TableCell>
              <TableCell className="text-right">280</TableCell>
            </TableRow>
          </TableFooter>
        </Table>
      </div>
      <div className="flex justify-end mt-4">
        <Button
          onClick={() => setOpen(true)}
          className="rounded-full text-gray-700 bg-orange-300 hover:bg-orange-500"
        >
          Proceed To Checkout
        </Button>
      </div>

      <CheckoutConfirmPage open={open} setOpen={setOpen} />
    </div>
  );
};

export default Cart;
