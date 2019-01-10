import * as compose from 'koa-compose';
import * as Router from 'koa-router';
import { contextPath, xhrPrefix } from '../../conf';

const router = new Router({
    prefix: `${contextPath}${xhrPrefix}/user`
});

router.get('/getUserInfo.json', (ctx: any) => {
    ctx.body = {
        code: 200,
        data: ctx.openIDInfo
    };
});

export const userRoutes = router.routes();
