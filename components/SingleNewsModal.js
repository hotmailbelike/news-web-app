import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Drawer from '@mui/material/Drawer';
import Modal from '@mui/material/Modal';
import Container from '@mui/material/Container';
import Image from 'next/image';

const SingleNewsModal = ({ isOpen, setShowModal, newsItem }) => {
	if (!newsItem) return null;

	let cardWidth = '50%';

	if (window?.innerWidth <= 768) {
		cardWidth = '80%';
	}

	return (
		<Modal
			open={isOpen}
			onClose={() => {
				setShowModal(false);
			}}
		>
			<Container
				sx={{
					borderRadius: '15px',
					display: 'flex',
					flexDirection: 'column',
					p: 4,
					backgroundColor: 'white',

					width: cardWidth,
					marginLeft: 'auto',
					marginRight: 'auto',
					marginTop: '50px',
					marginBottom: '50px',
					overflowX: 'hidden',
					overflowY: 'auto',
					height: '80%',
				}}
			>
				<Typography gutterBottom variant='h5' component='div'>
					{newsItem?.title}
				</Typography>
				<Typography gutterBottom variant='h6'>
					Source: {newsItem?.source?.name}
				</Typography>
				{newsItem?.author && (
					<Typography gutterBottom variant='h6'>
						Author: {newsItem?.author}
					</Typography>
				)}
				<Typography gutterBottom variant='body2' color='text.secondary'>
					{new Date(newsItem?.publishedAt).toDateString()}
				</Typography>

				{newsItem?.urlToImage && (
					<img
						src={newsItem.urlToImage}
						width={'100%'}
						height={'100%'}
						alt='News Item Image'
					></img>
				)}

				<Typography id='modal-modal-description' sx={{ mt: 2 }}>
					{newsItem?.content?.substring(0, 195) ||
						newsItem?.description?.substring(0, 130)}{' '}
					<a target='_blank' style={{ color: 'blue' }} href={newsItem?.url}>
						continue reading...
					</a>
				</Typography>
			</Container>
		</Modal>
	);
};

export default SingleNewsModal;
