const Index = () => {
	console.log('render A: ' + Date.now());

	return (
		<div
			style={{
				display: 'flex',
				justifyContent: 'center',
				alignItems: 'center',
				width: '100%',
				height: 'calc(100vh - 36px - 24px)',
				backgroundColor: 'red',
				color: 'white'
			}}
		>
			AAA
		</div>
	)
}

export default Index
