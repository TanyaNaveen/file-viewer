import React from "react";
import { Document, Page, pdfjs } from 'react-pdf';
import type { PDFDocumentProxy } from 'pdfjs-dist';
import "./styles/PdfDisplay.css"
import 'react-pdf/dist/esm/Page/AnnotationLayer.css';
import 'react-pdf/dist/esm/Page/TextLayer.css';


// import worker
pdfjs.GlobalWorkerOptions.workerSrc = new URL(
  'pdfjs-dist/build/pdf.worker.min.js',
  import.meta.url,
).toString();


interface props {
    data: File,
    name: string
}

const PdfDisplay = (props: props) => {

    const [numPages, setNumPages] = React.useState<number>();

    // sets page numbers
    // should try to do something with this, maybe display in the header
    function onDocumentLoadSuccess({ numPages: nextNumPages }: PDFDocumentProxy): void {
        setNumPages(nextNumPages);
    }

    return (
        <div> 
          <header>
              <h1>{props.name}</h1>
          </header>
    
          <div className="Example">
            
            <div className="Example__container">
              <div className="Example__container__document">
                <Document file={props.data} onLoadSuccess={onDocumentLoadSuccess}>
                  {Array.from(new Array(numPages), (__, index) => (
                    <Page key={`page_${index + 1}`} pageNumber={index + 1} />
                  ))}
                </Document>
              </div>
            </div>
          </div>
        </div>
      );
    }

export default PdfDisplay