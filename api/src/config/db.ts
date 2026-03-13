import { Sequelize } from 'sequelize';

const dbUrl = process.env.DATABASE_URL;

if (!dbUrl) {
    console.error("❌ ERREUR : La variable d'environnement DATABASE_URL est manquante !");
    process.exit(1);
}

export const sequelize = new Sequelize(dbUrl, {
    dialect: 'postgres',
    logging: false,
    retry: {
        max: 5
    }
});

export const connectDB = async () => {
    try {
        await sequelize.authenticate();
        console.log('✅ Connection à PostgreSQL réussie (Pokedex DB)');
        await sequelize.sync({ alter: true });
    } catch (error) {
        console.error('❌ Impossible de se connecter à la base de données:', error);
        process.exit(1);
    }
};