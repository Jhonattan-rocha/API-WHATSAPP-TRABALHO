import { Server } from 'socket.io';

export let io = new Server();

// Exporta uma função para inicializar o Socket.IO
export function initializeSocket(server) {
    io = new Server(server, {
        cors: {
            origin: "*",
            methods: ["GET", "POST"]
        }
    });
}
