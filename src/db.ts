import { Pool } from "pg";

const connectionString = 'postgres://mjxxrpcu:4pf2Ho2l1Pu_knGSQ0frplPrOHO4_1Uw@john.db.elephantsql.com/mjxxrpcu';
const db = new Pool({ connectionString })

export default db;