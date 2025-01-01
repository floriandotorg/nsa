type CommonData = {
	id: string
	datetime: Date
	name: string
	keywords: string[]
	priority: number
}

type EmailThread = [
	{
		sender: string
		recipients: string[]
		subject: string
		body: string
	},
]

type Email = CommonData & {
	type: 'email'
	thread: EmailThread
}

type Data =
	| Email
	| (CommonData & {
			type: 'audio'
			durationSeconds: number
	  })
	| (CommonData & {
			type: 'document'
			filetype: 'png' | 'pdf' | 'html'
	  })

const splitAndClean = (input: string): string[] =>
	input
		.replace(/[^\wäöüÄÖÜß\s]/g, '')
		.split(/\s+/)
		.filter(word => word.length > 0)

const threadToEmail = (data: Omit<CommonData, 'keywords'>, thread: EmailThread): Data => {
	return {
		...data,
		type: 'email' as const,
		keywords: thread.flatMap(message => [message.sender, ...message.recipients, ...splitAndClean(message.subject), ...splitAndClean(message.body)]).filter(keyword => keyword.length > 4),
		thread,
	}
}

const seededShuffle = <T>(array: T[], seed = 9001): T[] => {
	const seededRandom = (() => {
		let currentSeed = seed
		return () => {
			const a = 16807
			const m = 2147483647
			currentSeed = (a * currentSeed) % m
			return currentSeed / m
		}
	})()

	const shuffled = [...array]
	for (let i = shuffled.length - 1; i > 0; i--) {
		const j = Math.floor(seededRandom() * (i + 1))
		;[shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]]
	}
	return shuffled
}

export const data: Array<Data> = seededShuffle(
	[
		{
			type: 'document' as const,
			// spellchecker: ignore hmpolg01
			id: 'hmpolg01',
			datetime: new Date('2024-11-28 12:00:00'),
			name: 'Photo H. Maus',
			keywords: ['Hildegard', 'photo', 'hausmäuse', 'verband', 'hausmaus'],
			priority: 100,
			filetype: 'png' as const,
		},
		{
			type: 'document' as const,
			// spellchecker: ignore harpho588
			id: 'harpho588',
			datetime: new Date('2024-12-21 4:01:00'),
			name: 'Notiz Familie Hartmann',
			keywords: ['hartmann'],
			priority: 0,
			filetype: 'png' as const,
		},
		{
			type: 'document' as const,
			// spellchecker: ignore hmamsel77
			id: 'hmamsel77',
			datetime: new Date('2024-07-21 14:32:00'),
			name: 'Photo A. Maus',
			keywords: ['hildegard', 'arnold'],
			priority: -100,
			filetype: 'png' as const,
		},
		{
			type: 'document' as const,
			// spellchecker: ignore p307
			id: 'p307',
			datetime: new Date('2024-12-31 00:32:00'),
			name: 'Observation R. Maus',
			keywords: ['riebe', 'golf', 'mulmshorn'],
			priority: 100,
			filetype: 'png' as const,
		},
		{
			type: 'document' as const,
			// spellchecker: ignore arlnha13
			id: 'arlnha13',
			datetime: new Date('2024-02-06 10:00:00'),
			name: 'Artikel "Hausmaus aktuell"',
			keywords:
				splitAndClean(`Arnold Maus: Vom Schuldenberg zum Chefbuchhalter ein portrait VON LENA MAUS Arnold Maus ist der lebende Beweis dafür, dass aus den tiefsten Tälern des Lebens die höchsten Gipfel erklommen werden können. Geboren in eine Familie, die von finanziellen Sorgen geplagt war, lernte Arnold früh, was es bedeutet, sich durchzukämpfen. Seine Eltern, einfache Vorratssammler, verloren durch eine unglückliche Investition in ranzigen Käse ihr gesamtes Hab und Gut. Arnold war damals noch jung, doch dieses Erlebnis prägte ihn zutiefst.

Anstatt zu verzweifeln, nutzte er die Notlage als Antrieb. Mit einem nahezu magischen Talent für Zahlen und einer unerschütterlichen Disziplin begann er, sich Stück für Stück aus dem Schuldenberg der Familie zu arbeiten. Arnold nahm jeden Auftrag an. Sein Ziel war klar: nie wieder würde seine Familie unter der Last finanzieller Unsicherheit leiden müssen

Heute steht Arnold Maus an der Spitze der Finanzverwaltung des Verbands Deutscher Hausmäuse e.V.  Als Chefbuchhalter `),
			priority: -100,
			filetype: 'pdf' as const,
		},
		{
			type: 'document' as const,
			// spellchecker: ignore spmfp93
			id: 'spmfp93',
			datetime: new Date('2024-12-21 4:01:00'),
			name: 'Vermisstenmeldung',
			keywords: ['spürmaus', 'spürmäuse', 'agent'],
			priority: 0,
			filetype: 'pdf' as const,
		},
		{
			type: 'document' as const,
			// spellchecker: ignore wihmk33
			id: 'wihmk33',
			datetime: new Date('2024-06-02 14:22:58'),
			name: 'Notiz Kühlschrank',
			keywords: ['kühlschrank', 'mausdorf', 'mägyptisch', 'notiz'],
			priority: -50,
			filetype: 'png' as const,
		},
		{
			type: 'document' as const,
			// spellchecker: ignore pmmmpob43
			id: 'pmmmphob43',
			datetime: new Date('2024-12-05 08:23:00'),
			name: 'Observation P. Maus',
			keywords: ['petra', 'monica'],
			priority: 100,
			filetype: 'png' as const,
		},
		{
			type: 'document' as const,
			// spellchecker: ignore hmalni33
			id: 'hmalni33',
			datetime: new Date('2023-09-29 12:00:00'),
			name: 'Artikel "Hausmaus aktuell"',
			keywords: ['lena', 'presse', 'artikel', 'hausmaus', 'magazin'],
			priority: 100,
			filetype: 'pdf' as const,
		},
		{
			type: 'audio' as const,
			// spellchecker: ignore hmamcaf56
			id: 'hmamcaf56',
			durationSeconds: 102,
			datetime: new Date('2023-12-22 09:18:00'),
			name: 'Tondokument (unverständlich)',
			keywords: ['unverständlich'],
			priority: 100,
		},
		{
			type: 'document' as const,
			// spellchecker: ignore ehbhmmint44
			id: 'ehbhmmint44',
			datetime: new Date('2024-09-09 10:00:00'),
			name: 'Artikel "Hausmaus aktuell"',
			keywords: splitAndClean(`Wie reagieren Sie auf die  Kritik, dass der Verband in den letzten Jahren an Transparenz verloren hat?
Erwin Hubertus: Transparenz ist ein zentrales Thema, das wir sehr ernst nehmen. Nach den Vorfällen von 2023 war klar, dass wir Maßnahmen ergreifen mussten, um das Vertrauen in unsere Arbeit zurückzugewinnen. Die Einführung der Kontrollmäuse war ein erster Schritt in die richtige Richtung. Aber, seien wir ehrlich, Transparenz allein löst nicht alle Probleme. Es geht darum, Ergebnisse zu liefern, und manchmal erfordert das eben Entscheidungen, die nicht jedem sofort offenliegen. Wie stellen Sie sich die Zukunft des Verbandes vor?
Erwin Hubertus:  Mein Ziel ist ein Verband, der effizienter und entschlossener handelt, um Familien die Hilfe zu geben, die sie wirklich brauchen. Mein großes Vorbild ist General Lagarto, der in Spanien mit klarem Kopf und einer starken Hand dafür gesorgt hat, dass Familienhelfer schnell und unbürokratisch agieren können. Natürlich, ich bin ein Befürworter demokratischer Prinzipien – sie haben ihren Platz –, aber ich frage mich, ob diese Prinzipien in jedem Fall der beste Weg sind, um schnell und zielgerichtet zu helfen. Es gibt Momente, in denen Entscheidungen nicht durch langwierige Abstimmungsprozesse ausgebremst werden dürfen. "Ein großes Vorbild für mich ist General Lagarto Bedeutet das, dass Sie demokratische Strukturen im Verband abbauen möchten?
Erwin Hubertus: (lächelt) Ich glaube, wir sollten nicht in Begriffen wie “Abbau” oder “Einschränkung” denken. Vielmehr geht es darum, die Strukturen zu überdenken und anzupassen, damit wir effektiver werden. Demokratie ist eine wunderbare Sache, aber sie ist kein Selbstzweck. Im Fokus steht immer, wie wir unseren Familien am besten dienen können. Wenn das bedeutet, gewisse Abläufe zu straffen oder zu vereinfachen, dann sollten wir den Mut haben, darüber nachzudenken. Was tun Sie, um nach einem langen Arbeitstag zu entspannen?
Erwin Hubertus:  Oh, das ist eine gute Frage! Also, ich gönne mir hin und wieder den Spaß, an exklusiven Käse-Auktionen teilzunehmen. Dort werden besondere und extrem seltene Käsesorten versteigert – ich spreche von Sorten, die nur in winzigen Mengen hergestellt werden [Fortsetzung nächste Seite]"
`),
			priority: -50,
			filetype: 'pdf' as const,
		},
		{
			type: 'document' as const,
			// spellchecker: ignore vptmaa34
			id: 'vptmaa34',
			datetime: new Date('2024-12-21 20:43:58'),
			name: 'Verhörprotokoll T. Maus',
			keywords: splitAndClean(`Verhörprotokoll
Ort: Keller Hotels Mäuseblick
Datum: 21.12.2024
Uhrzeit: 20:43

[Protokollbeginn]
T.Maus: „Was soll das hier? Warum halten Sie mich fest? Ich habe nichts gemacht! Lassen Sie mich sofort gehen!“
Spürmaus 1: „Beruhigen Sie sich, Herr Maus. Wir wollen Ihnen keine Probleme machen. Wir haben nur ein paar Fragen.“
T.Maus: „Fragen? Fragen über was? Das hier ist illegal! Ich werde meine Anwälte einschalten!“
Spürmaus 2: „Illegal? Wollen Sie wirklich über illegal reden, Herr Maus?“ [schlägt mit der Faust auf den Tisch] „Wir könnten dieses Hotel auf den Kopf stellen. Buchhaltungsprüfungen, Steuerverstöße, Sicherheitsmängel – glauben Sie mir, wir finden immer etwas.“
Spürmaus 1: „Bitte, Kollege. Das ist doch nicht nötig. Herr Maus, hören Sie. Ich bin hier, um Ihnen zu helfen. Aber dazu brauchen wir Ihre Kooperation. Sonst… kann ich nichts für Sie tun.“
T.Maus: „Kooperation? Das ist absurd! Ich habe Ihnen nichts zu sagen!“
Spürmaus 1: „Herr Maus, haben Sie in letzter Zeit auffällige Gäste bemerkt?“
T.Maus: „Auffällige Gäste? Das hier ist ein Hotel! Jeder Gast ist ein bisschen auffällig.“
Spürmaus 2: „Das reicht jetzt! Sie spielen mit uns, Herr Maus. Das wird Ihnen nicht helfen. Geben Sie uns etwas – jetzt!“
T.Maus: „Ich habe keine Ahnung, wovon Sie reden! Lassen Sie mich einfach in Ruhe!“
Spürmaus 1: „Thomas, hören Sie. Ich versuche, Sie aus dieser Situation herauszuholen. Aber Sie müssen mir etwas geben. Irgendetwas. Sonst kann ich Sie nicht beschützen.“
T.Maus: [seufzt hörbar] „Na gut. Was, was wollen Sie wissen?“
Spürmaus 1: Denken Sie genau nach. War gestern eine ältere Frau hier?
T.Maus: [nervös] Äh… ja. Gegen frühen Abend. Eine ältere Frau war an der Bar.
Spürmaus 2: War sie allein?
T. Maus: Nein, mit einem älteren Mäuserich. Er war ein bisschen… na ja, kräftiger gebaut.
Spürmaus 1: [nickend] Das ist gut. Haben Sie mitbekommen, worüber sie gesprochen haben?
T.Maus: „Ich weiß es nicht genau.“
Spürmaus 2: „Bullshit! Sie müssen etwas mitbekommen haben. Reden Sie!“
T.Maus: [zitternd] „Ich habe etwas von… Maulwürfen gehört. Ja, es ging irgendwie um Maulwürfe.“
Spürmaus 2: „Maulwürfe?! Hören Sie auf, uns zu verarschen!“
T.Maus: „Ich schwöre, ich habe das gehört! Maulwürfe! Und… ein Gerät. Es ging um ein Gerät. Aber ich weiß nicht, was für eins.“
Spürmaus 1: „Ein Gerät? Beschreiben Sie es.“
T.Maus: [zitternd] Sie haben es „Nagerveilchen“ genannt.
Spürmaus 1: Nagerveilchen? Was ist das?
T.Maus: [verzweifelt] Ich weiß es nicht! Es klang wie ein technisches Gerät… oder ein Code… ich habe keine Ahnung, was es ist!
Spürmaus 1: [leise und bedrohlich] Nagerveilchen, Herr Maus, ist ein Gerät, das speziell dazu entwickelt wurde, die Aufzeichnungen der Kontrollmäuse zu stören. Wenn Sie das wirklich nicht wussten, sollten Sie sich fragen, warum in Ihrem Hotel darüber gesprochen wird.
T.Maus: [flüsternd] Ich… ich habe wirklich keine Ahnung…
Spürmaus 2: Keine Ahnung, ja? Dann bleiben Sie doch hier unten, bis Ihnen etwas einfällt. Wer weiß, vielleicht sind wir morgen zurück – oder vielleicht nie.
Spürmaus 1: [an Spürmaus 2 gewandt] Wir müssen das unverzüglich an Herrn Melodie weiterleiten.`),
			priority: 0,
			filetype: 'pdf' as const,
		},
		{
			type: 'audio' as const,
			// spellchecker: ignore pkehmlm533
			id: 'pkehmlm533',
			durationSeconds: 93,
			datetime: new Date('2024-12-20 07:11:00'),
			name: 'PK Hausmauswahl 2024',
			keywords: splitAndClean(`Ruhe bitte, meine Damen und Herren. Danke. Guten Abend. Ich bin Erwin Hubertus, der Leiter des Verbands Deutscher Hausmäuse e.V.

Ich habe heute eine bedauerliche Mitteilung zu machen. Es fällt mir nicht leicht, das zu sagen, aber ich muss die Gerüchte bestätigen: Hildegard Maus ist leider ernsthaft erkrankt.

Zum jetzigen Zeitpunkt kann ich jedoch keine weiteren Angaben zur Art der Erkrankung machen. Wir bitten hier um Verständnis und auch darum, die Privatsphäre von Frau Maus zu respektieren.

Ich möchte jetzt die Gelegenheit geben, Fragen zu stellen.

Herr Hubertus, Lena Maus von "Hausmaus aktuell". Können Sie uns sagen, was das für die anstehende Hausmauswahl bedeutet?

Vielen Dank für Ihre Frage, Frau Maus. Die Hausmauswahl wird aufgrund der aktuellen Situation auf unbestimmte Zeit verschoben. Wir sind uns bewusst, wie wichtig dieses Ereignis für unsere Gemeinschaft ist, aber unter den gegebenen Umständen ist es das Beste, zunächst die Situation zu klären.

Ich danke Ihnen allen für Ihre Aufmerksamkeit. Weitere Fragen bitte schriftlich an unser Büro. Vielen Dank.`),
			priority: 100,
		},
		{
			type: 'audio' as const,
			// spellchecker: ignore hmspm233
			id: 'hmspm233',
			durationSeconds: 24,
			datetime: new Date('2024-12-21 20:55:00'),
			name: 'Telefonat Spürmaus 2',
			keywords: ['melodie'],
			priority: -100,
		},
		{
			type: 'audio' as const,
			// spellchecker: ignore hmamcaf56432
			id: 'hmamcaf56432',
			durationSeconds: 32,
			datetime: new Date('2023-12-22 10:46:00'),
			name: 'Telefonat Spürmausteam',
			keywords: ['melodie'],
			priority: -101,
		},
		{
			type: 'audio' as const,
			// spellchecker: ignore pmmmhmw12
			id: 'pmmmhmw12',
			durationSeconds: 56,
			datetime: new Date('2024-12-05 08:23:00'),
			name: 'Observation P. Maus',
			keywords: splitAndClean(`Bist du sicher, dass wir hier ungestört sind? Ich will nicht, dass eine von diesen Kontrollmäusen uns belauscht.

Keine Sorge, ich hab alles geprüft. Hier hört niemand zu.

Gut. Also… was machen wir jetzt? Die Petition – gestoppt! Einfach so!

Diese verdammte Hildegard! Das war so klar! Immer die gleiche Nummer: Alles abwürgen, sobald es unbequem wird. Glaubt sie wirklich, sie kann den Verband wie ihren persönlichen Spielplatz behandeln?

Sie hat jedenfalls wieder gezeigt, wer hier das Sagen hat…

Das Sagen? Ha! Nicht mehr lange! Dieses Machtgehabe hat bald ein Ende, monica. Hildegard muss weg.

Und wie willst du das anstellen?

Ich hab da eine Idee. Eine, die sie endgültig aus dem Spiel nimmt.

Was meinst du—

Nicht hier, nicht jetzt. Ich sage dir Bescheid, wenn es soweit ist.`),
			priority: 100,
		},
		{
			type: 'audio' as const,
			// spellchecker: ignore hmtelf993
			id: 'hmtelf993',
			durationSeconds: 16,
			datetime: new Date('2024-12-20 21:01:00'),
			name: 'Observation H. Maus',
			keywords: splitAndClean('Alter Freund... hör zu, ich kann nicht lange reden. Ich hinterlasse dir eine Nachricht am Haus meiner ersten Menschenfamilie. Ja, mir geht es gut. Mach dir keine Sorgen. Wir hören uns. Hildegard'),
			priority: 200,
		},
		{
			type: 'document' as const,
			// spellchecker: ignore mgy022
			id: 'mgy022',
			datetime: new Date('2022-07-24 9:01:00'),
			name: 'Artikel "Mägyptisch"',
			keywords: splitAndClean(`Die faszinierende Sprache des Mägyptischen
Eine Reise in die Welt der alten Mäuse
Das Mägyptische, eine außergewöhnliche Sprache, die von den Mäusen des alten Ägyptens gesprochen wurde, bietet einen einzigartigen Einblick in die Sprachkultur der Antike. Durch die geschickte Verwendung von Symbolen schufen die Mäuse ein hochentwickeltes System der Kommunikation, das später sogar von den Pharaonen übernommen und adaptiert wurde – natürlich in einer stark abgewandelten Form. Was das Mägyptische so besonders macht, ist seine Vielschichtigkeit und die Eleganz, mit der es Kontext und Bedeutung verbindet.
Die Magie der Symbole
Im Mägyptischen können die Symbole – sogenannte “Hieroglyphen” – bis zu vier unterschiedliche Bedeutungen haben, abhängig vom Kontext:
Bildliche Bedeutung: Das Zeichen für die Sonne (𓇳) repräsentiert die Sonne als Himmelskörper.
Metaphorische Bedeutung: Die Sonne kann auch für den Sonnenaufgang oder den morgigen Tag stehen.
Silbenbedeutung: Die Sonne (𓇳) steht für die Silbe „Son“.
Phonetische Bedeutung: Die Sonne repräsentiert den Laut „S“.
Diese Mehrdeutigkeit erlaubt eine dichte, poetische Ausdrucksweise, die stark kontextabhängig ist. Das macht das Mägyptische nicht nur funktional, sondern auch künstlerisch anspruchsvoll.
Grammatische Besonderheiten
Das Mägyptische besticht durch innovative grammatische Strukturen, die sowohl elegant als auch intuitiv sind.
Nomina als Verben
Im Mägyptischen gibt es keine separaten Verben. Stattdessen werden Nomina durch ihre Kombination mit anderen Zeichen zu Verben. Ein Beispiel:
Das Zeichen für “Ich” (𓂀) und das Zeichen für “Essen” (𓃀) ergeben zusammen „Ich esse“.
𓂀𓃀 = Ich esse.
Hier wird das Nomen „Essen“ automatisch zu einer Handlung transformiert, sobald es mit einem Subjekt kombiniert wird.
Kein Verb “sein”
Statt eines Verbs „sein“ nutzt das Mägyptische Präpositionen, um Zustände auszudrücken. Zum Beispiel:
“Ich im Haus” (𓂀𓉐𓏏𓈉) bedeutet „Ich bin im Haus“.
“Haus bei Sonne” (𓉐𓇳𓂋) kann „Das Haus ist hell“ bedeuten.
Weitere Präpositionen sind:
„bei“ (𓂋): zur Beschreibung von Zugehörigkeit.
„auf“ (𓂻): für Lagebeschreibungen.
Die Hierarchien der Präpositionen sind streng geregelt und schaffen Klarheit, wo die Bedeutungsvielfalt der Symbole zu Verwirrung führen könnte.
Keine Zeitformen
Das Mägyptische verwendet keine Verbkonjugation, um Zeitformen zu markieren. Die temporale Einordnung erfolgt ausschließlich durch Kontextsymbole:
𓂀𓃀𓇳 („Ich esse mit Sonnenaufgang“) = „Ich werde morgen essen“.
𓂀𓃀𓆗 („Ich esse mit Mond“) = „Ich habe gestern gegessen“.
Diese Flexibilität erlaubt eine prägnante und zugleich elegante Ausdrucksweise, die an die Denkweise der Mäuse angepasst war.
Eine Sprache der Eleganz und Funktionalität
Das Mägyptische war mehr als nur eine Sprache – es war ein System der Verständigung, das durch Einfachheit und Flexibilität bestach. Die Pharaonen, beeindruckt von der Effizienz und Poesie der Mägyptischen Symbole, übernahmen eine abgewandelte Version, um ihre administrativen und religiösen Texte zu bereichern.
Die Sprache zeigt, wie tief Kommunikation und Kultur miteinander verwoben sind. Mägyptisch – die Sprache der Mäuse – ist ein Zeugnis für die kreative Kraft der Sprache und die unendlichen Möglichkeiten, die sich aus Kontext und Symbolik ergeben.`),
			priority: 0,
			filetype: 'html' as const,
		},
		{
			type: 'audio' as const,
			// spellchecker: ignore pmmmdia01
			id: 'pmmmdia01',
			durationSeconds: 72,
			datetime: new Date('2024-12-01 16:13:00'),
			name: 'Observation P. Maus',
			keywords: splitAndClean(`Petra, ich muss es einfach sagen. Die Petition – deine Idee war genial! So viele Anhänger in so kurzer Zeit. Ich hätte das nie für möglich gehalten!

Ach, das war nur logisch. Die Mitglieder sind frustriert, und jemand musste die Initiative ergreifen.

Aber so schnell? Die alte Schnäpfe wackelt doch schon richtig, oder? Bald ist sie raus aus dem Verein!

Noch ist nichts entschieden. Aber ja, es sieht gut aus. Die Zahlen sprechen für sich.

Du bist wirklich beeindruckend, Petra. Ohne dich wären wir alle verloren.

Konzentrier dich lieber darauf, die Unterschriften zu sichern. Wir brauchen noch mehr Druck, falls sie sich doch wieder aufrafft.

Verlass dich drauf. Ich lasse keinen Stein auf dem anderen.

Gut. Das Ziel ist, den Verband zu retten – für uns alle. Und vergiss nicht: Der wahre Kampf beginnt erst, wenn sie wirklich weg ist.

Und dann wirst du Vorsitzende. Und ich Vorstand Familien.

Wir werden sehen. Erstmal Schritt für Schritt, monica.`),
			priority: 100,
		},
		threadToEmail(
			{
				id: 'mmz23',
				datetime: new Date('2024-12-10 20:03:00'),
				name: 'Telekommunikationsüberwachung M. Maus',
				priority: 10,
			},
			[
				{
					sender: 'martin.maus@vdh.de',
					recipients: ['felix@mousebook.de'],
					subject: 'Brauche deinen Rat',
					body: `Lieber Felix,

ich schreibe dir, weil ich mich gerade in einer wirklich komplizierten Lage befinde und nicht weiß, was ich tun soll. Du bist jemand, dessen Meinung ich immer sehr geschätzt habe, also dachte ich, ich frage dich um Rat.

Wie du weißt, arbeite ich seit einiger Zeit für die Kontrollmäuse. Ein Job, der eigentlich genau mein Ding ist: Unparteiisch, fair und gewissenhaft. Aber letzte Woche ist etwas passiert, das mich ins Grübeln gebracht hat.

Im Rahmen einer Routineüberwachung habe ich ein Gespräch aufgezeichnet, in dem deutlich wurde, dass unsere Zielmaus plant in die Hausmauswahl 2024 einzugreifen.

Was soll ich nur tun?

Bei meiner Vereidigung habe ich geschworen, absolute Vertraulichkeit zu wahren. Der Eid der Nagerischen Sicherheitsagentur ist bindend, und ein Verstoß könnte nicht nur meine Karriere beenden, sondern auch rechtliche Konsequenzen haben. Andererseits - wenn hier tatsächlich jemand versucht, die Wahl zu manipulieren, müssen wir das doch verhindern! Nach dem Skandal von 2023 können wir uns keine weitere Manipulation leisten.

Was würdest Du an meiner Stelle tun? Gibt es vielleicht einen Weg, die richtigen Stellen zu informieren, ohne meinen Eid zu brechen? Ich habe auch schon überlegt, ob ich anonym einen Hinweis geben könnte, aber selbst das könnte man eventuell zu mir zurückverfolgen.

Bitte lass mich wissen, was Du davon hältst. Ich vertraue auf Deine Verschwiegenheit und Deinen Rat.

In gespannter Erwartung Deiner Antwort,
Martin

P.S.: Lösche diese E-Mail bitte sofort nach dem Lesen. Man weiß nie, wer mitliest...`,
				},
			],
		),
		threadToEmail(
			{
				// spellchecker: ignore gvlamtar
				id: 'gvlamtar',
				datetime: new Date('2024-07-02 14:39:00'),
				name: 'Telekommunikationsüberwachung A. Maus',
				priority: 1,
			},
			[
				{
					sender: 'arno.maus@vdh.de',
					recipients: ['victor.lagarto@comandofamiliarlagartijas.es'],
					subject: 'Solicitud de colaboración en Ribadesella',
					body: `Estimado General Víctor Lagarto,

Le escribo como Director de Familias del Verband Deutscher Hausmäuse e.V., confiando en la colaboración histórica y ejemplar entre nuestras organizaciones.

En esta ocasión, quisiera solicitar la asistencia del Comando Familiar de Lagartijas para una tarea específica. La familia Kaiser, una de nuestras familias protegidas, estará de vacaciones del 15 al 22 de julio en el recién establecido pueblo de Ribadesella. Durante su estancia, será fundamental supervisar la labor de nuestra destacada Hausmaus Riebe Maus, quien está asignada a dicha familia.

El propósito de esta solicitud es garantizar que las medidas tomadas por Riebe Maus sean adecuadas y que se cumpla con el estándar de satisfacción que nos caracteriza. Por ello, sería de gran ayuda si uno de sus equipos pudiera:
	1.	Evaluar la satisfacción de la familia Kaiser durante su estancia.
	2.	Documentar las acciones realizadas por Riebe Maus.
	3.	Enviar un informe detallado al Verband Deutscher Hausmäuse e.V. para su análisis posterior.

Estamos seguros de que la colaboración de su comando garantizará un resultado positivo para todas las partes implicadas. Quedo a su disposición para coordinar cualquier detalle adicional que sea necesario.

Agradeciendo de antemano su apoyo, me despido con mis mejores deseos.

Atentamente,
Arno Maus
Director de Familias
Verband Deutscher Hausmäuse e.V.`,
				},
			],
		),
		threadToEmail(
			{
				// spellchecker: ignore hmvdhnsaa
				id: 'hmvdhnsaa',
				datetime: new Date('2024-01-15 08:44:00'),
				name: 'Telekommunikationsüberwachung H. Maus',
				priority: 200,
			},
			[
				{
					sender: 'hildegard.maus@vdh.de',
					recipients: ['Verteiler <Verband Deutscher Hausmäuse e.V.>'],
					subject: 'Wichtige Mitteilung des Verbands',
					body: `Sehr geehrte Hausmäuse,

wie einige von euch wissen, wurde unser Verband im Jahr 2023 von einem bedauerlichen Skandal erschüttert. Dies hat nicht nur unser Ansehen, sondern auch das Vertrauen in unsere Arbeit erheblich belastet.

Um sicherzustellen, dass sich ein solcher Vorfall nicht wiederholt, hat der Verband Deutscher Hausmäuse e.V. entschieden, die Nagerische Sicherheitsagentur (NSA) mit der Überwachung der aussichtsreichsten Hausmäuse zu beauftragen. Diese Maßnahme dient der Transparenz und der Integrität unserer Wahl- und Bewertungsverfahren.

Die Nagerische Sicherheitsagentur wurde mit einem umfassenden Mandat ausgestattet, um sicherzustellen, dass unsere Arbeit stets im Einklang mit unseren hohen Standards steht. Ihre Aufgaben umfassen:
	•	die Kontrolle der Zufriedenheit der betreuten Familien,
	•	die Überprüfung der Maßnahmen und Tätigkeiten der ausgewählten Hausmäuse,
	•	und die Sicherstellung eines fairen und transparenten Prozesses, insbesondere im Hinblick auf die Wahl zur „Hausmaus des Jahres“.

Wir bitten euch, dieser Maßnahme mit Offenheit zu begegnen. Eure Arbeit ist essenziell für den Ruf und die Werte unseres Verbands. Gemeinsam können wir gewährleisten, dass die Hausmäuse weiterhin als vertrauenswürdige und unverzichtbare Helfer unserer Familien wahrgenommen werden.

Solltet ihr Fragen oder Anliegen haben, steht euch unser Büro jederzeit zur Verfügung. Zögert nicht, uns zu kontaktieren.

Mit besten nagerischen Grüßen,

Hildegard Maus
Stellvertretende Vorsitzende
Verband Deutscher Hausmäuse e.V.`,
				},
			],
		),
		threadToEmail(
			{
				// spellchecker: ignore hmvdhehm55
				id: 'hmvdhehm55',
				datetime: new Date('2024-12-02 04:58:59'),
				name: 'Telekommunikationsüberwachung H. Maus',
				priority: 220,
			},
			[
				{
					sender: 'hildegard.maus@vdh.de',
					recipients: ['erwin.hubertus.maus@vdh.de'],
					subject: 'Unfassbar!!',
					body: `Lieber Erwin,

ich bin FASSUNGSLOS! Heute Morgen ist mir die Petition von Petra und Monica Maus in die Pfoten geraten, die zum Ziel hat, Riebe Maus aus dem Verband auszuschließen. Riebe Maus, die immerhin zwei Jahre in Folge zur Hausmaus des Jahres gewählt wurde!

Seit wann, Erwin, führt herausragende Leistung, Hingabe und der Einsatz für unsere Familienhausmäuse zum Ausschluss? Riebe Maus hat bewiesen, was es bedeutet, Teil dieses Verbands zu sein. Und jetzt wird sie für ihre Erfolge abgestraft?

Diese Aktion ist nicht nur ein Affront gegen Riebe Maus, sondern gegen den gesamten Verband und alles, wofür wir stehen. Soll das die neue Kultur des Hauses sein? Neid statt Anerkennung? Intrigen statt Zusammenarbeit?

Ich erwarte, dass Du hier klar Position beziehst und die Petition unverzüglich stoppt. Wir können es uns nicht leisten, dass interne Machtspielchen die Glaubwürdigkeit und Integrität des Verbands beschädigen.

Ich hoffe auf Deine Unterstützung in dieser Angelegenheit.

Mit aufgebrachten Grüßen,
Hildegard Maus
Stellvertretende Vorsitzende`,
				},
			],
		),
		threadToEmail(
			{
				// spellchecker: ignore argvlans01
				id: 'argvlans01',
				datetime: new Date('2024-07-25 06:08:00'),
				name: 'Telekommunikationsüberwachung A. Maus',
				priority: 1,
			},
			[
				{
					sender: 'victor.lagarto@comandofamiliarlagartijas.es',
					recipients: ['arno.maus@vdh.de'],
					subject: 'Informe preliminar sobre la supervisión de la familia Kaiser en Ribadesella',
					body: `Estimado Director Arno Maus,

Conforme a su solicitud, he designado un comando especializado del Comando Familiar de Lagartijas para supervisar la estancia de la familia Kaiser en Ribadesella y evaluar la labor de Riebe Maus. A continuación, le presento un informe preliminar de nuestras observaciones:
	1.	Durante los primeros días de la estancia, la familia Kaiser mostró un nivel notable de satisfacción. Destacaron especialmente la calidad de los helados y la belleza de la ciudad, la cual ha sido creada con esmero y detalle para ofrecer un entorno excepcional.
	2.	Sin embargo, nuestro equipo detectó cierta ambigüedad en las respuestas del padre de familia ante preguntas específicas, lo que generó dificultades para interpretar su grado de satisfacción.
	3.	Hacia el final del período vacacional, lamentablemente se produjo un conflicto familiar significativo, que parece haberse extendido incluso más allá de su regreso.

En cuanto al desempeño de Riebe Maus, debemos subrayar que su labor ha sido ejemplar. El esfuerzo invertido en la creación de todo un destino vacacional es verdaderamente extraordinario. Nuestro equipo quedó impresionado por:
	•	La dedicación en el diseño y ambientación del pueblo, con restaurantes y bares que contribuyeron a una experiencia de ocio inolvidable.
	•	La formación de excelentes actores para simular otros visitantes, logrando un ambiente familiar armonioso.
	•	La selección de personal destacado en áreas clave, con excepción del personal en la recepción.

El Comando Familiar de Lagartijas felicita a Riebe Maus por esta obra única. Pese a los desafíos presentados, es evidente que su compromiso y habilidad superan las expectativas habituales.

No obstante, se ha detectado en Riebe Maus la presencia de indicios claros de estrés durante los períodos en los que no se encontraba en compañía de la familia asignada. Este aspecto será analizado y documentado en profundidad en el informe detallado que se remitirá para su evaluación correspondiente..

Atentamente,
General Víctor Lagarto
Comandante Supremo
Comando Familiar de Lagartijas`,
				},
			],
		),
		threadToEmail(
			{
				// spellchecker: ignore hmhotl22
				id: 'hmhotl22',
				datetime: new Date('2024-12-20 07:34:58'),
				name: 'Telekommunikationsüberwachung H. Maus',
				priority: 150,
			},
			[
				{
					sender: 'thomas.maus@hotelmauseblick.de',
					recipients: ['hildegard.maus@vdh.de'],
					subject: 'Buchungsbestätigung Hotel Mäuseblick Nürnberg',
					body: `Sehr geehrte Frau Maus,

vielen Dank für Ihre Buchung im Hotel Mäuseblick Nürnberg. Hiermit bestätigen wir Ihren Aufenthalt wie folgt:

Buchungsdetails:
	•	Check-in: 22.12.2012 ab 14:00 Uhr
	•	Check-out: An der Rezeption vereinbaren
	•	Zimmerkategorie: 2-Personen-Zimmer
	•	Anzahl der Gäste: 1
	•	Buchungsnummer: 43753

Unsere Rezeption ist rund um die Uhr besetzt, um Ihnen jederzeit weiterzuhelfen. Sollten Sie vor Ihrer Anreise noch Fragen oder besondere Wünsche haben, zögern Sie bitte nicht, uns zu kontaktieren.

Mit mäusischen Grüßen,
Thomas Maus
Hotel Mäuseblick Nürnberg`,
				},
			],
		),
		threadToEmail(
			{
				// spellchecker: ignore ptsush04
				id: 'ptsush04',
				datetime: new Date('2024-12-15 07:04:58'),
				name: 'Telekommunikationsüberwachung H. Maus',
				priority: -50,
			},
			[
				{
					sender: 'hildegard.maus@vdh.de',
					recipients: ['Verteiler Aktive Hausmäuse <Verband Deutscher Hausmäuse e.V.>'],
					subject: 'Wichtige Mitteilung des Verbands',
					body: `Sehr geehrte Hausmäuse,

ich wende mich heute mit einer wichtigen Mitteilung an euch. Nach gründlichen Ermittlungen wurde beschlossen, Petra Maus für eine Dauer von 18 Monaten als Hausmaus zu suspendieren.

Dieser Schritt erfolgt aufgrund schwerwiegender Anschuldigungen und des Verdachts eines konspirativen Vorgehens gegen den Verband Deutscher Hausmäuse e.V. Wir nehmen solche Vorwürfe sehr ernst, da sie nicht nur das Ansehen unseres Verbandes, sondern auch die Werte und Grundsätze, für die wir stehen, gefährden.

Mein besonderer Dank gilt der Nagerischen Sicherheitsagentur für ihre herausragende Arbeit bei der Aufklärung dieses Falles. Ihr Einsatz war von unschätzbarem Wert, um Transparenz und Integrität in unserem Verband zu wahren.

Lasst uns in diesen Zeiten besonders darauf achten, die Gemeinschaft zu stärken und unseren gemeinsamen Auftrag, die Unterstützung unserer Familien, weiterhin mit vollem Einsatz zu erfüllen.

Mit nagerischen Grüßen,
Hildegard Maus
Stellvertretende Vorsitzende
Verband Deutscher Hausmäuse e.V.`,
				},
			],
		),
		threadToEmail(
			{
				// spellchecker: ignore ehmvdhnsaa
				id: 'ehmvdhnsaa',
				datetime: new Date('2024-01-30 07:23:58'),
				name: 'Telekommunikationsüberwachung E. Maus',
				priority: 0,
			},
			[
				{
					sender: 'erwin.hubertus.maus@vdh.de',
					recipients: ['Verteiler Hausmäuse <Verband Deutscher Hausmäuse e.V.>'],
					subject: 'Ein Vorbild für uns alle',
					body: `Liebe Hausmäuse,

ich möchte die Gelegenheit nutzen, um heute eine besondere Maus in den Mittelpunkt zu stellen: Hildegard Maus. Ihre unermüdliche Arbeit und ihr außergewöhnliches Engagement rund um den kürzlichen Skandal verdienen unseren höchsten Respekt.

Ich möchte diese Gelegenheit nutzten, um auf eine außergewöhnliche Hausmaus zurückzuschauen:

Hildegard P. Maus ist in einem kleinen, gemütlichen Vorratskeller in Bad Mölz geboren und begann ihre Laufbahn als Hausmaus bei der Familie Hartmann, ebenfalls in Bad Mölz. Dort zeigte sie früh, was in ihr steckt: Mit Feingefühl und einem scharfen Verstand unterstützte sie die Familie in schwierigen Zeiten und bewahrte sie sogar schon als Jungmaus vor einem existenzbedrohenden Wasserschaden.

2013, im Jahr des berüchtigten Schwimmskandals, bewies Hildegard einmal mehr, was eine echte Hausmaus ausmacht. Während andere in Schockstarre verfielen, behielt sie einen kühlen Kopf und war maßgeblich an der Wiederherstellung der Integrität unseres Verbandes beteiligt. Sie war es, die das Krisenmanagement leitete, Transparenz schuf und dafür sorgte, dass wir heute stärker denn je dastehen.

Ihre Karriere ist von vielen weiteren beeindruckenden Erfolgen geprägt:
	•	Als erste stellvertretende Vorsitzende setzte sie sich dafür ein, dass unsere älteren Hausmäuse Zugang zu besseren Unterstützungsstrukturen erhalten.
	•	Sie initiierte das Programm „Nagehilfe jetzt“, das bis heute unzähligen Familienhausmäusen die Ausbildung erleichtert.
	•	Ihre Fähigkeit, Konflikte zu entschärfen, wurde mehrfach in herausfordernden Situationen bewiesen – immer mit dem Ziel, den Verband und unsere Mission zu stärken.

Hildegards Loyalität und Arbeitsmoral sind beispielhaft. Sie ist eine Inspiration für uns alle und zeigt, wie viel Gutes eine Hausmaus bewirken kann.

Lasst uns Hildegard an dieser Stelle unseren Dank aussprechen und sie weiterhin in ihrer wichtigen Rolle unterstützen. Gemeinsam können wir auf eine noch stärkere Zukunft für den Verband hinarbeiten.

Mit herzlichen Grüßen,
Erwin Hubertus
Leiter des Verbandes Deutscher Hausmäuse e.V.`,
				},
			],
		),
		threadToEmail(
			{
				// spellchecker: ignore smnkm84
				id: 'smnkm84',
				datetime: new Date('2024-06-02 14:22:58'),
				name: 'Telekommunikationsüberwachung S. Maus',
				priority: 0,
			},
			[
				{
					sender: 'sebastian.maus@vdh.de',
					recipients: ['Verteiler Hausmäuse <Verband Deutscher Hausmäuse e.V.>'],
					subject: 'Spaßvogel',
					body: `Sehr lustig, die Notiz am Kühlschrank in „Mägyptisch“ war ja wohl der Brüller. Und nein, wir sind nicht dick.

Beste Grüße,
Sebastian Maus
Administrator
Verband Deutscher Hausmäuse e.V.`,
				},
			],
		),
		threadToEmail(
			{
				// spellchecker: ignore hmnvas11
				id: 'hmnvas11',
				datetime: new Date('2024-6-10 15:38:58'),
				name: 'Telekommunikationsüberwachung H. Maus',
				priority: -50,
			},
			[
				{
					sender: 'hildegard.maus@vdh.de',
					recipients: ['Verteiler <Verband Deutscher Hausmäuse e.V.>'],
					subject: 'Unterstützung der Kontrollmäuse',
					body: `Liebe Hausmäuse,

ich möchte noch einmal darauf hinweisen, dass jeglicher Versuch, die Arbeit der Kontrollmäuse zu stören, sie zu verwirren, abzuhängen oder anderweitig in ihrer Arbeit zu behindern, strikt untersagt ist. Solche Handlungen werden ohne Ausnahme mit sofortiger Disqualifikation aus der Wahl zur „Hausmaus des Jahres“, vorübergehender Suspendierung oder sogar einem vollständigen Ausschluss aus dem Verband Deutscher Hausmäuse e.V. geahndet.

Insbesondere möchte ich darauf hinweisen, dass der Besitz oder Gebrauch des Geräts "Nagerveilchen" – einem bekannt gewordenen Mittel zur Umgehung der Kontrollmaßnahmen – ebenfalls zu den oben genannten Konsequenzen führt. Solche Geräte oder ähnliche Mittel stehen im direkten Widerspruch zu unseren Werten und Zielen und werden unter keinen Umständen toleriert.

Die Kontrollmäuse haben eine wichtige Aufgabe:
	•	Sie überprüfen, ob die betreuten Familien zufrieden sind und ob ihre Bedürfnisse erfüllt werden.
	•	Sie sorgen dafür, dass alle Maßnahmen der Hausmäuse fair und im Einklang mit unseren ethischen Standards ablaufen.
	•	Sie tragen dazu bei, das Vertrauen in unsere Arbeit zu stärken und die Integrität unseres Verbandes zu sichern.

Wir alle arbeiten gemeinsam daran, den Verband Deutscher Hausmäuse e.V. als zuverlässigen und integren Helfer für Familien in Deutschland zu erhalten. Transparenz und Fairness sind Grundpfeiler unserer Arbeit, und die Kontrollmäuse spielen eine entscheidende Rolle, um dies sicherzustellen.

Ich bitte euch daher eindringlich, die Kontrollmäuse bei ihrer Arbeit zu unterstützen und ihnen mit Respekt zu begegnen. Lasst uns gemeinsam zeigen, dass wir als Gemeinschaft für das Wohl unserer Familien und für die Werte des Verbandes einstehen.

Solltet ihr Fragen oder Bedenken haben, zögert nicht, euch an unser Büro zu wenden.

Mit besten nagerischen Grüßen,
Hildegard Maus
Stellvertretende Vorsitzende
Verband Deutscher Hausmäuse e.V.`,
				},
			],
		),
		threadToEmail(
			{
				// spellchecker: ignore fmmnkm84
				id: 'fmmnkm84',
				datetime: new Date('2024-03-26 10:18:58'),
				name: 'Telekommunikationsüberwachung F. Maus',
				priority: 0,
			},
			[
				{
					sender: 'freddy.maus@vdh.de',
					recipients: ['Verteiler IT <Verband Deutscher Hausmäuse e.V.>'],
					subject: 'Re: Film gestern Abend',
					body: `Also ehrlich, Jungs, ihr glaubt doch nicht im Ernst, dass es in dem Film um echte Maulwürfe geht, oder? Was kommt als Nächstes? Ein Oscar für den besten Tunnelbau?!

Maulwurf heißt Verräter, ihr Genies.`,
				},
			],
		),
		threadToEmail(
			{
				// spellchecker: ignore fmmnkm84
				id: 'fmmnkm84',
				datetime: new Date('2024-03-26 10:18:58'),
				name: 'Telekommunikationsüberwachung E. Maus',
				priority: -50,
			},
			[
				{
					sender: 'erwin.hubertus.maus@vdh.de',
					recipients: ['konrad.maus@nsa.vdh.de', 'hildegard.maus@vdh.de'],
					subject: 'Das kann doch wohl nicht euer Ernst sein!',
					body: `Hallo zusammen,

Es ist absolut UNAKZEPTABEL, dass ihr immer noch keine Lösung für dieses blöde Nagerveilchen habt! Gespräche werden gestört, und was macht ihr? Packt die einfach als „unverständlich“ in eure Datenbank?! Das ist kein Umgang mit so einem ernsten Problem!

Und dann noch dieser völlig absurde Zustand, dass wir Funktionäre KEINEN Zugriff auf eure Datenbank haben. Gewaltenteilung hin oder her, das geht doch viel zu weit! Wie sollen wir vernünftig arbeiten, wenn wir völlig im Dunkeln gelassen werden? Das ist einfach nicht tragbar, und ich sage euch: So bleibt das nicht.

Ihr müsst echt mal anfangen, eure Arbeit ernst zu nehmen und diese Probleme sofort zu lösen. Ich habe langsam die Nase voll!

Erwin Hubertus`,
				},
			],
		),
		threadToEmail(
			{
				// spellchecker: ignore esehmrn77
				id: 'esehmrn77',
				datetime: new Date('2024-6-10 15:38:58'),
				name: 'Telekommunikationsüberwachung H. Maus',
				priority: -160,
			},
			[
				{
					sender: 'hildegard.maus@vdh.de',
					recipients: ['Verteiler <Verband Deutscher Hausmäuse e.V.>'],
					subject: 'Eine schwere Entscheidung',
					body: `Liebe Kolleginnen und Kollegen,

heute wende ich mich mit einer Nachricht an euch, die mir unbeschreiblich schwerfällt. Arnold Maus, unser geschätzter Chefbuchhalter und für mich persönlich ein enger Freund, wird mit sofortiger Wirkung aus dem Verband Deutscher Hausmäuse e.V. ausgeschlossen und all seiner Aufgaben entbunden.

Dieser Schritt bricht mir das Herz. Arnold war nicht nur eine unentbehrliche Stütze des Verbandes, sondern auch jemand, den ich zutiefst bewundert und geschätzt habe. Er war ein Vertrauter, ein Zuhörer, ein Wegbegleiter in schweren Zeiten. Umso unerträglicher ist es für mich, euch mitteilen zu müssen, dass er das Vertrauen, das wir ihm entgegengebracht haben, auf schändliche Weise missbraucht hat.

Nach intensiven Gesprächen mit Erwin Hubertus Maus und reiflicher Überlegung blieb mir keine andere Wahl. So sehr ich es mir gewünscht hätte, diese Entscheidung nicht treffen zu müssen, so klar war am Ende, dass die Integrität und die Werte unseres Verbandes an erster Stelle stehen müssen.

Ich bitte um Verständnis, dass ich aus Rücksicht auf die Umstände keine weiteren Details nennen kann. Es ist eine schmerzhafte Zeit für uns alle, aber ich hoffe, dass wir gemeinsam die Stärke finden, diesen Verlust zu verkraften und den Verband in seinem Kern zu schützen.

Mit traurigen Grüßen,
Hildegard Maus
Stellvertretende Vorsitzende
Verband Deutscher Hausmäuse e.V.`,
				},
			],
		),
	].map(item => ({
		...item,
		keywords: item.keywords.map(keyword => keyword.toLowerCase()),
	})),
)
