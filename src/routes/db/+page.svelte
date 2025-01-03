<script lang="ts">
import { Mail, FileAudio, FileText } from 'lucide-svelte'
import { data } from '$lib/data'
import Popup from './Popup.svelte'
import { isRead, markAsRead } from '$lib/read.svelte'
import { STOP_WORDS } from '$lib/stopwords'

let inputValue = $state('')
let results = $state<typeof data>([])
let loading = $state(false)
let errorMessage = $state('')

const searchDatabase = async () => {
	const searchTerm = inputValue.toLowerCase().trim()
	if (searchTerm.length < 4) {
		errorMessage = 'Bitte geben Sie mindestens 4 Zeichen ein.'
		results = []
		return
	}
	if (searchTerm.includes(' ')) {
		errorMessage = 'Bitte geben Sie keine Leerzeichen ein.'
		results = []
		return
	}
	if (STOP_WORDS.has(searchTerm)) {
		errorMessage = 'Ungültiger Suchbegriff.'
		results = []
		return
	}
	results = []
	errorMessage = ''
	loading = true
	try {
		if (window.location.hostname !== 'localhost') {
			await new Promise(resolve => setTimeout(resolve, Math.floor(Math.random() * 3000) + 2000))
		}
		results = data.filter(item => item.keywords.includes(searchTerm)).sort((a, b) => b.priority - a.priority)
		if (!results.length) {
			errorMessage = 'Es konnten keine Ergebnisse gefunden werden.'
		}
	} catch (error) {
		errorMessage = 'Es ist ein Fehler aufgetreten.'
	} finally {
		loading = false
	}
}

const typeToIcon: {
	[key in (typeof data)[number]['type']]: typeof Mail | typeof FileAudio | typeof FileText
} = {
	email: Mail,
	audio: FileAudio,
	document: FileText,
}

const typeToText: {
	[key in (typeof data)[number]['type']]: string
} = {
	email: 'E-Mail',
	audio: 'Audio',
	document: 'Dokument',
}
</script>

<div class="bg-background text-foreground min-h-screen relative w-full">
  <div class="flex justify-center pt-10">
    <img src="/logo.png" alt="Logo" class="h-[200px] w-auto" />
  </div>
  
  <div class="flex flex-col items-center justify-center mt-16 px-4">
    <div class="max-w-3xl text-center mb-12">
      <h1 class="text-4xl font-bold mb-4">Datenbank der Nagerischen Sicherheitsagentur</h1>
      <p class="text-lg text-foreground">
        Sie können mithilfe von Stichwörtern Personen, Gegenstände, Namen, Orte, Ereignisse und viele weitere Kategorien durchsuchen. <strong class="font-medium">Nur für den Dienstgebrauch.</strong>
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
      {@const additionalResults = Math.max(0, results.length - 3)}
      <ul class="grid gap-4 w-full max-w-4xl mt-8">
        {#each results.slice(0, 3) as result (result.id)}
          {@const Icon = typeToIcon[result.type]}
          <li class="w-full">
            <button 
              onclick={() => {
                markAsRead(result.id)
                window.open(`/db/${result.id}`, '_blank')
              }}
              class="block p-6 bg-white rounded-xl shadow-lg border-2 border-transparent hover:border-primary transition-all duration-200 w-full {isRead(result.id) ? 'opacity-50' : ''}"
            >
              <div class="flex flex-col gap-3">
                <div class="flex justify-between">
                  <div class="flex items-center gap-3">
                    <span class="px-4 py-1.5 text-sm font-medium rounded-full bg-primary/15 text-primary flex items-center gap-2">
                      <Icon class="w-4 h-4" />
                      {typeToText[result.type]}
                      {#if result.type === 'audio'}
                        ({Math.floor(result.durationSeconds / 60)}:{(result.durationSeconds % 60).toString().padStart(2, '0')})
                      {/if}
                    </span>
                    <time class="text-sm text-muted-foreground">
                      {result.datetime.toLocaleDateString('de-DE', {
                        day: '2-digit',
                        month: '2-digit',
                        year: 'numeric'
                      })}
                    </time>
                  </div>
                  {#if isRead(result.id)}
                    <div class="h-full flex items-start">
                      <span class="text-sm text-muted-foreground">Gelesen</span>
                    </div>
                  {/if}
                </div>
                <div class="flex items-center justify-between">
                  <h3 class="text-2xl font-medium text-foreground">
                    {result.name}
                  </h3>
                  <span class="text-primary text-sm font-medium">Anzeigen →</span>
                </div>
              </div>
            </button>
          </li>
        {/each}
        <li class="text-center text-muted-foreground">
          {additionalResults} weitere{additionalResults == 1 ? 's' : ''} Ergebnis{additionalResults == 1 ? '' : 'se'} gefunden.
        </li>
      </ul>
    {/if}
  </div>
</div>

<Popup />
