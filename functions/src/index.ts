import { onRequest } from "firebase-functions/v2/https";
import * as logger from "firebase-functions/logger";

/**
 * Returns the latest page version.
 * Set Cache-Control to no-store so clients never cache the response.
 * Add permissive CORS if you’re calling from your hosted page domain(s).
 */
export const getPageVersion = onRequest(
    {
        cors: ["https://webtrit-app.web.app", "https://webtrit-app.firebaseapp.com"],
        region: "europe-west1",
    },
    (req, res) => {
        const VERSION = process.env.PAGE_VERSION ?? "1.0.0";

        logger.info("Serving page version", {version: VERSION});
        res.set("Cache-Control", "no-store, no-cache, must-revalidate, max-age=0");
        res.set("Pragma", "no-cache");
        res.set("Expires", "0");

        res.status(200).json({version: VERSION});
    }
);
