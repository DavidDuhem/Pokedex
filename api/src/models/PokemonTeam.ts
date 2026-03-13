import { DataTypes, Model, Optional } from 'sequelize';
import { sequelize } from '../config/db';

interface PokemonTeamAttributes {
	id: number;
	pokemon_id: number;
	team_id: number;
}

interface PokemonTeamCreationAttributes extends Optional<PokemonTeamAttributes, 'id'> {}

export class PokemonTeam
	extends Model<PokemonTeamAttributes, PokemonTeamCreationAttributes>
	implements PokemonTeamAttributes
{
	public id!: number;
	public pokemon_id!: number;
	public team_id!: number;
}

PokemonTeam.init(
	{
		id: {
			type: DataTypes.INTEGER,
			primaryKey: true,
			autoIncrement: true
		},
		pokemon_id: {
			type: DataTypes.INTEGER,
			allowNull: false
		},
		team_id: {
			type: DataTypes.INTEGER,
			allowNull: false
		}
	},
	{
		sequelize,
		tableName: 'pokemon_team',
		timestamps: false
	}
);
