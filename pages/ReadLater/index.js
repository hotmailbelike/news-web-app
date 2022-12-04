import { useState, useEffect } from 'react';
import NavbarWrapper from '@/components/NavbarWrapper';
import Container from '@mui/material/Container';
import Grid from '@mui/material/Grid';
import NewsCard from '@/components/NewsCard';
import SingleNewsModal from '@/components/SingleNewsModal';
import Typography from '@mui/material/Typography';
import { getLatestNews } from '@/utils/news_api';
import Spinner from '@/components/Spinner';

const GridItem = (props) => (
	<Grid item lg={3} md={6} sm={6}>
		<NewsCard {...props}></NewsCard>
	</Grid>
);

const ReadLater = () => {
	const [readLaterNews, setReadLaterNews] = useState([]);
	const [newsItemIndex, setNewsItemIndex] = useState(-1);
	const [showModal, setShowModal] = useState(false);
	const [loading, setLoading] = useState(true);

	const handleOpenSingleNewsItem = (newsIndex) => {
		setShowModal(true);
		setNewsItemIndex(newsIndex);
	};

	const handleRemoveFromReadLater = (newsIndex) => {
		let readLaterNewsCopy = [...readLaterNews];

		readLaterNewsCopy.splice(newsIndex, 1);

		setReadLaterNews(readLaterNewsCopy);

		localStorage.setItem('readLaterNews', JSON.stringify(readLaterNewsCopy));
	};

	useEffect(() => {
		let localReadLaterNews = localStorage.getItem('readLaterNews');
		if (localReadLaterNews != null) {
			localReadLaterNews = JSON.parse(localReadLaterNews);
		} else if (localReadLaterNews == null) {
			localReadLaterNews = [];
		}
		setReadLaterNews(localReadLaterNews);
		setLoading(false);
	}, []);

	if (loading) {
		return (
			<NavbarWrapper>
				<Spinner message={'Loading saved news...'}></Spinner>
			</NavbarWrapper>
		);
	}

	if (readLaterNews.length === 0)
		return (
			<NavbarWrapper>
				<Container sx={{ marginTop: '30px', marginBottom: '80px' }} maxWidth='xl'>
					<Typography variant='h4'>No news saved to be read later...</Typography>
				</Container>
			</NavbarWrapper>
		);

	return (
		<>
			<NavbarWrapper>
				<Container sx={{ marginTop: '30px', marginBottom: '80px' }} maxWidth='xl'>
					<Grid container rowSpacing={5} columnSpacing={3} sx={{ marginBottom: '5px' }}>
						{readLaterNews?.length > 0 &&
							readLaterNews.map(({ urlToImage, title, publishedAt }, newsItemIndex) => (
								<GridItem
									key={newsItemIndex}
									handleOpenSingleNewsItem={handleOpenSingleNewsItem}
									imageUrl={urlToImage}
									title={title}
									newsItemIndex={newsItemIndex}
									date={publishedAt}
									handleReadLater={handleRemoveFromReadLater}
									isInReadLater={true}
								></GridItem>
							))}
					</Grid>
				</Container>
			</NavbarWrapper>
			<SingleNewsModal
				setShowModal={setShowModal}
				isOpen={showModal}
				newsItem={readLaterNews[newsItemIndex]}
			></SingleNewsModal>
		</>
	);
};

export default ReadLater;
