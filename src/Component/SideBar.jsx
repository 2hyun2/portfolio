import { useState } from 'react';
import { Link } from 'react-router-dom';
import { FiHome, FiLayers, FiUser, FiMail } from 'react-icons/fi';


function SideBar() {

    const [hamburger, setHamburger] = useState(false); // 메뉴바 토글

    return (
        <nav className="SideBar" onMouseLeave={() => setHamburger(false)}>
            <div className={`header_btn ${hamburger ? "active" : ""}`} onClick={() => setHamburger(!hamburger)}>
                <span></span>
            </div>
            <ul className={`header_menu ${hamburger ? "active" : ""}`}>
                <li><Link to="/"><div className="icon" data-name='Home'><FiHome /></div></Link></li>
                {/* <li><Link to="/about"><div className="icon" data-name='About'><FiUser /></div></Link></li> */}
                <li><Link to="/projects"><div className="icon" data-name='Projects'><FiLayers /></div></Link></li>
                <li><Link to="/contact"><div className="icon" data-name='Contact'><FiMail /></div></Link></li>
            </ul>
        </nav>
    )
}

export default SideBar