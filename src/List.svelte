<script>
    import { results, activePlace } from './helpers/stores.js';
    import { createEventDispatcher } from 'svelte';
    import { slide } from 'svelte/transition';
    import Tabs from './Tabs.svelte';
    import Welcome from './Welcome.svelte';

	const dispatch = createEventDispatcher();

    function mouseIn(place) {
		dispatch('highlight', {
			lng: place.geo.longitude,
            lat: place.geo.latitude
		});
	}

    function mouseOut() {
        dispatch("unhighlight");
    }

    function mouseClick(place) {
        dispatch("zoomTo", {
			lng: place.geo.longitude,
            lat: place.geo.latitude
		});
        activePlace.set(place);
    }

    function closePlace() {
        activePlace.set(false);
        dispatch("closePlace");
    }

</script>

<div class="relative">
    {#if $activePlace}
        <div class="py-8 sticky top-0 mt-8 z-10 bg-white border-b-2" transition:slide>
            <a href="#/" on:click={closePlace} class="text-red-500 float-right p-4 pr-0">
                <svg class="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg>
            </a>
            <h2 class="text-3xl font-bold">{$activePlace.name}</h2>
            <p class="mb-4">{$activePlace.address.addressLocality}</p>
            {#each $activePlace.tags as tag}
                <span class="bg-gray-500 text-white font-bold rounded p-2 mr-2 mb-2 text-xs inline-block">{tag}</span>
            {/each}
        </div>
    {/if}
    {#if $results}
        <Tabs />
        <div class="pt-4">
            {#each $results as place}
                <div on:mouseenter={() => mouseIn(place)} on:mouseleave={mouseOut} on:click={() => mouseClick(place)}
                    class="mb-2 pb-2 flex justify-between border-b-2 cursor-pointer hover:text-blue-500">
                    <div>
                        <h4 class="text-lg font-bold">{place.name}</h4>
                        <p class="">{place.address.addressLocality}</p>
                    </div>
                    <div class="flex">
                        {#if place.telephone}
                            <div class="hidden lg:flex justify-items-center items-center">
                                <p>{place.telephone}</p>
                                <svg class="w-6 h-6 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"></path></svg>
                            </div>
                        {/if}
                        {#if place.url}
                            <div class="flex justify-items-center items-center ml-4">
                                <a target="_blank" href={place.url}>
                                    <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"></path></svg>
                                </a>
                            </div>
                        {/if}
                    </div>
                </div>
            {/each}
        </div>
    {:else}
       <Welcome />
    {/if}
</div>

