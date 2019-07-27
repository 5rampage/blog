import * as Koa from 'koa';
import * as bodyParser from 'koa-body';
import * as logger from 'koa-logger';
import * as views from 'koa-views';
import * as path from 'path';
import { port } from '../conf';
import errorHandler from '../middlewares/error';
import etag from '../middlewares/etag';
// import { connect } from './db/mongodb';

import businessRoutes from '../module';

const app = new Koa();

// 允许代理模式
app.proxy = true;

// ejs渲染引擎
app.use(views(path.join(__dirname, '../views'), {
    extension: 'ejs'
}));

// log
app.use(logger());

// 异常处理
app.use(errorHandler);

// etag
app.use(etag);

app.use(
    bodyParser({ textLimit: '100mb', jsonLimit: '100mb', formLimit: '100mb' }) // 设置 body 大小限制
);

// 业务模块
app.use(businessRoutes);

// connect().then(() => {
app.listen(port).addListener('listening', () => {
    console.log('server is started on port: ' + port);
});
// }).catch((e) => {
//     console.error(`服务启动失败:${e.message}`);
// });
