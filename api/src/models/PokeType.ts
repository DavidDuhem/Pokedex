import { DataTypes, Model, Optional } from 'sequelize';
import { sequelize } from '../config/db';

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
	public id!: number;
	public name!: string;
	public color!: string;

	public readonly createdAt!: Date;
	public readonly updatedAt!: Date;
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
		tableName: 'type'
	}
);
