import { CodeBlock,atomOneDark } from "react-code-blocks";
import NavBar from "./NavBar";
import { Link } from "react-router-dom";
import { useLoadingBar } from "react-top-loading-bar";

const Header = () => {

    const {start,complete} = useLoadingBar();
    complete();
    const copyBlockProps = {
        text:`<pipeline task="Regression" library="xgboost">
    <dataset path="./test.csv" type="csv">
        <target>
            <name>price</name>
            <type>float</type>
        </target>
    </dataset>
</pipeline>`,
        language:"xml",
        startingLineNumber: 1,
        wrapLines: true,
        theme:atomOneDark ,
        codeBlock:true
      };
return (
    <div className=" w-full  overflow-hidden
    ">

    <div className="w-full h-fit
        bg-radial-[at_50%_0%] from-dark-background-1 to-black to-75%

    ">
    <NavBar /> 
    <div className="w-full flex flex-col  items-center py-4
    
    ">
        <img src="./scorpion.png" className="w-60 my-4"/>   
        <h1 className="text-5xl my-4 font-Jaldi">SCORPION</h1>   
        <h1 className="font-Jaldi my-4">Transform complexity into simplicity ,Turning XML into seamless ML pipelines in Python.</h1>  
        <div className="flex justify-center w-1/2">
        <Link onClick={()=>start()} to="/editor" className="p-4 m-3 hover:shadow-primary hover:shadow rounded border duration-100 ease-in border-primary w-50 h-12 text-lg bg-primary flex justify-center items-center  hover:bg-transparent ">Get Started</Link>
        <Link to="/documentation" className="p-4 m-3 rounded  w-50 h-12 text-lg border shadow-primary shadow duration-100 ease-in border-primary hover:bg-primary flex justify-center items-center">Documentation</Link>
       </div>
    </div>
    </div>
   
       <div className="w-full flex justify-center realtive ">
       <div className="
                w-full
                h-60
                z-0 
                absolute
                [clip-path:polygon(0_0,100%_0,0_100%);]
                bg-black
            "  ></div>  
       
        
            <div className="w-1/2 bg-background z-10 my-3 rounded overflow-hidden shadow ">
                <div className="w-full bg-primary h-1 shadow shadow-primary"></div>
                        <CodeBlock 
                        {...copyBlockProps}
                        
                        >
                            </CodeBlock> 

            </div>
              
            
        </div>
   
   
    

    </div>
)
}

export default Header;