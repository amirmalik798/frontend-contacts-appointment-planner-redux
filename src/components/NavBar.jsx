import { NavLink } from 'react-router-dom';

const NavBar = () => {
    return (
        <div className='nav-bar'>
            <NavLink className='nav-link' to='/contacts'>Contacts</NavLink>
            <NavLink className='nav-link' to='/appointments'>Appointments</NavLink>
        </div>
    )
}

export default NavBar;