<script lang="ts">
    import { onMount } from "svelte";
    import defaultImageUrl from "$lib/images/hal-gatewood-tZc3vjPCk-Q-unsplash.jpg"
    import type { OpenGraphMetaData } from "./openGraphPreviewTypes";
    import { fade } from "svelte/transition";

    export let site: string;
    let ogMetadata: OpenGraphMetaData;
    
    let displayMetadata: OpenGraphMetaData = {
        title: site,
        canonicalUrl: site,
        imageUrl: defaultImageUrl,
        ogType: "website"
    }

    let renderedImageURL: string = defaultImageUrl;

    onMount( async () => {
        try {
            const siteAsQueryString = new URLSearchParams()
            siteAsQueryString.append("site", site)

            const response = await fetch(`/opengraph_proxy?${siteAsQueryString.toString()}`, {method: "GET"})
            ogMetadata = JSON.parse(await response.text())

            displayMetadata = ogMetadata

            if (ogMetadata.imageUrl) {
                let response = await fetch(ogMetadata.imageUrl)

                if (response.ok) {
                    let imageBlog = await response.blob()
                    console.log("Changing image")
                    renderedImageURL = URL.createObjectURL(imageBlog)
                }
            }

        } catch (e){
            console.error(`Couldn't retrieve OpenGraph Metadata for ${site}. Most likely, that page doesn't embed any OpenGraph metadata.`)
            console.error("The error itself was :", e)
        }
    })

</script>

<div class="og_container">
    <a href={displayMetadata.canonicalUrl}>
        <div class="og_preview">
            <div class="og_media_preview">
                {#key renderedImageURL}
                    <img out:fade={{ duration:500}} in:fade={{ delay:600, duration:500 }} src={renderedImageURL} alt={`Preview Image for ${displayMetadata.title}`}/>
                {/key}
            </div>

            {#if (displayMetadata.title)}
                <div class="og_title og_item">
                    <h1>{displayMetadata.title}</h1>
                </div>
            {:else}
                <div class="og_title og_item og_canonical_title">
                    <h1>{displayMetadata.canonicalUrl}</h1>
                </div>
            {/if}
            
            {#if (displayMetadata.description)}
                <div class="og_item og_description">{displayMetadata.description}</div>
            {/if}

        </div>
    </a>
</div>

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