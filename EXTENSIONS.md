# Extensions for Directed
As of 13 June 2025, Directed allows you to make **extension datasets** for Directed by using the following link:

`https://gohjy.github.io/directed/ext.html?pack=yoururlhere&to=pagename`

instead of the default

`https://gohjy.github.io/directed/?to=pagename`

- `pack` should be a URL (properly escaped) to a JSON file in the same structure as the one at the [directed-data repo](https://github.com/gohjy/directed-data). 
- `to` remains the same shortcut name
- Optionally, specify the `nobasic` param to exclude the basic dataset: `.../?pack=yoururl&to=pagename&nobasic`

The order of the parameters does not matter.

When this extension URL is used, Directed will attempt the following:
- First, Directed will use the **base URL** (https://gohjy.github.io/directed-data/data.json) to try and find a result from there.
- If no result is found, Directed attempts to fetch the URL given in the `pack` URL param.
- If neither of those work, the request is treated as not found and the user is redirected to the not found page (currently `list.html` with a informatory banner).

It's worth noting that if any URL in your extension pack has a protocol other than `https:`, it's treated as if it did not exist by Directed.

You may want to hold off creating extension datasets for now though, as the format for a dataset may change very soon as part of a planned restructure of data.
