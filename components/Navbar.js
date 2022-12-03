import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import Container from '@mui/material/Container';
import Link from 'next/link';
import { useRouter } from 'next/router';

const LinkButton = ({ currentPage, label }) => {
	let stylesObj = {
		fontSize: 'medium',
	};
	if (currentPage === label.split(' ').join('')) {
		stylesObj = {
			...stylesObj,
			textDecoration: 'underline',
			textDecorationThickness: '2px',
			textUnderlineOffset: '5px',
		};
	}

	return (
		<Button variant={'string'} color='inherit' sx={stylesObj}>
			{label}
		</Button>
	);
};

export default function ButtonAppBar() {
	const router = useRouter();

	let currentPage = router.pathname.split('/').slice(1)[0];

	return (
		<Box>
			<AppBar sx={{ backgroundColor: '#262626' }} position='sticky'>
				<Container maxWidth='xl'>
					<Toolbar>
						<Typography
							variant='h5'
							component='div'
							sx={{
								flexGrow: 1,
								fontFamily: 'monospace',
								fontWeight: 700,
								letterSpacing: '.3rem',
								color: 'inherit',
								textDecoration: 'none',
							}}
						>
							News
						</Typography>
						<Link href={'/Home'}>
							<LinkButton currentPage={currentPage} label={'Home'}></LinkButton>
						</Link>
						<Link href={'/ReadLater'}>
							<LinkButton currentPage={currentPage} label={'Read Later'}></LinkButton>
						</Link>
					</Toolbar>
				</Container>
			</AppBar>
		</Box>
	);
}
