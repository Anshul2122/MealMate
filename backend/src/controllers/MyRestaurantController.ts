import { Request, Response } from "express";
import Restaurant from "../models/restaurant";
import cloudinary from "cloudinary";
import mongoose from "mongoose";
const createMyRestaurant = async (req: Request, res: Response) => {
    try {
        const existingRestaurant = await Restaurant.findOne({ user: req.userId });
        if (existingRestaurant) { 
            return res.status(409).json({ message: "User restaurant already exists" });
        }

        const image = req.file as Express.Multer.File;
        const bast64image = Buffer.from(image.buffer).toString('base64');
        const dataURI = `data:${image.mimetype};base64,${bast64image}`;

        const uploadResponse = await cloudinary.v2.uploader.upload(dataURI);

        const restaurant = new Restaurant(req.body);

        restaurant.imageurl = uploadResponse.url;
        restaurant.user = new mongoose.Types.ObjectId(req.userId);
        restaurant.lastUpdate = new Date();
        await restaurant.save();
        res.status(201).json(restaurant);

    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Something went wrong" });
    }
};

export default {createMyRestaurant};