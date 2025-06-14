"use strict";

const dataUrl = "https://gohjy.github.io/directed-data/data.json";

if (location.hash === "#gtn") {
    document.querySelector("#gtn").style.display = "block";
    location.hash = "";
}

fetch(dataUrl)
.then(res => res.json())
.then(json => {
    const jsonRes = json.links;
    if (!jsonRes) {
        throw new Error("json response not in proper format");
    }
    const jsonData = Object.entries(jsonRes).sort(([a], [b]) => a > b ? 1 : a < b ? -1 : 0); // sort alphabetically
    const newTd = (x) => {
        const td = document.createElement("td");
        if (x !== null && x !== undefined) {
            td.textContent = x;
        }
        return td;
    }
    const table = document.querySelector("#content-holder");
    table.innerHTML = "";
    let dctLinkCount = 0;
    for (let [shortcut, url] of jsonData) {
        if (shortcut.match(/[^a-zA-Z0-9_\-$]/)) continue;
        const row = document.createElement("tr");
        row.dataset.shortcut = shortcut;
        const shortcutCell = newTd();
        const shortcutLink = document.createElement("a");
        shortcutLink.href = "./?to=" + encodeURIComponent(shortcut);
        shortcutLink.target = "_blank";
        shortcutLink.textContent = shortcut;
        shortcutCell.append(shortcutLink);
        const urlCell = newTd(url);
        row.append(shortcutCell, urlCell);
        console.log(shortcut)
        if (shortcut.startsWith("dct-") || shortcut === "dct") {
            if (table.children[dctLinkCount-1]) table.children[dctLinkCount-1].after(row);
            else table.prepend(row);
            dctLinkCount++;
        } else {
            table.append(row);
        }
    }
    document.querySelector("#search-input").removeAttribute("disabled");
})
.catch((e) => {
    location.replace("./error.html");
    throw e;
});

const inputHandler = (ev) => {
    const rows = Array.from(document.querySelectorAll("#content-holder tr"));
    const query = ev.target.value.trim().replaceAll(/[^a-zA-Z0-9]/g, "\\$&");
    for (let row of rows) {
        if (row.dataset?.shortcut?.trim().match(new RegExp(`\\b${query}`, "i"))) {
            row.classList.remove("invisible");
        } else {
            row.classList.add("invisible");
        }
    }
}

document.querySelector("#search-input").addEventListener("input", inputHandler);