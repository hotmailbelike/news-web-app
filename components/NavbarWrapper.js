import Navbar from './Navbar';

const NavbarWrapper = (props) => {
	return (
		<div>
			<Navbar
				selectedDropdownIndex={props.selectedDropdownIndex}
				tab={props.tab}
			></Navbar>
			{props.children}
		</div>
	);
};

export default NavbarWrapper;
