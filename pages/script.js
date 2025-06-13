"use strict";

const basicUrl = "https://gohjy.github.io/directed-data/data.json";

const errorUrl = "./error.html";
const homeUrl = "./home.html";
const notFoundUrl = "./list.html#gtn";

const fetchData = async (dataUrl, goto) => {
    // Takes a single param, dataUrl
    // Returns false if there's any error (eg network error)
    // Returns 0 if the given pagename (goto) is not found within the data
    // Returns null if goto is not given
    // Returns the URL of the specified resource if valid

    return await fetch(dataUrl, { cache: "reload" })
    .then(res => res.json())
    .then(jsonRes => {
        if (goto && goto.startsWith?.("_")) {
            return 0; // treat _url comments as not found
        } else if (goto && jsonRes[goto.toLowerCase()]) {
            let redirUrl = new URL(jsonRes[goto.toLowerCase()]);
            if (!redirUrl.protocol === "https") {
                // If it's not served over https, we just pretend it doesn't exist
                return 0;
            }
            return redirUrl.href; // return the url
        } else if (goto) {
            return 0; // not found
        } else {
            return null; // Return null for redirect to home page (no ?to=pagename param present)
        }
    })
    .catch((e) => {
        return false; // Return false if anything goes wrong
    });
}

const defaultFetch = async (url) => {
    const result = await fetchData(url, new URL(location.href).searchParams.get("to"));
    if (result) {
        location.replace(result);
        return true;
    } else {
        if (result === false) {
            location.replace(errorUrl);
        } else if (result === null) {
            location.replace(homeUrl);
        } else if (result === 0) {
            location.replace(notFoundUrl);
        } else {
            location.replace(errorUrl);
        }
        return false;
    }
}

export { basicUrl, fetchData, defaultFetch, errorUrl, homeUrl, notFoundUrl };