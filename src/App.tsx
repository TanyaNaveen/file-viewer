import React, { ChangeEvent } from 'react';
import Viewer from './components/Viewer'
import SelectFolder from './components/SelectFolder'

function App() {
  
  type Page = "home" | "view"

  const [page, changePage] = React.useState<{kind: Page, folder: string}>({kind: 'home', folder: ''})

  const handleGoClick = (folder: string) => {
    // switch page, set folder
    if (folder == "") {
      alert("Please choose a folder"); // don't switch unless a folder has been selected
    } else {
      changePage({kind: "view", folder: folder})
    }
  }

  const handleBackClick = () => {
    // switch back to home page
    changePage({kind: "home", folder: ""})
  }
  
  // if (page.kind == "home") {
  //   return <SelectFolder handleGo={handleGoClick}/>
  // } else {
  //   return <Viewer folder={page.folder} handleBack={handleBackClick}/>
  // } 

  return (
    <div>
      {(page.kind == "home") ? <SelectFolder handleGo={handleGoClick}/> : <Viewer folder={page.folder} handleBack={handleBackClick}/>}
    </div>
  )
}

export default App;
