import Fastify from "fastify";

import corsPlugin from "./plugins/cors.js";
import auditRoutes from "./routes/audit.route.js";

const app = Fastify({
    logger: true,
});

await app.register(corsPlugin);

app.get("/", async () => ({
    success: true,
    message: "Page Pulse API is running 🚀"
}));

app.post("/test", async (request, reply) => {
    console.log(request.headers);
    console.log(request.body);

    return {
        success: true,
        body: request.body
    };
}); 

await app.register(auditRoutes, {
    prefix: "/api/v1"
});

export default app;