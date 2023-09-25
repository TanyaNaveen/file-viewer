import React, { useEffect } from "react";
import { Document, Page, pdfjs } from 'react-pdf';
import type { PDFDocumentProxy } from 'pdfjs-dist';
import styles from "./styles/PdfDisplay.module.css";
import 'react-pdf/dist/esm/Page/AnnotationLayer.css';
import 'react-pdf/dist/esm/Page/TextLayer.css';
import { TransformWrapper, TransformComponent, useControls } from "react-zoom-pan-pinch";
import { BiZoomIn as ZoomIn, BiZoomOut as ZoomOut, BiReset as Reset } from "react-icons/bi";

// import worker
import "pdfjs-dist/build/pdf.worker.entry";
pdfjs.GlobalWorkerOptions.workerSrc = new URL(
  'pdfjs-dist/build/pdf.worker.min.js',
  import.meta.url,
).toString();


// define type
type PDFFile = File | null;

// define component PdfDisplay
const PdfDisplay = (
  { runID, fileName }: { runID: string, fileName: string }
) => {

    const [pdfFile, setPdfFile] = React.useState<PDFFile>(null)
    const [numPages, setNumPages] = React.useState<number>(0);
  
    const Controls = () => {
      const { zoomIn, zoomOut, resetTransform } = useControls();
      return (
        <div className={styles.buttons}>
          <button title="Zoom In" onClick={() => zoomIn()}>{<ZoomIn />}</button>
          <button title="Zoom Out" onClick={() => zoomOut()}><ZoomOut /></button>
          <button title="Reset Zoom" onClick={() => resetTransform()}>{<Reset/>}</button>
        </div>
      );
    };
  

    // fetch the pdf data
    // convert it to a blob, then create File object
    useEffect(() => { 
      const getPdfData = async () => {
        const res = await fetch(`/data/${runID}/${fileName}`);
        const blob = await res.blob();
        setPdfFile(new File ([blob], "pdf")) // converting blob to File
      }

      getPdfData();
      
    }, [runID, fileName])

    console.log(pdfFile)

    // sets page numbers
    // should try to do something with this, maybe display in the header
    function onDocumentLoadSuccess({ numPages: nextNumPages }: PDFDocumentProxy): void {
        setNumPages(nextNumPages);
    }



    if (pdfFile) {
      return (
        <div className={styles.pdf}> 
                
          <div className={styles.Example}>
            <div className={styles.Example__container}>
              <div className={styles.Example__container__document}>
                <Document  file={pdfFile} onLoadSuccess={onDocumentLoadSuccess}>
                  <TransformWrapper
                      centerZoomedOut={true}
                      wheel = {{disabled: true}} // Disable panning with mousepad so it doesn't interfere with scroll action
                      doubleClick={{
                        mode: 'reset' // Allow double click to reset zoom
                      }}
                      centerOnInit={true}
                  >

                    <header className={styles.header}>
                      <div className={styles.buttons}><Controls /></div>
                    </header>

                    <TransformComponent>
                      {Array.from(new Array(numPages), (__, index) => (
                            <Page 
                                key={`page_${index + 1}`} 
                                pageNumber={index + 1} 
                            />
                      ))}
                      </TransformComponent>
                  </TransformWrapper>
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