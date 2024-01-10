import { error } from '@sveltejs/kit';
import type { RequestHandler } from '../$types';
import { dev } from '$app/environment';
import { default as stream } from 'node:stream';
import type { ReadableStream } from 'node:stream/web';

export const GET: RequestHandler = async ({url, params }) => {
    const preview_url = dev 
        ? `${url.protocol}//${url.host}/${url.searchParams.get("site")}` 
        : url.searchParams.get("site") 
        ?? ""
        
    let head_only = ""
    let head_present = false

    const response = await fetch(new URL(`${preview_url}`), {method: "GET"} )
    const response_stream = stream.Readable.fromWeb(response.body as ReadableStream<Uint8Array>)

    for await (const chunk of response_stream) {
        let string_chunk = chunk.toString()
        head_only+= string_chunk

        if(head_only.includes("</head>")) {
            head_present = true
            break
        } else {

        }
    }

    if(head_present) {
        return new Response(head_only)
    }

    error(404, "Site Not Found")
}