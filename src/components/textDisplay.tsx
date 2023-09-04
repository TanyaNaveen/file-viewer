import { useState } from "react";
import SyntaxHighlighter from "react-syntax-highlighter";
import { vscDarkPlus as stylesheet } from "react-syntax-highlighter/dist/cjs/styles/prism";
import { BiCopy as CopyIcon, BiCheck as CheckIcon } from "react-icons/bi";
import { CopyToClipboard } from "react-copy-to-clipboard";
import styles from "./styles/TextDisplay.module.css";

// Define the TextDisplay component
const TextDisplay = ({ codeString }: { codeString: string }) => {
  const [copied, setCopied] = useState(false);

  console.log("called text display"); // it's getting called twice. we don't want that...

  // Function to handle copying to clipboard
  const copy = () => {
    setCopied(true);
    setTimeout(() => {
      setCopied(false);
    }, 2500);
  };

  return (
    <div className = {styles.text_container}>
      
      {/* SyntaxHighlighter component for code display */}
      <div className={styles.text_viewer}>
        <SyntaxHighlighter
          language="markup" // Specify the code language (markup or python if .py)
          style={stylesheet} // Apply the selected code highlighting style
          showLineNumbers={true} // Show line numbers
          customStyle={{ margin: "0" }} // Apply custom styling to the syntax highlighter
          lineNumberContainerStyle={{ minWidth: "4.25em" }} // Styling for line number container
        >{codeString} {/* Display the code content */}
        </SyntaxHighlighter>

        {/* Display copy button inside display */}
        <div className={styles.copy_button}>
          <CopyToClipboard text={codeString} onCopy={copy}>
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