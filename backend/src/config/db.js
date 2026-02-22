import pkg from "pg";
const { Pool } = pkg;

export const pool = new Pool({
  user: "hrmsdb_wusm_user",
  password: "oED1EFLV05fROygxyazivS0dyrOlkMqY",
  host: "dpg-d6b32ubnv86c73cue8v0-a.oregon-postgres.render.com",
  database: "hrms_fhnp",
  port: 5432,
  ssl: {
    rejectUnauthorized: false,
  },
});

pool
  .connect()
  .then(() => console.log("✅ Database Connected Successfully"))
  .catch((err) => console.error("❌ DB Connection Error:", err));
