import * as Router from 'koa-router';
import { contextPath, xhrPrefix } from '../../conf';

const router = new Router({
    prefix: `${contextPath}${xhrPrefix}/health`
});

router.get('/check.json', (ctx: any) => {
    ctx.body = {
        code: 200
    };
});

export const healthRoutes = router.routes();
