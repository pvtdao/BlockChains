type FilterPropsType = {
	index: number
	setIndexActive: (index: number) => void
	indexActive: number
}

function filterBlockChain({
	index,
	setIndexActive,
	indexActive
}: FilterPropsType) {
	function handleOpenSelect() {
		return indexActive !== index ? setIndexActive(index) : setIndexActive(0)
	}

	return (
		<div className='relative'>
			<div
				className='flex items-center gap-1 cursor-pointer select-none relative'
				onClick={() => handleOpenSelect()}
			></div>
		</div>
	)
}

export default filterBlockChain
