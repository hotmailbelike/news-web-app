import { useState } from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Search from '@mui/icons-material/Search';
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
		<Box
			sx={{
				display: 'flex',
				flexDirection: 'row',
				justifyContent: 'space-evenly',
				alignItems: 'center',
			}}
		>
			{tabInfos.map((tabInfo, tabInfoIndex) => (
				<Tab
					key={tabInfoIndex}
					label={tabInfo.label}
					leftIcon={tabInfo.leftIcon}
					setSelectedTab={setSelectedTab}
					selectedTab={selectedTab}
				></Tab>
			))}
		</Box>
	);
};

export default TabBar;
