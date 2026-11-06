import pool from "../config/db.js";

export async function getAllCustomers() {
    const result = await pool.query("SELECT * FROM customer");

    return result.rows;
}

export async function getCustomerById(id: number) {
    const result = await pool.query(
        "SELECT * FROM customer WHERE id = $1",
        [id]
    );

    if (result.rows.length === 0) {
        return null;
    }

    return result.rows[0];
}

export async function insertCustomer(
    name: string,
    last_name: string,
    phone_number: string,
    email: string
) {
    const result = await pool.query(
        "INSERT INTO customer (name, last_name, phone_number, email) VALUES ($1, $2, $3, $4) RETURNING *",
        [name, last_name, phone_number, email]
    );

    return result.rows[0];
}

export async function updateCustomer(
    id: number,
    name: string,
    last_name: string,
    phone_number: string,
    email: string
) {
    const result = await pool.query(
        "UPDATE customer SET name = $1, last_name = $2, phone_number = $3, email = $4 WHERE id = $5 RETURNING *",
        [name, last_name, phone_number, email, id]
    );

    if (result.rows.length === 0) {
        return null;
    }

    return result.rows[0];
}

export async function deleteCustomer(id: number) {
    const result = await pool.query(
        "DELETE FROM customer WHERE id = $1 RETURNING *",
        [id]
    );

    if (result.rows.length === 0) {
        return null;
    }

    return result.rows[0];
}