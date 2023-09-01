import React from "react";
import { useEffect } from "react";
import ImageDisplay from "./ImageDisplay";
import TextDisplay from "./TextDisplay";
import PdfDisplay from "./PdfDisplay";

interface props {
    dir: string
    fileName: string
}

type PDFFile = File | null;

const Display = (props: props) => {

    console.log("display called")


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
            const res = await fetch(`/${props.dir}/${props.fileName}`);
            const imageBlob = await res.blob();
            const imageObjectURL = URL.createObjectURL(imageBlob);
            setData(imageObjectURL);
        };
    
        // This function fetches the file from the server
        // It then sets the file with the setFile function
        const getFile = async () => {
            const response = await fetch(`/${props.dir}/${props.fileName}`)
                .then((response) => response.text())
                .then((v) => v)
                .catch((err) => {
                console.log(err);
                return "";
                });
            setData(response);
        };

        const getPdfData = async () => {
            const res = await fetch(`/${props.dir}/${props.fileName}`);
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
    }, [props.dir, props.fileName]); // Effect will run when folder or fileName changes
    
    if (props.fileName.endsWith(".jpg") || props.fileName.endsWith(".png") || props.fileName.endsWith(".svg")) {
        return <ImageDisplay folder={props.dir} fileName={props.fileName} data={data}/>; 
    } else if(props.fileName.endsWith(".py") || props.fileName.endsWith(".txt")) {
        return <TextDisplay codeString={data}/>
    } else if (pdfFile && props.fileName.endsWith(".pdf")) {
        return <PdfDisplay data={pdfFile} name={props.fileName}/>
    } else {
        return <></>
    }
};

export default Display

