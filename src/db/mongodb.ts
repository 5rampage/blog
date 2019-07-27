import * as mongoose from 'mongoose';

const mongoDbUrl = 'mongodb://127.0.0.1:8001,127.0.0.1:8002,127.0.0.1:8003/db1?replicaSet=rstest';

export function connect() {
    const maxConnectNum = 5; // 最大connect重试次数
    let connectInterval = null;
    let connectNum = 0;
    return new Promise((resolve, reject) => {
        function connectMongodb() {
            connectNum++;
            if (connectNum > maxConnectNum) {
                clearInterval(connectInterval);
                reject(`数据连接失败`);
                return;
            }
            mongoose.connect(mongoDbUrl, { useNewUrlParser: true });
        }
        connectMongodb();
        /**
         * 连接异常
         */
        mongoose.connection.on('error', (result) => {
            console.log(`fail connect to ${mongoDbUrl}`);
            if (!connectInterval) {
                connectNum = 0;
                connectInterval = setInterval(connectMongodb, 2000);
            }
        });

        /* 连接正常 */
        mongoose.connection.on('connected', (result) => {
            console.log(`connect to ${mongoDbUrl}`);
            if (connectInterval) {
                clearInterval(connectInterval);
                connectInterval = null;
            }
            resolve();
        });

        /**
         * 连接断开
         */
        mongoose.connection.on('disconnected', () => {
            console.log('Mongoose connection disconnected');
            if (!connectInterval) {
                connectNum = 0;
                connectInterval = setInterval(connectMongodb, 2000);
            }
        });
    });
}
