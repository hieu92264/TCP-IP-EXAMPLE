const net = require('net');
const readline = require('readline');

const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

const client = new net.Socket();

client.connect(12264, 'localhost', () => {
    console.log('Connected to server');

    rl.on('line', (input) => {
        client.write(input);
    });
});

client.on('data', (data) =>{
    console.log('Server: ' + data);
    //client.destroy();
});

client.on('close', () => {
    console.log('Connection closed');
});