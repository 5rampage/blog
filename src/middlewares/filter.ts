import { Context } from 'koa';
import * as pathToRegExp from 'path-to-regexp';

type MiddleWare = (
    ctx: Context,
    next: () => Promise<null>
) => Promise<any>;

export interface IFilterOption {
    exclude?: any[];
    include?: any[];
}

export const filter = (middleWare: MiddleWare) => {
    return (option: IFilterOption = {}) => {
        const filterPath = new FilterPath(option);
        return async (
            ctx: Context,
            next: () => Promise<null>
        ) => {
            const path = ctx.path;
            if (filterPath.exec(path)) {
                await middleWare(ctx, next);
            } else {
                await next();
            }
        };
    };
};

class FilterPath {
    private excludeReg: RegExp[] | null;
    private includeReg: RegExp[] | null;
    constructor(
        private option: IFilterOption
    ) {
        this.excludeReg = this.pathToReg(this.option.exclude);
        this.includeReg = this.pathToReg(this.option.include);
    }

    exec(path: string): boolean {
        let inExclude: boolean;
        let inInclude: boolean;
        let shouldDoMiddleware: boolean;
        if (this.includeReg === null) {
            inExclude = this.pathInList(path, this.excludeReg);
            shouldDoMiddleware = inExclude ?  false : true;
        } else {
            inInclude = this.pathInList(path, this.includeReg);
            shouldDoMiddleware = inInclude ? true : false;
        }
        return shouldDoMiddleware;
    }

    private pathToReg(list?: any[]) {
        if (!list) {
            return null;
        }
        return list.map((path: any) => {
            return pathToRegExp(path, []);
        });
    }

    private pathInList(path: string, list: RegExp[] | null) {
        if (!list) {
            return false;
        }
        return list.some((reg: RegExp) => {
            return reg.test(path);
        });
    }
}
