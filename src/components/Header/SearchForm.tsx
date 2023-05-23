import SearchIcon from '@/asset/icon/SearchIcon'
import { useDebounce } from '@/hooks/useDebounce'
import { BlockChainSchema } from '@/schema/blockchain'
import { useEffect, useState } from 'react'
import { FormProvider, useForm } from 'react-hook-form'
import data from '../../json/data.json'
import TextField from '../hook-form/TextField'

function SearchForm({ isOpen }: { isOpen?: boolean }) {
	const methods = useForm({
		defaultValues: {
			search: ''
		}
	})

	const [dataList, setDataList] = useState<BlockChainSchema[]>(() => [])

	const watchSearch = methods.watch('search')
	const debouncedSearchTerm = useDebounce(watchSearch, 500)

	useEffect(() => {
		const dataStorage: BlockChainSchema[] =
			JSON.parse(localStorage.getItem('@data')!) ?? data

		const dataFilter = dataStorage.filter((item) => {
			return (
				item.Symbol.toLowerCase().includes(watchSearch.toLowerCase()) ||
				item.Name.toLowerCase().includes(watchSearch.toLowerCase())
			)
		})

		setDataList(dataFilter)
	}, [debouncedSearchTerm])

	useEffect(() => {
		if (!isOpen) {
			setDataList([])
			methods.reset()
		}
	}, [isOpen])

	function getHighlightedMatch(
		text: string,
		highlight: string,
		className: string
	) {
		const parts = text.split(new RegExp(`(${highlight})`, 'gi'))
		return (
			<span>
				{parts.map((part, i) => (
					<span
						key={i}
						style={
							part.toLowerCase() === highlight.toLowerCase()
								? { color: '#D71C5D' }
								: {}
						}
						className={className}
					>
						{part}
					</span>
				))}
			</span>
		)
	}

	return (
		<div className='w-[338px] h-[38px] bg-blue-gray rounded-[100px] py-3 px-[18px] relative'>
			<FormProvider {...methods}>
				<form className='flex items-center h-full w-full'>
					<button type='submit'>
						<SearchIcon />
					</button>
					<TextField
						name='search'
						placeholder='Search NTFs / Collection / Addresses'
						fullWidth
						className='text-[13px] py-1 px-4 outline-none border-none w-full bg-[transparent] '
					/>
					{debouncedSearchTerm && (
						<div className='absolute bg-white min-h-[100px] max-h-[200px] py-4 top-[110%] rounded-bl-lg rounded-br-lg left-0 right-0 shadow-lg border overflow-auto'>
							<div className='flex flex-col gap-1'>
								{dataList.map((i, idx) => {
									return (
										<div className='' key={idx}>
											<div className='text-[15px] px-4 hover:bg-primary/10 flex items-center p-2 rounded-sm hover:bg-black/5 cursor-pointer gap-3'>
												<div className='h-8 w-8'>
													<img
														src={i.ImageUrl}
														alt={i.Name}
														className='w-full h-full rounded-full object-cover'
													/>
												</div>
												{getHighlightedMatch(
													i.Name,
													debouncedSearchTerm,
													'font-poppins-bold'
												)}
												{getHighlightedMatch(
													i.Symbol,
													debouncedSearchTerm,
													'text-[13px] text-[#64748B] uppercase'
												)}
											</div>
										</div>
									)
								})}
								{dataList.length === 0 && (
									<p className='text-[15px] px-2'>
										No result for{' '}
										<span className='text-[15px] font-poppins-bold'>
											{debouncedSearchTerm}
										</span>
									</p>
								)}
							</div>
						</div>
					)}
				</form>
			</FormProvider>
		</div>
	)
}

export default SearchForm
