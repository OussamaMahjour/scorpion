import { Link } from "react-router-dom"

const Separator = () => {
    return <i className="fa-solid fa-angle-right text-[#ffffff43] w-[4px] mx-2  ">

    </i>
}


const NavBar =  () =>{

return <div className="w-full relative h-13 bg-black flex justify-between  py-2 overflow-hidden">
    <div className="w-1/5 h-full px-5 flex  items-center ">
    <Link to="/" className="h-full flex items-center text-text style-none visited:text-text">
        <img src="./scorpion.png" className="h-full px-2"/>
        <h1 className="text-xl text-">SCORPION</h1>
    </Link>

    </div>
    <div className="w-2/5 h-full text-white flex items-center justify-around px-5">
     <Link to="/" >Documentation </Link>
                    <Separator />
                    <Link to="/" >About </Link>
                    <Separator />
                    <Link to="/" >Get Started </Link>
                    <Separator />
                    <Link to="/" >Help</Link>
    </div>
    {/* <!--<div className="absolute w-full h-0.5 bg-primary bottom-0"></div>
--> */}
</div>

}

export default NavBar