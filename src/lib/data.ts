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

const splitAndClean = (input: string): string[] =>
	input
		.replace(/[^\w\s]/g, '')
		.split(/\s+/)
		.filter(word => word.length > 0)

const threadToEmail = (data: Omit<CommonData, 'keywords'>, thread: EmailThread): Email => {
	return {
		...data,
		type: 'email',
		keywords: thread.flatMap(message => [message.sender, ...message.recipients, ...splitAndClean(message.subject), ...splitAndClean(message.body)]).filter(keyword => keyword.length > 4),
		thread,
	}
}

type Data =
	| Email
	| (CommonData & {
			type: 'audio'
			durationSeconds: number
	  })
	| (CommonData & {
			type: 'document'
			filename: string
	  })

export const data: Array<Data> = [
	{
		type: 'document',
		id: 'test1',
		datetime: new Date('2024-01-01 12:00:00'),
		name: 'test',
		keywords: ['testtest'],
		priority: 1,
		filename: 'test.pdf',
	},
	threadToEmail(
		{
			id: 'mmz23',
			datetime: new Date('2024-12-10 20:03:00'),
			name: 'Telekommunikationsüberwachung M. Maus',
			priority: 1,
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
].map(
	item =>
		({
			...item,
			keywords: item.keywords.map(keyword => keyword.toLowerCase()),
		}) as Data,
)
