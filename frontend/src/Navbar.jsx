import React from 'react';
import { Link } from 'react-router-dom';
import './styles/Navbar.css';

function NavBar() {
	return (
		<div className='navbar'>
			<div className='logo-text'>Manosukhari Admin</div>
			<nav>
				<ul>
					<li>
						<Link to='/'>Home</Link>
					</li>
					<li>
						<Link to='therapistReg'>Therapist Registration</Link>
					</li>
				</ul>
			</nav>
		</div>
	);
}

export default NavBar;
