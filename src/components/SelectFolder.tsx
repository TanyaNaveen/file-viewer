import { useEffect } from "react"

const SelectFolder = ({
    setOptions
}: {setOptions: (options: JSX.Element[]) => void;}) => {
    useEffect(() => {
        // fetch list of all folders in public directory
        const fetchFolder = async () => {
            const response = await fetch(`/./directory.json`)
              .then((response) => response.json())
              .then((v) => v)
              .catch((err) => console.log(err));
            return response;
        };
          
        fetchFolder().then((dirData: { folder: string }[]) => {
            // create array of folders to display in dropdown
            const options: JSX.Element[] = []
            options.push(<option key={-1} value={''}>Choose an option</option>)            
            for (let i = 0; i < dirData.length; i++) {
                options.push(<option key={i} value={dirData[i].folder}>{dirData[i].folder}</option>);
            }
            setOptions(options)
        });

    }, []);
    
    return <></>
}

export default SelectFolder