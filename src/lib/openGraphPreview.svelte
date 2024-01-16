<script lang="ts">
    import type {OpenGraphMetaData} from "./openGraphPreviewTypes";
    import { commonMetadataTags, optionalMetadataTags, audio_keys, video_keys, image_keys } from "./openGraphPreviewTypes";
	import { onMount } from "svelte";
    import { dev } from "$app/environment";
    import * as cheerio from "cheerio";

    import defaultImageUrl from "$lib/images/hal-gatewood-tZc3vjPCk-Q-unsplash.jpg"

    export let site: string = "";
    export let alwaysDisplay: boolean = true;

    const ensureValidURL = (potentialUrl: string): URL | null => {
        // If we're in dev mode, make this URL fully qualified
        const potential_url = (dev && !potentialUrl.startsWith("http"))
            ? `http://%BASE_URL%${potentialUrl}`
            : potentialUrl

        try {
            if (typeof potential_url === "string") {
                return new URL(potential_url)
            }
        } catch (e) { } // Oops, wasn't a URL after all

        return null
    }

    let og_metadata: OpenGraphMetaData = alwaysDisplay
        ? { title: site, og_type: "webpage", image_url: ensureValidURL(defaultImageUrl), canonical_url: ensureValidURL(site) }
        : { title: null, og_type: null, image_url: null, canonical_url: null }
    

    let mediaType: string
    let imgPreview: {}

    onMount( async () => {
        const request_url = new URL(`http://${window.location.host}/opengraph_proxy`)
        request_url.searchParams.append("site", site)

        const response = await fetch(request_url, {method: "GET"} )
        const header_data = cheerio.load(await response.text())

        const extract_tag = (tag: string): string | null => {
            let found_tag = header_data(`meta[property="og:${tag}"]`)?.attr('content') || null
            return found_tag
        }

        const extract_url = (tag: string): URL | null => {
            const tag_contents = extract_tag(tag)
            if (tag_contents == null) { return null }

            // If we're in dev mode, make this URL fully qualified
            const potential_url = (dev && !tag_contents.startsWith("http"))
                ? `http://${window.location.host}${tag_contents}`
                : tag_contents

            try {
                if (typeof potential_url === "string") {
                    return new URL(potential_url)
                }
            } catch (e) { }

            return null
        }

        const extract_optional_properties = (properties: {[propName: string]: string}, prefix: string = "") => {
            return Object.entries(properties).reduce((md, [key, tag]) => {
                const prefixed_tag = (prefix) 
                    ? `${prefix}:${tag}`
                    : tag
                
                if (key.endsWith("url")) {
                    return {
                        ...md,
                        ...(extract_url(prefixed_tag) && {[key]: extract_url(prefixed_tag)})
                    }
                } else {
                    return {
                        ...md,
                        ...(extract_tag(prefixed_tag) && {[key]: extract_tag(prefixed_tag)})
                    }
                }
            }, {})
        }

        og_metadata = {
            title: extract_tag("title"),
            og_type: extract_tag("type"),
            image_url: extract_url("image"),
            canonical_url: extract_url("url"),
        }

        og_metadata = {...og_metadata, ...extract_optional_properties(optionalMetadataTags)}

        let mediaMetadata
        switch(og_metadata.og_type) {
            case "audio":
                mediaType = "audioMetadata"
                mediaMetadata = extract_optional_properties(audio_keys, "audio_data")
                break;
            case "image":
                mediaType = "imageMetadata"
                mediaMetadata = extract_optional_properties(image_keys, "image_data")
                break;
            case "video":
                mediaType = "video"
                mediaMetadata = extract_optional_properties(video_keys, "video_data")
                break;
            default:
                break;
        }

        if (mediaType) {
            og_metadata = {...og_metadata, [mediaType]: mediaMetadata}
        }

        if (og_metadata.image_url) imgPreview = {...imgPreview, src: og_metadata.image_url}
        if (og_metadata.image_url) imgPreview = {...imgPreview, src: og_metadata.image_url}
    });
</script>


{#if (og_metadata.canonical_url)}
<div class="og_container">
    <a href={og_metadata.canonical_url.toString()}>
        <div class="og_preview">
            {#if (og_metadata.image_url)}
            <div class="og_media_preview">
                <img src={og_metadata.image_url.toString()} alt={`Preview Image for ${og_metadata.title}`}/>
            </div>
            {/if}

            {#if (og_metadata.title)}
                <div class="og_title og_item">
                    <h1>{og_metadata.title}</h1>
                </div>
            {:else}
                <div class="og_title og_item og_canonical_title">
                    <h1>{og_metadata.canonical_url}</h1>
                </div>
            {/if}
            
            {#if (og_metadata.description)}
                <div class="og_item og_description">{og_metadata.description}</div>
            {/if}

        </div>
    </a>
</div>
{/if}

<style>
    a:link {
        text-decoration: none;
        color: none;
    }

    a:visited {
        text-decoration: none;
    }

    a:active {
        text-decoration: none;
    }

    a {
        color: black;
    }

    .og_preview:hover {
        box-shadow: 2px 2px 2px grey;
    }

    .og_container {
        border-width: 1px;
        border-style: solid;
        border-radius: 5px;
        border-color: grey;
    }

    .og_preview {
        display: grid;
    }

    .og_title {
        padding-left: 1em;
        flex-wrap: wrap;
    }

    h1 {
        margin-bottom:0.5em;
    }

    .og_description {
        padding: 1em;
    }

    .og_media_preview {
        grid-row: span 2;
    }

    .og_media_preview img {
            height: 100%;
            width: 100%;
            object-fit: cover;
    }

    @media (max-width:639px) {
        .og_preview {
            grid-template-columns: 1;
        }

        .og_container {
            max-width: 100%;
        }

        .og_title {
            order: 0;
        }

        .og_media_preview {
            order: 1;
        }

        .og_media_preview img {
            width: 100%;
        }

        .og_description {
            order: 1;
        }
    }

    @media (min-width:639px) {
        .og_preview {
            max-height: 315px;
            flex-direction: row;
            justify-content: start;
            grid-template-columns: 50% 50%;
            grid-template-rows: 1fr 4fr;
        }
    }
</style>