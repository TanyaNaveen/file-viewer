import { TransformWrapper, TransformComponent, useControls } from "react-zoom-pan-pinch";
import { BiZoomIn as ZoomIn, BiZoomOut as ZoomOut } from "react-icons/bi";
import styles from "./styles/ImageDisplay.module.css"

// Define the ImageDisplay component
const ImageDisplay = (
  {folder, fileName}: {folder: string, fileName: string;
}) => {

  // define zoom in, zoom out, and reset operations 
  const Controls = () => {
    const { zoomIn, zoomOut, resetTransform } = useControls();
    return (
      <div className={styles.control_buttons}>
        <button className={styles.ZoomIn} onClick={() => zoomIn()}>{<ZoomIn />}</button>
        <button className={styles.ZoomOut} onClick={() => zoomOut()}><ZoomOut /></button>
        <button onClick={() => resetTransform()}>Reset</button>
      </div>
    );
  };

  return (
    // Wrap the image with TransformWrapper for zooming and panning functionality
    <div className={styles.image_container}>
      <TransformWrapper
        centerZoomedOut={true} // Center the image when zoomed out
        doubleClick={{
          mode: 'reset' // Allow double click to reset the zoom
        }}>
        {/* Display the list of controls */}
        <Controls /> 

        {/* Apply zooming and panning to the Image component */}
        <TransformComponent wrapperStyle={{ width: "100%", height: "100%" }} contentStyle={{ width: "100%", height: "100%" }}>
          <img className = {styles.image} src={`/data/${folder}/${fileName}`} alt={fileName}/>
        </TransformComponent>   
      </TransformWrapper>
    </div>
  );
};

export default ImageDisplay; // Export the ImageDisplay component
