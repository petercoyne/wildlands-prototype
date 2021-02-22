<script>
    import Tailwindcss from './helpers/Tailwindcss.svelte';
    import { results, activeTab, activeCounty } from './helpers/stores.js'; // these are "global" variables, defined in the stores file
	import { fade } from 'svelte/transition';
	import Nav from './Nav.svelte';
	import Map from './Map.svelte';
	import List from './List.svelte';

	let mapComponent, listComponent; // for binding App with the Map and List
	let y; // vertical scroll variable
	let query = false; // this will be the url we want to get for the API stuff

	$: $activeTab, changeQuery(); // if someone changes the tab, we want to update the API query
	$: $activeCounty, changeQuery(); // same if someone changes the active county
	
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
		if (query && $activeCounty) { // don't try to pull from API unless there's a valid query
			console.log("getting API"); // just to make sure we're not making too many API calls
			fetch(query) // fetch raw json from Failte Ireland
			.then(r => r.json()) // convert it into javascript object
			.then(data => {
				mapComponent.clearMarkers(); // clear any markers from the map
				if (data.hasOwnProperty('results')) { // if there's any results
					mapComponent.placeMarkers(data.results); // pass data.results to placeMarkers() in the Map component
					results.set(data.results); // put data.results into global variable
					mapComponent.fitBounds(data.results); // function to zoom to cover all markers on the map
				}		
			})
			.catch((error) => {
				console.error('Error:', error);
			});
		}
	}
	
	function highlight(event) {
		mapComponent.placeMarker(event.detail.lng, event.detail.lat) // this is triggered when mouse is over one of the list items
	}

	function unHighlight() {
		mapComponent.removeMarker(); // this is triggered when the mouse leaves the list item
	}

	function zoomTo(event) {
		mapComponent.zoomTo(event.detail.lng, event.detail.lat); // triggered by click on list item, function to zoom to the item
	}

	function closePlace() {
		mapComponent.closePlace();
	}

	function scrollTop() {
		y = 0;
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
			<div transition:fade class="flex fixed bottom-4 left-4 p-8 cursor-pointer" on:click={scrollTop}>
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