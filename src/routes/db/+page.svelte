<script>
let inputValue = $state('')
</script>

<div class="bg-background text-foreground min-h-screen relative w-full">
  <div class="flex justify-center pt-8">
    <img src="/logo.png" alt="Logo" class="h-[200px] w-auto" />
  </div>
  
  <div class="flex flex-col items-center justify-center mt-16 px-4">
    <div class="max-w-3xl text-center mb-12">
      <h1 class="text-4xl font-bold mb-4">Datenbank der Nagerische Sicherheitsagentur</h1>
      <p class="text-lg text-foreground">
        Durchsuchen Sie unsere umfassende Datenbank nach Personen von Interesse, Aktivitäten und Verbindungen. 
        Unser fortschrittliches System ermöglicht präzise Abfragen in Echtzeit.<br>
        <strong>Nur für den Dienstgebrauch.</strong>
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