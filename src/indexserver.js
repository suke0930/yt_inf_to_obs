const { default: OBSWebSocket } = require('obs-websocket-js');
const obs = new OBSWebSocket();
const WebSocket = require('ws');
const { argv } = require('process');

const fs = require('fs');//FILE読み書きするやつ
const Serverconifg = JSON.parse(fs.readFileSync("./conf.json", 'utf8'));//configよみだし
const port = Serverconifg.port;
const ip = Serverconifg.ip;
const key = Serverconifg.key;
const source = Serverconifg.source;
//console.log(Serverconifg)
//const text = "う"

async function obssend(text) {
    //  console.log("BB")
    return new Promise((resolve, reject) => {
        obs.connect('ws://' + ip + ':' + port, key, {
            rpcVersion: 1
        })
            .then(() => {
                //console.log(`Success! We're connected & authenticated.`);

                obs.call("SetInputSettings", {
                    inputName: source,
                    inputSettings: {
                        text: text + "           ",
                    },
                });
            })
            .then(data => {
                obs.disconnect()
                resolve(true);

            })
            .catch(err => { // Promise convention dicates you have a catch on every chain.
                //    console.log(err)
                reject(false);
            });
    })


}
async function sendtext(text) {

    //let time = timebuff;
    //let isrun = false;


    const A = await obssend(text)
        .then(() => {
            console.log("変更成功")
            isrun = true
        })
        .catch(() => {
            console.log("変更失敗 1秒後に再試行します...");
            setTimeout(() => {
                sendtext(text)
            }, 1000);
        })



}
function main() {
    const server = new WebSocket.Server({ port: 29453 });
    server.on('connection', (socket) => {
        console.log(`New client connected: ${socket._socket.remoteAddress}:${socket._socket.remotePort}`);
        socket.on('message', (message) => {

            console.log(`Received message: ${message}`);
            const message2 = JSON.parse(message);
            sendtext("～" + message2.タイトル + "～ " + message2.チャンネル名 + " " + message2.登録者 + "          ")


        });

        socket.on('close', () => {
            console.log('Client disconnected');
        });
    });
    console.log('WebSocket server started on port 29453');

}

main();


// await obs.connect(websocketip, websocketkey, {
    //     rpcVersion: 1
    // });


// const obs = new OBSWebSocket();


// obs.connect({ address: 'localhost:4455', password: '2MQjD2leAnWUReVo' })
//     .then(() => {
//         console.log(`Success! We're connected & authenticated.`);

//         return obs.send('SetTextGDIPlusProperties', {
//             'source': 'TEST',
//             'text': 'new_text'
//         });
//     })
//     .then(data => {
//         console.log(data);
//     })
//     .catch(err => { // Promise convention dicates you have a catch on every chain.
//         console.log(err);
//     });