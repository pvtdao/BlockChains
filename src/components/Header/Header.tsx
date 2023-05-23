'use client'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { useState } from 'react'
import CloseIcon from '../../asset/icon/CloseIcon'
import Logo from '../../asset/icon/Logo'
import MenuIcon from '../../asset/icon/MenuIcon'
import TextBrand from '../../asset/icon/TextBrand'
import SearchForm from './SearchForm'

const MENU = [
	{ name: 'Explore', href: '/explore' },
	{ name: 'Genres', href: '/genres' },
	{ name: 'Whitelists', href: '/whitelists' },
	{ name: 'Learn', href: '/learn' },
	{ name: 'Community', href: '/community' }
]

function Header() {
	const pathName = usePathname()
	const [isOpen, setIsOpen] = useState(false)

	function handleOpenMenu() {
		setIsOpen(!isOpen)
	}

	return (
		<header className='h-16 bg-white shadow fixed top-0 w-full flex items-center z-10'>
			<div className='bg-white h-full px-3 lg:px-1 min-w-full xl:max-w-full 2xl:max-w-[1824px] mx-auto flex items-center gap-5 lg:gap-8 xl:gap-10'>
				<div className='flex items-center gap-2.5'>
					<Logo />
					<TextBrand />
				</div>
				<div className='hidden lg:flex items-center gap-8 xl:flex-1'>
					<div className='flex items-center gap-7'>
						{MENU.map((item, idx) => {
							const isActive =
								item.href === '/'
									? pathName === item.href
									: pathName.includes(item.href)
							return (
								<Link
									className={`${
										isActive
											? 'bg-primary text-white'
											: 'hover:bg-primary/50 hover:text-black/50'
									} text-[13px] xl:text-[15px] font-poppins-bold`}
									href={item.href}
									key={idx}
								>
									{item.name}
								</Link>
							)
						})}
					</div>
					<SearchForm />
				</div>
				<div className='hidden xl:flex items-center gap-6'>
					<button className='text-[13px] xl:text-[15px] font-poppins-bold'>
						Login
					</button>
					<button className='text-[13px] xl:text-[15px] text-white px-3 py-2 rounded-[10px] bg-gradient-to-r from-[#D71C5D] to-[#FF9017]'>
						Sign up
					</button>
				</div>

				<button
					onClick={handleOpenMenu}
					type='button'
					className='absolute xl:hidden right-0 inline-flex items-center justify-center rounded-md p-2 text-gray-400 hover:bg-primary hover:text-white focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white'
					aria-controls='mobile-menu'
					aria-expanded='false'
				>
					{isOpen ? <CloseIcon /> : <MenuIcon />}
				</button>
			</div>

			<div
				className={`menu-mobile xl:hidden absolute shadow pb-2 -z-10 right-0 w-full md:w-auto ${
					isOpen && 'active'
				} `}
			>
				<div className=''>
					<div className='lg:hidden space-y-1 px-2 pb 3 pt-2 flex flex-col'>
						{MENU.map((item, idx) => {
							return (
								<Link
									className={`${
										pathName === item.href
											? 'bg-primary text-white'
											: 'hover:bg-primary/50 hover:text-black/50'
									} px-4 py-2 rounded-md text-right`}
									href={item.href}
									key={idx}
								>
									{item.name}
								</Link>
							)
						})}
						<SearchForm isOpen={isOpen} />
						<div className='border-b border-black/30 pt-3'></div>
					</div>

					<div className='flex items-center gap-6 justify-end pt-2 px-3 pl-4'>
						<button className='text-[13px] xl:text-[15px] font-poppins-bold'>
							Login
						</button>
						<button className='text-[13px] xl:text-[15px] text-white px-3 py-2 rounded-[10px] bg-gradient-to-r from-[#D71C5D] to-[#FF9017]'>
							Sign up
						</button>
					</div>
				</div>
			</div>
		</header>
	)
}

export default Header
