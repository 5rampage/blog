import { ParameterizedContext } from 'koa';
import * as compose from 'koa-compose';
const etag = require('koa-etag');

const conditional = async (ctx: ParameterizedContext, next: any) => {
    await next();
    if (ctx.fresh) {
        ctx.status = 304;
        ctx.body = null;
    }
};

export default compose([conditional, etag()]);
