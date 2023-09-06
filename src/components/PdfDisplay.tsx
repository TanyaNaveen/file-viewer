import React, { useEffect } from "react";
import { Document, Page, pdfjs } from 'react-pdf';
import type { PDFDocumentProxy } from 'pdfjs-dist';
import styles from "./styles/PdfDisplay.module.css";
import 'react-pdf/dist/esm/Page/AnnotationLayer.css';
import 'react-pdf/dist/esm/Page/TextLayer.css';

// pdfjs.GlobalWorkerOptions.workerSrc = '/pdf.worker.min.js'

// const url = `//cdn.jsdelivr.net/npm/pdfjs-dist@7.3.3/build/pdf.worker.min.js`
// pdfjs.GlobalWorkerOptions.workerSrc = url

// pdfjs.GlobalWorkerOptions.workerSrc = './pdf.worker.min.3.6.172.js';

import "pdfjs-dist/build/pdf.worker.entry";
pdfjs.GlobalWorkerOptions.workerSrc = new URL(
  'pdfjs-dist/build/pdf.worker.min.js',
  import.meta.url,
).toString();

// import worker
// pdfjs.GlobalWorkerOptions.workerSrc = new URL(
//   'pdfjs-dist/build/pdf.worker.min.js',
//   import.meta.url,
// ).toString();

// define type
type PDFFile = File | null;

// define component PdfDisplay
const PdfDisplay = (
  { runID, fileName }: { runID: string, fileName: string }
) => {

    const [pdfFile, setPdfFile] = React.useState<PDFFile>(null)
    const [numPages, setNumPages] = React.useState<number>();

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
          <header className={styles.header}></header>
    
          <div className={styles.Example}>
            <div className={styles.Example__container}>
              <div className={styles.Example__container__document}>
                <Document file={pdfFile} onLoadSuccess={onDocumentLoadSuccess}>
                  {Array.from(new Array(numPages), (__, index) => (
                    <Page key={`page_${index + 1}`} pageNumber={index + 1} />
                  ))}
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