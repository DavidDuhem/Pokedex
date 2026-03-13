import { DataTypes, Model, Optional } from 'sequelize';
import { sequelize } from '../config/db';

interface ProfileAttributes {
	id: number;
	username: string;
	auth_id: number;
}

interface ProfileCreationAttributes extends Optional<ProfileAttributes, 'id'> {}

export class Profile
	extends Model<ProfileAttributes, ProfileCreationAttributes>
	implements ProfileAttributes
{
	declare id: number;
	declare username: string;
	declare auth_id: number;
}

Profile.init(
	{
		id: {
			type: DataTypes.INTEGER,
			primaryKey: true,
			autoIncrement: true
		},
		username: {
			type: DataTypes.STRING,
			unique: true,
			allowNull: false
		},
		auth_id: {
			type: DataTypes.INTEGER,
			allowNull: false
		}
	},
	{
		sequelize,
		tableName: 'profile',
		timestamps: true
	}
);
