import type { PageData, PageLoad } from "./$types";
import { dev } from "$app/environment";

export const load: PageLoad = ({ url }) => {
    return {
        ownUrl: dev ? `${url.pathname}` : url.toString()
    }
}