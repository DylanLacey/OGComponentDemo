<script>
    import OpenGraphPreview from "$lib/openGraphPreview/openGraphPreview.svelte";
    import { base } from '$app/paths';
</script>

<div class="title">
    <h1>The GentleHacker Presents...</h1>
    <h2>A Link Preview Component (for SvelteKit & Others)</h2>
</div>


<div class="explainer">
    <p>Herein, The GentleHacker demonstrates an implementation of a Link Preview component usable in SvelteKit applications, with the general technique being adaptable to many other technologies.</p>
    <p>Our implementation relies on OpenGraph, a protocol for attaching metadata to Webpages in a standard fashion. OpenGraph allows for rich interaction with a variety of media types, as demonstrated below.</p>
    <p>This page is a companion to a corresponding blog series, available at <a href="https://blog.gentlehacker.io">blog.gentlehacker.io</a></p>
</div>
<hr/>

<div>
    <OpenGraphPreview site={`/metadataExamples/website`} />
</div>