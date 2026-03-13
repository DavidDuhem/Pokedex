import { DataTypes, Model } from 'sequelize';
import { sequelize } from '../config/db';

interface VoteAttributes {
	profile_id: number;
	pokemon_id: number;
}

export class Vote extends Model<VoteAttributes> implements VoteAttributes {
	public profile_id!: number;
	public pokemon_id!: number;

	public readonly createdAt!: Date;
	public readonly updatedAt!: Date;
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
		indexes: [
			{
				unique: true,
				fields: ['profile_id', 'pokemon_id']
			}
		]
	}
);
