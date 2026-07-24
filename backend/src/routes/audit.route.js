import { auditController } from "../controllers/audit.controller.js";
import { auditSchema } from "../schemas/audit.schemas.js";

export default async function auditRoutes(fastify) {

    fastify.post(
        "/audit",
        {
            schema: auditSchema
        },
        auditController
    );

}