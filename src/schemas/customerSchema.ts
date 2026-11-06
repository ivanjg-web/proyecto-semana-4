import { z } from "zod";

export const createCustomerSchema = z.object({
    name: z.string().trim().min(1, "El nombre es obligatorio"),
    last_name: z.string().trim().min(1, "El apellido es obligatorio"),
    phone_number: z.string().trim().min(1, "El teléfono es obligatorio"),
    email: z.string().trim().email("El correo electrónico no es válido")
});