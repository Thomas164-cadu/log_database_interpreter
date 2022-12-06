module.exports = {
    dialect: 'postgres',
    host : 'localhost',
    username: 'postgres',
    password: 'postgres',
    database: 'log_db',
    define: {
        timestamps: true,
        underscored: true,
    },
}