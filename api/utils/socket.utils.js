const io = require('socket.io-client');
const env = require("../../.env/index.js");
let socket;

const getInstance = () => {
    socket = io(env.client.SOCKET_SERVER_ADDRESS);
    socket.emit('join');
    socket.connect();
    return socket;
}

module.exports = () => {
    return socket || getInstance();
};