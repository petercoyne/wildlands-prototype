
<script>
  import Tailwindcss from './Tailwindcss.svelte';
  import { Map, Geocoder, Marker, controls } from '@beyonk/svelte-mapbox'
  import { activePage, activeCounty } from './stores.js';

  let mapComponent, center, zoom;

	function onReady() {
    	mapComponent.flyTo({center:[-7.7783,53.2734]}) 
	}

	function onClick() {
		console.log(mapComponent);
		mapComponent.flyTo({center: [-7.7783,53.2734], zoom: 5});
		console.log(center);
		console.log(zoom);
	}
</script>
<div class="flex flex-col h-full">
	<button on:click={onClick}>Click me</button>
	<Map accessToken="pk.eyJ1IjoiYWNvdXMiLCJhIjoiY2oybmV0NHgzMDAyYjMycW8xcnNvcWFkaSJ9.q6sSYCNbYgsBvFLnwgyqNQ"
		style="mapbox://styles/mapbox/outdoors-v11"
	  bind:this={mapComponent} 
	  bind:center bind:zoom
	  on:ready={onReady}
	  on:recentre={e => console.log(e.detail.center.lat, e.detail.center.lng) }
	>
		 <Marker lng=-7.7783 lat=53.2734 label="Ireland" />
	</Map>
</div>
