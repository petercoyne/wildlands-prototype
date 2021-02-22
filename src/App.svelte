<script>
	import { fade } from 'svelte/transition';
	import * as animateScroll from "svelte-scrollto";
    import Tailwindcss from './Tailwindcss.svelte';
    import { results, activeTab, activeCounty } from './stores.js';
	import Nav from './Nav.svelte';
	import Map from './Map.svelte';
	import List from './List.svelte';
	
	let mapComponent, listComponent, y;
	let query = false;

	$: $activeTab, changeQuery();
	$: $activeCounty, changeQuery();
	
	async function changeQuery(){
		switch($activeTab) {
			case 0:
				query = 'https://failteireland.azure-api.net/opendata-api/v1/accommodation?$filter=address/addressRegion eq \'' + $activeCounty + '\'';
				break;
			case 1:
				query = 'https://failteireland.azure-api.net/opendata-api/v1/activities?$filter=address/addressRegion eq \'' + $activeCounty + '\'';
				break;
			case 2:
				query = 'https://failteireland.azure-api.net/opendata-api/v1/attractions?$filter=address/addressRegion eq \'' + $activeCounty + '\'';
				break;
		}
		getAPI();
	}

	async function getAPI() {
		if (query && $activeCounty) {
			console.log("getting API");
			fetch(query)
			.then(r => r.json())
			.then(data => {
				mapComponent.clearMarkers();
				if (data.hasOwnProperty('results')) {
					mapComponent.placeMarkers(data.results);
					results.set(data.results);
					mapComponent.fitBounds(data.results);
				}		
			})
			.catch((error) => {
				console.error('Error:', error);
			});
		}
	}
	
	function highlight(event) {
		mapComponent.placeMarker(event.detail.lng, event.detail.lat)
	}

	function unHighlight() {
		mapComponent.removeMarker();
	}

	function zoomTo(event) {
		mapComponent.zoomTo(event.detail.lng, event.detail.lat);
	}

	function closePlace() {
		mapComponent.closePlace();
	}

</script>

<svelte:window bind:scrollY={y}/>
<Tailwindcss />

<div class="">
	<Nav />
	<div class="grid grid-cols-2 gap-x-8 mx-12">
		<div class="h-96 sticky top-8 mt-8">
			<Map lat={53.2734} lon={-7.7783} zoom={6} bind:this={mapComponent} />
		</div>
		{#if y > 128}
			<div transition:fade class="flex fixed bottom-4 left-4 p-8 cursor-pointer" on:click={() => animateScroll.scrollToTop()}>
				<svg class="w-6 h-6 mr-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 10l7-7m0 0l7 7m-7-7v18"></path></svg>
				<h5 class="text-xl ">Scroll to top</h5>
			</div>
		{/if}
		<div class="flex-grow">
			<List bind:this={listComponent} on:highlight={highlight} on:unhighlight={unHighlight} on:zoomTo={zoomTo} on:closePlace={closePlace}/>
		</div>
	</div>
</div>
<!-- <div class="block md:hidden pt-12">
	<Logo />
	<h1 class="text-3xl font-bold p-12 text-center">WildLands requires a tablet or desktop to use</h1>
</div> -->