import { Link } from 'react-router-dom'; 

const Navbar = () => {
  return (
      <nav className="navbar">
        <Link to="/" className="nav-link">Home
          <span className="glyphicon glyphicon-home"></span>
        </Link>
        <Link to="/Movies" className="nav-link">MOVIES
          <span className="glyphicon glyphicon-film"></span>
        </Link>
        <Link to="/About" className="nav-link">ABOUT
          <span className="glyphicon glyphicon-info-sign"></span>
        </Link>
        <Link to="/Cart" className="nav-link">CART
          <span className="glyphicon glyphicon-shopping-cart"></span>
        </Link>
      </nav>
  );
};



export const Movies = ({setSidebarOpen}) => (
  <div>
    <div className="button"><button onClick={() => setSidebarOpen(true)}>☰ Menu</button></div>
    <h1 className="page-title">Movies</h1>
  </div>
);

export const About = ({setSidebarOpen}) => (
  <div>
    <div className="button"><button onClick={() => setSidebarOpen(true)}>☰ Menu</button></div>
    <h1 className="page-title">About</h1>
  </div>
);

export const Cart = ({setSidebarOpen}) => (
  <div>
    <div className="button"><button onClick={() => setSidebarOpen(true)}>☰ Menu</button></div>
    <h1 className="page-title">Cart</h1>
  </div>
);

export default Navbar;