import {
	DataTypes,
	BelongsToManyAddAssociationsMixin,
	BelongsToManyAddAssociationMixin,
	Optional,
	Model
} from 'sequelize';
import { sequelize } from '../config/db.js';
import { PokeType } from './PokeType.js';
import { Profile } from './Profile.js';

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
	declare id: number;
	declare name: string;
	declare hp: number;
	declare atk: number;
	declare def: number;
	declare atk_spe: number;
	declare def_spe: number;
	declare speed: number;

	declare addTypes: BelongsToManyAddAssociationsMixin<PokeType, number>;
	declare addVoter: BelongsToManyAddAssociationMixin<Profile, number>;
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
