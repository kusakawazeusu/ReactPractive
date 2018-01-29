let WebSocket = require('ws');

const server = new WebSocket.Server({port: 9000});

server.on('connection',(ws,req)=>{
    console.log('Connection');

    ws.on('message',(msg)=>{
        //console.log('Received msg: '+ msg+ 'ip: '+ req.connection.remoteAddress);
        
        if(msg == 'terminate')
        {
            console.log('client out');
            ws.close();
        }
            
        server.clients.forEach(function each(client){
             if(req.connection.remoteAddress != client._socket.remoteAddress && msg !== 'terminate')
                client.send(msg);
         });
    })

})

console.log('Server is listening to port 9000 now.');