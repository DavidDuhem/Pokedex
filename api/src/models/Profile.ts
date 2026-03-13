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
	public id!: number;
	public username!: string;
	public auth_id!: number;

	public readonly createdAt!: Date;
	public readonly updatedAt!: Date;
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
			// La référence sera gérée par les associations dans index.ts
		}
	},
	{
		sequelize,
		tableName: 'profile'
	}
);
