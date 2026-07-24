export const auditSchema = {
  body: {
    type: "object",
    required: ["url"],
    additionalProperties: false,
    properties: {
      url: {
        type: "string",
        minLength: 1,
      },
    },
  },
  response: {
    200: {
      type: "object",
      properties: {
        success: { type: "boolean" },
        data: {
          type: "object",
          additionalProperties: true,
          properties: {
            url: { type: "string" },
            status: { type: "number" },
            responseTime: { type: "string" },
            title: { type: "string" },
            metaDescription: { type: "string" },
            h1Count: { type: "number" },
            totalImages: { type: "number" },
            imagesWithoutAlt: { type: "number" },
            totalLinks: { type: "number" },
            internalLinks: { type: "number" },
            externalLinks: { type: "number" },
            hasCanonical: { type: "boolean" },
            canonicalHref: { type: "string" },
            robotsMeta: { type: "string" },
            hasOgTags: { type: "boolean" },
            wordCount: { type: "number" },
            analyzedAt: { type: "string" }
          }
        }
      }
    }
  }
};
