<script>
    export let data
    import { dev } from "$app/environment";

    // Photo by Valdemar Kostenko on Unsplash: https://unsplash.com/photos/brown-tabby-cat-on-brown-wooden-table-aqBTmo6oUA8
    import imageUrl from "$lib/images/valdemar-kostenko-aqBTmo6oUA8-unsplash-og-resize.jpg"

    let absoluteImageUrl = dev ? imageUrl : data.ownHostPrefix + imageUrl
</script>

<svelte:head>
    <meta property="og:title" content="My Website" />
    <meta property="og:type" content="website" />
    <meta property="og:url" content={data.ownUrl}/>
    <meta property="og:image" content={absoluteImageUrl}/>
    <meta property="og:description" content="An example of a webpage, for the purposes of illustrating how Open Graph metadata may be displayed." />
</svelte:head>

<div>
    <h1>Metadata!</h1>
    <h2>For Websites!</h2>

</div>