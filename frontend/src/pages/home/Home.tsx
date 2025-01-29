import { useLoadingBar } from "react-top-loading-bar";
import Header from "./components/Header";
import Body from "./components/Body";

const Home = () =>{


    const {start,complete} = useLoadingBar({
        color:"#D50000"
    }
    );
    start();
    complete();


    return(
        <div className="w-screen text-text min-h-screen  bg-background overflow-hidden">
            <Header />
            <Body />
        </div>
        
    )
}

export default Home;