import TextField from '@/components/hook-form/TextField'
import { yupResolver } from '@hookform/resolvers/yup'
import React from 'react'
import { FormProvider, useForm } from 'react-hook-form'
import * as yup from 'yup'
import data from '../../json/data.json'
import BlockChainField from './BlockChainField'
import GenresField from './GenresField'
import PlatformsField from './PlatFormField'

type PopupPropsType = {
	position: number
	handleClose: () => void
	setBlockChainList: React.Dispatch<React.SetStateAction<any>>
	setIsLoading: React.Dispatch<React.SetStateAction<boolean>>
}

function Popup({
	position,
	handleClose,
	setBlockChainList,
	setIsLoading
}: PopupPropsType) {
	const dataList = JSON.parse(localStorage.getItem('@data')!) || data
	const detail = dataList[position - 1]

	const schema = yup.object({
		Genres: yup.array().of(
			yup.object().shape({
				Code: yup.string().required('Code is required.'),
				Name: yup.string().required('Name is required.')
			})
		),
		BlockChains: yup.array().of(
			yup.object().shape({
				Code: yup.string().required('Code is required.'),
				Name: yup.string().required('Name is required.'),
				ExtendValue: yup.string().required('Name is required.')
			})
		),
		Platforms: yup.array().of(
			yup.object().shape({
				Code: yup.string().required('Code is required.'),
				Name: yup.string().required('Name is required.')
			})
		),
		Symbol: yup.string().required('Symbol is required.'),
		Price: yup.string().required('Price is required.'),
		Code: yup.string().required('Symbol is required.')
	})

	const defaultValues = {
		Genres: detail.Genres,
		Symbol: detail.Symbol,
		BlockChains: detail.BlockChains,
		Platforms: detail.Platforms,
		Price: detail.Price,
		Code: detail.Code
	}
	const methods = useForm({
		defaultValues,
		resolver: yupResolver(schema)
	})

	function handleSubmit(values: any) {
		setIsLoading(true)
		setTimeout(() => {
			const newDetail = { ...detail, ...values }

			dataList.splice(position - 1, 1, newDetail)

			localStorage.setItem('@data', JSON.stringify(dataList))
			setBlockChainList(dataList)
			handleClose()

			setIsLoading(false)
		}, 500)
	}

	return (
		<div className='overflow-auto w-full h-full md:w-auto md:h-auto md:max-w-1/2 md:min-w-1/2 max-h-1/2 min-h-[200px] bg-white rounded p-3 text-[15px]'>
			<FormProvider {...methods}>
				<form onSubmit={methods.handleSubmit(handleSubmit)}>
					<div className='flex gap-3 justify-end pb-2 border-b border-black/10'>
						<button
							type='button'
							onClick={handleClose}
							className='text-[15px] bg-[#D71C5D] py-1 px-4 rounded text-white'
						>
							Cancel
						</button>
						<button
							type='submit'
							className='text-[15px] bg-[#00adee] py-1 px-4 rounded text-white'
						>
							Save
						</button>
					</div>
					<div className='mt-3 flex flex-col gap-3'>
						<GenresField />
						<BlockChainField />
						<PlatformsField />
						<div className='flex flex-col sm:flex-row items-start w-full gap-3 mb-2'>
							<div className='w-full sm:w-auto flex flex-col gap-1.5 flex-1'>
								<label htmlFor='symbol' className='font-poppins-bold'>
									Symbol
								</label>
								<TextField name='Symbol' id='symbol' />
							</div>
							<div className='w-full sm:w-auto flex flex-col gap-2 flex-1'>
								<label htmlFor='price' className='font-poppins-bold'>
									Price
								</label>
								<TextField name='Price' id='price' />
							</div>
						</div>
						<div className='w-full sm:w-auto flex flex-col gap-2 flex-1'>
							<label htmlFor='code' className='font-poppins-bold'>
								Code
							</label>
							<TextField name='Code' id='code' />
						</div>
					</div>
				</form>
			</FormProvider>
		</div>
	)
}

export default Popup
