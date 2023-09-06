import { useEffect } from "react"
import React from "react";
import Dropdown from 'react-dropdown';
import styles from "./styles/SelectFolder.module.css"; 
import "./styles/Dropdown.css";


const SelectFolder = (
    {handleGo}: {handleGo: (folder: string) => void}
) => {

    // set options to display in the dropdown
    const [options, setOptions] = React.useState<string[]>([]);
    // track which option the user has currently chosen
    const [currFolder, setCurrFolder] = React.useState("");;
    
    useEffect(() => {
        // fetch list of all folders in public directory
        const fetchFolder = async () => {
            const response = await fetch(`/./data/directory.json`)
              .then((response) => response.json())
              .then((v) => v)
              .catch((err) => console.log(err));
            return response;
        };
          
        // create array of folders to display in dropdown
        fetchFolder().then((dirData: { folder: string }[]) => {
            const options: string[] = []
            for (let i = 0; i < dirData.length; i++) {
                options.push(dirData[i].folder)
            }
            setOptions(options)
        });

    }, []);

    // keep track of which option the user chooses
    const handleChange = (evt: any) => {
        if (evt.label !== undefined) {
            setCurrFolder(evt.label)
        }
    }
    
    return (
        <div className={styles.container}>
            <div className={styles.dropdown} data-testid="dropdown">
                <Dropdown  options={options} value={currFolder} onChange={handleChange} placeholder="Select an option" />
            </div>
            <button className={styles.goButton} data-testid="button" onClick={() => handleGo(currFolder)}>Go</button>

        </div>
    )
}

export default SelectFolder