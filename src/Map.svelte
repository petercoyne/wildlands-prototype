<script>
	import { onMount, setContext, createEventDispatcher } from 'svelte';
	import { mapbox, key } from './mapbox.js';
	import { results, mapReady,  activePage, activeCounty, activePlace } from './stores.js';

	const dispatch = createEventDispatcher();

	function mapLoaded() {
		$mapReady = true;
		map.resize();
	}

	setContext(key, {
		getMap: () => map
	});

	export let lat;
	export let lon;
	export let zoom;

	let container;
	let map;
	let markers = [];
	let highlightMarker = false;
	let currentBounds;

	export function placeMarker(lng, lat) {
		let el = document.createElement('div');
		el.className = 'marker border-red-500 border-8';
		highlightMarker = new mapbox.Marker(el).setLngLat([lng, lat]).addTo(map);
	}

	export function removeMarker() {
		if (highlightMarker) {
			highlightMarker.remove();
		}
	}
	
	export function zoomTo(lng, lat) {
		if (highlightMarker) {
			highlightMarker.remove();
		}
		map.flyTo({
			center: [ lng, lat ],
			zoom: 14
		});
	}

	export function closePlace() {
		if (currentBounds) {
			map.fitBounds(currentBounds);
		}
	}

	export function placeMarkers(data) {
		data.forEach(result => {
			let el = document.createElement('div');
				el.className = 'marker border-blue-500 border-4';
				el.addEventListener('click', event => {
					activePlace.set(result);
					zoomTo(result.geo.longitude, result.geo.latitude);
				});
			let marker = new mapbox.Marker(el).setLngLat([result.geo.longitude, result.geo.latitude]).addTo(map)
			// .setPopup(new mapbox.Popup({ offset: 25 }) // add popups
    		// .setHTML('<h3>' + result.name + '</h3><p>' + result.url + '</p>'));
			markers.push(marker);
		});
	}

	export function clearMarkers() {
		markers.forEach(marker => { marker.remove() });
	}

	export function fitBounds(results) {
		let bounds = new mapbox.LngLatBounds();

		if (results.length > 0) {
			results.forEach(function(place) {
				let ll = new mapbox.LngLat(place.geo.longitude, place.geo.latitude);
				bounds.extend(ll)
			});
		}
		if (bounds) {
			map.fitBounds(bounds);
			currentBounds = bounds;
		}
	}

	onMount(() => {
		const link = document.createElement('link');
		link.rel = 'stylesheet';
		link.href = 'https://unpkg.com/mapbox-gl/dist/mapbox-gl.css';

		link.onload = () => {
			map = new mapbox.Map({
				container,
				style: 'mapbox://styles/mapbox/outdoors-v11',
				center: [lon, lat],
				zoom
			});
			map.on('load', mapLoaded);
		};

		document.head.appendChild(link);

		return () => {
			map.remove();
			link.parentNode.removeChild(link);
		};
	});

	
</script>

<style>
	div {
		width: 100%;
		height: 100%;
	}
</style>

<div bind:this={container} class="h-96 top-0 bottom-0 rounded-xl" style="height: 24rem">
	{#if map}
		<slot></slot>
	{/if}
</div>