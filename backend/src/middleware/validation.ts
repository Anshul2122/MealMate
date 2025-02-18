import {Request,Response, NextFunction } from "express";
import { body, validationResult } from "express-validator";

const handleValidationError = async (req: Request, res: Response, next: NextFunction) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }
    next();
}

export const validateMyUserRequest = [
    body("name").isString().notEmpty().withMessage("Name must be a string"),
    body("addressLine1").isString().notEmpty().withMessage("addressLine1 must be a string"),
    body("city").isString().notEmpty().withMessage("City must be a string"),
    body("country").isString().notEmpty().withMessage("Country must be a string"),
    handleValidationError,
]

export const validateMyRestaurantRequest = [
    body("restaurantName").isString().notEmpty().withMessage("restaurant name is required"),
    body("city").isString().notEmpty().withMessage("City must be a string"),
    body("country").isString().notEmpty().withMessage("Country must be a string"),
    body("deliveryPrice").isFloat({ min: 0 }).withMessage("delivery price must be a grater than 0"),
    body("estimatedDeliveryTime").isFloat({ min: 0 }).withMessage("estimated delivery time must be grater than 0"),
    body("cuisines").isArray().withMessage("cuisines must be an array").not().isEmpty().withMessage("Cuisines array cannot be empty"),
    body("menuItems").isArray().withMessage("menu items mush be an array"),
    body("menuItems.*name").notEmpty().withMessage("menu items name is required"),
    body("menuItems.*price").isFloat({ min: 0 }).withMessage("menu items price is required and must be greater than 0"),
    handleValidationError,

]