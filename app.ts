import http, { Server, ServerResponse, IncomingMessage } from 'http';

const port: number = parseInt(process.argv[2]) | 8080;

function Listener(): Server {
    const server: Server = http.createServer(function (req: IncomingMessage, res: ServerResponse) {
        res.writeHead(200);
        res.end('Hello world!');
    });
    server.listen(port, (): void => {
        console.log(`Server listening at ${port}`);
    });
    return server
}

export default class App {
    server: Server;
    constructor() {
        this.server = Listener();
    }
    listen(){}
    get(point: string): void{
        if(point == '/'){
            console.log('Plop');
        }
    }
    post(){}
    put(){}
    delete(){}
    all(){}
}

const app = new App();
app.get('/');