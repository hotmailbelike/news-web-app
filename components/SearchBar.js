import { useState } from 'react';
import Input from '@mui/material/Input';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import InputAdornment from '@mui/material/InputAdornment';
import Search from '@mui/icons-material/Search';

const SearchBar = ({ handleSearch }) => {
	const [searchQuery, setSearchQuery] = useState('');

	const handleSubmitSearch = (e) => {
		e.preventDefault();
		handleSearch(searchQuery);
	};

	const clearSearch = () => {
		handleSearch('');
		setSearchQuery('');
	};

	return (
		<Box
			sx={{
				display: 'flex',
				flexDirection: 'row',
				justifyContent: 'center',
				alignItems: 'center',
			}}
		>
			<form onSubmit={handleSubmitSearch}>
				<Input
					value={searchQuery}
					onChange={({ target }) => setSearchQuery(target.value)}
					sx={{ fontSize: '20px' }}
					variant='standard'
					placeholder='Search from every news...'
					startAdornment={
						<InputAdornment position='start'>
							<Search />
						</InputAdornment>
					}
				></Input>
				<Button
					disabled={searchQuery === '' ? true : false}
					type='submit'
					sx={{ ml: 2, fontSize: '14px' }}
					variant='contained'
					color='success'
				>
					Search
				</Button>
				{searchQuery !== '' && (
					<Button
						onClick={clearSearch}
						sx={{ ml: 2, fontSize: '14px' }}
						variant='contained'
						color='error'
					>
						Clear
					</Button>
				)}
			</form>
		</Box>
	);
};

export default SearchBar;
