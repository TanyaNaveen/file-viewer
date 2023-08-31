import React, { ChangeEvent } from 'react';
import Viewer from './components/Viewer'
import SelectFolder from './components/SelectFolder'
import Dropdown from './Dropdown'

function App() {
  
  type Page = "home" | "view"

  const [page, changePage] = React.useState<{kind: Page, folder: string}>({kind: 'home', folder: ''})
  const [folder, selectFolder] = React.useState("")
  // const [file, selectFile] = React.useState("")
  const [options, setOptions] = React.useState<JSX.Element[]>([]);

  const handleGoClick = () => {
    // switch page, pass in folder as prop to Viewer
    if (folder == "") {
      alert("Please choose a folder");
    } else {
      changePage({kind: "view", folder: folder})
    }
  }

  const handleBackClick = () => {
    changePage({kind: "home", folder: ""})
    selectFolder("")
  }
  
  if (page.kind == "home") {
    return (<div className="App">
      <SelectFolder data-testid="model-select" setOptions={setOptions} />
      <p>Choose a folder:</p>
      <select defaultValue={''} onChange={(evt: ChangeEvent<HTMLSelectElement>) => {selectFolder(evt.target.value)}}>
        {options}
      </select>
      <button onClick = {handleGoClick}>Go</button>
    </div>)
  } else {
    return (<Viewer folder={folder} handleBack={handleBackClick}/>)
  } 

  // if (page.kind == "home") {
  //   return (<div className="App">
  //     <Dropdown folder={"."} setElement={setOptions}/>
  //     {/* <SelectFolder setOptions={setOptions} /> */}
  //     <p>Choose a folder:</p>
  //     <select defaultValue={''} onChange={(evt: ChangeEvent<HTMLSelectElement>) => {selectFolder(evt.target.value)}}>
  //       {options}
  //     </select>
  //     <button onClick = {handleGoClick}>Go</button>
  //   </div>)
  // } else {
  //   return (
  //   <div>
  //     <Dropdown folder={folder} setElement={setOptions}/>
  //     <p>{folder}</p>
  //     <p>Choose a file:</p>
  //     <select defaultValue={''} onChange={(evt: ChangeEvent<HTMLSelectElement>) => {selectFile(evt.target.value)}}>
  //         {options}
  //     </select>
  //     <button onClick = {handleBackClick}>Back</button>
  //     </div>)
  // } 


}

export default App;
