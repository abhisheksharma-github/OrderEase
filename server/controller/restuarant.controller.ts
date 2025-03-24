import { Request, Response } from "express";
import { Restaurant } from "../models/restaurant.model.js";
import uploadImageOnCloudinary from "../utils/imageUpload.js";
import { Order } from "../models/order.model.js";

// Extend Express Request globally for better type safety
declare global {
    namespace Express {
        interface Request {
            id?: string;
            file?: Express.Multer.File;
        }
    }
}

// ✅ Create Restaurant
export const createRestaurant = async (req: Request, res: Response): Promise<void> => {
    try {
        const { restaurantName, city, country, deliveryTime, cuisines } = req.body;
        const file = req.file;

        if (!file) {
            res.status(400).json({ success: false, message: "Image is required" });
            return;
        }

        const imageUrl = await uploadImageOnCloudinary(file);
        await Restaurant.create({
            user: req.id,
            restaurantName,
            city,
            country,
            deliveryTime,
            cuisines: JSON.parse(cuisines),
            imageUrl
        });

        res.status(201).json({ success: true, message: "Restaurant Added" });

    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Internal server error" });
    }
};

// ✅ Get Restaurant
export const getRestaurant = async (req: Request, res: Response): Promise<void> => {
    try {
        const restaurant = await Restaurant.findOne({ user: req.id }).populate('menus');
        if (!restaurant) {
            res.status(404).json({ success: false, restaurant: [], message: "Restaurant not found" });
            return;
        }
        res.status(200).json({ success: true, restaurant });

    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Internal server error" });
    }
};

// ✅ Update Restaurant
export const updateRestaurant = async (req: Request, res: Response): Promise<void> => {
    try {
        const { restaurantName, city, country, deliveryTime, cuisines } = req.body;
        const file = req.file;
        const restaurant = await Restaurant.findOne({ user: req.id });

        if (!restaurant) {
            res.status(404).json({ success: false, message: "Restaurant not found" });
            return;
        }

        restaurant.restaurantName = restaurantName;
        restaurant.city = city;
        restaurant.country = country;
        restaurant.deliveryTime = deliveryTime;
        restaurant.cuisines = JSON.parse(cuisines);

        if (file) {
            const imageUrl = await uploadImageOnCloudinary(file);
            restaurant.imageUrl = imageUrl;
        }

        await restaurant.save();
        res.status(200).json({ success: true, message: "Restaurant updated", restaurant });

    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Internal server error" });
    }
};

// ✅ Get Restaurant Orders
export const getRestaurantOrder = async (req: Request, res: Response): Promise<void> => {
    try {
        const restaurant = await Restaurant.findOne({ user: req.id });

        if (!restaurant) {
            res.status(404).json({ success: false, message: "Restaurant not found" });
            return;
        }

        const orders = await Order.find({ restaurant: restaurant._id }).populate('restaurant').populate('user');
        res.status(200).json({ success: true, orders });

    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Internal server error" });
    }
};

// ✅ Update Order Status
export const updateOrderStatus = async (req: Request, res: Response): Promise<void> => {
    try {
        const { orderId } = req.params;
        const { status } = req.body;
        const order = await Order.findById(orderId);

        if (!order) {
            res.status(404).json({ success: false, message: "Order not found" });
            return;
        }

        order.status = status;
        await order.save();

        res.status(200).json({ success: true, status: order.status, message: "Status updated" });

    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Internal server error" });
    }
};

// ✅ Search Restaurants
export const searchRestaurant = async (req: Request, res: Response): Promise<void> => {
    try {
        const searchText = req.params.searchText || "";
        const searchQuery = (req.query.searchQuery as string) || "";
        const selectedCuisines = ((req.query.selectedCuisines as string) || "").split(",").filter(cuisine => cuisine);
        const query: any = {};

        console.log(selectedCuisines);
// basic search based on SearchText(name,city,country)
        if (searchText) {
            query.$or = [
                { restaurantName: { $regex: searchText, $options: 'i' } },
                { city: { $regex: searchText, $options: 'i' } },
                { country: { $regex: searchText, $options: 'i' } },
            ];
        }
//filter based on SearchQuery
        if (searchQuery) {
            query.$or = [
                { restaurantName: { $regex: searchQuery, $options: 'i' } },
                { cuisines: { $regex: searchQuery, $options: 'i' } },
            ];
        }

        if (selectedCuisines.length > 0) {
            query.cuisines = { $in: selectedCuisines };
        }

        const restaurants = await Restaurant.find(query);
        res.status(200).json({ success: true, data: restaurants });

    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Internal server error" });
    }
};

// ✅ Get Single Restaurant
export const getSingleRestaurant = async (req: Request, res: Response): Promise<void> => {
    try {
        const restaurantId = req.params.id;
        const restaurant = await Restaurant.findById(restaurantId).populate({
            path: 'menus',
            options: { createdAt: -1 },
        });

        if (!restaurant) {
            res.status(404).json({ success: false, message: "Restaurant not found" });
            return;
        }

        res.status(200).json({ success: true, restaurant });

    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Internal server error" });
    }
};
