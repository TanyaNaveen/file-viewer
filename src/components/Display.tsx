import ImageDisplay from "./imageDisplay";
import TextDisplay from "./textDisplay";
import PdfDisplay from "./PdfDisplay";
import styles from "./styles/Display.module.css";


const Display = (
    {runID, fileName}: {runID: string, fileName: string}
) => {
    
    // display file according to its extension (case insensitivey)
    if (fileName.toLowerCase().endsWith(".jpg") || fileName.toLowerCase().endsWith(".png") || fileName.toLowerCase().endsWith(".svg")) {
        return (<div className={styles.container}>
            <ImageDisplay folder={runID} fileName={fileName}/>
        </div>) 
    } else if(fileName.toLowerCase().endsWith(".py") || fileName.toLowerCase().endsWith(".txt") || fileName.toLowerCase().endsWith(".ant")) {
        return (<div className={styles.container}>
            <TextDisplay runID={runID} fileName={fileName}/>
        </div>)
    } else if (fileName.toLowerCase().endsWith(".pdf")) {
        return (<div className={styles.container}>
            <PdfDisplay runID={runID} fileName={fileName}/>
        </div>)
    } else {
        return <></>
    }
};

export default Display

