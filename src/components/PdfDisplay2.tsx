import React, { useEffect } from "react";
import { Document, Page, pdfjs } from 'react-pdf';
import type { PDFDocumentProxy } from 'pdfjs-dist';
import styles from "./styles/PdfDisp2.module.css";
import 'react-pdf/dist/esm/Page/AnnotationLayer.css';
import 'react-pdf/dist/esm/Page/TextLayer.css';

// import worker
import "pdfjs-dist/build/pdf.worker.entry";
pdfjs.GlobalWorkerOptions.workerSrc = new URL(
  'pdfjs-dist/build/pdf.worker.min.js',
  import.meta.url,
).toString();

type PDFFile = File | null;

const PdfDisplay = (
    { runID, fileName }: { runID: string, fileName: string }
  ) => {

    const [pdfFile, setPdfFile] = React.useState<PDFFile>(null)
    const [numPages, setNumPages] = React.useState<number>(0);
    const [renderedScale, setRenderedScale] = React.useState(1.0);
    const [scale, setScale] = React.useState(1.0);
    const [renderedPageNumber, setRenderedPageNumber] = React.useState(1);
    const [pageNumber, setPageNumber] = React.useState(1);

    // fetch the pdf data, convert it to a blob
    // convert the blob to a File for easy display
    useEffect(() => { 
        const getPdfData = async () => {
          const res = await fetch(`/data/${runID}/${fileName}`);
          const blob = await res.blob();
          setPdfFile(new File ([blob], "pdf")) // converting blob to File
        }

        getPdfData();
        
      }, [runID, fileName])

    // sets number of pages once document finishes loading
    function onDocumentLoadSuccess({ numPages: nextNumPages }: PDFDocumentProxy): void {
        setNumPages(nextNumPages);
    }

    // page navigation
    function changePage(offset: number) {
        setPageNumber((prevPageNumber) => prevPageNumber + offset);
    }  

    // zooming in or out
    const changeScale = (offset: number) => {
        setScale((prevScale) => prevScale + offset);
    }

    // tells you whether or not the pdf is still loading
    // helps avoid delay/flashing on screen
    const isLoading =
        renderedPageNumber !== pageNumber || renderedScale !== scale;
    
    if (pdfFile) {
        return (
            <div className={styles.pdf}> 
            <header className={styles.header}>
                <button onClick={() => changePage(-1)} disabled={pageNumber <= 1}>Prev</button>
                <button onClick={() => changePage(1)} disabled={pageNumber >= numPages}>Next</button>
                <button onClick={() => changeScale(0.1)}>Zoom in</button>
                <button onClick={() => changeScale(-0.1)}>Zoom out</button>
            </header>
        
            <div className={styles.Example}>
                <div className={styles.Example__container}>
                    <div className={styles.Example__container__document}>
                        <Document file={pdfFile} onLoadSuccess={onDocumentLoadSuccess}>

                            {/* Displaying single page at time */}
                            
                            {/* If pdf is not yet loaded, render it with the last set scale and page num */}
                            {isLoading && renderedPageNumber && renderedScale ? (
                                <Page
                                    key={renderedPageNumber + "@" + renderedScale}
                                    className="prevPage"
                                    pageNumber={renderedPageNumber}
                                    scale={renderedScale}
                                />
                            ) : null}

                            {/* Once loaded, render it with most recent scale and page num */}
                                <Page
                                    key={pageNumber + "@" + scale}
                                    pageNumber={pageNumber}
                                    onRenderSuccess={() => {
                                        setRenderedPageNumber(pageNumber);
                                        setRenderedScale(scale);
                                    }}
                                    scale={scale}
                                />

            
                {/* Displaying all pages at a time (doesn't work as well with zoom) */}
                        
                {/* If pdf is not yet loaded, render it with the last set scale */}
                {/* {Array.from(new Array(numPages), (__, index) => (
                    scale !== renderedScale ? (
                        <Page key={`page_${index + 1}`} scale={renderedScale} pageNumber={index + 1} />
                    ) : null
                ))} */}

                {/* Once loaded, render it with most recent scale */}
                {/* {Array.from(new Array(numPages), (__, index) => (
                    <Page 
                        key={`page_${index + 1}`} 
                        scale={scale} 
                        pageNumber={index + 1} 
                        onRenderSuccess={() => {
                            setRenderedScale(scale);
                        }}
                    />
                ))} */}
                </Document>
                </div>
                </div>
            </div>
            </div>
        );
    } else {
        return <></>
    }
}

export default PdfDisplay


