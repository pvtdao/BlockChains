import { usePagination } from '@/hooks/usePagination'

type PaginationProps = {
	total: number
	limit?: number
	onPageChange: (page: number) => void
	className?: string
	currentPage: number
}

function Pagination({
	total,
	limit = 5,
	onPageChange,
	currentPage
}: PaginationProps) {
	const paginationRange =
		usePagination({
			currentPage: currentPage,
			pageSize: limit,
			total: total
		}) || []

	const handleChangePage = (page: number) => {
		onPageChange(page)
	}

	return (
		<div className='mt-5'>
			<div className='flex gap-2 justify-center'>
				<div className='flex justify-center flex-wrap gap-2'>
					{paginationRange &&
						paginationRange.map((page, idx) => {
							return (
								<button
									className={`w-8 h-8 rounded-lg text-[15px] ${
										currentPage === page &&
										'text-white bg-[#D71C5D] border-none'
									}`}
									onClick={() => handleChangePage(page)}
									key={idx}
									disabled={page === -1}
								>
									{page === -1 ? '...' : page}
								</button>
							)
						})}
				</div>
			</div>
		</div>
	)
}

export default Pagination
