import { z } from "zod";

export const createProductSchema = z.object({
    name: z.string().trim().min(1, "El nombre es obligatorio"),
    description: z.string().trim().min(1, "La descripción es obligatoria"),
    price: z.number().positive("El precio debe ser mayor que cero")
});

