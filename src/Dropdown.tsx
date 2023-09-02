import { ChangeEvent, useEffect } from "react"

interface props {
    folder: string;
    setElement: (options: JSX.Element[]) => void;
}

const SUPPORTED_FILE_TYPES = [".png", ".jpg", ".png", ".py", ".svg", ".pdf", ".txt"];

// fetches specified data, returns dropdown optionsfrom those
// not sure if /public will work, and may need to change the .dir.json files heading
// also want to implement filtering out files with valid extensions
const Dropdown = (props: props) => {


    useEffect(() => {
        console.log(props.folder)
        const fetchFiles = async () => {
            const response = await fetch(`/${props.folder}/directory.json`)
              .then((response) => response.json())
              .then((v) => v)
              .catch((err) => console.log(err));
            return response;
        };
          
        fetchFiles().then((dirData: { file: string }[]) => {
            const options: JSX.Element[] = []
            for (let i = 0; i < dirData.length; i++) {
                options.push(<option key={i} value={dirData[i].file}>{dirData[i].file}</option>);
            }
            props.setElement(options)
        });

    }, []);
    
    return <></>
    
}


export default Dropdown;

