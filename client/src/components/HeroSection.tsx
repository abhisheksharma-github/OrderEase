import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Input } from "./ui/input";
import HeroImage from "@/assets/Indian Food.png";
import { Search } from "lucide-react";
import { Button } from "./ui/button";

const HeroSection = () => {
  const [searchText, setSearchText] = useState<string>("");
  const navigate = useNavigate();

  return (
    <div className="flex flex-col md:flex-row max-w-7xl mx-auto md:p-10 rounded-lg justify-center m-4 gap-20">
      <div className="md:w-[60%] flex items-center gap-8">
        <div className="flex flex-col gap-8">
          <div className="flex flex-col gap-5">
            <h1 className="font-bold md:font-extrabold md:text-4xl text-4xl">
              Satisfy your cravings, wherever you are, Order Food Now!
            </h1>
            <p className="text-gray-500">
              From local flavors to global cuisines, we bring it to you, Dine
              without the line order from the comfort of home.
            </p>
          </div>
          <div className="relative flex items-center gap-2">
            <div>
              <Input
                type="text"
                placeholder="Search restaurant by name,city"
                value={searchText}
                onChange={(e) => setSearchText(e.target.value)}
                className="pl-10 shadow-xl"
              />
              <Search className="text-gray-500 absolute inset-y-2 left-2" />
            </div>
            <Button
              onClick={() => navigate(`/search/${searchText}`)}
              className="bg-orange-400 hover:bg-orange-500"
            >
              Search
            </Button>
          </div>
        </div>
      </div>
      <div className="object-cover w-full max-h-[500px]">
        <img src={HeroImage} alt="Hero" />
      </div>
    </div>
  );
};

export default HeroSection;
