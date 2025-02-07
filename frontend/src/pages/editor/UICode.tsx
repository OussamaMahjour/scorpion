import { useState } from "react";

interface CodeProps {
    onCodeChange: (code: string) => void;
    setCode:(code:string)=>void;
  }


  

  interface feature {
    name:string | undefined,
    type:string | undefined
  }

const featureButton = () =>{
    return <button >
test
    </button>
}



const UICode:React.FC<CodeProps> = ({ onCodeChange,setCode }) => {
    const [features,setFeatures] = useState<feature[]>([]);
    const pipelineObject = {
        pipeline:{
            task:"Regression" ,
            libreary:"tensorflow"
        },
        dataset:{
            path:"./test.csv",
            type:"csv",
            target:{
                name:"label",
                type:"category"
            },
            features:features
        },
        preprocessing:{
            step:{
                name:"missing_value_imputation",
                type:"imputation",
                parameters:{
                    parameter:{
                        key:"strategy",
                        value:"mean"
                    }
                }
            }
        },
        model:{
            deepLearningModel:{
                arch:{
                    layer:{
                        type:"Dense",
                        Units:"129",
                        activation:"relu",
                        input:"10"
                    }
                }
            }
        },
        evaluation:{
            metric:"accuracy"
        },
        data_split:{
            testSize:"0.2",
            random_state:"42"
        }

    }



    return <div className="w-full p-4 flex flex-col gap-4 h-full bg-[#282c34]" onChange={
        ()=>{
            const xmlCode = `<?xml version="1.0" encoding="UTF-8"?>
        <pipeline task="${pipelineObject.pipeline.task}" library="${pipelineObject.pipeline.libreary}">
            <dataset path="${pipelineObject.dataset.path}" type="${pipelineObject.dataset.type}">
                <target>
                    <name>${pipelineObject.dataset.target.name}</name>
                    <type>${pipelineObject.dataset.target.type}</type>
                </target>
                <features>
                    <feature required="true">
                        <name>${pipelineObject.dataset.features[0].name}</name>
                        <type>${pipelineObject.dataset.features[0].type}</type>
                    </feature>
                    <feature required="false">
                        <name>salary</name>
                        <type>float</type>
                    </feature>
                </features>
            </dataset>
            <preProcessing>
                <step>
                    <name>${pipelineObject.preprocessing.step.name}</name>
                    <type>${pipelineObject.preprocessing.step.type}</type>
                    <parameters>
                        <parameter>
                            <key>${pipelineObject.preprocessing.step.parameters.parameter.key}</key>
                            <value>${pipelineObject.preprocessing.step.parameters.parameter.value}</value>
                        </parameter>
                    </parameters>
                </step>
            </preProcessing>
            <model>
                <deepLearningModel>
                    <arch>
                        <layer type="Dense" units="128" activation="relu" input_features="10"/>
                        <layer type="Dropout" units="1"/>
                        <layer type="Dense" units="1" activation="sigmoid"/>
                    </arch>
                    <hyperparameters>
                        <optimizer>Adam</optimizer>
                        <loss>binary_crossentropy</loss>
                        <epochs>20</epochs>
                        <batch_size>32</batch_size>
                        <metrics>
                            <metric>accuracy</metric>
                            <metric>precision</metric>
                        </metrics>
                    </hyperparameters>
                </deepLearningModel>
            </model>
            <evaluation>
                <metric>${pipelineObject.evaluation.metric}</metric>
            </evaluation>
            <save format="h5" path="models/classifier.h5"/>
            <data_split>
                <test_size>${pipelineObject.data_split.testSize}</test_size>
                <random_state>${pipelineObject.data_split.random_state}</random_state>
            </data_split>
        </pipeline>
        
            `
            setCode(xmlCode)
           // console.log(xmlCode)
            onCodeChange(xmlCode)
        
        }
    }>
        <div className="w-full flex gap-4 items-center border-b border-[#ffffff32] py-3">
            <h1 className="text-white">Pipeline: </h1> 
            <select onChange={
                (e)=>{
                    pipelineObject.pipeline.task = e.target.value
                }
            } className="bg-[#d50000] p-1 border-none rounded-full "  defaultValue={"Task"}>
                
                <option value="Regression">Regression</option>
                <option value="Classification">Classification</option>
                <option value="ImageClassification">Image Classification</option>

            </select>

            <select className="bg-[#d50000] p-1 rounded-full" onChange={
                (e)=>{
                                        pipelineObject.pipeline.libreary = e.target.value
                }
            } >        
                <option value="tensorFlow">tensorFlow</option>
                <option value="pytorch">tytorch</option>
                <option value="xgboost">xgboost</option>

            </select>

        </div>
        <div className="w-full flex flex-col  gap-4 items-start border-b border-[#ffffff32] py-3">
            <h1 className="text-white">Dataset: </h1> 
            <input placeholder="Path" onChange={
                (e)=>{
                    pipelineObject.dataset.path = e.target.value
                }
            } className="bg-white outline-none rounded-full p-1 pl-3"/>
            <div className="flex ml-6 gap-4 items-center">
                <h1 className="text-white">Target</h1>
                <input placeholder="Name" className="bg-white outline-none rounded-full p-1 pl-3" onChange={
                (e)=>{
                    pipelineObject.dataset.target.name = e.target.value
                }
            }/> 
                <select className="bg-[#d50000] p-1 pl-2 rounded-full" 
                onChange={
                    (e)=>{
                        pipelineObject.dataset.target.type = e.target.value
                    }
                } >        
                <option value="text">string</option>
                    <option value="int">int</option>
                    <option value="float">float</option>
                    <option value="category">category</option>
                    <option value="bool">bool</option>

                </select>
            </div>
            <div className="flex ml-6 gap-4 items-center">
                <h1 className="text-white">Features</h1>
                <div className="flex flex-col gap-2"> 
                    <div className="flex  gap-2">
                    <input placeholder="Name" className="bg-white outline-none rounded-full p-1 pl-3 feature-name" /> 
                    <select className="bg-[#d50000] p-1 pl-2 rounded-full feature-type"  >        
                    <option value="text">string</option>
                    <option value="int">int</option>
                    <option value="float">float</option>
                    <option value="category">category</option>
                    <option value="bool">bool</option>
                    
                </select>
                <button className="px-3 rounded-full text-2xl text-white cursor-pointer"
                    onClick={
                        ()=>{
                            const featureName=document.querySelector(".feature-name")?.value;
                            const featureType=document.querySelector(".feature-type")?.value;
                            const feature1:feature[] = [{name:featureName,type:featureType}]
                            setFeatures(features.concat(feature1))
                            
                            console.log(features)
                        }
                    }
                >+</button>
                </div>
                <div className="w-full flex gap-3">
                {features.map((item) => (
                   
                    <div className="p-2 rounded-full flex gap-2 bg-[#ffffff42]">
                        {item.name}:{item.type} 
                      

                        <button className="text-white cursor-pointer" onClick={
                            ()=>{
                                features.pop();
                            }
                        }>
                            x
                        </button>
                    </div>
                ))}


                </div>
                </div>
                
               
            </div>
             

            

        </div>
        <div className="w-full flex gap-4 items-center border-b border-[#ffffff32] py-3">
            <h1 className="text-white">PreProcessing: </h1> 
            <select className="bg-[#d50000] p-1 pl-2 rounded-full feature-type"  >        
                    <option value="imputation">imputation</option>
                    <option value="scaling">scaling</option>
                    <option value="encoding">encoding</option>
                    <option value="normalization">normalization</option>
                    <option value="feature_selection">feature_selection</option>
                    
                </select>
            

        </div> 
       
        <div className="w-full flex gap-4 items-center border-b border-[#ffffff32] py-3">
            <h1 className="text-white">Evaluation: </h1> 
            <select className="bg-[#d50000] p-1 pl-2 rounded-full feature-type" 
            onChange={
                (e)=>{
                    pipelineObject.evaluation.metric = e.target.value
                }
            } >        
                    <option value="root_mean_square">root_mean_square</option>
                    <option value="mae">mae</option>
                    <option value="r2">r2</option>
                    <option value="accuracy">accuracy</option>
                    <option value="f1">f1</option>
                    <option value="precision">precision</option>
                    <option value="recall">recall</option>

                    
                </select>
            

        </div>
        <div className="w-full flex gap-4 items-center border-b border-[#ffffff32] py-3">
            <h1 className="text-white">Test: </h1> 
            <input  placeholder="Test Size" className="bg-white outline-none rounded-full p-1 pl-3" onChange={
                    (e)=>{
                        pipelineObject.data_split.testSize = e.target.value
                    }
                }/> 
            <input placeholder="Random State" className="bg-white outline-none rounded-full p-1 pl-3"  onChange={
                    (e)=>{
                        pipelineObject.data_split.random_state = e.target.value
                    }
                }/> 

        </div>

    </div>
}

export default UICode;