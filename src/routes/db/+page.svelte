<script lang="ts">
import { onMount } from 'svelte'
import { data } from './data'
import Popup from './Popup.svelte'

let inputValue = $state('')
let showModal = $state(false)
let neverShowAgain = $state(false)
let results = $state<typeof data>([])
let loading = $state(false)
let errorMessage = $state('')

onMount(() => {
	if (!localStorage.getItem('neverShowPopup')) {
		showModal = true
	}
})

const closePopup = () => {
	if (neverShowAgain) {
		localStorage.setItem('neverShowPopup', 'true')
	}
	showModal = false
}

const searchDatabase = async () => {
	if (inputValue.length < 5) {
		errorMessage = 'Bitte geben Sie mindestens 5 Zeichen ein.'
		return
	}
	errorMessage = ''
	loading = true
	// await new Promise(resolve => setTimeout(resolve, Math.floor(Math.random() * 3000) + 2000))
	const filteredResults = data
		.filter(item => item.keywords.some(keyword => inputValue.includes(keyword)))
		.sort((a, b) => b.priority - a.priority)
		.slice(0, 3)
	results = filteredResults.length ? filteredResults : []
	if (!results.length) {
		errorMessage = 'Es konnten keine Ergebnisse gefunden werden.'
	}
	loading = false
}
</script>

<div class="bg-background text-foreground min-h-screen relative w-full">
  <div class="flex justify-center pt-10">
    <img src="/logo.png" alt="Logo" class="h-[200px] w-auto" />
  </div>
  
  <div class="flex flex-col items-center justify-center mt-16 px-4">
    <div class="max-w-3xl text-center mb-12">
      <h1 class="text-4xl font-bold mb-4">Datenbank der Nagerische Sicherheitsagentur</h1>
      <p class="text-lg text-foreground">
        Durchsuchen Sie unsere umfassende Datenbank nach Personen von Interesse, Aktivitäten und Verbindungen. 
        Unser fortschrittliches System ermöglicht präzise Abfragen in Echtzeit.<br>
        <strong class="font-medium">Nur für den Dienstgebrauch.</strong>
      </p>
    </div>

    <form class="flex gap-4 w-full max-w-4xl" onsubmit={searchDatabase}>
      <input 
        type="text" 
        bind:value={inputValue}
        placeholder="Geben Sie Ihren Suchbegriff ein..."
        class="flex-1 px-6 py-4 text-lg text-foreground border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-primary focus:border-primary placeholder-gray-500"
      />
      <button 
        type="submit"
        class="px-8 py-4 bg-primary text-white text-lg font-medium rounded-lg hover:bg-primary/80 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary/80 transition-colors whitespace-nowrap"
      >
        Suchen
      </button>
    </form>

    {#if loading}
      <div class="flex justify-center items-center mt-16">
        <div class="animate-spin rounded-full h-12 w-12 border-4 border-primary border-t-transparent"></div>
      </div>
    {/if}

    {#if errorMessage}
      <p class="text-red-500 mt-8">{errorMessage}</p>
    {/if}

    {#if results.length}
      <ul>
        {#each results as result}
          <li>{result.type} - Priority: {result.priority}</li>
        {/each}
      </ul>
    {/if}
  </div>
</div>

<Popup />
