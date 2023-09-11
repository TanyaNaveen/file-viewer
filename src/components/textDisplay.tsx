import { useEffect, useState } from "react";
import SyntaxHighlighter from "react-syntax-highlighter";
import { vs2015 as stylesheet} from 'react-syntax-highlighter/dist/esm/styles/hljs';
import { BiCopy as CopyIcon, BiCheck as CheckIcon } from "react-icons/bi";
import { CopyToClipboard } from "react-copy-to-clipboard";
import styles from "./styles/TextDisplay.module.css";


// Define the TextDisplay component
const TextDisplay = (
  { runID, fileName }: { runID: string, fileName: string }
) => {

  const [copied, setCopied] = useState(false);
  const [data, setData] = useState("")

  // fetch text data and save it as a string
  useEffect(() => { 
    const getFile = async () => {
      const response = await fetch(`/data/${runID}/${fileName}`)
          .then((response) => response.text())
          .then((v) => v)
          .catch((err) => {
            console.log(err);
            return "";
          });
      setData(response);
    };

    getFile();
  }, [runID, fileName])


  // Function to handle copying to clipboard
  const copy = () => {
    setCopied(true);
    setTimeout(() => {
      setCopied(false);
    }, 2500);
  };

  console.log(fileName.toLowerCase().endsWith(".py"))

  return (
    <div className = {styles.text_container}>
      
      {/* SyntaxHighlighter component for code display */}
      <div className={styles.text_viewer}>
        <SyntaxHighlighter
          language={fileName.toLowerCase().endsWith(".py") ? "python" : "text"} // Specify code language - text or python for .py files
          style={stylesheet} // Apply the selected code highlighting style
          showLineNumbers={true} // Show line numbers
          customStyle={{ margin: "0" }} // Apply custom styling to the syntax highlighter
          lineNumberContainerStyle={{ minWidth: "4.25em" }} // Styling for line number container
        >{data} {/* Display the code content */}
        </SyntaxHighlighter>

        {/* Display copy button inside display */}
        <div className={styles.copy_button}>
          <CopyToClipboard text={data} onCopy={copy}>
            <button>  
              {copied ? <CheckIcon /> : <CopyIcon />}
            </button>
          </CopyToClipboard>
        </div>
      </div>
    </div>
  );
};

export default TextDisplay; // Export the TextDisplay component