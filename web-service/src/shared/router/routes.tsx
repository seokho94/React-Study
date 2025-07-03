import HomePage from "@/pages/home/HomePage";
import MainPage from "@/pages/home/MainPage";
import type { RouteObject } from "react-router-dom";

export const routes: RouteObject[] = [
	{
		path: "/",
		element: <MainPage />,
	},
	{
		path: "/",
		element: <HomePage />,
	},
];