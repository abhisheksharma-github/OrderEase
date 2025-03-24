import { Request, Response } from "express";
import uploadImageOnCloudinary from "../utils/imageUpload.js";
import {Menu} from "../models/menu.model.js";
import { Restaurant } from "../models/restaurant.model.js";
import mongoose, { ObjectId } from "mongoose";

export const addMenu = async (req: Request, res: Response): Promise<void> => {
    try {
        const { name, price, category } = req.body;
        const image = req.file?.path; // Get uploaded image path

        if (!name || !price || !category || !image) {
            res.status(400).json({ success: false, message: "All fields are required" });
            return;
        }

        const newMenu = new Menu({ name, price, category, image });
        await newMenu.save();

        res.status(201).json({ success: true, message: "Menu item added successfully", menu: newMenu });
    } catch (error) {
        console.error(error);
        res.status(500).json({ success: false, message: "Internal server error" });
    }
};
export const editMenu = async (req: Request, res: Response): Promise<void> => {
    try {
        const { id } = req.params;
        const { name, price, category } = req.body;
        const image = req.file?.path;

        const updatedData: any = { name, price, category };
        if (image) updatedData.image = image;

        const menu = await Menu.findByIdAndUpdate(id, updatedData, { new: true });

        if (!menu) {
            res.status(404).json({ success: false, message: "Menu item not found" });
            return;
        }

        res.status(200).json({ success: true, message: "Menu item updated successfully", menu });
    } catch (error) {
        console.error(error);
        res.status(500).json({ success: false, message: "Internal server error" });
    }
};