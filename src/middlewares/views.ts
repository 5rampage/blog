import { contextPath } from '../conf';

export default async (ctx, next) => {
    const reqPath = ctx.path;
    if (/\.html$/.test(reqPath)) {
        const viewPath = reqPath.replace(`${contextPath}/`, '').replace(/\.html$/, '');
        await ctx.render(viewPath);
    } else {
        await next();
    }
}