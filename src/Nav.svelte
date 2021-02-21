<script>
    import Logo from './Logo.svelte'
    import Counties from './counties.js'
    import { activeCounty } from './stores.js';

    function updateCounty(theCounty) {
        activeCounty.set(theCounty);
	}
</script>

<div id="nav">
    <!-- First row -->
    <nav class="flex w-full justify-between items-center">
        <a href="#/menu" class="p-12 text-black hover:text-blue-500 transition-colors duration-300">
            <svg class="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16M4 18h16"></path></svg>
        </a>
        <a href="#/" on:click={() => updateCounty(false)}>
            <Logo />
        </a>
        <a href="#/about" class="p-12 text-black hover:text-blue-500 transition-colors duration-300">
            <svg class="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg>
        </a>
    </nav>

    <!-- counties-->
    <hr class="-mt-2 mb-2 border-gray-400"/>
        <div class="grid grid-cols-4 md:grid-cols-8 lg:grid-cols-12 justify-center px-12 pb-2 max-w-full text-center uppercase text-xs font-bold">
            {#each Counties as county}
                <a href="#/" on:click={() => updateCounty(county)} class="p-1 text-gray-500 normallink hover:bg-gray-300 rounded-md">{county}</a>
            {/each}
        </div>
    <hr class="border-gray-400"/>
</div>