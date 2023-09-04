import { ChangeEvent, useEffect } from "react"
import React from "react"
import Display from "./Display";
import styles from "./styles/Viewer.module.css"
import Dropdown from 'react-dropdown';
import "./styles/Dropdown.css";


interface props {
    folder: string;
    handleBack: () => void;
}

const SUPPORTED_FILE_TYPES = [".png", ".jpg", ".png", ".py", ".svg", ".pdf", ".txt", ".ant"];

const Viewer = (props: props) => {

    // all files to display in dropdown
    const [files, setFiles] = React.useState<string[]>([]);
    // particular file to display contents
    const [fileToDisplay, setFileToDisplay] = React.useState("")

    useEffect(() => {
        // given the folder, fetch files
        const fetchFiles = async () => {
            const response = await fetch(`/data/${props.folder}/directory.json`)
              .then((response) => response.json())
              .then((v) => v)
              .catch((err) => console.log(err));
            return response;
        };
          
        fetchFiles().then((dirData: { file: string }[]) => {
            // create an array of elements to use for the dropdown
            const options: string[] = []
            // options.push(<option key={-1} value={''}>Choose a file</option>)            
            for (let i = 0; i < dirData.length; i++) {
                // only want to add it if it is a supported file type
                const fileName: string = dirData[i].file;

                for (const fileType of SUPPORTED_FILE_TYPES) {
                    if (fileName.toLowerCase().endsWith(fileType)) {
                      options.push(fileName);
                      break;
                    }
                }
                
                // options.push(<option key={i} value={dirData[i].file}>{dirData[i].file}</option>);
                // options.push(dirData[i].file)
            }

            
      
            setFiles(options)
        });

    }, []);

    const handleChange = (evt: any) => {
        if (evt.label != undefined) {
            setFileToDisplay(evt.label)
        }
    }

    
    return <div className={styles.viewer}> 
        <Dropdown options={files} value={fileToDisplay} onChange={handleChange} placeholder="Select an option" />
        <Display runID={props.folder} fileName={fileToDisplay}/>
        <div><button className = {styles.back} onClick = {props.handleBack}>Back</button></div>
    </div>
}


export default Viewer;

