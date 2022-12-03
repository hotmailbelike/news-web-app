import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Paper from '@mui/material/Paper';
import { useRef, useEffect, useState } from 'react';

const NewsCard = ({
	imageUrl,
	title,
	date,
	handleOpenSingleNewsItem,
	newsItemIndex,
	handleReadLater,
	isInReadLater,
}) => {
	const textRef = useRef(null);

	const [doesExistInReadLater, setDoesExistInReadLater] = useState(
		typeof isInReadLater == undefined ? false : isInReadLater
	);

	let truncatedTitle = title.substring(0, 49) + '...';

	useEffect(() => {
		let readLaterNews = localStorage.getItem('readLaterNews');
		if (readLaterNews != null) {
			readLaterNews = JSON.parse(readLaterNews);
			if (readLaterNews.find((newsItem) => newsItem.title === title)) {
				setDoesExistInReadLater(true);
			}
		}
	}, []);

	return (
		<Paper
			// onMouseEnter={() => {
			// 	console.log(textRef.current.textContent);
			// 	textRef.current.textContent = title;
			// }}
			// onMouseLeave={() => {
			// 	textRef.current.textContent = truncatedTitle;
			// }}
			sx={{ borderRadius: 1 }}
			elevation={5}
		>
			<CardMedia component='img' height='250' image={imageUrl} alt='news image' />
			<CardContent sx={{ maxHeight: '450' }}>
				<Typography ref={textRef} gutterBottom variant='h5' component='div'>
					{/* {truncatedTitle} */}
					{title}
				</Typography>
				<Typography variant='body2' color='text.secondary'>
					{new Date(date).toDateString()}
				</Typography>
			</CardContent>
			<CardActions>
				<Button
					onClick={() => handleOpenSingleNewsItem(newsItemIndex)}
					size='small'
					color={'success'}
				>
					More Info
				</Button>
				<Button
					onClick={() => {
						setDoesExistInReadLater(!doesExistInReadLater);
						handleReadLater(newsItemIndex);
					}}
					size='small'
					color={doesExistInReadLater ? 'error' : 'primary'}
				>
					{doesExistInReadLater ? 'Remove from Read Later List' : `Read Later`}
				</Button>
			</CardActions>
		</Paper>
	);
};

export default NewsCard;
