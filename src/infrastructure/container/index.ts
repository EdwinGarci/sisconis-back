import { AwilixContainer, createContainer } from 'awilix';
import { registerUserModule } from './modules/user.module';
import { Cradle } from './types';
import { registerCommonModule } from './modules/common.module';

export function createAppContainer(): AwilixContainer<Cradle> {
    const container = createContainer<Cradle>({
        injectionMode: 'CLASSIC',
    });

    registerCommonModule(container);
    registerUserModule(container);

    return container;
}

export const container = createAppContainer();
