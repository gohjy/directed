"use strict";

import { basicUrl, fetchData, defaultFetch, errorUrl, homeUrl, notFoundUrl } from "./script.js";

let addonUrl;
try {
    addonUrl = new URL(new URL(location.href).searchParams.get("pack")).href;
} catch {
    addonUrl = null;
}

if (new URL(location.href).searchParams.has("nobasic")) {
    defaultFetch(addonUrl);
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
            if (addonUrl) defaultFetch(addonUrl);
            else location.replace(notFoundUrl);
        } else {
            location.replace(errorUrl);
        }
    }
}