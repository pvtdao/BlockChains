import TextField from '@/components/hook-form/TextField'
import { useFieldArray, useFormContext } from 'react-hook-form'

function PlatformsField() {
	const { control } = useFormContext()
	const { fields, append, remove } = useFieldArray({
		control,
		name: 'Platforms'
	})
	return (
		<div>
			<div className='flex items-center gap-2 mb-1'>
				<p className='font-poppins-bold'>Platforms</p>
				<button
					type='button'
					onClick={() =>
						append({ Code: 'Platforms Code', Name: 'Platforms Name' })
					}
					className='text-blue-700 hover:text-white border border-blue-700 hover:bg-blue-800 font-medium rounded-lg text-sm px-3 py-1.5 text-center'
				>
					Add new
				</button>
			</div>
			{fields.map((item, idx) => {
				return (
					<div key={item.id} className='flex items-start gap-2 mb-3'>
						<TextField fullWidth name={`Platforms[${idx}].Code`} />
						<TextField fullWidth name={`Platforms[${idx}].Name`} />
						<button
							className='text-white bg-red-700 hover:bg-red-800 rounded-lg text-sm px-2.5 py-1 mr-2 mb-2 '
							onClick={() => remove(idx)}
						>
							X
						</button>
					</div>
				)
			})}
		</div>
	)
}

export default PlatformsField
