import { Server } from "@presentation/server";

(async () => {
    main();
})();

async function main() {
    const server = new Server();
    server.start();
}