import {io} from 'socket.io-client'

const socketIO = () => {
    return io("http://localhost:4020", {
        transports: ["websocket"]
    });
}

export const socket = socketIO();