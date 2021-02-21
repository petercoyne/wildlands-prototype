<script>
    import { results } from './stores.js';
    import { createEventDispatcher } from 'svelte';
    import Tabs from './Tabs.svelte';
import { add_resize_listener } from 'svelte/internal';

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

</script>

<div class="overflow-y-scroll max-h-full min-h-0 relative">
    <Tabs />
    {#if $results}
        <div class="p-8">
            {#each $results as place}
                <div on:mouseenter={() => mouseIn(place)} on:mouseleave={() => mouseOut(place)}
                    class="mb-2 pb-2 grid grid-cols-3 border-b-2"
                    style="grid-template-columns: 6fr 3fr 1fr">
                    <div>
                        <h4 class="text-xl font-bold">{place.name}</h4>
                        <p class="">{place.address.addressLocality}</p>
                    </div>
                    <div class="flex justify-items-center items-center">
                        <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"></path></svg>
                        <p>{place.telephone}</p>
                    </div>
                    <div class="flex justify-items-center items-center">
                        <a href={place.url}>
                            <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"></path></svg>
                        </a>
                    </div>
                </div>
            {/each}
        </div>
    {:else}
        <div>
            <h2 class="text-3xl font-bold p-8">Please select a County above.</h2>
        </div>
    {/if}
</div>

