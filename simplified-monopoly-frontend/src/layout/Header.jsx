import NavMenu from "./NavMenu";
import { useLocation } from "react-router";

const Header = () => {

    const location = useLocation();
    const hideNavRoutes = ['/game', '/results'];

    return (
        <header>
            <div id="header-container">
                <h1>Simplified Monopoly</h1>
                {!(hideNavRoutes.includes(location.pathname)) && <NavMenu />}
                
            </div>
        </header>
    )
}

export default Header;