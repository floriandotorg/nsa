export const data: Array<
	| {
			type: 'email'
			keywords: string[]
			priority: number
			thread: [
				{
					sender: string
					subject: string
					body: string
				},
			]
	  }
	| {
			type: 'audio'
			keywords: string[]
			priority: number
			durationSeconds: number
	  }
	| {
			type: 'document'
			keywords: string[]
			priority: number
			filename: string
	  }
> = [
	{
		type: 'document',
		keywords: ['testtest'],
		priority: 1,
		filename: 'test.pdf',
	},
]
