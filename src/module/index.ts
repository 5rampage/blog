/**
 * @description
 *  module 目录下放置业务相关的代码。按业务模块组织代码格式
 *  例如：有一个用户管理模块,对应的目录结构为
 *  user
 *  |__user.api.ts  //放置路由映射处理，做为controller
 *  |__user.service.ts  //业务处理逻辑代码
 */
import Boom = require('boom');
import * as compose from 'koa-compose';
import * as Router from 'koa-router';
import { userRoutes } from './user/user.api';

const router = new Router();

router.use(userRoutes);

export default compose([
    router.routes(),
    router.allowedMethods({
        throw: true,
        notImplemented: () => Boom.notImplemented(),
        methodNotAllowed: () => Boom.methodNotAllowed()
    })
]);
