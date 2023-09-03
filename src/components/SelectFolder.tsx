import { ChangeEvent, useEffect } from "react"
import React from "react";
import Dropdown from 'react-dropdown';
import styles from "./styles/SelectFolder.module.css"; 
import "./styles/Dropdown.css";

interface props {
    handleGo: (folder: string) => void;
}

const SelectFolder = (props: props) => {

    // const [options, setOptions] = React.useState<JSX.Element[]>([]);
    const [options, setOptions] = React.useState<JSX.Element[]>([]);
    const [currFolder, setCurrFolder] = React.useState("");;
    
    useEffect(() => {
        // fetch list of all folders in public directory
        const fetchFolder = async () => {
            const response = await fetch(`/./directory.json`)
              .then((response) => response.json())
              .then((v) => v)
              .catch((err) => console.log(err));
            return response;
        };
          
        fetchFolder().then((dirData: { folder: string }[]) => {
            // create array of folders to display in dropdown
            const options: JSX.Element[] = []
            options.push(<option key={-1} value={''}>Choose an option</option>)            
            for (let i = 0; i < dirData.length; i++) {
                // options.push(dirData[i].folder)
                options.push(<option key={i} value={dirData[i].folder}>{dirData[i].folder}</option>);
            }
            setOptions(options)
        });

    }, []);

    const handleChange = (evt: any) => {
        if (evt.label != undefined) {
            setCurrFolder(evt.label)
        }

    }
    
    return (
        <div className={styles.container}>
            <div className={styles.dropdown}>
                <select defaultValue={''} onChange={(evt: ChangeEvent<HTMLSelectElement>) => {setCurrFolder(evt.target.value)}}>
                    {options}
                </select>
                {/* <Dropdown options={options} value={currFolder} onChange={handleChange} placeholder="Select an option" /> */}
                <button onClick={() => props.handleGo(currFolder)}>Go</button>
            </div>
        </div>)
}

export default SelectFolder