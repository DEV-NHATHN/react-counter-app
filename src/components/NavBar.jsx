

const NavBar = ({ totalCounters }) => {
   return (
      <nav className="navbar navbar-light bg-light">
         <a href="#d" className="navbar-brand">
            NavBar <span className="badge badge-pill badge-secondary">
               {totalCounters}
            </span>
         </a>
      </nav>
   );
}

export default NavBar;