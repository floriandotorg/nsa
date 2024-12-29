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
			filetype: 'png' | 'pdf'
	  })

const splitAndClean = (input: string): string[] =>
	input
		.replace(/[^\w\s]/g, '')
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
			keywords: ['Hildegard'],
			priority: 100,
			filetype: 'png' as const,
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

Wir werden sehen. Erstmal Schritt für Schritt, Monika.`),
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
				priority: 100,
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
				priority: 100,
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
				priority: 1,
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
	].map(item => ({
		...item,
		keywords: item.keywords.map(keyword => keyword.toLowerCase()),
	})),
)
