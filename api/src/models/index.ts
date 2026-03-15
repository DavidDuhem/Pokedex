import { Pokemon } from './Pokemon.js';
import { PokeType } from './PokeType.js';
import { PokemonTeam } from './PokemonTeam.js';
import { Auth } from './Auth.js';
import { Profile } from './Profile.js';
import { Team } from './Team.js';
import { Vote } from './Vote.js';

Pokemon.belongsToMany(PokeType, {
	through: 'pokemon_type',
	as: 'types',
	foreignKey: 'pokemon_id'
});

PokeType.belongsToMany(Pokemon, {
	through: 'pokemon_type',
	as: 'pokemons',
	foreignKey: 'type_id'
});

// Relation Many-To-Many : Pokemon <-> Team via le modèle PokemonTeam
Pokemon.belongsToMany(Team, {
	through: { model: PokemonTeam, unique: false },
	as: 'teams',
	foreignKey: 'pokemon_id'
});

Team.belongsToMany(Pokemon, {
	through: { model: PokemonTeam, unique: false },
	as: 'pokemons',
	foreignKey: 'team_id'
});

// Relation Many-To-Many : Pokemon <-> Profile
Pokemon.belongsToMany(Profile, {
	through: Vote,
	as: 'voters',
	foreignKey: 'pokemon_id',
	otherKey: 'profile_id'
});

Profile.belongsToMany(Pokemon, {
	through: Vote,
	as: 'votedPokemons',
	foreignKey: 'profile_id',
	otherKey: 'pokemon_id'
});

PokemonTeam.belongsTo(Pokemon, {
	foreignKey: 'pokemon_id',
	as: 'pokemon'
});

// Relation One-To-Many : Auth <-> Profile
Auth.hasOne(Profile, { foreignKey: 'auth_id' });
Profile.belongsTo(Auth, { foreignKey: 'auth_id' });

// Relation One-To-Many : Profile <-> Team
Profile.hasMany(Team, { foreignKey: 'profile_id' });
Team.belongsTo(Profile, { foreignKey: 'profile_id' });

export { Pokemon, PokeType, Team, PokemonTeam, Auth, Profile, Vote };
