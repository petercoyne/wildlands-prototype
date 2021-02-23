<script>
	import { onMount, setContext, createEventDispatcher } from 'svelte';
	import { mapbox, key } from './helpers/mapbox.js';
	import { activePlace, windowHeight, navHeight } from './helpers/stores.js';

	const dispatch = createEventDispatcher();

	function mapLoaded() {
		handleResize(); // call the resize function to set custom map height
		map.resize(); // make sure the map redraws itself
	}

	setContext(key, {
		getMap: () => map // dunno what this does
	});

	export let lat;
	export let lon;
	export let zoom;

	let container; // map container div
	let map; // map object itself
	let markers = []; // array of markers for displaying results
	let highlightMarker = false; // single marker for highlighting on mouseover
	let currentBounds; // variable to remember the bounds of the county

	export function placeMarker(lng, lat) { // this is for the highlight marker
		let el = document.createElement('div'); // make a div to represent the highlight
		el.className = 'marker border-red-500 border-4 rounded-full'; // red dot style
		highlightMarker = new mapbox.Marker(el).setLngLat([lng, lat]).addTo(map); // add the red dot to the map
	}

	export function removeMarker() {
		if (highlightMarker) {
			highlightMarker.remove();
		}
	}
	
	export function zoomTo(lng, lat) { // for zooming to individual place
		map.flyTo({
			center: [ lng, lat ],
			zoom: 14
		});
	}

	export function closePlace() { // triggered when we close place details in List
		if (highlightMarker) {
			highlightMarker.remove();
		}
		if (currentBounds) {
			map.fitBounds(currentBounds); // zoom the map out to fit all the county markers
		}
	}

	export function placeMarkers(data) { // big one! receives all results from the api
		data.forEach(result => { // loop through each result
			let el = document.createElement('div'); // create a div for the map marker
				el.className = 'w-8 h-8 rounded-full cursor-pointer border-blue-500 border-4'; // a blue circle
				el.title = result.name; // tooltip
				el.addEventListener('click', event => { // add a click listener
					activePlace.set(result); // set activePlace global variable to the result that was clicked
					zoomTo(result.geo.longitude, result.geo.latitude); // zoom to result
				});
			let marker = new mapbox.Marker(el).setLngLat([result.geo.longitude, result.geo.latitude]).addTo(map) // create and add marker
			markers.push(marker); // add it to the markers array so we can reference it elsewhere
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

	function handleResize() {
		if (container) {
			container.style.height = ($windowHeight - $navHeight - 80) + "px";
		}
	}

</script>

<svelte:window bind:innerHeight={$windowHeight} on:resize={handleResize} />

<div bind:this={container} class="rounded-xl h-96">
	{#if map}
		<slot></slot>
	{/if}
</div>