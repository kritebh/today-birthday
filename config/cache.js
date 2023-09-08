import { caching } from "cache-manager";

import { CACHE_TTL, MAX_ITEM } from "./constants.js";

export let cache;

//initialize cache
export async function cacheInit() {
    cache = await caching("memory", {
        max: MAX_ITEM,
        ttl: CACHE_TTL /*milliseconds*/
    });
}
