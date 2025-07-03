import { Routes, Route } from "react-router-dom";
import { routes } from "@/shared/router/routes";
import BaseLayout from "@/shared/ui/BaseLayout";

function App() {
	return (
		<Routes>
			<Route path="/" element={<BaseLayout />}>
				{routes.map((route) => (
					<Route key={route.path} path={route.path} element={route.element} />
				))}
			</Route>
		</Routes>
	)
}

export default App;