import { useState } from "react";
import SyntaxHighlighter from "react-syntax-highlighter";
import { vscDarkPlus as stylesheet } from "react-syntax-highlighter/dist/cjs/styles/prism";
import { BiCopy as CopyIcon, BiCheck as CheckIcon } from "react-icons/bi";
import { CopyToClipboard } from "react-copy-to-clipboard";

// Define the TextDisplay component
const TextDisplay = ({ codeString }: { codeString: string }) => {
  const [copied, setCopied] = useState(false);

  // Function to handle copying to clipboard
  const copy = () => {
    setCopied(true);
    setTimeout(() => {
      setCopied(false);
    }, 2500);
  };

  return (
    <div className = "text-container">
      
      {/* SyntaxHighlighter component for code display */}
      <div className="text-viewer">
        <SyntaxHighlighter
          language="markup" // Specify the code language (markup or python if .py)
          style={stylesheet} // Apply the selected code highlighting style
          showLineNumbers={true} // Show line numbers
          customStyle={{ margin: "0" }} // Apply custom styling to the syntax highlighter
          lineNumberContainerStyle={{ minWidth: "4.25em" }} // Styling for line number container
        >{codeString} {/* Display the code content */}
        </SyntaxHighlighter>

        {/* Display copy button inside display */}
        <div className="copy-button">
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