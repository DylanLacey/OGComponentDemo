import { optionalMetadataTags } from "./openGraphPreviewTypes"
import type { OpenGraphMetaData } from "./openGraphPreviewTypes";

import { default as stream } from 'node:stream';
import type { ReadableStream } from 'node:stream/web';

import * as cheerio from "cheerio";

export const fetchAndExtractMetaData = async (metadataSource: string, svelteFetch: typeof fetch = fetch): Promise<OpenGraphMetaData> => {
    const response = await svelteFetch(new URL(metadataSource), {method: "GET"} )
    const responseStream = await response.arrayBuffer()

    return extractOpenGraphMetaData(responseStream)
}

export const extractOpenGraphMetaData = async (pageContent: string | ArrayBuffer): Promise<OpenGraphMetaData> => {

    const extract_tag = (tag: string): string | null => {
        return cheerioAPI(`meta[property="og:${tag}"]`)?.attr('content') || null
    }

    const extract_optional_properties = (properties: {[propName: string]: string}, prefix: string = "") => {
        return Object.entries(properties).reduce((md, [key, tag]) => {
            const prefixed_tag = (prefix) 
                ? `${prefix}:${tag}`
                : tag
            
            return {
                ...md,
                ...(extract_tag(prefixed_tag) && {[key]: extract_tag(prefixed_tag)})
            }
        }, {})
    }

    let fullPageContents = (typeof pageContent === 'string') 
        ? pageContent 
        : Buffer.from(pageContent)

    const cheerioAPI = cheerio.load(fullPageContents)

    let og_metadata = {
        title: extract_tag("title"),
        og_type: extract_tag("type"),
        image_url: extract_tag("image"),
        canonical_url: extract_tag("url"),
    }

    og_metadata = {...og_metadata, ...extract_optional_properties(optionalMetadataTags)}

    return og_metadata
}