let WebSocket = require('ws');

const server = new WebSocket.Server({port: 9000});

server.on('connection',(ws,req)=>{
    console.log('Connection from');

    ws.on('message',(msg)=>{
        console.log('Received msg: '+ msg+ 'ip: '+ req.connection.remoteAddress);
        
        server.clients.forEach(function each(client){
            client.send(msg);
        });
    })

})

console.log('Server is listening to port 9000 now.');