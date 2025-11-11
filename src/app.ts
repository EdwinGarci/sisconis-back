import { ExpressServer } from '@infrastructure/server/express.server';
import { createAppContainer } from './infrastructure/container';

async function main(): Promise<void> {
    const container = createAppContainer();

    const server = container.resolve<ExpressServer>('expressServer');

    await server.start();
}

(async () => {
    await main();
})();
