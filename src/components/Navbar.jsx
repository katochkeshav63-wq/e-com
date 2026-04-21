import { SignedIn, SignedOut, SignInButton, UserButton, useUser } from '@clerk/clerk-react'
import { useState } from 'react'
import { IoCartOutline } from 'react-icons/io5'
import { Link, NavLink, useNavigate } from 'react-router-dom'
import { useCart } from '../context/CartContext'
import { HiMenuAlt1, HiMenuAlt3 } from 'react-icons/hi'
import ResponsiveMenu from './ResponsiveMenu'
import { toast } from 'react-toastify'

const Navbar = ({ location, getLocation, openDropdown, setOpenDropdown }) => {

    const { cartItem } = useCart()
    const [openNav, setOpenNav] = useState(false)

    const { isSignedIn } = useUser()      // ✅ check login
    const navigate = useNavigate()        // ✅ navigation

    const toggleDropdown = () => {
        setOpenDropdown(!openDropdown)
    }

    // ✅ Handle Cart Click
    const handleCartClick = () => {
        if (!isSignedIn) {
            toast.error("Please login to view cart")
            navigate("/login")
        } else {
            navigate("/cart")
        }
    }

    return (
        <div className='bg-white py-3 shadow-2xl px-4 md:px-0'>
            <div className='max-w-6xl mx-auto flex justify-between items-center'>

                {/* logo section */}
                <div className='flex gap-7 items-center'>
                    <Link to={'/'}>
                        <h1 className='font-bold text-3xl'>
                            <span className='text-red-500 font-serif'>Z</span>aptro
                        </h1>
                    </Link>
                </div>

                {/* menu section */}
                <nav className='flex gap-7 items-center'>
                    
                    {/* nav links */}
                    <ul className='md:flex gap-7 items-center text-xl font-semibold hidden'>
                        <NavLink to={'/'} className={({ isActive }) => `${isActive ? "border-b-3 border-red-500" : "text-black"} cursor-pointer`}>
                            <li>Home</li>
                        </NavLink>
                        <NavLink to={"/products"} className={({ isActive }) => `${isActive ? "border-b-3 border-red-500" : "text-black"} cursor-pointer`}>
                            <li>Products</li>
                        </NavLink>
                        <NavLink to={"/about"} className={({ isActive }) => `${isActive ? "border-b-3 border-red-500" : "text-black"} cursor-pointer`}>
                            <li>About</li>
                        </NavLink>
                        <NavLink to={"/contact"} className={({ isActive }) => `${isActive ? "border-b-3 border-red-500" : "text-black"} cursor-pointer`}>
                            <li>Contact</li>
                        </NavLink>
                    </ul>

                    {/* 🛒 Cart Icon (Protected) */}
                    <div onClick={handleCartClick} className='relative cursor-pointer'>
                        <IoCartOutline className='h-7 w-7' />
                        <span className='bg-red-500 px-2 rounded-full absolute -top-3 -right-3 text-white'>
                            {cartItem.length}
                        </span>
                    </div>

                    {/* Auth Buttons */}
                    <div className='hidden md:block'>
                        <SignedOut>
                            <SignInButton className="bg-red-500 text-white px-3 py-1 rounded-md cursor-pointer" />
                        </SignedOut>
                        <SignedIn>
                            <UserButton />
                        </SignedIn>
                    </div>

                    {/* Mobile Menu Icon */}
                    {
                        openNav
                            ? <HiMenuAlt3 onClick={() => setOpenNav(false)} className='h-7 w-7 md:hidden' />
                            : <HiMenuAlt1 onClick={() => setOpenNav(true)} className='h-7 w-7 md:hidden' />
                    }
                </nav>
            </div>

            {/* Mobile Menu */}
            <ResponsiveMenu openNav={openNav} setOpenNav={setOpenNav} />
        </div>
    )
}

export default Navbar