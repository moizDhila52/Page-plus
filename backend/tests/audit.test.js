import test from "node:test";
import assert from "node:assert/strict";
import { parseHtmlMetrics, auditWebsite } from "../src/services/audit.service.js";
import { AppError } from "../src/utils/AppError.js";

test("Audit Service Tests", async (t) => {
    await t.test("Happy Path: parseHtmlMetrics correctly extracts all SEO metrics from valid HTML", () => {
        const sampleHtml = `
            <!DOCTYPE html>
            <html lang="en">
            <head>
                <title>Test Page Title</title>
                <meta name="description" content="This is a test meta description for SEO audit." />
                <link rel="canonical" href="https://example.com/test" />
                <meta property="og:title" content="Open Graph Test Title" />
                <meta name="robots" content="index, follow" />
            </head>
            <body>
                <h1>Main Heading H1</h1>
                <p>Welcome to our example page. This page contains sample content to verify word count calculation.</p>
                <img src="/logo.png" alt="Company Logo" />
                <img src="/banner.png" />
                <a href="/about">Internal Link 1</a>
                <a href="https://example.com/contact">Internal Link 2</a>
                <a href="https://google.com">External Link</a>
            </body>
            </html>
        `;

        const metrics = parseHtmlMetrics(sampleHtml, "https://example.com");

        assert.equal(metrics.title, "Test Page Title");
        assert.equal(metrics.metaDescription, "This is a test meta description for SEO audit.");
        assert.equal(metrics.h1Count, 1);
        assert.equal(metrics.totalImages, 2);
        assert.equal(metrics.imagesWithoutAlt, 1);
        assert.equal(metrics.totalLinks, 3);
        assert.equal(metrics.internalLinks, 2);
        assert.equal(metrics.externalLinks, 1);
        assert.equal(metrics.hasCanonical, true);
        assert.equal(metrics.canonicalHref, "https://example.com/test");
        assert.equal(metrics.hasOgTags, true);
        assert.equal(metrics.robotsMeta, "index, follow");
        assert.ok(metrics.wordCount > 10);
    });

    await t.test("Failure Case 1: auditWebsite rejects malformed / invalid URL", async () => {
        await assert.rejects(
            async () => {
                await auditWebsite("invalid-url-format");
            },
            (err) => {
                assert.ok(err instanceof AppError);
                assert.equal(err.statusCode, 400);
                assert.equal(err.message, "Invalid URL. Please enter a valid web address.");
                return true;
            }
        );
    });

    await t.test("Failure Case 2: auditWebsite handles non-existent or unreachable host cleanly", async () => {
        await assert.rejects(
            async () => {
                await auditWebsite("https://this-domain-definitely-does-not-exist-123456789.com");
            },
            (err) => {
                assert.ok(err instanceof AppError);
                assert.equal(err.statusCode, 500);
                assert.ok(err.message.includes("blocks automated requests or is unreachable"));
                return true;
            }
        );
    });
});
