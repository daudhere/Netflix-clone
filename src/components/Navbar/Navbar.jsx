import React, { useEffect, useRef } from 'react'
import './NavBar.css'
import logo from '../../assets/logo.png'
import searchIcom from '../../assets/search_icon.svg'
import bell_icon from '../../assets/bell_icon.svg'
import profileimg from '../../assets/profile_img.png'
import caretIcon from '../../assets/caret_icon.svg'
import { logout } from '../../firebase'


const NavBar = () => {

    const navRef = useRef();

    useEffect(()=>{
        window.addEventListener('scroll', ()=>{
            if(window.scrollY >= 80){
                navRef.current.classList.add('nav-dark')
            }else{
                navRef.current.classList.remove('nav-dark')
            }
        })
    },[])

  return (
    <div className='navbar'>
        <div className='navbar-left'>
            <img src={logo} alt="logo" />
            <ul>
                <li>Home</li>
                <li>TV Shows</li>
                <li>Movies</li>
                <li>New & Popular</li>
                <li>My List</li>
                <li>Browse by Language</li>

            </ul>
        </div>
        <div className='navbar-right'>
            <img src={searchIcom} alt="searchIcon" className='icons' />
            <p>Childern</p>
            <img src={bell_icon} alt="bell_icon" />
            <div className='navbar-profile'>
                <img src={profileimg} alt="Profile" />
                <img src={caretIcon} alt="" />
                <div className='dropdown'>
                    <p onClick={()=>{logout()}}>Sign Out of Netflix</p>
                    </div>       
            </div>
        </div>
        </div>
  )
}

export default NavBar