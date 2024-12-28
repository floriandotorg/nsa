<script lang="ts">
import { onMount } from 'svelte'

let neverShowAgain = $state(false)
let showModal = $state(false)

onMount(() => {
	if (localStorage.getItem('neverShowPopup') !== 'true') {
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
