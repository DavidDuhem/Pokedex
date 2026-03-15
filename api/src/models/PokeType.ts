import { DataTypes, Model, Optional } from 'sequelize';
import { sequelize } from '../config/db.js';

interface PokeTypeAttributes {
	id: number;
	name: string;
	color: string;
}

interface PokeTypeCreationAttributes extends Optional<PokeTypeAttributes, 'id'> {}

export class PokeType
	extends Model<PokeTypeAttributes, PokeTypeCreationAttributes>
	implements PokeTypeAttributes
{
	declare id: number;
	declare name: string;
	declare color: string;
}

PokeType.init(
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
		color: {
			type: DataTypes.STRING(7),
			allowNull: false,
			defaultValue: '#ffffff'
		}
	},
	{
		sequelize,
		tableName: 'type',
		timestamps: true
	}
);
