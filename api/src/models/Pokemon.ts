import { DataTypes, Model, Optional } from 'sequelize';
import { sequelize } from '../config/db';

interface PokemonAttributes {
	id: number;
	name: string;
	hp: number;
	atk: number;
	def: number;
	atk_spe: number;
	def_spe: number;
	speed: number;
}

interface PokemonCreationAttributes extends Optional<PokemonAttributes, 'id'> {}

export class Pokemon
	extends Model<PokemonAttributes, PokemonCreationAttributes>
	implements PokemonAttributes
{
	public id!: number;
	public name!: string;
	public hp!: number;
	public atk!: number;
	public def!: number;
	public atk_spe!: number;
	public def_spe!: number;
	public speed!: number;
}

Pokemon.init(
	{
		id: {
			type: DataTypes.INTEGER,
			primaryKey: true,
			autoIncrement: true
		},
		name: {
			type: DataTypes.STRING(255),
			allowNull: false,
			unique: true
		},
		hp: { type: DataTypes.INTEGER, allowNull: false },
		atk: { type: DataTypes.INTEGER, allowNull: false },
		def: { type: DataTypes.INTEGER, allowNull: false },
		atk_spe: { type: DataTypes.INTEGER, allowNull: false },
		def_spe: { type: DataTypes.INTEGER, allowNull: false },
		speed: { type: DataTypes.INTEGER, allowNull: false }
	},
	{
		sequelize,
		tableName: 'pokemon',
		timestamps: true
	}
);
