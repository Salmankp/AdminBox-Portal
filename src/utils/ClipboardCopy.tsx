import CIcon from "@coreui/icons-react";
import { useState } from "react";

function ClipboardCopyComponent({ copyText }: any) {
  const [isCopied, setIsCopied] = useState(false);

  // This is the function we wrote earlier
  async function copyTextToClipboard(text: string) {
    if ("clipboard" in navigator) {
      return await navigator.clipboard.writeText(text);
    } else {
      return document.execCommand("copy", true, text);
    }
  }

  // onClick handler function for the copy button
  const handleCopyClick = () => {
    // Asynchronously call copyTextToClipboard
    copyTextToClipboard(copyText)
      .then(() => {
        // If successful, update the isCopied state value
        setIsCopied(true);
        setTimeout(() => {
          setIsCopied(false);
        }, 1000);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <>
      {/* Bind our handler function to the onClick button property */}

      <span style={{float:"right"}}>
        {isCopied ? (
         <CIcon
         name="cilCheck"
         className="Default-success"
         data-coreui-toggle="tooltip"
         title="copy"
         size="2xl"
       />
        ) : (
          <CIcon
            name="cil-copy"
            className="Default-info"
            data-coreui-toggle="tooltip"
            title="copy"
            size="2xl"
            style={{ cursor: "pointer" }}
            onClick={handleCopyClick}
          />
        )}
      </span>
      <div style={{ overflowWrap: "break-word", padding: "4%", background: "aliceblue" }}>
        <p><b><i> {copyText} </i></b></p>
      </div>

    </>
  );
}

export default ClipboardCopyComponent;
