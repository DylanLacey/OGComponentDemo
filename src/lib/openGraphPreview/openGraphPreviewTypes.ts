export type OpenGraphMetaData = {
    title: string | null
    og_type: string | null
    image_url: string | null
    canonical_url: string | null

    audio_url?: string
    determiner?: "a" | "an" | "the" | "" | "auto"
    description?: string
    locale?: string
    locale_alternative?: string
    site_name?: string
    video_url?: string
}

export const commonMetadataTags = {
    title: "title",
    og_type: "type",
    image_url: "image",
    canonical_url: "url"
}

export const optionalMetadataTags = {
    audio_url: "audio",
    description: "description",
    determiner: "determiner",
    locale: "locale",
    locale_alternative: "locale_alternative",
    site_name: "site_name",
    video_url: "video"
}