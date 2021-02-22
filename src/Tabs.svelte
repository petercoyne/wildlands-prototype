<script>
    import { activeTab } from './stores.js';
    import { slide } from 'svelte/transition';
</script>
<div class="sticky top-0 pt-2 max-w-full grid grid-cols-3 text-md font-bold bg-white border-gray-500 border-b-2 bg-opacity-70" style="backdrop-filter: blur(8px);">
    <a href="#/" on:click={() => activeTab.set(0)} class="cursor-pointer p2 flex items-center justify-center">
        <svg class="w-8 h-8 text-blue-400 mr-4 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6"></path></svg>
        <h2>Accommodation</h2>
    </a>
    <a href="#/" on:click={() => activeTab.set(1)} class="cursor-pointer p2 flex items-center justify-center">
        <svg class="w-8 h-8 text-blue-500 mr-4 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z"></path></svg>
        <h2>Activities</h2>
    </a>
    <a href="#/" on:click={() => activeTab.set(2)} class="cursor-pointer p-2 flex items-center justify-center">
        <svg class="w-8 h-8 text-blue-500 mr-4 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"></path><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"></path></svg>
        <h2>Points of Interest</h2>
    </a>
    {#if $activeTab == 0}
        <div transition:slide class="h-2 bg-blue-400"></div>
        <div></div>
        <div></div>
    {:else if $activeTab == 1}
        <div></div>
        <div transition:slide class="h-2 bg-blue-400"></div>
        <div></div>
    {:else}
        <div></div>
        <div></div>
        <div transition:slide class="h-2 bg-blue-400"></div>
    {/if}
</div>