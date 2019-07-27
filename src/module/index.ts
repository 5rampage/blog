import Boom = require('@hapi/boom');
import * as compose from 'koa-compose';
import * as Router from 'koa-router';
import { healthRoutes } from './health/health.api';
import { staticsRoutes } from './statics/statics';

const router = new Router();

router.use(healthRoutes);
router.use(staticsRoutes);

export default compose([
    router.routes(),
    router.allowedMethods({
        throw: true,
        notImplemented: () => Boom.notImplemented(),
        methodNotAllowed: () => Boom.methodNotAllowed()
    })
]);
