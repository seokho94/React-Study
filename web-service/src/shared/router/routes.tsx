import TestPage from "@/pages/home/TestPage";
import MainPage from "@/pages/home/MainPage";
import type { RouteObject } from "react-router-dom";

export const routes: RouteObject[] = [
	{
		path: "/",
		element: <MainPage />,
	},
	{
		path: "/test",
		element: <TestPage />,
	},
];