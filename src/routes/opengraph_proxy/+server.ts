import { error, type RequestHandler } from '@sveltejs/kit';
import { dev } from '$app/environment';
import { fetchAndExtractMetaData } from "$lib/openGraphPreview/openGraphPreview"

export const GET: RequestHandler = async ( {url, params, fetch} ) => {
    const previewUrl = url.searchParams.get("site") ?? ""
    const response = await fetchAndExtractMetaData(previewUrl, fetch)
    return new Response(await JSON.stringify(response))
}