<script>
    export let data

    // Photo by Valdemar Kostenko on Unsplash: https://unsplash.com/photos/brown-tabby-cat-on-brown-wooden-table-aqBTmo6oUA8
    import imageUrl from "$lib/images/valdemar-kostenko-aqBTmo6oUA8-unsplash-og-resize.jpg"
</script>

<svelte:head>
    <meta property="og:title" content="My Website" />
    <meta property="og:type" content="website" />
    <meta property="og:url" content={data.ownUrl}/>
    <meta property="og:image" content={imageUrl}/>
    <meta property="og:description" content="An example of a webpage, for the purposes of illustrating how Open Graph metadata may be displayed." />
</svelte:head>

<div>
    <h1>Metadata!</h1>
</div>