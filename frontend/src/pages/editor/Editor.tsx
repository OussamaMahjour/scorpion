import { useLoadingBar } from "react-top-loading-bar";
import NavBar from "./NavBar";
import Code from "./Code";
import { CodeBlock} from "react-code-block";
import { useState } from "react";
import axios, { AxiosError } from 'axios';
import UICode from "./UICode";


enum View {
    CodeView,
    UIView
}

const Editor = () => {
    const {start,complete} = useLoadingBar();
    const [compiling,setCompiling] = useState(false);
    const [code, setCode] = useState<string>(`
        <pipeline task="Regression" library="xgboost">
    <dataset path="./test.csv" type="csv">
        <target>
            <name>price</name>
            <type>float</type>
        </target>
    </dataset>
</pipeline>
        `);
    const [script,setScript] = useState<string>(`
        import pandas as pd
        `)
    const [xsdError,setXsdError] = useState<string>();
    
    const [view,setView]=useState<View>(View.CodeView);


    const handleCompile =async () => {

        setCompiling(true);
        console.log("Compiled Code: ", code);
        // Here you can process the code, send it to an API, etc.
        const blob  = new Blob([code],{type:"application/xml"});
        const file = new File([blob],"pipeline.xml",{type:"application/xml"});
        const formData = new FormData();
        formData.append("file",file);
        try {
            // Sending the FormData to the backend at port 8080
            console.log(code)
            const response = await axios.post(
              "http://localhost:8080/validate", // Update with your actual backend endpoint
              formData, // Send the FormData containing the file
              {
                headers: {
                  "Content-Type": "multipart/form-data", // Important: multipart/form-data for file uploads
                },
              }
            );
            if(response.status == 200 ){
                const scriptResponse = await axios.post(
                    "http://localhost:8080/transform", // Update with your actual backend endpoint
                    formData, // Send the FormData containing the file
                    {
                      headers: {
                        "Content-Type": "multipart/form-data", // Important: multipart/form-data for file uploads
                      },
                    }
                  );
                  setScript(scriptResponse.data);
                  setXsdError('');
                  setCompiling(false);
            }
            
            // Handle the response from the backend
            console.log("Response from backend: ", response.data);
          } catch (error) {
            if (axios.isAxiosError(error)) {
                // This is where we narrow down the type to AxiosError
                if (error.response) {
                  // The request was made and the server responded with a status code
                  // that falls out of the range of 2xx
                  if (error.response.status === 400) {
                    console.error("Bad Request Error:", error.response.data);
                    setScript("");
                    setXsdError(error.response.data)
                    setCompiling(false); // Set response data for Bad Request
                  } else if (error.response.status === 500) {
                    console.error("Server Error:", error.response.data);
                    alert("Server error, please try again later.");
                  } else {
                    console.error("Unexpected response error:", error.response);
                  }
                } else if (error.request) {
                  // The request was made but no response was received
                  console.error("No response received:", error.request);
                  alert("No response from the server.");
                } else {
                  // Something else happened while setting up the request
                  console.error("Error setting up request:", error.message);
                  alert("Error sending XML file.");
                }
              } else {
                // If it's not an AxiosError, handle the unknown error
                console.error("An unknown error occurred:", error);
                alert("An unknown error occurred.");
              }
          }
    };
    const handleDownload = () => {
        if (!script) {
            alert("No code to download");
            return;
        }
    
        // Create a Blob with XML content
        const blob = new Blob([script], { type: "application/python" });
    
        // Create a temporary download link
        const url = URL.createObjectURL(blob);
        const a = document.createElement("a");
        a.href = url;
        a.download = "pipeline.py"; // File name
        document.body.appendChild(a);
        a.click();
    
        // Cleanup
        document.body.removeChild(a);
        URL.revokeObjectURL(url);
    };

    const handleCodeChange = (newCode: string) => {
        setCode(newCode);
    };
    start();
    complete();
   


return <div className="w-full h-screen max-h-screen bg-[#1b222c] overflow-hidden flex flex-col">
       <NavBar/>
       <div className="w-full min-h-0 flex  flex-1">
            <div className="w-1/2 h-full flex flex-col">
                    <div className="h-7 w-full [border-right:3px_solid_#ffffff32]   flex justify-start">
                       <button className="h-full w-1/5 bg-[#282c34] text-white cursor-pointer"
                       onClick={
                        (e)=>{
                            setView(View.UIView);
                            
                        }
                       }
                       >UI</button>
                       <button className="h-full w-1/5  text-white cursor-pointer" 
                       onClick={
                        (e)=>{
                            setView(View.CodeView);  
                        }
                       }
                       >Code</button>


                    </div>
                    <div className="w-full flex-1 [border-top:1px_solid_#ffffff32] [border-right:3px_solid_#ffffff32] min-h-0 overflow-scroll ">
                 
                  {(() => {
                    switch (view) {
                        case View.CodeView:
                        return  <Code  onCodeChange={handleCodeChange} />  ;
                        case View.UIView:
                        return <UICode setCode={setCode} onCodeChange={handleCodeChange}/>
                        default:
                        return  <Code onCodeChange={handleCodeChange} />  ;
                    }
                    })()}
                    </div>

            </div>
            <div className="w-1/2 h-full  flex flex-col">
                <div className="h-7 w-full  flex justify-between  pr-2">
                        <div className="w-1/5 flex justify-between items-center h-full">
                        <button onClick={handleCompile} className="bg-primary  cursor-pointer px-3 h-full flex justify-center items-center  text-center rounded-r-lg text-black ">
                            Compile 
                        </button>
                       
                        <svg style={{display:compiling?"block":"none"}} className="mr-3  -ml-1 size-5 animate-spin text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"><circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle><path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path></svg>
                        </div>

                        <i className="fa-solid  fa-download  cursor-pointer text-white text-lg p-1" onClick={handleDownload} ></i>
                </div>
                    <div className="w-full relative flex-1 [border-top:1px_solid_#ffffff32] bg-[#282c34] min-h-0 overflow-scroll ">
                    <CodeBlock 
                    code={script}
                    language="python"
                    >
                        <div className="absolute p-4 max-w-full bg-[#282c34] w-full  ">
                                <p className="text-[#c42f06] w-full"  >{xsdError}</p>
                            </div>

                        <CodeBlock.Code className="bg-[#282c34] p-2  ">

                        <div className="table-row">
                            

                            <CodeBlock.LineNumber className="table-cell  pr-4 [border-right:1px_solid_#ffffff32]  text-sm text-gray-500 text-right select-none" />

                            <CodeBlock.LineContent className="table-cell pl-2 bg-[#282c34]">

                            <CodeBlock.Token />

                            </CodeBlock.LineContent>

                        </div>

                        </CodeBlock.Code>

                    </CodeBlock>
                </div>
            </div> 

       </div>
</div>

}


export default Editor;