import { optionalMetadataTags } from "./openGraphPreviewTypes"
import type { OpenGraphMetaData } from "./openGraphPreviewTypes";

import * as cheerio from "cheerio";

export const fetchAndExtractMetaData = async (metadataSource: string, svelteFetch: typeof fetch = fetch): Promise<OpenGraphMetaData> => {
    const response = await svelteFetch( metadataSource )
    const responseStream = await response.arrayBuffer()

    return extractOpenGraphMetaData(responseStream)
}

export const extractOpenGraphMetaData = async (pageContent: string | ArrayBuffer): Promise<OpenGraphMetaData> => {

    const extractTag = (tag: string): string | null => {
        return cheerioAPI(`meta[property="og:${tag}"]`)?.attr('content') || null
    }

    const extractOptionalProperties = (properties: {[propName: string]: string}, prefix: string = "") => {
        return Object.entries(properties).reduce((md, [key, tag]) => {
            const prefixedTag = (prefix) 
                ? `${prefix}:${tag}`
                : tag
            
            return {
                ...md,
                ...(extractTag(prefixedTag) && {[key]: extractTag(prefixedTag)})
            }
        }, {})
    }

    const fullPageContents = (typeof pageContent === 'string') 
        ? pageContent 
        : Buffer.from(pageContent)

    const cheerioAPI = cheerio.load(fullPageContents)

    let ogMetadata = {
        title: extractTag("title"),
        ogType: extractTag("type"),
        imageUrl: extractTag("image"),
        canonicalUrl: extractTag("url"),
    }

    ogMetadata = {...ogMetadata, ...extractOptionalProperties(optionalMetadataTags)}

    return ogMetadata
}