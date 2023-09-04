import React from "react";
import { useEffect } from "react";
import ImageDisplay from "./imageDisplay";
import TextDisplay from "./textDisplay";
import PdfDisplay from "./PdfDisplay";
import styles from "./styles/Display.module.css";

interface props {
    runID: string
    fileName: string
}

type PDFFile = File | null;

const Display = (props: props) => {

    const [data, setData] = React.useState("")
    const [pdfFile, setPdfFile] = React.useState<PDFFile>(null)

    useEffect(() => {
        if (props.fileName === "") {
            return; // If the file name is empty, do nothing
        }
    
        // This function fetches the image from the server
        // It then converts the image to a blob
        // It then converts the blob to an object URL
        // It then sets the file with the setFile function
        const fetchImage = async () => {
            const res = await fetch(`/data/${props.runID}/${props.fileName}`);
            const imageBlob = await res.blob();
            const imageObjectURL = URL.createObjectURL(imageBlob);
            setData(imageObjectURL);
        };
    
        // This function fetches the file from the server
        // It then sets the file with the setFile function
        const getFile = async () => {
            const response = await fetch(`/data/${props.runID}/${props.fileName}`)
                .then((response) => response.text())
                .then((v) => v)
                .catch((err) => {
                console.log(err);
                return "";
                });
            setData(response);
        };

        const getPdfData = async () => {
            const res = await fetch(`/data/${props.runID}/${props.fileName}`);
            const blob = await res.blob();
            setPdfFile(new File ([blob], "pdf")) // converting blob to File
        }
    
        // Determine whether the file is an image or not
        if (props.fileName.endsWith(".png") || props.fileName.endsWith(".jpg")) {
            fetchImage(); // Fetch and display image files
        } else if (props.fileName.endsWith(".pdf")) {
            getPdfData(); // Fetch pdf files
        } else {
            getFile(); // Fetch and display other types of files
        }
    }, [props.runID, props.fileName]); // Effect will run when folder or fileName changes
    
    // this needs to be case insensitive
    if (props.fileName.toLowerCase().endsWith(".jpg") || props.fileName.toLowerCase().endsWith(".png") || props.fileName.toLowerCase().endsWith(".svg")) {
        return (<div className={styles.container}>
            <ImageDisplay folder={props.runID} fileName={props.fileName} data={data}/>
        </div>) 
    } else if(props.fileName.toLowerCase().endsWith(".py") || props.fileName.toLowerCase().endsWith(".txt") || props.fileName.toLowerCase().endsWith(".ant")) {
        return (<div className={styles.container}>
            <TextDisplay codeString={data}/>
        </div>)
    } else if (pdfFile && props.fileName.toLowerCase().endsWith(".pdf")) {
        return (<div className={styles.container}>
            <PdfDisplay data={pdfFile} name={props.fileName}/>
        </div>)
    } else {
        return <></>
    }
};

export default Display

