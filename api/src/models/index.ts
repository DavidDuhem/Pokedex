import { Pokemon } from './Pokemon';
import { PokeType } from './PokeType';
import { PokemonTeam } from './PokemonTeam';
import { Auth } from './Auth';
import { Profile } from './Profile';
import { Team } from './Team';
import { Vote } from './Vote';

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

// Relation One-To-Many : Profile <-> Team
Profile.hasMany(Team, { foreignKey: 'profile_id' });
Team.belongsTo(Profile, { foreignKey: 'profile_id' });

export { Pokemon, PokeType, Team, PokemonTeam, Auth, Profile, Vote };
