function Loading() {
	return (
		<div
			className='fixed top-0 left-0 right-0 bottom-0 z-50 flex items-center justify-center'
			style={{
				background: 'radial-gradient(circle,#fff,hsla(0,0%,100%,.8))'
			}}
		>
			<span className='loading-spinner'></span>
		</div>
	)
}

export default Loading
