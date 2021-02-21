<script>
    import Tailwindcss from './Tailwindcss.svelte';
    import { results, activePage, activeTab, activeCounty } from './stores.js';
	import Nav from './Nav.svelte';
	import Map from './Map.svelte';
	import List from './List.svelte';
	
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
		}
	}
	
	function highlight(event) {
		mapComponent.placeMarker(event.detail.lng, event.detail.lat)
	}

	function unHighlight() {
		mapComponent.removeMarker();
	}

</script>

<Tailwindcss />
<div class="flex flex-col absolute top-0 bottom-0 left-0 right-0 max-h-full">
	<Nav />
	<div class="flex-grow min-h-0">
		<div class="grid grid-cols-2 h-full max-h-full">
			<Map lat={53.2734} lon={-7.7783} zoom={6} bind:this={mapComponent} />
			<div class="flex flex-col max-h-full min-h-0">
				
				<List bind:this={listComponent} on:highlight={highlight} on:unhighlight={unHighlight}/>
			</div>
		</div>
	</div>
</div>
