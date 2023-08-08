import express, { Request, Response } from "express";
import http from "http";
import { Server, Socket } from "socket.io";

const app = express();

const server = http.createServer(app);

const io:Server = new Server(server);

app.get('/', (req: Request, res: Response) => {
    res.sendFile(__dirname + '/index.html');
});

io.on('connection', (socket: Socket) => {
    console.log('A user connected');

    socket.on('chat message', (msg: string) => {
        io.emit('chat message', msg);
        console.log(msg);
    });

    socket.on('disconnect', () => {
        console.log('A user disconnected');
    });
});

const port: number = process.env.PORT ? parseInt(process.env.PORT) : 3000;
server.listen(port, () => {
    console.log(`Server is running on port ${port}`);
})