import { Client, LocalAuth } from 'whatsapp-web.js';
import qrcode from 'qrcode-terminal';
import path from 'path';
import fs from 'fs';
import { io } from './server-socket';

const clients_messages = [];

export const client = new Client({
    webVersionCache: {
        type: "remote",
        remotePath: "https://raw.githubusercontent.com/wppconnect-team/wa-version/main/html/2.2412.54.html",
    },
    authStrategy: new LocalAuth({
        dataPath: path.resolve(__dirname, "sessionClientData")
    })
}); 

client.on('qr', qr => {
    console.log('QR RECEIVED', qr);
    io.emit("client_ready", false);
    io.emit("qr_code", qr);
    qrcode.generate(qr, { small: true }); // Isto vai gerar o QR code no terminal
});

client.on('ready', () => {
    console.log('Client is ready!');
    io.emit("client_ready", true);

    io.on("connection", (socket) => {
        console.log("Usuário conectado");
        
        io.emit("client_ready", true);

        socket.on("disconnect", () => {
            console.log("Usuário desconectado");
            io.emit("client_ready", false);
        });
    });
});

client.on('authenticated', (session) => {
    console.log('Authenticated!');
});

client.on('disconnected', (session) => {
    console.log('disconnected!');
    io.emit("client_ready", false);
    fs.rm(path.resolve(__dirname, "sessionClientData"), {recursive: true, force: true});
});

client.on('message', (message) => {
    const dados = JSON.parse(JSON.stringify(message));
    const client_tel = dados["_data"]["id"]["remote"] ?? dados["_data"]["from"];
    
    if(!clients_messages.includes(client_tel)){
        clients_messages.push(client_tel);
        client.sendMessage(client_tel, "🌟 Olá! Bem-vindo à [Nome da Loja de Tecidos]! 🌟\n\nEste número é utilizado exclusivamente para notificações automáticas do sistema. Não estamos disponíveis para bate-papo por este número.\n\nSe precisar de assistência ou desejar fazer consultas, por favor, entre em contato através do nosso serviço de atendimento ao cliente no número [inserir número de telefone] ou por e-mail em [inserir e-mail].\n\nAgradecemos sua compreensão e estamos aqui para ajudá-lo com qualquer necessidade relacionada aos nossos tecidos e produtos!\n\n📌 Acompanhe nossas novidades e promoções diretamente por aqui e nunca perca uma atualização!\n\nAtenciosamente,\n\n[Nome da Loja de Tecidos] Team");
    }

})

client.initialize();