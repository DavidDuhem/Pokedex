import { DataTypes, Model } from 'sequelize';
import { sequelize } from '../config/db.js';

interface VoteAttributes {
	profile_id: number;
	pokemon_id: number;
}

export class Vote extends Model<VoteAttributes> implements VoteAttributes {
	declare profile_id: number;
	declare pokemon_id: number;
}

Vote.init(
	{
		profile_id: {
			type: DataTypes.INTEGER,
			allowNull: false
		},
		pokemon_id: {
			type: DataTypes.INTEGER,
			allowNull: false
		}
	},
	{
		sequelize,
		tableName: 'vote',
		timestamps: true,
		indexes: [
			{
				unique: true,
				fields: ['profile_id', 'pokemon_id']
			}
		]
	}
);
