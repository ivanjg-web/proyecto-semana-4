import express, { type Request, type Response } from "express"; 
import swaggerRouter from "./routes/swagger.router.js";
import cors from "cors"
import pool from "./config/db.js";

const port = process.env.PORT; 



const app = express();

// Middlewares 
app.use(express.json());
app.use(cors())

app.use("/api/docs", swaggerRouter) 


app.get("/", (req: Request, res: Response) => {
    /*#swagger.tags = ['Tests']*/
    res.json({
        status: "Server online",
        version: "1.0.0"
    });
});

app.get("/api/menu", async (req: Request, res: Response) => {
    /* 
#swagger.tags = ['Menu']
#swagger.summary = 'Consultar todos los productos del menú'
#swagger.description = 'Obtiene la lista completa de productos registrados en la base de datos.'
#swagger.responses[200] = {
    description: 'Lista de productos obtenida correctamente',
    schema: [{ id: 1, name: 'Bandeja Paisa', description: 'Descripción del producto', unit_price: '14.99' }]
}
#swagger.responses[500] = {
    description: 'Error interno del servidor'
}
*/

    try {
        const result = await pool.query("SELECT * FROM product");

        res.json(result.rows);

    } catch (error) {
        console.log(error);
        res.status(500).json({
            mensaje: "Error al consultar el menú"
        });
    }
});

app.listen(port, () => {
    console.log(`URL: http://localhost:${port}`);
});