import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Input } from "./ui/input";
import { Search } from "lucide-react";
import { Button } from "./ui/button";

const HeroSection = () => {
  const [searchText, setSearchText] = useState<string>("");
  const navigate = useNavigate();

  return (
    <div className="bg-gray-50 dark:bg-gray-900 text-gray-900 dark:text-gray-100">
      {/* Hero Section */}
      <div
        className="relative flex flex-col md:flex-row max-w-7xl mx-auto md:p-1 rounded-lg justify-center m-12 gap-20 
             min-h-screen bg-cover bg-center shadow-2xl transform hover:scale-105 transition-transform duration-500 bg-opacity-30"
        style={{
          backgroundImage: `url("https://t3.ftcdn.net/jpg/02/97/67/70/360_F_297677001_zX7ZzRq8DObUV5IWTHAIhAae6DuiEQh4.jpg")`,
        }}
      >
        <div className="md:w-[100%] flex items-center bg-gradient-to-r from-orange-50 via-orange-100 to-orange-200 opacity-90 rounded-lg p-8 shadow-lg">
          <div className="flex flex-col gap-8">
            <div className="flex flex-col gap-5">
              <h1 className="font-extrabold md:text-5xl text-4xl text-orange-600 drop-shadow-lg">
                Satisfy your cravings, wherever you are, Order Food Now!
              </h1>
              <p className="text-gray-800 text-lg">
                From local flavors to global cuisines, we bring it to you. Dine
                without the line, order from the comfort of home.
              </p>
            </div>
            <div className="relative flex items-center gap-2">
              <div className="relative w-full">
                <Input
                  type="text"
                  placeholder="Search restaurant by name, city, food, recipe"
                  value={searchText}
                  onChange={(e) => setSearchText(e.target.value)}
                  className="pl-12 shadow-xl rounded-lg border-2 border-orange-300 focus:ring-2 focus:ring-orange-500 text-gray-900 dark:text-gray-100 bg-gray-50 dark:bg-gray-700"
                />
                <Search className="text-gray-500 dark:text-gray-300 absolute inset-y-2 left-3 w-6 h-6" />
              </div>
              <Button
                onClick={() => navigate(`/search/${searchText}`)}
                className="bg-orange-500 hover:bg-orange-600 text-white font-bold px-6 py-3 rounded-lg shadow-lg transform hover:scale-105 transition-transform duration-300"
              >
                Search
              </Button>
            </div>
          </div>
        </div>
      </div>

      {/* Exploring Food Section */}
      <div className="max-w-7xl mx-auto p-8">
        <h2 className="text-3xl font-bold mb-6 text-center text-orange-600">
          Explore Food
        </h2>
        <p className="text-gray-500 mb-8 text-center">
          Discover new cuisines and dishes from around the world.
        </p>
        <div className="flex flex-wrap justify-center gap-8">
          {[
            {
              name: "Spaghetti",
              img: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQrWvJMvrO9EMijsqywntFQZiDRbFTpuxM1Ng&s",
            },
            {
              name: "Sushi",
              img: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ48iaAy81c6BCNL1QOMYUaAzh5O6i5yVlkVw&s",
            },
            {
              name: "Tacos",
              img: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ6mNC2bnUO1ztdeNctFKawdy667jVSWBqLtQ&s",
            },
            {
              name: "Dim Sum",
              img: "https://images.eatsmarter.com/sites/default/files/styles/1600x1200/public/shrimp-dim-sum-590648.jpg",
            },
            {
              name: "Neapolitan Pizza",
              img: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTELpw_wyR5D4wK9dnb9pz5z6RJvXZ3nclAHA&s",
            },

            {
              name: "Salad",
              img: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTOH3qCqlTnieiGTpuqBzY3y_i6oISl5z_wOw&s",
            },
          ].map((item, index) => (
            <div
              key={index}
              className="text-center bg-white dark:bg-gray-800 p-4 rounded-lg shadow-lg transform hover:scale-105 transition-transform duration-300"
            >
              <img
                src={item.img}
                alt={item.name}
                className="w-32 h-32 object-cover rounded-full mb-4 mx-auto"
              />
              <h3 className="font-bold text-lg text-orange-600">{item.name}</h3>
            </div>
          ))}
        </div>
      </div>

      {/* Food Recipes Section */}
      <div className="max-w-7xl mx-auto p-8">
        <h2 className="text-3xl font-bold mb-6 text-center text-orange-600">
          Food Recipes
        </h2>
        <p className="text-gray-500 mb-8 text-center">
          Try out these amazing recipes at home.
        </p>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {[
            {
              name: "Butter Chicken",
              img: "https://media.istockphoto.com/id/618457124/photo/butter-chicken-served-with-homemade-indian-naan-bread.jpg?s=612x612&w=0&k=20&c=7FoiHoDtocfPvQIaRFfFani4e5lkfMTNl_619rTTh4g=",
              desc: "A rich and creamy tomato-based curry with tender chicken pieces.",
            },
            {
              name: "Butter Paneer Masala",
              img: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSej-dPSZmCQr0FqCDqI1OSwvwUxKQuTHTh_Q&s",
              desc: "A vegetarian delight with paneer cubes in a buttery tomato gravy.",
            },
            {
              name: "Spaghetti Carbonara",
              img: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQrWvJMvrO9EMijsqywntFQZiDRbFTpuxM1Ng&s",
              desc: "A classic Italian pasta dish with eggs, cheese, pancetta, and pepper.",
            },
          ].map((recipe, index) => (
            <div
              key={index}
              className="p-6 bg-white dark:bg-gray-800 rounded-lg shadow-lg transform hover:scale-105 transition-transform duration-300"
            >
              <img
                src={recipe.img}
                alt={recipe.name}
                className="w-full h-40 object-cover rounded-md mb-4"
              />
              <h3 className="font-bold text-lg text-orange-600 mb-2">
                {recipe.name}
              </h3>
              <p className="text-gray-500">{recipe.desc}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Comments Section */}
      <div className="max-w-7xl mx-auto p-8">
        <h2 className="text-3xl font-bold mb-6 text-center text-orange-600">
          What People Are Saying
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {[
            {
              text: "The food was amazing! Delivery was quick and hassle-free.",
              author: "John Doe",
            },
            {
              text: "I love the variety of cuisines available. Highly recommend!",
              author: "Jane Smith",
            },
            {
              text: "Great service and delicious food. Will order again!",
              author: "Alex Johnson",
            },
            {
              text: "The recipes section is a game-changer. I tried Butter Chicken, and it was perfect!",
              author: "Emily Davis",
            },
          ].map((comment, index) => (
            <div
              key={index}
              className="p-6 bg-white dark:bg-gray-800 rounded-lg shadow-lg transform hover:scale-105 transition-transform duration-300"
            >
              <p className="text-gray-700 dark:text-gray-300 italic">
                "{comment.text}"
              </p>
              <p className="text-gray-500 dark:text-gray-400 mt-4 text-right">
                - {comment.author}
              </p>
            </div>
          ))}
        </div>
      </div>

      {/* Why Choose Us Section */}
      <div className="max-w-7xl mx-auto p-8">
        <h2 className="text-3xl font-bold mb-6 text-center text-orange-600">
          Why Choose Us?
        </h2>
        <p className="text-gray-500 mb-8 text-center">
          Discover why thousands of customers trust us for their food cravings.
        </p>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {[
            {
              title: "Fast Delivery",
              icon: "🚚",
              description:
                "Get your food delivered hot and fresh in no time with our efficient delivery system.",
            },
            {
              title: "Wide Variety",
              icon: "🍽️",
              description:
                "Choose from a wide range of cuisines and dishes to satisfy your cravings.",
            },
            {
              title: "Quality Assurance",
              icon: "✅",
              description:
                "We ensure the highest quality standards for every meal you order.",
            },
          ].map((feature, index) => (
            <div
              key={index}
              className="p-6 bg-white dark:bg-gray-800 rounded-lg shadow-lg transform hover:scale-105 transition-transform duration-300 text-center"
            >
              <div className="text-4xl mb-4">{feature.icon}</div>
              <h3 className="font-bold text-lg text-orange-600 mb-2">
                {feature.title}
              </h3>
              <p className="text-gray-500">{feature.description}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Add Comment Section */}
      <div className="max-w-3xl mx-auto p-6">
        <h2 className="text-2xl font-bold mb-4 text-center text-orange-600">
          Send Your Feedback!
        </h2>
        <div className="bg-white dark:bg-gray-800 p-4 rounded-lg shadow-md">
          <textarea
            placeholder="Write your Feedback here..."
            className="w-full p-3 border border-orange-300 rounded-md focus:ring-1 focus:ring-orange-500 resize-none text-gray-900 dark:text-gray-100 bg-gray-50 dark:bg-gray-700"
            rows={3}
          ></textarea>
          <div className="text-right mt-3">
            <Button className="bg-orange-500 hover:bg-orange-600 text-white font-medium px-4 py-2 rounded-md shadow-md">
              Submit
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HeroSection;
