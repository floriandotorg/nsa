<script>
import { onMount } from 'svelte'
let inputValue = $state('')
let showModal = $state(false)
let neverShowAgain = $state(false)

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
</script>

{#if showModal}
  <div class="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
    <div class="bg-white p-6 rounded-lg shadow-lg max-w-md mx-auto">
      <h2 class="text-xl font-bold mb-4">Wichtige Information</h2>
      <p class="mb-1">
        Da irgendein Idiot dachte, es sei eine gute Idee einen Teller Käsesuppe auf den Server zu stellen, ist die Datenbank derzeit nur eingeschränkt verfügbar.
      </p>
      <p class="mb-2">Es kann lediglich ein Teil der Daten aufgerufen werden und es werden nur die ersten drei Ergebnisse angezeigt. Wir arbeiten mit Hochdruck an einer Lösung und bitten um Ihr Verständnis.
      </p>
      <p class="mb-4">Sebastian Maus, Administrator</p>
      <div class="flex items-center mb-4">
        <input type="checkbox" bind:checked={neverShowAgain} id="neverShowAgain" class="mr-2" />
        <label for="neverShowAgain">Nicht mehr anzeigen</label>
      </div>
      <button onclick={closePopup} class="px-4 py-2 bg-primary text-white rounded hover:bg-primary/80">Schließen</button>
    </div>
  </div>
{/if}

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
        <strong class="font-semibold">Nur für den Dienstgebrauch.</strong>
      </p>
    </div>

    <form class="flex gap-4 w-full max-w-4xl">
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
  </div>
</div>