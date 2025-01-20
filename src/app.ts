import { createDependencies } from './infrastructure';
import { Server } from './presentation/server';

(async () => {
    main();
})();

async function main() {
    const dependencies = createDependencies();
    const server = new Server(dependencies);
    server.start();
}