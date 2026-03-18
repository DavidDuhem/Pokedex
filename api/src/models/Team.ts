import {
	DataTypes,
	Model,
	Optional,
	HasManyGetAssociationsMixin,
	HasManyRemoveAssociationMixin,
	HasManyAddAssociationMixin,
	NonAttribute
} from 'sequelize';
import { sequelize } from '../config/db.js';
import { Pokemon } from './Pokemon.js';

interface TeamAttributes {
	id: number;
	name: string;
	description?: string;
	profile_id: number;
}

interface TeamCreationAttributes extends Optional<TeamAttributes, 'id'> {}

export class Team extends Model<TeamAttributes, TeamCreationAttributes> implements TeamAttributes {
	declare id: number;
	declare name: string;
	declare description: string;
	declare profile_id: number;

	declare pokemons?: NonAttribute<Pokemon[]>;

	declare getPokemons: HasManyGetAssociationsMixin<Pokemon>;
	declare removePokemon: HasManyRemoveAssociationMixin<Pokemon, number>;
	declare addPokemon: HasManyAddAssociationMixin<Pokemon, number>;
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
		tableName: 'team',
		timestamps: true
	}
);
