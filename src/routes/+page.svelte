<script lang="ts">
import { goto } from '$app/navigation'

let mode: 'login' | 'forgotPassword' | 'securityQuestion' | 'showPassword' = $state('login')
let username = $state('')
let password = $state('')
let securityAnswer = $state('')
let errorMessage = $state('')
const validUsername = 'martin.maus'
const validAnswer = 'flamingo'
// spellchecker: ignore geliebtehilde
const validPassword = 'geliebtehilde'

const login = (event: Event) => {
	event.preventDefault()

	if (username === validUsername && password === validPassword) {
		return goto('/db')
	}

	errorMessage = 'Diese Zugangsdaten sind nicht korrekt'
}

const passwordForget = (event: Event) => {
	event.preventDefault()
	username = ''
	password = ''
	mode = 'forgotPassword'
	errorMessage = ''
}

const checkSecurityAnswer = (event: Event) => {
	event.preventDefault()

	if (securityAnswer.toLowerCase() === validAnswer) {
		mode = 'showPassword'
		errorMessage = ''
	} else {
		errorMessage = 'Diese Antwort ist nicht korrekt'
	}
}
</script>

<div class="bg-background text-foreground min-h-screen flex items-center justify-center">
  <div class="max-w-md w-full space-y-8">
    <button class="w-full" onclick={() => {
      mode = 'login'
    }}><img class="h-[20rem] mx-auto" src="/logo.png" alt="Logo"></button>

    {#if mode === 'login'}
      <h2 class="mt-6 text-center text-3xl font-extrabold">Einloggen</h2>
      <form class="mt-8" onsubmit={login}>
        <div class="rounded-md shadow-sm -space-y-px">
          <div>
            <label for="username" class="sr-only">Benutzername</label>
            <input id="username" name="username" type="text" autocomplete="off" data-1p-ignore required
              class="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-foreground rounded-t-md focus:outline-none focus:ring-primary focus:border-primary focus:z-10 sm:text-sm" placeholder="Benutzername" bind:value={username}>
          </div>
          <div>
            <label for="password" class="sr-only">Passwort</label>
            <input id="password" name="password" type="password" autocomplete="off" data-1p-ignore required
              class="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-foreground rounded-b-md focus:outline-none focus:ring-primary focus:border-primary focus:z-10 sm:text-sm" placeholder="Passwort" bind:value={password}>
          </div>
        </div>

        {#if errorMessage}
          <p class="text-sm text-red-500">{errorMessage}</p>
        {/if}

        <div class="flex items-center justify-between mt-2">
          <div class="text-sm">
            <button type="button" class="font-medium text-primary hover:text-primary/80" onclick={passwordForget}>Passwort vergessen?</button>
          </div>
        </div>

        <div class="mt-6">
          <button type="submit" class="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-primary hover:bg-primary/80 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary/80">
            Einloggen
          </button>
        </div>
      </form>
    {/if}

    {#if mode === 'forgotPassword'}
      <h2 class="mt-6 text-center text-3xl font-extrabold">Passwort vergessen?</h2>
      <form class="mt-8" onsubmit={(event) => {
        event.preventDefault()
        if (username === validUsername) {
          mode = 'securityQuestion'
          errorMessage = ''
        } else {
          errorMessage = 'Dieser Nutzername ist nicht registriert'
        }
      }}>
        <div class="mt-6">
          <label for="username" class="block text-sm font-medium text-gray-700">Benutzername</label>
          <input id="username" autocomplete="off" data-1p-ignore name="username" type="text" required class="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm" placeholder="Benutzername" bind:value={username}>
            {#if errorMessage}
              <p class="text-sm text-red-500">{errorMessage}</p>
            {/if}
        </div>
        <div class="mt-6">
          <button type="submit" class="w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-primary hover:bg-primary/80 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary/80">
            Weiter
          </button>
        </div>
      </form>
    {/if}

    {#if mode === 'securityQuestion'}
      <h2 class="mt-6 text-center text-3xl font-extrabold">Sicherheitsfrage</h2>
      <form class="mt-8" onsubmit={checkSecurityAnswer}>
        <div class="mt-6">
          <label for="security-question" class="block text-sm font-medium text-gray-700">Was ist Ihr Lieblingshaustier?</label>
          <input id="security-question" name="security-question" type="text" required
            class="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm" placeholder="Geben Sie Ihre Antwort ein …" bind:value={securityAnswer}>
          {#if errorMessage}
            <p class="text-sm text-red-500">{errorMessage}</p>
          {/if}
          <button type="submit" class="mt-8 w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-primary hover:bg-primary/80 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary/80">
            Antwort prüfen
          </button>
        </div>
      </form>
    {/if}

    {#if mode === 'showPassword'}
      <div class="mt-6">
        <p class="text-sm text-center text-foreground">Ihr Passwort ist: <strong>{validPassword}</strong></p>
      </div>
      <button class="mt-8 w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-primary hover:bg-primary/80 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary/80" onclick={() => {
        username = ''
        password = ''
        securityAnswer = ''
        errorMessage = ''
        mode = 'login'
      }}>Zurück zum Login</button>
    {/if}
  </div>
</div>
