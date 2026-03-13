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
    const maxTries = 10;
    let currentTry = 1;

    while (currentTry <= maxTries) {
        try {
            await sequelize.authenticate();
            console.log('✅ Connexion à PostgreSQL réussie (Pokedex DB)');
            
            await sequelize.sync({ alter: true });
            console.log('✅ Modèles synchronisés');
            return;
        } catch (error) {
            console.error(`❌ Tentative ${currentTry}/${maxTries} échouée. La DB n'est pas prête...`);
            currentTry++;
            await new Promise(resolve => setTimeout(resolve, 3000));
        }
    }

    console.error('❌ Impossible de se connecter après 10 tentatives. Arrêt.');
    process.exit(1);
};