import path from 'path';

require("dotenv").config()

module.exports = {
    dialect: 'sqlite',
    storage: path.resolve(__dirname, "..", "database", 'db.sqlite'),
    
    /* MySQL / MariaDB */
    // host: process.env.DATABASE_HOST,
    // port: process.env.DATABASE_PORT,
    // username: process.env.DATABASE_USERNAME,
    // password: process.env.DATABASE_PASSWORD,
    // database: process.env.DATABASE,

    // timezone: '-03:00', // for writing to database

    define: {
        timestamps: true,
        underscored: true,
        underscoredAll: true,
        createdAt: 'created_at',
        updatedAt: 'updated_at',
    },
}; 