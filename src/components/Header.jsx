import React from "react";
import { Link, useLocation } from "react-router-dom"


export default function Header(props) {
  let url = useLocation()

  return (
    <>
      <header className="flex items-center justify-around my-8">
        
        <Link 
          className="text-white text-5xl font-semibold hover:cursor-pointer" 
          to={'/'}
        >Weather Wise
        </Link>

        <section className="flex justify-evenly px-11 w-160 text-white text-2xl font-extralight hover:cursor-pointer">
          <Link 
            to={'/'} 
            className={url.pathname === "/" ? "font-medium": ""}
          >Home
          </Link>

          <Link 
            to={'/download'} 
            className={url.pathname === "/download" ? "font-medium": ""}
          >Download
          </Link>

          <Link 
            to={'/contact'} 
            className={url.pathname === "/contact" ? "font-medium": ""}
          >Contact Us
          </Link>   
        </section>

        <Link 
          to={'/login'} 
          className='opacity-0 pt-3.5 w-36 h-16 rounded-2xl bg-buttonColor text-white  text-2xl font-medium text-center hover:cursor-pointer'
        >Login</Link>

      </header>
    </>
  )
}