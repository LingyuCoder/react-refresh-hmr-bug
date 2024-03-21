import { lazy, useMemo, Suspense, useLayoutEffect } from 'react'

const Index = () => {
	const Component = useMemo(() => {
		return lazy(() => import(`@/modules/A`).then(res => {
			console.log("lazy loaded call: " + Date.now());
			return res;
		}))
	}, [])

	useLayoutEffect(() => {
		console.log("layout ended: " + Date.now());
	}, []);

	console.log("render call: " + Date.now());
	return (
		<Suspense>
			<Component key="asdf"/>
			<span>remove this</span>
		</Suspense>
	)
}

export default Index

if (module.hot) {
	module.hot.dispose(() => {
		console.log("hmr end: " + Date.now());
	});
}