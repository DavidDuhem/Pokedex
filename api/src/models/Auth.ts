import { DataTypes, Model, Optional } from 'sequelize';
import { sequelize } from '../config/db';

interface AuthAttributes {
	id: number;
	email: string;
	password: string;
}

interface AuthCreationAttributes extends Optional<AuthAttributes, 'id'> {}

export class Auth extends Model<AuthAttributes, AuthCreationAttributes> implements AuthAttributes {
	declare id: number;
	declare email: string;
	declare password: string;
}

Auth.init(
	{
		id: {
			type: DataTypes.INTEGER,
			primaryKey: true,
			autoIncrement: true
		},
		email: {
			type: DataTypes.STRING,
			allowNull: false,
			unique: true,
			validate: {
				isEmail: true
			}
		},
		password: {
			type: DataTypes.STRING,
			allowNull: false
		}
	},
	{
		sequelize,
		tableName: 'auth',
		timestamps: true
	}
);
