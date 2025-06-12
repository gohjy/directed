# Directed
***IMPORTANT:** Directed is in beta! Expect things to break or not work properly! If you have any feedback, let me know - file an issue or open a PR in the appropriate repo (see bottom of README).*

Simple redirection service - enter the site shortcut and hit Enter. No ads, no phishing attacks. Just simple JS redirects.

Most of this README is also available on the [site][site-link].

## About Directed
Directed is a simple redirection service that redirects you to the page you're looking for.
```
https://gohjy.github.io/directed/?to=pagename
```
You can view a list of all Directed links in the database.

## Use Directed
For easy access, you can drag the bookmarklet on the [home page][site-link] to your bookmarks bar. (On mobile devices, bookmark the Directed homepage then edit the bookmark and copy and paste the link address on the homepage into the URL field.)

On Chrome and Edge, you can also set a shortcut for Directed - go to your browser settings and follow the steps for adding a site search.

## Inspiration
Directed was born out of my personal frustration with Google's sponsored search results, which can sometimes number 3 or 4 per search and make it much harder to find the actual link I'm looking for.

I use many online services with too many URLs to remember - sometimes more than one per service - but searching for the service on Google often returns many sponsored ads, some of which are phishing sites as well.

Directed gets you direct to what you're looking for with just the service name - no fake sites, no sponsored ads.

---
## Source
Directed's source code and database is available in this repo. If you spot any errors in the redirect or frontend code, you can raise an issue or open a PR in this repo; if you want to suggest an edit or new page for Directed, take a look at the [data repo](https://github.com/gohjy/directed-data).

## Deployment
The `pages` folder is deployed manually when needed, and is also scheduled to be deployed every Friday at 2038 hours UTC.


[site-link]: https://gohjy.github.io/directed/home
