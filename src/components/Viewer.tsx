import { ChangeEvent, useEffect } from "react"
import React from "react"
import Display from "./Display";

interface props {
    folder: string;
    handleBack: () => void;
}

const SUPPORTED_FILE_TYPES = [".png", ".jpg", ".png", ".py", ".svg", ".pdf", ".txt"];

const Viewer = (props: props) => {

    const [files, setFiles] = React.useState<JSX.Element[]>([]);
    const [fileToDisplay, setFileToDisplay] = React.useState("")

    useEffect(() => {
        const fetchFiles = async () => {
            const response = await fetch(`/${props.folder}/directory.json`)
              .then((response) => response.json())
              .then((v) => v)
              .catch((err) => console.log(err));
            return response;
        };
          
        fetchFiles().then((dirData: { file: string }[]) => {
            const options: string[] = []
            dirData.forEach(({ file }) => {
              options.push(file)
            });

            // create an array of JSX elements so it's easy to display in the dropdown
            const dropdownOptions: JSX.Element[] = [];
            dropdownOptions.push(<option key={-1} value={''}>Choose an option</option>)
            // create an element corresponding to each file
            for (let i = 0; i < options.length; i++) {
                dropdownOptions.push(<option key={i} value={options[i]}>{options[i]}</option>);
            }

            setFiles(dropdownOptions)
        });

    }, []);
    
    return <div className='Viewer'> 
        <h4>{ props.folder }</h4>
        <p>Choose a file:</p>
        <select defaultValue={''} onChange={(evt: ChangeEvent<HTMLSelectElement>) => {setFileToDisplay(evt.target.value)}}>
            {files}
        </select>
        <Display dir={props.folder} fileName={fileToDisplay}/>
        <div><button onClick = {props.handleBack}>Back</button></div>
    </div>
}


export default Viewer;

