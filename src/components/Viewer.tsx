import { useEffect } from "react"
import React from "react"
import Display from "./Display";
import styles from "./styles/Viewer.module.css"
import Dropdown from 'react-dropdown';
import "./styles/Dropdown.css";

const SUPPORTED_FILE_TYPES = [".png", ".jpg", ".png", ".py", ".svg", ".pdf", ".txt", ".ant"];

const Viewer = (
    {folder, handleBack}: {folder: string, handleBack: () => void}
) => {

    // all files to display in dropdown
    const [files, setFiles] = React.useState<string[]>([]);
    // particular file to display contents
    const [fileToDisplay, setFileToDisplay] = React.useState("")

    useEffect(() => {
        // given the folder, fetch files
        const fetchFiles = async () => {
            const response = await fetch(`/data/${folder}/directory.json`)
              .then((response) => response.json())
              .then((v) => v)
              .catch((err) => console.log(err));
            return response;
        };
          
        // create an array of elements to use as options in dropdown
        fetchFiles().then((dirData: { file: string }[]) => {
            
            const options: string[] = []
            for (let i = 0; i < dirData.length; i++) {
                // only want to display if it is a supported file type
                const fileName: string = dirData[i].file;
                for (const fileType of SUPPORTED_FILE_TYPES) {
                    if (fileName.toLowerCase().endsWith(fileType)) {
                      options.push(fileName);
                      break;
                    }
                }                
            }
            setFiles(options)
        });

    }, [folder]);

    // keep track of which option the user selects 
    const handleChange = (evt: any) => {
        if (evt.label !== undefined) {
            setFileToDisplay(evt.label)
        }
    }

    return (
        <div className={styles.viewer}> 
            <Dropdown options={files} value={fileToDisplay} onChange={handleChange} placeholder="Select an option" />
            <Display runID={folder} fileName={fileToDisplay}/>
            <div><button className = {styles.back} onClick = {handleBack}>Back</button></div>
        </div>
    )
}


export default Viewer;

