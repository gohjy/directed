"use strict";

const dataUrl = "https://gohjy.github.io/directed-data/data.json";

fetch(dataUrl)
.then(res => res.json())
.then(jsonRes => {
    const newTd = (x) => {
        const td = document.createElement("td");
        if (x !== null && x !== undefined) {
            td.textContent = x;
        }
        return td;
    }
    const table = document.querySelector("#content-holder");
    for (let [shortcut, url] of Object.entries(jsonRes)) {
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
        table.append(row);
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