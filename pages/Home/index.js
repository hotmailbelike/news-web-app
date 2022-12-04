import { useState, useEffect } from 'react';
import Button from '@mui/material/Button';
import NavbarWrapper from '@/components/NavbarWrapper';
import Container from '@mui/material/Container';
import Grid from '@mui/material/Grid';
import InfiniteScroll from 'react-infinite-scroll-component';

import NewsCard from '@/components/NewsCard';
import SingleNewsModal from '@/components/SingleNewsModal';
import SearchBar from '@/components/SearchBar';
import TabBar from '@/components/TabBar';
import { searchNews, getNewsByCategory } from '@/utils/news_api';

let originalNewsList = [];

const GridItem = (props) => (
	<Grid item lg={3}>
		<NewsCard {...props}></NewsCard>
	</Grid>
);

const Home = () => {
	const [news, setNews] = useState([]);
	const [newsItemIndex, setNewsItemIndex] = useState(-1);
	const [showModal, setShowModal] = useState(false);
	const [selectedNewsCategory, setSelectedNewsCategory] = useState('General');
	const [searchQuery, setSearchQuery] = useState('');
	const [hideTabBar, setHideTabBar] = useState(false);

	const [pageNumber, setPageNumber] = useState(1);
	const [canLoadMore, setCanLoadMore] = useState(true);

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

	const handleSearch = (pageNumber) => {
		setHideTabBar(true);

		searchNews(searchQuery, pageNumber)
			.then((data) => {
				if (pageNumber === 1) {
					setNews(data.articles);
				} else {
					setNews((prevNews) => [...prevNews, ...data.articles]);
				}

				if (data.articles.length < 20) {
					setCanLoadMore(false);
				} else {
					setCanLoadMore(true);
					setPageNumber(() => pageNumber + 1);
				}
			})
			.catch((error) => {
				console.error('🚀 -> file: index.js:61 -> handleSearch -> error', error);
			});
	};

	const clearSearch = () => {
		setHideTabBar(false);

		setCanLoadMore(true);
		setPageNumber(2);

		setNews(originalNewsList);

		setSearchQuery('');
	};

	const callGetNewsByCategoryAPI = (pageNumber) => {
		getNewsByCategory(selectedNewsCategory, pageNumber)
			.then((data) => {
				if (pageNumber === 1) {
					setNews(data.articles);
					originalNewsList = data.articles;
				} else {
					setNews((prevNews) => [...prevNews, ...data.articles]);
				}

				if (data.articles.length < 20) {
					setCanLoadMore(false);
				} else {
					setCanLoadMore(true);
					setPageNumber(() => pageNumber + 1);
				}
			})
			.catch((error) => {
				console.error('🚀 -> file: Home.js:12 -> getNewsByCategory -> error', error);
			});
	};

	const paginateNews = () => {
		if (canLoadMore) {
			hideTabBar ? handleSearch(pageNumber) : callGetNewsByCategoryAPI(pageNumber);
		}
	};

	useEffect(() => {
		setCanLoadMore(true);
		setPageNumber(1);
		callGetNewsByCategoryAPI(1);
	}, [selectedNewsCategory]);

	return (
		<>
			<NavbarWrapper>
				<Container sx={{ marginTop: '30px', marginBottom: '80px' }} maxWidth='xl'>
					<SearchBar
						handleSearch={handleSearch}
						clearSearch={clearSearch}
						setSearchQuery={setSearchQuery}
						searchQuery={searchQuery}
					></SearchBar>
					<div style={{ marginTop: '30px' }}></div>
					{!hideTabBar && (
						<TabBar
							selectedTab={selectedNewsCategory}
							setSelectedTab={setSelectedNewsCategory}
						></TabBar>
					)}
					<InfiniteScroll
						dataLength={news.length}
						next={paginateNews}
						hasMore={canLoadMore}
						loader={<h4>Loading...</h4>}
					>
						<Grid
							container
							rowSpacing={5}
							columnSpacing={3}
							sx={{ marginTop: '0px', marginBottom: '5px' }}
						>
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
					</InfiniteScroll>
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
