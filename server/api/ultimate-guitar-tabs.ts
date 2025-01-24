import {H3Event} from "h3";


export default defineEventHandler(async (event: H3Event) => {
    const query = getQuery(event);
    const url = query.url as string;

    // fetch the whole page
    const response = await fetch(`https://api.codetabs.com/v1/proxy/?quest=${url}`);
    return await response.text()
})
