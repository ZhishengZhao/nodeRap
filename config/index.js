module.exports = {
    port: 8088,
    session: {
        secret: 'noderap',
        key: 'noderap',
        maxAge: 2592000000
    },
    mongodb: 'mongodb://localhost:27017/test'
};