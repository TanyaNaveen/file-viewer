import React, { ChangeEvent } from 'react';
import Viewer from './components/Viewer'
import SelectFolder from './components/SelectFolder'

function App() {
  
  type Page = "home" | "view"

  const [page, changePage] = React.useState<{kind: Page, folder: string}>({kind: 'home', folder: ''})
  const [folder, selectFolder] = React.useState("")
  const [options, setOptions] = React.useState<JSX.Element[]>([]);

  const handleGoClick = () => {
    // switch page, pass in folder as prop to Viewer
    if (folder == "") {
      alert("Please choose a folder"); // don't switch unless a folder has been selected
    } else {
      changePage({kind: "view", folder: folder})
    }
  }

  const handleBackClick = () => {
    // switch back to home page
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
    return <Viewer folder={folder} handleBack={handleBackClick}/>
  } 
}

export default App;
