type CommonData = {
	id: string
	datetime: Date
	name: string
	keywords: string[]
	priority: number
}

export const data: Array<
	| (CommonData & {
			type: 'email'
			thread: [
				{
					sender: string
					subject: string
					body: string
				},
			]
	  })
	| (CommonData & {
			type: 'audio'
			durationSeconds: number
	  })
	| (CommonData & {
			type: 'document'
			filename: string
	  })
> = [
	{
		type: 'document',
		id: '1',
		datetime: new Date('2024-01-01 12:00:00'),
		name: 'test',
		keywords: ['testtest'],
		priority: 1,
		filename: 'test.pdf',
	},
]
