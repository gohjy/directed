"use strict";

import { basicUrl, fetchData, defaultFetch, errorUrl, homeUrl, notFoundUrl } from "./script.js";

const isValidExt = (ext) => {
    if (typeof ext !== "string") return false;
    if (ext.startsWith("dct-") || ext === "dct") return false;
    if (ext.match(/[^a-zA-Z0-9_\-$]/)) return false;
    return true;
}

let addonUrl;
try {
    addonUrl = new URL(new URL(location.href).searchParams.get("pack")).href;
} catch {
    addonUrl = null;
}

if (new URL(location.href).searchParams.has("nobasic")) {
    if (addonUrl && isValidExt(new URL(location.href).searchParams.get("to"))) defaultFetch(addonUrl);
    else if (!new URL(location.href).searchParams.get("to")) location.replace(homeUrl);
    else location.replace(notFoundUrl);
} else {
    const basicRes = await fetchData(basicUrl, new URL(location.href).searchParams.get("to"));
    if (basicRes) location.replace(basicRes);
    else {
        // If it's an error, don't bother checking the addon url
        if (basicRes === false) {
            location.replace(errorUrl);
        } else if (basicRes === null) {
            // ?to= was not present
            location.replace(homeUrl);
        } else if (basicRes === 0) {
            if (addonUrl && isValidExt(new URL(location.href).searchParams.get("to"))) defaultFetch(addonUrl);
            else location.replace(notFoundUrl);
        } else {
            location.replace(errorUrl);
        }
    }
}