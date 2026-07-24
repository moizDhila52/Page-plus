import app from "./app.js";
import { config } from "./config/env.js";

const startServer = async () => {
    try {
        await app.listen({
            port: config.PORT,
            host: "0.0.0.0",
        });

        console.log(`Server running on port ${config.PORT}`);
    } catch (err) {
        app.log.error(err);
        process.exit(1);
    }
};

startServer();