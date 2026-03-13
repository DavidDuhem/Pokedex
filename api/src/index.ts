import express from 'express';
import type { Request, Response } from 'express';
import cors from 'cors';
import { connectDB, sequelize } from './config/db';

const app = express();

app.use(cors());
app.use(express.json());

connectDB();

app.get('/', async (req: Request, res: Response) => {
    try {
        await sequelize.authenticate();
        
        res.status(200).json({
            status: 'success',
            message: 'Bienvenue sur l\'API Pokedex !',
            database: 'Connectée',
            timestamp: new Date().toISOString()
        });
    } catch (error) {
        res.status(500).json({
            status: 'error',
            message: 'L\'API tourne mais la base de données est injoignable.',
            timestamp: new Date().toISOString()
        });
    }
});

app.use((req: Request, res: Response) => {
    res.status(404).json({ message: "Route non trouvée" });
});

const PORT = process.env.API_PORT || 5000;

app.listen(PORT, () => {
    console.log(`🚀 Serveur API démarré sur http://localhost:${PORT}`);
});