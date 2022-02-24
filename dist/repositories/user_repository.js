"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const db_1 = __importDefault(require("../db"));
const database_error_model_1 = __importDefault(require("../models/errors/database.error.model"));
class UserRepository {
    async findAllUsers() {
        const query = `
            SELECT uuid,username 
            FROM application_user`;
        const { rows } = await db_1.default.query(query);
        return rows || [];
    }
    async findById(uuid) {
        try {
            const query = `
        SELECT uuid,username 
        FROM application_user 
        WHERE uuid = $1
        `;
            const values = [uuid];
            const { rows } = await db_1.default.query(query, values);
            const [user] = rows;
            return user;
        }
        catch (error) {
            throw new database_error_model_1.default("Erro na consulta por ID", error);
        }
    }
    async create(user) {
        const script = `
        INSERT INTO application_user (
            username,
            password
        )
        VALUES ($1, crypt($2, 'my_salt'))
        RETURNING uuid
    `;
        const values = [user.username, user.password];
        const { rows } = await db_1.default.query(script, values);
        const [newUser] = rows;
        return newUser.uuid;
    }
    async update(user) {
        const script = `
        UPDATE application_user 
        SET
            username = $1,
            password = crypt($2, 'my_salt')
        WHERE uuid = $3
    `;
        const values = [user.username, user.password, user.uuid];
        const { rows } = await db_1.default.query(script, values);
    }
    async remove(uuid) {
        const script = `
      DELETE 
      FROM application_user 
      WHERE uuid = $1 
    `;
        const values = [uuid];
        await db_1.default.query(script, values);
    }
}
exports.default = new UserRepository();
