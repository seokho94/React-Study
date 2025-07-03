import React from "react";
import {
		AppBar,
		Box,
		CssBaseline,
		Divider,
		Drawer,
		List,
		ListItem,
		ListItemText,
		Toolbar,
		Typography,
} from '@mui/material';

const drawerWidth = 240;

const BaseLayout: React.FC<{ children: React.ReactNode }> = ({ children }) => {
	return (
		<Box sx={{ display: 'flex' }}>
			<CssBaseline />
			{/* 상단 App bar */}
			<AppBar position="fixed" sx={{ zIndex: (theme) => theme.zIndex.drawer + 1 }}>
				<Toolbar>
					<Typography variant="h6" noWrap component="div">
						 사이드바 레이아웃 웹
					</Typography>
				</Toolbar>
			</AppBar>

			{/* 좌측 사이드바 Drawer */}
			<Drawer
				sx={{
					width: drawerWidth,
					flexShrink: 0,
					[`& .MuiDrawer-paper`]: {
						width: drawerWidth,
						boxSizing: 'border-box',
					},
				}}
				variant="permanent"
				anchor="left"
			>
				<Toolbar />
				<Divider />
				<List>
					{['통합현황', '대시보드', '통계', '사용자'].map((text, index) => (
						<ListItem component="button">
							<ListItemText primary={text} />
						</ListItem>
					))}
				</List>
			</Drawer>

			{/* 메인 컨텐츠 영역 */}
			<Box component="main" sx={{ flexGrow: 1, p: 3, marginLeft: `${drawerWidth}px` }}>
				<Toolbar />
				{children}
			</Box>
		</Box>
	);
}

export default BaseLayout;