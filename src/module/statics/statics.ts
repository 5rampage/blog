import { ParameterizedContext } from 'koa';
import * as Router from 'koa-router';
import * as send from 'koa-send';
import { contextPath, viewPath } from '../../conf';

const router = new Router({
    prefix: contextPath
});
router.get('/', async (ctx: ParameterizedContext) => {
    await send(ctx, 'index.html', {
        root: viewPath
    });
});
router.get('/*.(html|ico)', async (ctx: ParameterizedContext) => {
    const reqPath = ctx.path.replace(contextPath, '');
    console.log('ctx path', ctx.path);
    await send(ctx, reqPath, {
        root: viewPath
    });
});
router.get('/*.view', async (ctx: ParameterizedContext) => {
    const reqPath = ctx.path.replace(contextPath, '').replace(/\.view$/, '');
    await ctx.render(reqPath);
});
router.get('/*assets/*', async (ctx: ParameterizedContext) => {
    const reqPath = ctx.path.replace(contextPath, '');
    await send(ctx, reqPath, {
        root: viewPath
    });
});

export const staticsRoutes = router.routes();
