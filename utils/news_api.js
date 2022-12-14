// const newsApiToken = '262fb595c4aa4a41985245b3f3eb6306';
const newsApiToken = 'c2d165a24e81452f80010a3581da2733';

const searchNews = async (searchString, pageNumber) => {
	try {
		let res = await fetch(
			`https://newsapi.org/v2/everything?sortBy=popularity&searchIn=title&q=${searchString}&apiKey=${newsApiToken}&pageSize=20&page=${pageNumber}`
		);

		res = await res.json();

		if (res.status === 'error') {
			return {
				error: res.message,
			};
		}

		return res;
	} catch (error) {
		console.error('🚀 -> file: news_api.js:7 -> getLatestNews -> error', error);
	}
};

const getNewsByCategory = async (category, pageNumber) => {
	try {
		let res = await fetch(
			`https://newsapi.org/v2/top-headlines?country=us&sortBy=popularity&category=${category}&apiKey=${newsApiToken}&pageSize=20&page=${pageNumber}`
		);

		res = await res.json();

		if (res.status === 'error') {
			return {
				error: res.message,
			};
		}

		return res;
	} catch (error) {
		console.error('🚀 -> file: news_api.js:7 -> getNewsByCategory -> error', error);
	}
};

export { searchNews, getNewsByCategory };
