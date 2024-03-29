import type { PageLoad } from "./$types";
import { dev } from "$app/environment";

export const load: PageLoad = ({ url }) => {
    return {
        ownUrl: dev ? `${url.pathname}` : url.toString(),
        ownHostPrefix: dev ? `/` : `${url.origin}`
    }
}