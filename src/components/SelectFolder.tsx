import { useEffect } from "react"

const SelectFolder = ({
    setOptions
}: {setOptions: (options: JSX.Element[]) => void;}) => {
    useEffect(() => {
        const fetchFolder = async () => {
            const response = await fetch(`/./directory.json`)
              .then((response) => response.json())
              .then((v) => v)
              .catch((err) => console.log(err));
            return response;
        };
          
        fetchFolder().then((dirData: { folder: string }[]) => {
            const options: string[] = []
            dirData.forEach(({ folder }) => {
              options.push(folder)
            });

            // create an array of JSX elements so it's easy to display in the dropdown
            const dropdownOptions: JSX.Element[] = [];
            dropdownOptions.push(<option key={-1} value={''}>Choose an option</option>)
            // create an element corresponding to each folder
            for (let i = 0; i < options.length; i++) {
                dropdownOptions.push(<option key={i} value={options[i]}>{options[i]}</option>);
            }

            setOptions(dropdownOptions)
        });

    }, []);
    
    return <></>
}

export default SelectFolder