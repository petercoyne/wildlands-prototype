<script>
    import Tailwindcss from './Tailwindcss.svelte';
    import { results, activePage, activeTab, activeCounty } from './stores.js';
	import Nav from './Nav.svelte';
	import Map from './Map.svelte';
	import List from './List.svelte';
	import Logo from './Logo.svelte';
	
	let mapComponent, listComponent;
	let query = false;

	function flyTo() {
		mapComponent.reposition(37.8225, -122.0024, 6);
	}

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

<Tailwindcss />
<div class="hidden md:block">
	<Nav />
	<div class="grid grid-cols-2 gap-x-8 mx-12">
		<div class="h-96 sticky top-8 mt-8">
			<Map lat={53.2734} lon={-7.7783} zoom={6} bind:this={mapComponent} />
		</div>
		<div class="flex-grow">
			<List bind:this={listComponent} on:highlight={highlight} on:unhighlight={unHighlight} on:zoomTo={zoomTo} on:closePlace={closePlace}/>
		</div>
	</div>
</div>
<div class="block md:hidden pt-12">
	<Logo />
	<h1 class="text-3xl font-bold p-12 text-center">WildLands requires a tablet or desktop to use</h1>
</div>