<script lang="ts">
import { goto } from '$app/navigation'
import { data } from '$lib/data'

const { data: pageData } = $props()

const doc = $derived(data.find(item => item.id === pageData.id))

$effect(() => {
	if (doc?.type === 'document') {
		goto(`/${doc.id}.${doc.filetype}`)
	} else if (doc?.type === 'audio') {
		goto(`/${doc.id}.mp3`)
	}
})
</script>

{#if doc != null}
  {#if doc.type === 'email'}
    {@const thread = doc.thread[0]}
    <div class="email-container max-w-3xl mx-auto p-8 bg-white rounded-xl shadow-md">
      <!-- Email Header -->
      <div class="email-header border-b border-gray-200 pb-6">
        <div class="grid grid-cols-[4rem_1fr] gap-2">
          <div class="text-sm text-gray-600">Von:</div>
          <div class="font-medium">{thread.sender}</div>
          
          <div class="text-sm text-gray-600">An:</div>
          <div class="font-medium">{thread.recipients[0]}</div>
          
          <div class="text-sm text-gray-600">Betreff:</div>
          <div class="text-lg font-bold">{thread.subject}</div>
        </div>

        <div class="mt-4 text-sm text-gray-600">
          {new Date(doc.datetime).toLocaleString('de-DE', {
            dateStyle: 'full',
            timeStyle: 'short'
          })}
        </div>
      </div>

      <!-- Email Body -->
      <div class="email-body mt-8 text-gray-800 leading-relaxed">
        {#each thread.body.split('\n') as line, n (n)}
          {#if line.trim()}
            <p class="mb-4 text-base">{line}</p>
          {:else}
            <div class="h-2"></div>
          {/if}
        {/each}
      </div>
    </div>
  {/if}
{/if}
