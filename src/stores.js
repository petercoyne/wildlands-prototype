import { writable } from 'svelte/store';

export const mapReady = writable(false);
export const activePage = writable("home");
export const activeCounty = writable(false);
export const activePlace = writable(false);
export const zoom = writable(7);
export const results = writable(false);
export const activeTab = writable(0);
export const activeItem = writable(false);
export const y = writable(0);