
import { NavLink } from 'react-router-dom'
import logo from '../assets/img/mister-toy-logo.jpg'

export function AppHeader(){

    return (
        <header className="app-header">
            <section className="app-header-logo">
                <img src={logo}/>
            </section>
            <nav className='main-nav'>
                <NavLink to="/">Home</NavLink> |
                <NavLink to="/toy">Toys</NavLink> |
                <NavLink to="/about">About</NavLink>
            </nav>

        </header>
    )
}