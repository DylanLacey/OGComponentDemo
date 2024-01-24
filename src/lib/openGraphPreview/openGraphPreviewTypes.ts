export type OpenGraphMetaData = {
    title: string | null
    ogType: string | null
    imageUrl: string | null
    canonicalUrl: string | null

    audioUrl?: string
    determiner?: "a" | "an" | "the" | "" | "auto"
    description?: string
    locale?: string
    localeAlternative?: string
    siteName?: string
    videoUrl?: string
}

export const commonMetadataTags = {
    title: "title",
    ogType: "type",
    imageUrl: "image",
    canonicalUrl: "url"
}

export const optionalMetadataTags = {
    audioUrl: "audio",
    description: "description",
    determiner: "determiner",
    locale: "locale",
    localeAlternatives: "locale_alternative",
    siteName: "site_name",
    videoUrl: "video"
}