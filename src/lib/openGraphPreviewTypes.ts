export type OpenGraphCommonMetaData = {
    title: string | null
    og_type: string | null
    image_url: URL | null
    canonical_url: URL | null

    audio_url?: URL
    determiner?: "a" | "an" | "the" | "" | "auto"
    description?: string
    locale?: string
    locale_alternative?: string
    site_name?: string
    video_url?: URL
}

export interface OpenGraphExtraMetadata {
    url: URL | null;
    secure_url: URL | null;
    type: string | null;
}

export type MediaMetaData = { 
    width: number | null,  
    height: number | null,
    alt: string | null
}

export type ProfileMetadata = {
    first_name: string | null,
    last_name: string | null,
    username: string | null,
    pronoun: string | "they",
    object_pronoun: string | "them"
}

export type ArticleMetadata = {
    published_at: Date | null,
    modified_at: Date | null,
    expires_at: Date | null,
    author_data: ProfileMetadata | null,
    section: string | null,
    tag_array: Array<string> | null
}

export type BookMetadata = {
    author_data: ProfileMetadata | null,
    isbn: string | null,
    release_date: Date,
    tag_array: Array<string>
}

export type OpenGraphMetaData =
    |  OpenGraphCommonMetaData
    |  OpenGraphCommonMetaData & {og_type: "profile"} & {profile_data: ProfileMetadata}
    |  OpenGraphCommonMetaData & {og_type: "article"} & {article_data: ArticleMetadata}
    |  OpenGraphCommonMetaData & {og_type: "book"} & {book_data: BookMetadata}
    |  OpenGraphCommonMetaData & {og_type: "audio" } & {audio_data: OpenGraphExtraMetadata }
    |  OpenGraphCommonMetaData & {og_type: "image" } & {image_data: OpenGraphExtraMetadata & MediaMetaData }
    |  OpenGraphCommonMetaData & {og_type: "video" } & {video_data: OpenGraphExtraMetadata & MediaMetaData }

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

const media_keys = {url: "url", secure_url: "secure_url", type: "type"}
const visual_keys = {width: "width", height: "height", alt: "alt"}
export const image_keys = {...visual_keys, ...media_keys}
export const video_keys = {...visual_keys, ...media_keys}
export const audio_keys = media_keys