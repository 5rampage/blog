import { Context } from 'koa';
import * as compose from 'koa-compose';
import etag = require('koa-etag');

const conditional = async (ctx: Context, next: any) => {
    await next();
    if (ctx.fresh) {
        ctx.status = 304;
        ctx.body = null;
    }
};

export default compose([conditional, etag()]);
