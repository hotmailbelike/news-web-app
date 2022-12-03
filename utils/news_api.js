const newsApiToken = '262fb595c4aa4a41985245b3f3eb6306';

const searchNews = async (searchString) => {
	try {
		let res = await fetch(
			`https://newsapi.org/v2/everything?sortBy=popularity&q=${searchString}&apiKey=${newsApiToken}&pageSize=20`
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
