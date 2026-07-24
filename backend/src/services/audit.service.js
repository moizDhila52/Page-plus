import * as cheerio from "cheerio";
import { AppError } from "../utils/AppError.js";

export async function auditWebsite(url) {
    // Validate URL
    let parsedUrl;
    try {
        parsedUrl = new URL(url);
    } catch {
        throw new AppError(400, "Invalid URL. Please enter a valid web address.");
    }

    const controller = new AbortController();
    const timeout = setTimeout(() => {
        controller.abort();
    }, 10000); // 10 seconds

    try {
        const start = Date.now();

        const response = await fetch(url, {
            signal: controller.signal,
            headers: {
                "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/124.0.0.0 Safari/537.36"
            }
        });

        clearTimeout(timeout);

        if (!response.ok) {
            if ([401, 403, 429, 503].includes(response.status)) {
                throw new AppError(
                    response.status,
                    "This website blocks automated requests. Try another website."
                );
            }
            throw new AppError(
                response.status,
                `Unable to access site (Status ${response.status}). Try another website.`
            );
        }

        const contentType = response.headers.get("content-type") || "";

        if (!contentType.includes("text/html")) {
            throw new AppError(
                422,
                "URL does not point to an HTML page."
            );
        }

        const responseTime = Date.now() - start;
        const html = await response.text();
        const metrics = parseHtmlMetrics(html, url);

        return {
            url,
            status: response.status,
            responseTime: `${responseTime} ms`,
            ...metrics,
            analyzedAt: new Date().toISOString(),
        };
    } catch (error) {
        clearTimeout(timeout);

        if (error.name === "AbortError") {
            throw new AppError(
                408,
                "Website took too long to respond. Try another website."
            );
        }

        if (error instanceof AppError) {
            throw error;
        }

        throw new AppError(
            500,
            "This website blocks automated requests or is unreachable. Try another website."
        );
    }
}

export function parseHtmlMetrics(html, targetUrl) {
    const parsedUrl = new URL(targetUrl);
    const $ = cheerio.load(html);

    const title = $("title").text().trim();
    const metaDescription = $('meta[name="description"]').attr("content") || "";
    const h1Count = $("h1").length;

    // Images
    const totalImages = $("img").length;
    const imagesWithoutAlt = $("img").filter((i, img) => {
        return !$(img).attr("alt")?.trim();
    }).length;

    // Links
    let internalLinks = 0;
    let externalLinks = 0;
    const hostname = parsedUrl.hostname;

    $("a[href]").each((i, el) => {
        const href = $(el).attr("href")?.trim();
        if (!href || href.startsWith("#") || href.startsWith("javascript:") || href.startsWith("mailto:") || href.startsWith("tel:")) {
            return;
        }

        try {
            const target = new URL(href, targetUrl);
            if (target.hostname === hostname) {
                internalLinks++;
            } else {
                externalLinks++;
            }
        } catch {
            // Ignore malformed hrefs
        }
    });

    const totalLinks = internalLinks + externalLinks;

    // Meta tags & SEO elements
    const canonicalHref = $('link[rel="canonical"]').attr("href") || "";
    const hasCanonical = Boolean(canonicalHref || $('link[rel="canonical"]').length > 0);
    const robotsMeta = $('meta[name="robots"]').attr("content") || "";
    const hasOgTags = $('meta[property^="og:"]').length > 0;

    // Word count
    const text = $("body").text();
    const wordCount = text
        .replace(/\s+/g, " ")
        .trim()
        .split(" ")
        .filter(Boolean).length;

    return {
        title,
        metaDescription,
        h1Count,
        totalImages,
        imagesWithoutAlt,
        totalLinks,
        internalLinks,
        externalLinks,
        hasCanonical,
        canonicalHref,
        robotsMeta,
        hasOgTags,
        wordCount,
    };
}