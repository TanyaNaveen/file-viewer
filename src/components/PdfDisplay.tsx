import React, { useEffect } from "react";
import { Document, Page, pdfjs } from 'react-pdf';
import type { PDFDocumentProxy } from 'pdfjs-dist';
import styles from "./styles/PdfDisplay.module.css";
import 'react-pdf/dist/esm/Page/AnnotationLayer.css';
import 'react-pdf/dist/esm/Page/TextLayer.css';

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
    const [scale, setScale] = React.useState(1.0);
    const [renderedScale, setRenderedScale] = React.useState(1.0);

    const [pageNumber, setPageNumber] = React.useState(1);
    const [renderedPageNumber, setRenderedPageNumber] = React.useState(1);
  

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

    function changePage(offset: number) {
      setPageNumber((prevPageNumber) => prevPageNumber + offset);
    }
  
    function previousPage() {
      changePage(-1);
    }
  
    function nextPage() {
      changePage(1);
    }
  
    function changeScale(offset: number) {
      setScale((prevScale) => prevScale + offset);
    }
  
    function decreaseScale() {
      changeScale(-0.1);
    }
  
    function increaseScale() {
      changeScale(0.1);
    }
  
    function goToPage(event: React.ChangeEvent<HTMLInputElement>) {
     setPageNumber(+event.target.value);
    }
  
    const isLoading =
      renderedPageNumber !== pageNumber || renderedScale !== scale;
  
    function useWindowWidth() {
      const [width, setWidth] = React.useState(window.innerWidth);
    
      useEffect(() => {
        const handleResize = () => setWidth(window.innerWidth);
    
        window.addEventListener('resize', handleResize);
    
        return () => {
          window.removeEventListener('resize', handleResize);
        };
      }, []);
    
      return width;
    }
      
    const width = useWindowWidth();
  

    if (pdfFile) {
      return (
        <div className={styles.pdf}> 
          <header className={styles.header}>
              <div className={styles.pageNav}>
                <p>Page 
                  <input className={styles.pageNum} type="number" value={numPages ? pageNumber : "--"} onChange={goToPage}></input> of {numPages || "--"}
                </p>
                <button type="button" disabled={pageNumber <= 1} onClick={previousPage}>Prev</button>{" "}
                <button type="button" disabled={pageNumber >= numPages} onClick={nextPage}> Next </button>
              </div>
              <div className={styles.zoomControls}>
                <button className="zoomOut" type="button" disabled={scale <= 0.5} onClick={decreaseScale}> - </button>{" "} 0.5{" "}
                <input className="zoom" type="range" min="0.5" max="2" value={scale} onChange={(event) => setScale(Number(event.target.value))} step="0.1"/>{" "}2{" "}
                <button type="button" disabled={scale >= 2} onClick={increaseScale}> + </button>
                <button className="reset" onClick={() => setScale(1.0)}>Reset</button>
              </div>
          </header>
    
          <div className={styles.Example}>
            <div className={styles.Example__container}>
              <div className={styles.Example__container__document}>
              <Document  file={pdfFile} onLoadSuccess={onDocumentLoadSuccess}>
                {isLoading && renderedPageNumber && renderedScale ? (
                  <Page
                    key={renderedPageNumber + "@" + renderedScale}
                    className="prevPage"
                    pageNumber={renderedPageNumber}
                    scale={renderedScale}
                    width={Math.min(width * 0.9, 600)}
                  />
                ) : null}
                <Page
                  key={pageNumber + "@" + scale}
                  pageNumber={pageNumber}
                  onRenderSuccess={() => {
                    setRenderedPageNumber(pageNumber);
                    setRenderedScale(scale);
                  }}
                  scale={scale}
                  width={Math.min(width * 0.9, 600)}
                />
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