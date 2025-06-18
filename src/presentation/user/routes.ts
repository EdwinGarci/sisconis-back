import { RouteHandlerInterface } from '@shared/interfaces/route-handler.interface';
import { RouterInterface } from '@shared/interfaces/router.interface';
import { UserController } from '@presentation/user/controller';
import { RouteHandler } from '@shared/types/http.types';

export class UserRoutes implements RouteHandlerInterface {
    constructor(
        private readonly router: RouterInterface,
        private readonly controller: UserController,
    ) {}

    configureRoutes(): void {
        // this.router.post('/', this.controller.create.bind(this.controller) as RouteHandler);

        this.router.get('/', this.controller.index.bind(this.controller) as RouteHandler);

        // this.router.get('/:id', this.controller.findById.bind(this.controller) as RouteHandler);

        // this.router.put('/:id', this.controller.update.bind(this.controller) as RouteHandler);

        // this.router.delete('/:id', this.controller.delete.bind(this.controller) as RouteHandler);
    }
}
