import React from 'react';
import Viewer from './components/Viewer'
import SelectFolder from './components/SelectFolder'

function App() {
  
  // define Page type
  type Page = "home" | "view"

  const [page, changePage] = React.useState<{kind: Page, folder: string}>({kind: 'home', folder: ''})

  // switch to viewer page, set folder
  const handleGoClick = (folder: string) => {
    if (folder === "") {
      alert("Please choose a folder"); // don't proceed unless a folder has been selected
    } else {
      changePage({kind: "view", folder: folder})
    }
  }

  // switch back to home page
  const handleBackClick = () => {
    changePage({kind: "home", folder: ""})
  }
  
  return (
    <div>
      {(page.kind === "home") ? <SelectFolder handleGo={handleGoClick}/> : <Viewer folder={page.folder} handleBack={handleBackClick}/>}
    </div>
  )
}

export default App;
