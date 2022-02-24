"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const pg_1 = require("pg");
const connectionString = 'postgres://mjxxrpcu:4pf2Ho2l1Pu_knGSQ0frplPrOHO4_1Uw@john.db.elephantsql.com/mjxxrpcu';
const db = new pg_1.Pool({ connectionString });
exports.default = db;
