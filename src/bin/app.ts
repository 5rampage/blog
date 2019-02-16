import * as Koa from 'koa';
import * as bodyParser from 'koa-body';
import * as views from 'koa-views';
import * as path from 'path';
import { port } from '../conf';
import errorHandler from '../middlewares/error';
import etag from '../middlewares/etag';
import viewHandler from '../middlewares/views';
// import { connect } from './mongodb';

import xhrRoutes from '../module';

const app = new Koa();

// 允许代理模式
app.proxy = true;

// 模板渲染引擎
app.use(views(path.join(__dirname, '../views'), {
    extension: 'ejs'
}));

// 异常集中处理。业务中的异常推荐都抛到这边，由这个中间件集中处理
app.use(errorHandler);

app.use(viewHandler);

// 缓存控制中间件
app.use(etag);

app.use(
    bodyParser({textLimit: '100mb', jsonLimit: '100mb', formLimit: '100mb'}) // 设置 body 大小限制
);

// 业务模块
app.use(xhrRoutes);

// connect().then(() => {
app.listen(port).addListener('listening', () => {
        console.log('server is started on port: ' + port);
    });
// }).catch((e) => {
//     console.error(`服务启动失败:${e.message}`);
// });
