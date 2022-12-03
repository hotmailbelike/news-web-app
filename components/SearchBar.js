import Input from '@mui/material/Input';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import InputAdornment from '@mui/material/InputAdornment';
import Search from '@mui/icons-material/Search';

const SearchBar = ({ handleSearch, clearSearch, searchQuery, setSearchQuery }) => {
	const handleSubmitSearch = (e) => {
		e.preventDefault();
		handleSearch();
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
					sx={{ ml: 2, fontSize: '14px', backgroundColor: '#007849' }}
					variant='contained'
					color='success'
				>
					Search
				</Button>
				{searchQuery !== '' && (
					<Button
						onClick={clearSearch}
						sx={{ ml: 2, fontSize: '14px', backgroundColor: '#b82601' }}
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
