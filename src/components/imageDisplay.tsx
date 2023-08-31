import { TransformWrapper, TransformComponent, useControls } from "react-zoom-pan-pinch";
import { BiZoomIn as ZoomIn, BiZoomOut as ZoomOut } from "react-icons/bi";

// Define the ImageDisplay component
const ImageDisplay = ({
  folder,
  fileName,
  data,
}: {
  folder: string
  fileName: string; // The name of the image file
  data: string; // The binary blob data of the image
}) => {
  // define zoom in, zoom out, and reset operations 
  const Controls = () => {
    const { zoomIn, zoomOut, resetTransform } = useControls();
    return (
      <div className="zoom">
        <button onClick={() => zoomIn()}>{<ZoomIn />}</button>
        <button onClick={() => zoomOut()}><ZoomOut /></button>
        <button onClick={() => resetTransform()}>Reset</button>
      </div>
    );
  };

  return (
    // Wrap the image with TransformWrapper for zooming and panning functionality
    <TransformWrapper
      centerZoomedOut={true} // Center the image when zoomed out
      doubleClick={{
        mode: 'reset' // Allow double click to reset the zoom
      }}
    >
      {/* Display the list of controls */}
      <Controls />

      {/* Apply zooming and panning to the Image component */}
      <TransformComponent wrapperStyle={{ width: "100%", height: "100%" }} contentStyle={{ width: "100%", height: "100%" }}>
        {/* <img src={data} alt={fileName} width={300} height={300}/> */}
        <img src={`/${folder}/${fileName}`} alt={fileName} width={300} height={300}/>
      </TransformComponent>
    </TransformWrapper>
  );
};

export default ImageDisplay; // Export the ImageDisplay component
