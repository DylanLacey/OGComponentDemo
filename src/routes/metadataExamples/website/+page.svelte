<script>
    // import { base } from '$app/paths';
    // let current_Url = `http://${window.location.host}/metadataExamples/website`
    export let data

    // Photo by Valdemar Kostenko on Unsplash: https://unsplash.com/photos/brown-tabby-cat-on-brown-wooden-table-aqBTmo6oUA8
    import image_Url from "$lib/images/valdemar-kostenko-aqBTmo6oUA8-unsplash-og-resize.jpg"
    // const image_Url = "g"
</script>

<svelte:head>
    <meta property="og:title" content="My Website" />
    <meta property="og:type" content="website" />
    <meta property="og:url" content={data.ownUrl}/>
    <meta property="og:image" content={image_Url}/>
    <meta property="og:description" content="An example of a webpage, for the purposes of illustrating how Open Graph metadata may be displayed." />
</svelte:head>

<div>
    <h1>Metadata!</h1>
</div>