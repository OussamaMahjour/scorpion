import { useLoadingBar } from "react-top-loading-bar";
import NavBar from "./NavBar";
import Code from "./Code";
import { CodeBlock} from "react-code-block";
import { useState } from "react";
import axios from 'axios';

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
            const response = await axios.post(
              "http://127.0.0.1:8080/validate", // Update with your actual backend endpoint
              formData, // Send the FormData containing the file
              {
                headers: {
                  "Content-Type": "multipart/form-data", // Important: multipart/form-data for file uploads
                },
              }
            );
            if(response.status == 200 ){
                const scriptResponse = await axios.post(
                    "http://127.0.0.1:8080/transform", // Update with your actual backend endpoint
                    formData, // Send the FormData containing the file
                    {
                      headers: {
                        "Content-Type": "multipart/form-data", // Important: multipart/form-data for file uploads
                      },
                    }
                  );
                  setScript(scriptResponse.data);
                  setCompiling(false);
            }
            
            // Handle the response from the backend
            console.log("Response from backend: ", response.data);
          } catch (error) {
            alert(error)
            console.error("Error sending XML file: ", error);
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
                    <div className="h-7 w-full [border-right:3px_solid_#ffffff32]  py-1 flex justify-between">
                       

                    </div>
                    <div className="w-full flex-1 [border-top:1px_solid_#ffffff32] [border-right:3px_solid_#ffffff32] min-h-0 overflow-scroll ">
                        <Code onCodeChange={handleCodeChange} />
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
                    <div className="w-full flex-1 [border-top:1px_solid_#ffffff32] bg-[#282c34] min-h-0 overflow-scroll ">
                    <CodeBlock 
                    code={script}
                    language="python">

                        <CodeBlock.Code className="bg-[#282c34] p-2 ">

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