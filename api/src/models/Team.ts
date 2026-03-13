import { DataTypes, Model, Optional } from 'sequelize';
import { sequelize } from '../config/db';

interface TeamAttributes {
	id: number;
	name: string;
	description?: string;
	profile_id: number;
}

interface TeamCreationAttributes extends Optional<TeamAttributes, 'id'> {}

export class Team extends Model<TeamAttributes, TeamCreationAttributes> implements TeamAttributes {
	public id!: number;
	public name!: string;
	public description?: string;
	public profile_id!: number;

	public readonly createdAt!: Date;
	public readonly updatedAt!: Date;
}

Team.init(
	{
		id: {
			type: DataTypes.INTEGER,
			primaryKey: true,
			autoIncrement: true
		},
		name: {
			type: DataTypes.STRING(255),
			allowNull: false
		},
		description: {
			type: DataTypes.TEXT,
			allowNull: true
		},
		profile_id: {
			type: DataTypes.INTEGER,
			allowNull: false
		}
	},
	{
		sequelize,
		tableName: 'team'
	}
);
