module.exports = {
    dialect: 'mysql',
    host: 'localhost',
    username: 'root',
    port: '3306',
    password:'root123',
    database: 'api_sequelize',
    define: {
        timestamps: false,
        underscored: true,
    }
}