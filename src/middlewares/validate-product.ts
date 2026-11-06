import type { Request, Response, NextFunction } from "express";
import { createProductSchema } from "../schemas/productSchema.js";

export function validateProduct(req: Request, res: Response, next: NextFunction) {

    const result = createProductSchema.safeParse(req.body);

    if (!result.success) {
        return res.status(400).json({
            errors: result.error.issues
        });
    }

    next();
}
