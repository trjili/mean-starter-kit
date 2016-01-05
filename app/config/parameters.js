module.exports = {
    database: 'mongodb://localhost/mean_starter_kit',
    jwtSecret: 'mysecretsalt',
    server: {port: process.env.port || 8080, env: process.env.NODE_ENV || 'dev'}
};