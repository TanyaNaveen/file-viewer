import styles from "./styles/AnotherPdfDisplay.module.css"

const PdfDisplay = ({runID, fileName}: {runID: string, fileName: string}) => {
    return (
        <div>
            <object className={styles.pdf} data={`/data/${runID}/${fileName}`} type="application/pdf">
                <p>Unable to display PDF file. <a href={`/data/${runID}/${fileName}`}>Download</a> instead.</p>
            </object>
        </div>
    )
}


export default PdfDisplay;