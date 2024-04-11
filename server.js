const net = require("net");
const readline = require("readline");
var count = 0;

const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

const server = net.createServer((socket) => {
    count++;
    console.log(count.toString() + ": Ready!");
    socket.on("data", (clientData) => {
        console.log("Client data: ", clientData.toString());
        if(clientData.toString() == "LOAD") {
            socket.write("Total client connected: " + count.toString());
        }
        if(clientData.toString() == "QUIT") {
            socket.write("Goodbye!");
            socket.destroy();
            server.close();
        }
    });

    socket.on("end", () => {
        console.log("A client just disconnected!");
    });
    rl.on("line", (input) => {
        socket.write(input);
    });

});


server.listen(12264, "localhost");

