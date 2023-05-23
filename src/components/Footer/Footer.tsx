import Link from 'next/link'
import Logo from '../../asset/icon/Logo'
import TextBrand from '../../asset/icon/TextBrand'

const MENU = [
	{ name: 'FAQ', href: '/faq' },
	{ name: 'Newsletter', href: '/newsletter' },
	{ name: 'Advertise', href: '/advertise' },
	{ name: 'Contact us', href: '/contact' },
	{ name: 'Press kit', href: '/press-kit' },
	{ name: 'Privacy', href: '/privacy' },
	{ name: 'Terms', href: '/terms' }
]

function Footer() {
	return (
		<footer
			style={{
				background: 'linear-gradient(103.7deg, #D71C5D 0%, #FF9017 100%)'
			}}
			className='py-7 flex flex-col items-center justify-center gap-6'
		>
			<div className='flex gap-2.5 items-center'>
				<Logo whiteLogo />
				<TextBrand fill='white' />
			</div>
			<div className='flex items-center flex-wrap gap-y-2 justify-center px-3'>
				{MENU.map((item, idx) => {
					return (
						<Link
							className={`hover:bg-primary/50 hover:text-white/50 text-[15px] text-white border-r-2 leading-3 px-3 border-white last-of-type:border-0`}
							href={item.href}
							key={idx}
						>
							{item.name}
						</Link>
					)
				})}
			</div>
			<p className='text-white opacity-50 text-[15px]'>
				© 2021 PlayToEarn.net - all rights reserved
			</p>
		</footer>
	)
}

export default Footer
