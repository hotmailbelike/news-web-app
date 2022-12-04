import CircularProgress from '@mui/material/CircularProgress';
import Typography from '@mui/material/Typography';

const Spinner = ({ message }) => {
	return (
		<div
			style={{
				display: 'flex',
				flexDirection: 'column',
				alignItems: 'center',
				marginTop: '5%',
			}}
		>
			<CircularProgress></CircularProgress>
			<Typography variant='h6'>{message}</Typography>
		</div>
	);
};

Spinner.defaultProps = {
	message: 'Loading...',
};

export default Spinner;
