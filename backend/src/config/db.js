// import pkg from "pg";
// import dotenv from "dotenv";
// dotenv.config();
// const { Pool } = pkg;
// // console.log("DB PASSWORD:", process.env.DB_PASSWORD);
// export const pool = new Pool({
//   user: process.env.DB_USER,
//   host: process.env.DB_HOST,
//   database: process.env.DB_DATABASE,
//   password: process.env.DB_PASSWORD,
//   port: process.env.DB_PORT,
// });

// For Production

import pkg from "pg";
const { Pool } = pkg;

export const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
  ssl: {
    rejectUnauthorized: false,
  },
});
