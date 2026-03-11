import {Link} from 'react-router';

const NavMenu = () => {

    return (
        <div className="NavMenu">
            <Link className='link' to="/">
                Home            
            </Link>
            <Link className='link' to="/about">
                About            
            </Link>
            <Link className='link' to="/options">
                Options            
            </Link>
            <Link className='link' to="/rules">
                Rules           
            </Link>
        </div>
    )
}

export default NavMenu