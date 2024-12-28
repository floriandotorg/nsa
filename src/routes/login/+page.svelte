<script lang="ts">
import { goto } from '$app/navigation'

let username = $state('')
let password = $state('')
let securityAnswer = $state('')
let showSecurityQuestion = $state(false)
let showPassword = $state(false)
const validUsername = 'martin.mouse'
const validAnswer = 'flamingo'
// spellchecker: ignore geliebtehilde
const validPassword = 'geliebtehilde'

const login = () => {
	if (username === validUsername && password === validPassword) {
		goto('/main')
	} else {
		alert('Invalid username or password')
	}
}

const passwordForget = (event: Event) => {
	event.preventDefault()

	if (username === validUsername) {
		showSecurityQuestion = true
	} else {
		alert('Invalid username')
	}
}

const checkSecurityAnswer = () => {
	if (securityAnswer.toLowerCase() === validAnswer) {
		showPassword = true
	} else {
		alert('Incorrect answer')
	}
}
</script>

<div class="bg-background text-foreground min-h-screen flex items-center justify-center">
  <div class="max-w-md w-full space-y-8">
    <div>
      <img class="mx-auto h-[20rem] w-auto" src="/logo.png" alt="Logo">
      <h2 class="mt-6 text-center text-3xl font-extrabold">Einloggen</h2>
    </div>
    <form class="mt-8">
      <div class="rounded-md shadow-sm -space-y-px">
        <div>
          <label for="username" class="sr-only">Benutzername</label>
          <input id="username" name="username" type="text" autocomplete="off" data-1p-ignore required
            class="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-foreground rounded-t-md focus:outline-none focus:ring-primary focus:border-primary focus:z-10 sm:text-sm"
            placeholder="Benutzername" bind:value={username}>
        </div>
        <div>
          <label for="password" class="sr-only">Passwort</label>
          <input id="password" name="password" type="password" autocomplete="off" data-1p-ignore required
            class="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-foreground rounded-b-md focus:outline-none focus:ring-primary focus:border-primary focus:z-10 sm:text-sm"
            placeholder="Passwort" bind:value={password}>
        </div>
      </div>

      <div class="flex items-center justify-between mt-3">
        <div class="text-sm">
          <button class="font-medium text-primary hover:text-primary/80" onclick={passwordForget}>Passwort vergessen?</button>
        </div>
      </div>

      <div class="mt-6">
        <button type="button" class="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-primary hover:bg-primary/80 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary/80" onclick={login}>
          Einloggen
        </button>
      </div>
    </form>

    {#if showSecurityQuestion}
      <div class="mt-6">
        <label for="security-question" class="block text-sm font-medium text-gray-700">Was ist Ihr Lieblingshaustier?</label>
        <input id="security-question" name="security-question" type="text" required
          class="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
          placeholder="Answer" bind:value={securityAnswer}>
        <button type="button" class="mt-2 w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-primary hover:bg-primary/80 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary/80" onclick={checkSecurityAnswer}>
          Einloggen
        </button>
      </div>
    {/if}

    {#if showPassword}
      <div class="mt-6">
        <p class="text-sm text-gray-500">Ihr Passwort ist: <strong>{validPassword}</strong></p>
      </div>
    {/if}
  </div>
</div> 