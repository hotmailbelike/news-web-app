import { useState, useEffect } from 'react';
import Button from '@mui/material/Button';
import NavbarWrapper from '@/components/NavbarWrapper';
import Container from '@mui/material/Container';
import Grid from '@mui/material/Grid';

import NewsCard from '@/components/NewsCard';
import SingleNewsModal from '@/components/SingleNewsModal';
import SearchBar from '@/components/SearchBar';
import { searchNews, getNewsByCategory } from '@/utils/news_api';

const GridItem = (props) => (
	<Grid item lg={3}>
		<NewsCard {...props}></NewsCard>
	</Grid>
);

let originalNewsList = [];

const Home = () => {
	const [news, setNews] = useState([]);
	const [newsItemIndex, setNewsItemIndex] = useState(-1);
	const [showModal, setShowModal] = useState(false);

	const handleOpenSingleNewsItem = (newsIndex) => {
		setShowModal(true);
		setNewsItemIndex(newsIndex);
	};

	const handleReadLater = (newsIndex) => {
		let readLaterNews = localStorage.getItem('readLaterNews');
		if (readLaterNews != null) {
			readLaterNews = JSON.parse(readLaterNews);
		} else if (readLaterNews == null) {
			readLaterNews = [];
		}

		if (readLaterNews.find((newsItem) => newsItem.title === news[newsIndex].title)) {
			readLaterNews = readLaterNews.filter(
				(newsItem) => newsItem.title !== news[newsIndex].title
			);
		} else {
			readLaterNews.push(news[newsIndex]);
		}

		localStorage.setItem('readLaterNews', JSON.stringify(readLaterNews));
	};

	const handleSearch = (searchString) => {
		if (searchString === '') {
			setNews(originalNewsList);
			return;
		}

		searchNews(searchString)
			.then((data) => {
				setNews(data.articles);
			})
			.catch((error) => {
				console.error('🚀 -> file: index.js:61 -> handleSearch -> error', error);
			});
	};

	useEffect(() => {
		getNewsByCategory('')
			.then((data) => {
				originalNewsList = data.articles;
				setNews(data.articles);
			})
			.catch((error) => {
				console.error('🚀 -> file: Home.js:12 -> searchNews -> error', error);
			});
	}, []);

	return (
		<>
			<NavbarWrapper>
				<Container sx={{ marginTop: '30px', marginBottom: '80px' }} maxWidth='xl'>
					<SearchBar handleSearch={handleSearch}></SearchBar>
					<Grid container rowSpacing={5} columnSpacing={3} sx={{ marginTop: '0px' }}>
						{news?.length > 0 &&
							news.map(({ urlToImage, title, publishedAt }, newsItemIndex) => (
								<GridItem
									key={newsItemIndex}
									handleOpenSingleNewsItem={handleOpenSingleNewsItem}
									imageUrl={urlToImage}
									title={title}
									newsItemIndex={newsItemIndex}
									date={publishedAt}
									handleReadLater={handleReadLater}
								></GridItem>
							))}
					</Grid>
				</Container>
			</NavbarWrapper>
			{news?.length > 0 && (
				<SingleNewsModal
					setShowModal={setShowModal}
					isOpen={showModal}
					newsItem={news[newsItemIndex]}
				></SingleNewsModal>
			)}
		</>
	);
};

export default Home;
