'use client'

import AndroidIcon from '@/asset/icon/AndroidIcon'
import IOSIcon from '@/asset/icon/IOSIcon'
import Window from '@/asset/icon/Window'
import Loading from '@/components/Loading'
import Pagination from '@/components/Pagination'
import { BlockChainSchema } from '@/schema/blockchain'
import { useCallback, useEffect, useState } from 'react'
import data from '../../json/data.json'
import Popup from './Popup'

const LIMIT = 10

const FILTER_OPITON = [
	{
		title: 'Ethereum',
		value: 'ethereum'
	},
	{
		title: 'Solana',
		value: 'solana'
	},
	{
		title: 'BNB Chain',
		value: 'bsc'
	},
	{
		title: 'Immutable-X',
		value: 'immutable-x'
	},
	{
		title: 'Other',
		value: 'other'
	},
	{
		title: 'NEAR',
		value: 'near'
	},
	{
		title: 'Polygon',
		value: 'polygon'
	},
	{
		title: 'Avalanche',
		value: 'avalanche'
	},
	{
		title: 'Harmony',
		value: 'harmony'
	},
	{
		title: 'BNB Sidechain',
		value: 'bnb-sidechain'
	},
	{
		title: 'OKExChain',
		value: 'okexchain'
	},
	{
		title: 'Wanchain',
		value: 'wanchain'
	}
]

function BestFreeP2ENTFGame() {
	const [page, setPage] = useState<number>(1)
	const [filterState, setFilterState] = useState('ALL')
	const [blockChainList, setBlockChainList] = useState<BlockChainSchema[]>(
		() => []
	)
	const [isLoading, setIsLoading] = useState(true)
	const [indexPopup, setIndexPopup] = useState<null | number>(null)

	function handleOnPageChange(page: number) {
		setPage(page)
	}

	useEffect(() => {
		const dataStorage: BlockChainSchema[] =
			JSON.parse(localStorage.getItem('@data')!) ?? data
		if (filterState === 'ALL') {
			setBlockChainList(dataStorage)
		} else {
			const tempData: any = []
			dataStorage.forEach((i) => {
				i.BlockChains.forEach((e) => {
					if (e.Code === filterState.toLowerCase()) tempData.push(i)
					else return null
				})
			})

			setBlockChainList(tempData)
		}
		setPage(1)
	}, [filterState])

	useEffect(() => {
		setTimeout(() => {
			if (!localStorage.getItem('@data')) {
				localStorage.setItem('@data', JSON.stringify(data))
				setBlockChainList(data as any)
			} else {
				const dataStorage = JSON.parse(localStorage.getItem('@data')!)
				setBlockChainList(dataStorage)
			}
			setIsLoading(false)
		}, 500)
	}, [])

	const handleOpenPopup = useCallback(
		(idx: number) => {
			if (idx) setIndexPopup(idx)
		},
		[indexPopup]
	)

	const handleClose = useCallback(() => {
		setIndexPopup(null)
	}, [indexPopup])

	return (
		<>
			{isLoading ? (
				<Loading />
			) : (
				<section
					className={`px-3 lg:px-1 container 2xl:max-w-[1344px] mx-auto  ${
						indexPopup ? 'overflow-hidden' : 'pb-10'
					}`}
				>
					<div className='breadcum text-[13px] my-8'>
						Home &gt; Games &gt; Best free P2E NFT Games in 2022
					</div>
					<div className='mb-[35px]'>
						<h1 className='font-poppins-bold text-[32px] mb-[6px]'>
							Best free P2E NFT Games in 2022
						</h1>
						<p className='text-[15px]'>
							Are you looking for Games that Free-to-play? Here are the best F2P
							NFT games available
						</p>
					</div>

					<select
						onChange={(e) => setFilterState(e.target.value)}
						className='search bg-blue-gray rounded-[10px] px-2 py-[6px] appearance-none outline-none pr-8 cursor-pointer mb-5'
					>
						<option value='ALL' className='text-[15px] cursor-pointer'>
							All Blockchain
						</option>
						{FILTER_OPITON.map((opt, idx) => (
							<option
								className='text-[15px] cursor-pointer'
								key={idx}
								value={opt.value}
							>
								{opt.title}
							</option>
						))}
					</select>

					<div className='mb-6 overflow-auto'>
						<div className='grid grid-cols-[.5fr_4fr_3fr_1.5fr_1fr]'>
							<p className='text-[13px] font-poppins-bold uppercase min-w-[50px] border-b border-[#64748B] py-[9px] pl-5'>
								#
							</p>
							<p className='text-[13px] font-poppins-bold uppercase min-w-[300px] border-b border-[#64748B] py-[9px]'>
								Name
							</p>
							<p className='text-[13px] font-poppins-bold uppercase  min-w-[300px] border-b border-[#64748B] py-[9px]'>
								Genre
							</p>
							<p className='text-[13px] font-poppins-bold uppercase text-right min-w-[200px] border-b border-[#64748B] py-[9px]'>
								Platform
							</p>
							<p className='text-[13px] font-poppins-bold uppercase text-right min-w-[100px] border-b border-[#64748B] py-[9px] pr-5'>
								Action
							</p>
						</div>
						{blockChainList
							.map((i, idx) => ({ ...i, id: idx + 1 }))
							.slice(LIMIT * (page - 1), LIMIT * page)
							.map((item, idx) => {
								return (
									<div
										key={item.id}
										className='grid grid-cols-[.5fr_4fr_3fr_1.5fr_1fr]'
									>
										<p className='font-poppins-bold uppercase text-[15px] min-w-[50px] border-b border-[#EDF2F7] py-[15px] pl-5'>
											{item.id}
										</p>
										<div className='flex items-center gap-4 min-w-[300px] border-b border-[#EDF2F7] py-[15px]'>
											<div className='h-10 w-10'>
												<img
													src={item.ImageUrl}
													alt={item.Name}
													className='w-full h-full rounded-full object-cover'
												/>
											</div>
											<div className='flex flex-col'>
												<div className='flex items-center gap-1 text-[15px]'>
													<span className='font-poppins-bold '>
														{item.Name}
													</span>
													<span className='text-[#64748B] uppercase'>
														{item.Symbol}
													</span>
												</div>
												<div className='flex items-center gap-1'>
													<div className='h-5 w-5'>
														<img
															className='w-full h-full rounded-full object-cover'
															src={item.BlockChains[0].ExtendValue ?? ''}
															alt={item.Name}
														/>
													</div>
													<p className='text-[13px] text-[#64748B]'>
														{item.BlockChains[0].Name}
													</p>
												</div>
											</div>
										</div>
										<div className='flex items-center flex-wrap min-w-[300px] border-b border-[#EDF2F7] py-[15px]'>
											{item.Genres.map((genre, idx) => {
												return (
													<p
														className='relative px-3 first-of-type:pl-0 last-of-type:after:content-[unset] text-[15px] after:content-[""] after:absolute after:h-2/3 after:top-1/2 after:right-0 after:-translate-y-1/2  after:w-[2px] after:bg-black'
														key={idx}
													>
														{genre.Name}
													</p>
												)
											})}
										</div>
										<div className='flex items-center gap-2 justify-end min-w-[200px] border-b border-[#EDF2F7] py-[15px]'>
											{item.Platforms.map((pf, idx) => {
												let pfIcon
												switch (pf.Code) {
													case 'browser':
													case 'pc':
													case 'windows':
														pfIcon = <Window />
														break
													case 'mac':
													case 'ios':
														pfIcon = <IOSIcon />
														break
													case 'android':
													case 'mobile':
														pfIcon = <AndroidIcon />
														break
													default:
														break
												}
												return <p key={idx}>{pfIcon}</p>
											})}
										</div>
										<div className='flex items-center justify-end  min-w-[100px] border-b border-[#EDF2F7] py-[15px] pr-5'>
											<button
												onClick={() => handleOpenPopup(idx + 1)}
												className='text-[13px] bg-[#D71C5D] text-white py-2 px-3 rounded-xl'
											>
												Edit
											</button>
										</div>
									</div>
								)
							})}
					</div>

					<div className='relative'>
						<p className='text-[#64748B] text-center mt-3 lg:mt-0 text-[15px] relative lg:absolute'>
							Showing {(page - 1) * LIMIT + 1} - {page * LIMIT} out of{' '}
							{blockChainList.length}
						</p>
						<Pagination
							limit={LIMIT}
							total={blockChainList.length}
							currentPage={page}
							onPageChange={handleOnPageChange}
						/>
					</div>

					{indexPopup && (
						<div className='fixed top-0 right-0 left-0 bottom-0 w-full h-full flex  justify-center items-center backdrop-brightness-50 z-20'>
							<Popup
								position={indexPopup}
								handleClose={handleClose}
								setBlockChainList={setBlockChainList}
								setIsLoading={setIsLoading}
							/>
						</div>
					)}
				</section>
			)}
		</>
	)
}

export default BestFreeP2ENTFGame
