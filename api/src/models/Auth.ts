import { DataTypes, Model, Optional } from 'sequelize';
import { sequelize } from '../config/db';

interface AuthAttributes {
	id: number;
	email: string;
	password: string;
}

interface AuthCreationAttributes extends Optional<AuthAttributes, 'id'> {}

export class Auth extends Model<AuthAttributes, AuthCreationAttributes> implements AuthAttributes {
	public id!: number;
	public email!: string;
	public password!: string;

	public readonly createdAt!: Date;
	public readonly updatedAt!: Date;
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
		tableName: 'auth'
	}
);
