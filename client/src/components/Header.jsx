import Logo from "./assets/logo.png";

function Header() {
  return (
    <nav className="navbar bg-white mb-4 p-0">
        <div className="container">
            <a href="/" className="navbar-brand">
                <div className="d-flex">
                    <img src={Logo} alt="" />
                    <div>Project Mgmt</div>
                </div>
            </a>
        </div>
    </nav>
  )
}

export default Header