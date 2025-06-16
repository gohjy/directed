"use strict";

import { basicUrl, fetchData, defaultFetch, errorUrl, homeUrl, notFoundUrl } from "./script.js";

const isValidExt = (ext) => {
    if (typeof ext !== "string") return false;
    if (ext.startsWith("dct-") || ext === "dct") return false;
    if (ext.match(/[^a-zA-Z0-9_\-$]/)) return false;
    return true;
}

const goto = new URL(location.href).searchParams.get("to");

let addonUrl;
try {
    addonUrl = new URL(new URL(location.href).searchParams.get("pack")).href;
} catch {
    addonUrl = null;
}

let searchEngine = null;
if (location.pathname.includes("search.html")) {
    searchEngine = ({
        "google": "https://google.com/search?q=%s",
        "g-noai": "https://google.com/search?q=%s+-noai",
        "ddg": "https://duckduckgo.com/?q=%s"
    })[new URL(location.href).searchParams.get("search")] || null;
}

if (new URL(location.href).searchParams.has("nobasic")) {
    if (addonUrl && isValidExt(goto)) defaultFetch(addonUrl);
    else if (!goto) location.replace(homeUrl);
    else {
        if (searchEngine) location.replace(searchEngine.replace("%s", goto));
        else location.replace(notFoundUrl);
    }
} else {
    const basicRes = await fetchData(basicUrl, goto);
    if (basicRes) location.replace(basicRes);
    else {
        // If it's an error, don't bother checking the addon url
        if (basicRes === false) {
            location.replace(errorUrl);
        } else if (basicRes === null) {
            // ?to= was not present
            location.replace(homeUrl);
        } else if (basicRes === 0) {
            if (addonUrl && isValidExt(goto)) defaultFetch(addonUrl, {nfUrl: searchEngine % goto});
            else if (searchEngine) location.replace(searchEngine.replace("%s", goto));
            else location.replace(notFoundUrl);
        } else {
            location.replace(errorUrl);
        }
    }
}