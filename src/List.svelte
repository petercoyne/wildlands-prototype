<script>
    import { results, activePlace } from './stores.js';
    import { createEventDispatcher } from 'svelte';
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
        console.log("List: closing place");
        dispatch("closePlace");
    }

</script>

<div class="overflow-y-scroll max-h-full min-h-0 relative">

    {#if $activePlace}
        <div class="p-8">
            <a href="#/" on:click={closePlace} class="text-red-500">
                <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg>
            </a>
            <h2 class="text-3xl font-bold">{$activePlace.name}</h2>
            <p class="">{$activePlace.address.addressLocality}</p>
            {#each $activePlace.tags as tag}
                <span class="bg-gray-400 rounded p-2 mr-2 mb-2 text-xs inline-block">{tag}</span>
            {/each}
        </div>
    {:else if $results}
        <Tabs />
        <div class="p-8">
            {#each $results as place}
                <div on:mouseenter={() => mouseIn(place)} on:mouseleave={mouseOut} on:click={() => mouseClick(place)}
                    class="mb-2 pb-2 grid grid-cols-3 border-b-2 cursor-pointer hover:text-blue-500"
                    style="grid-template-columns: 6fr 4fr 1fr">
                    <div>
                        <h4 class="text-xl font-bold">{place.name}</h4>
                        <p class="">{place.address.addressLocality}</p>
                    </div>
                    <div class="flex justify-items-center items-center">
                        <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"></path></svg>
                        <p>{place.telephone}</p>
                    </div>
                    <div class="flex justify-items-center items-center">
                        <a target="_blank" href={place.url}>
                            <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"></path></svg>
                        </a>
                    </div>
                </div>
            {/each}
        </div>
    {:else}
       <Welcome />
    {/if}
</div>

