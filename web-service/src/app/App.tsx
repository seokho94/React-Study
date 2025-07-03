import { Routes, Route } from "react-router-dom";
import { routes } from "@/shared/router/routes";

function App() {
	return (
		<Routes>
			{routes.map((route, index) => (
				<Route key={index} path={route.path} element={route.element} />
			))}
		</Routes>
	)
}

export default App;