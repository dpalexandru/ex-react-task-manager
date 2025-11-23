import { NavLink } from 'react-router-dom'

const NavBar = () => {
  return (
    <div className='nav-bar'>
      <NavLink to="/">Home</NavLink>
      <NavLink to="/addtask">Aggiungi Task</NavLink>
    </div>
  )
}

export default NavBar