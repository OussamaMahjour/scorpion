import { Link } from "react-router-dom";



const Separator = () => {
    return <i className="fa-solid fa-angle-right text-[#ffffff43] w-[4px] mx-2  ">

    </i>
}

const NavBar = () => {


    return <nav className="w-full h-16 z-10  p-4 flex justify-around items-center ">
        <div className="w-1/2 flex justify-start mx-10 ">
        <div className="flex justify-between items-center font-Jaldi w-fit g-2 ">
                <Link to="/" >Documentation </Link>
                <Separator />
                <Link to="/" >About </Link>
                <Separator />
                <Link to="/" >Get Started </Link>
                <Separator />
                <Link to="/" >Help</Link>

        </div>
        </div>
        <div className="w-1/2  h-full flex justify-end mx-10">
            <div className="w-1/2  h-full flex  text-[#FFFFFF33] g-2 items-center rounded-lg bg-background border border-[#FFFFFF33] outline-none text-s p-1" >
                <i className="fa-solid fa-magnifying-glass  "></i>
                <input placeholder="Search..." className="text-text px-3 w-fit outline-none w-4/4 flex items-center text-xm" />
            </div>
                    
        </div>
		<div className="absolute h-screen w-screen hidden bg-[#ffffff40] top-0 left-0 flex justify-center items-center">
            <div className="w-1/2 h-40 bg-white rounded">
                
            </div>

        </div>
    </nav>
}

export default NavBar;