import { useState } from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Grid from '@mui/material/Grid';
import StarBorderIcon from '@mui/icons-material/StarBorder';
import SportsSoccerIcon from '@mui/icons-material/SportsSoccer';
import BusinessIcon from '@mui/icons-material/Business';
import SportsEsportsIcon from '@mui/icons-material/SportsEsports';

const tabInfos = [
	{
		label: 'General',
		leftIcon: <StarBorderIcon></StarBorderIcon>,
	},
	{
		label: 'Business',
		leftIcon: <BusinessIcon></BusinessIcon>,
	},
	{
		label: 'Sports',
		leftIcon: <SportsSoccerIcon></SportsSoccerIcon>,
	},
	{
		label: 'Entertainment',
		leftIcon: <SportsEsportsIcon></SportsEsportsIcon>,
	},
];

const Tab = ({ label, leftIcon, setSelectedTab, selectedTab }) => {
	return (
		<Button
			onClick={() => setSelectedTab(label)}
			startIcon={leftIcon}
			variant='contained'
			sx={{
				color: 'white',
				backgroundColor: selectedTab === label ? '#0b558e' : '#052b47',
			}}
		>
			{label}
		</Button>
	);
};

const TabBar = ({ selectedTab, setSelectedTab }) => {
	return (
		<Grid container rowSpacing={2} sx={{ marginLeft: '22%', width: '60%' }}>
			{tabInfos.map((tabInfo, tabInfoIndex) => (
				<Grid item key={tabInfoIndex} lg={3} md={3} sm={6} xs={12}>
					<Tab
						key={tabInfoIndex}
						label={tabInfo.label}
						leftIcon={tabInfo.leftIcon}
						setSelectedTab={setSelectedTab}
						selectedTab={selectedTab}
					></Tab>
				</Grid>
			))}
		</Grid>
	);
};

export default TabBar;
