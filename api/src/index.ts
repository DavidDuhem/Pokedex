import express from 'express';
import type { Request, Response } from 'express';
import cors from 'cors';
import cookieParser from 'cookie-parser';
import { connectDB, sequelize } from './config/db.js';
import { router } from './router.js';

const app = express();

const allowedOrigins = process.env.ALLOWED_ORIGIN
	? process.env.ALLOWED_ORIGIN.split(',')
	: ['http://localhost:3004', 'http://localhost:5173'];

app.use(
	cors({
		origin: (origin, callback) => {
			if (!origin || allowedOrigins.includes(origin)) {
				callback(null, true);
			} else {
				callback(new Error('Not allowed by CORS'));
			}
		},
		credentials: true
	})
);

app.use(express.json());
app.disable('x-powered-by');
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

connectDB();

app.get('/', async (req: Request, res: Response) => {
	try {
		await sequelize.authenticate();

		res.status(200).json({
			status: 'success',
			message: "Bienvenue sur l'API Pokedex !",
			database: 'Connectée',
			timestamp: new Date().toISOString()
		});
	} catch (error) {
		res.status(500).json({
			status: 'error',
			message: "L'API tourne mais la base de données est injoignable.",
			timestamp: new Date().toISOString()
		});
	}
});

app.use('/api', router);

app.use((req: Request, res: Response) => {
	res.status(404).json({ message: 'Route non trouvée' });
});

const PORT = Number(process.env.API_PORT) || 5005;

app.listen(PORT, '0.0.0.0', () => {
	console.log(`🚀 Serveur API démarré sur le port ${PORT}`);
});
