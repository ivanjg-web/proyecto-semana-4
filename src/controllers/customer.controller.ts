import type { Request, Response } from "express";

import {
    getAllCustomers,
    getCustomerById,
    insertCustomer,
    updateCustomer,
    deleteCustomer
} from "../models/customer.model.js";

export async function getCustomers(req: Request, res: Response) {
    try {
        const customers = await getAllCustomers();

        res.json(customers);

    } catch (error) {
        console.log(error);

        res.status(500).json({
            error: "Error al consultar los clientes"
        });
    }
}

export async function getCustomer(req: Request, res: Response) {
    try {
        const { id } = req.params;
        const customerId = Number(id);

        const customer = await getCustomerById(customerId);

        if (!customer) {
            return res.status(404).json({
                error: "Cliente no encontrado"
            });
        }

        res.json(customer);

    } catch (error) {
        console.log(error);

        res.status(500).json({
            error: "Error al consultar el cliente"
        });
    }
}

export async function createCustomer(req: Request, res: Response) {
    try {
        const { name, last_name, phone_number, email } = req.body;

        const customer = await insertCustomer(
            name,
            last_name,
            phone_number,
            email
        );

        res.status(201).json(customer);

    } catch (error) {
        console.log(error);

        res.status(500).json({
            error: "Error al crear el cliente"
        });
    }
}

export async function updateCustomerController(req: Request, res: Response) {
    try {
        const { id } = req.params;
        const customerId = Number(id);

        const { name, last_name, phone_number, email } = req.body;

        const customer = await updateCustomer(
            customerId,
            name,
            last_name,
            phone_number,
            email
        );

        if (!customer) {
            return res.status(404).json({
                error: "Cliente no encontrado"
            });
        }

        res.json(customer);

    } catch (error) {
        console.log(error);

        res.status(500).json({
            error: "Error al actualizar el cliente"
        });
    }
}

export async function removeCustomer(req: Request, res: Response) {
    try {
        const { id } = req.params;
        const customerId = Number(id);

        const customer = await deleteCustomer(customerId);

        if (!customer) {
            return res.status(404).json({
                error: "Cliente no encontrado"
            });
        }

        res.json(customer);

    } catch (error) {
        console.log(error);

        res.status(500).json({
            error: "Error al eliminar el cliente"
        });
    }
}