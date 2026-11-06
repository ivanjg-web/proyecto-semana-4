import pool from "../config/db.js";

export async function getAllProducts() {
    const result = await pool.query("SELECT * FROM product")

    return result.rows;
}

export async function getProductById(id: number) {
    const result = await pool.query("SELECT * FROM product WHERE id = $1",
        [id]
    )

    if (result.rows.length === 0) {
        return null;
    }
    return result.rows[0];
}

export async function insertProduct(name: string, description: string, price: number) {
    const result = await pool.query(
        "INSERT INTO product (name, description, unit_price) VALUES ($1, $2, $3) RETURNING *",
        [name, description, price]
    );

    return result.rows[0];
}

export async function updateProduct(id: number, name: string, description: string, price: number) {
    const result = await pool.query(
        "UPDATE product SET name = $1, description = $2, unit_price = $3 WHERE id = $4 RETURNING *",
        [name, description, price, id]
    );

    if (result.rows.length === 0) {
        return null;
    }

    return result.rows[0];
}

export async function searchProducts(name: string) {
    const result = await pool.query(
        "SELECT * FROM product WHERE name ILIKE $1",
        [`%${name}%`]
    );

    return result.rows;
}