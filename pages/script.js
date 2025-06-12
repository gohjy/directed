"use strict";

const dataUrl = "https://gohjy.github.io/directed-data/data.json";

fetch(dataUrl, { cache: "reload" })
.then(res => res.json())
.then(jsonRes => {
    const goto = new URL(location.href).searchParams.get("to");
    if (goto && goto.startsWith?.("_")) {
        location.replace("./list.html"); // If accessing a _url (comment)
    } else if (goto && jsonRes[goto.toLowerCase()]) {
        location.replace(jsonRes[goto.toLowerCase()]);
    } else if (goto) {
        location.replace("./list.html");
    } else {
        location.replace("./home.html");
    }
})
.catch((e) => {
    location.replace("./error.html");
    throw e;
});