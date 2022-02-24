"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const fobbiden_error_1 = __importDefault(require("../models/errors/fobbiden.error"));
const authorizationRoute = (0, express_1.Router)();
authorizationRoute.post('/token', (req, res, next) => {
    try {
        const authorizationHeader = req.headers['authorization'];
        if (!authorizationHeader) {
            throw new fobbiden_error_1.default('Credenciais não informadas');
        }
        const [authenticationType, token] = authorizationHeader.split(' ');
        if (authenticationType !== 'Basic' || !token) {
            throw new fobbiden_error_1.default('Tipo de autenticação inválida');
        }
        const tokenContent = Buffer.from(token, 'base64').toString('utf-8');
        const [username, password] = tokenContent.split(':');
        console.log(username, password);
    }
    catch (error) {
        next(error);
    }
});
exports.default = authorizationRoute;
