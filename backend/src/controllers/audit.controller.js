import { auditWebsite } from "../services/audit.service.js";

export async function auditController(request, reply) {
    try {
        const { url } = request.body;

        const report = await auditWebsite(url);

        return reply.status(200).send({
            success: true,
            data: report,
        });

    } catch (error) {
        return reply.status(error.statusCode || 500).send({
            success: false,
            message: error.message || "Internal Server Error",
        });
    }
}