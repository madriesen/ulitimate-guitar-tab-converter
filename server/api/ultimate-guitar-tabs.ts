import {H3Event} from "h3";

// Create an in-memory cache
const cache = new Map<string, string>();

export default defineEventHandler(async (event: H3Event) => {
    const query = getQuery(event);
    const url = query.url as string;

    if (cache.has(url)) {
        console.log(`Cache hit for URL: ${url}`);
        return cache.get(url);
    }

    console.log(`Fetching URL: ${url}`);


    // fetch the whole page
    const response = await fetch(`https://api.codetabs.com/v1/proxy/?quest=${url}`);
    const data = await response.text();

    // Store the fetched result in the cache
    cache.set(url, data);

    return data;
})
