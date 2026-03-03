import { Link } from "react-router";
const Footer = () => {

    return (
        <footer>
            <div id="footer-container">
                <h3>Author: Cody Robinson</h3>
                <div className="footer-grid">
                    <a className="footer-link">codyrobinson28@gmail.com</a>
                    <p>&copy; 2025</p>
                    <Link className='footer-link' to="/about">
                        About            
                    </Link>
                </div>
            </div>
        </footer>
    )
}

export default Footer;