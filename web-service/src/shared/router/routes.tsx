import TestPage from "@/pages/home/TestPage";
import MainPage from "@/pages/main/MainPage";
import PrimeTreePage from "@/pages/prime-tree/PrimeTreePage";
import CustomTreePage from "@/pages/custom-tree/CustomTreePage";
import ComplexTreePage from "@/pages/complex-tree/ComplexTreePage";
import MuiTreePage from "@/pages/mui-tree/MuiTreePage";
import ArboristTreePage from "@/pages/arborist-tree/ArboristTreePage";
import type { RouteObject } from "react-router-dom";

export const routes: RouteObject[] = [
	{
		path: "",
		element: <MainPage />,
	},
	{
		path: "test",
		element: <TestPage />,
	},
	{
		path: "prime-tree",
		element: <PrimeTreePage />,
	},
	{
		path: "custom-tree",
		element: <CustomTreePage />,
	},
	{
		path: "complex-tree",
		element: <ComplexTreePage />,
	},
	{
		path: "mui-tree",
		element: <MuiTreePage />,
	},
	{
		path: "arborist-tree",
		element: <ArboristTreePage />,
	},
];