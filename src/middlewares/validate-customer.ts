import type { Request, Response, NextFunction } from "express";
import { createCustomerSchema } from "../schemas/customerSchema.js";

export function validateCustomer(req: Request, res: Response, next: NextFunction) {
    const result = createCustomerSchema.safeParse(req.body);

    if (!result.success) {
        return res.status(400).json({
            errors: result.error.issues
        });
    }

    next();
}