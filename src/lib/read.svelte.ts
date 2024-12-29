let readDocuments = $state<string[]>(JSON.parse(localStorage.getItem('readDocuments') || '[]'))

export const markAsRead = (id: string) => {
	if (!readDocuments.includes(id)) {
		readDocuments = [...readDocuments, id]
		localStorage.setItem('readDocuments', JSON.stringify(readDocuments))
	}
}

export const isRead = (id: string) => readDocuments.includes(id)
