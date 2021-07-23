import React, { useState } from "react"
import io from "socket.io-client"

import "./static/css/App.css"

const App = () => {
  const [ socket ] = useState( io( "http://192.168.1.2:3001" ) )
  const [ rotation, setRotation ] = useState( "0deg" ) // For the "Scene" element

  socket.on( "message", deg => {
    setRotation( deg ) // Comes through as "0deg"
    console.log( deg )
  } )

  // This is what rotates the whole scene
  const styles =  {
    transform: `rotateY( ${ rotation } )`,
    WebkitTransform: `rotateY( ${ rotation } )`
  }

  return (
    // #root -> #App -> #Scene
    <div id = "App">
      <div id = "Scene" style = { styles }>
        <div id = "Text">
          <p>mayonnaise is not an instrument</p>
        </div>

        <div id = "RightSide" className = "Side" />
        <div id = "LeftSide" className = "Side" />
        <div id = "BackSide" className = "Side" />
        <div id = "Bottom" className = "Side" />
        <div id = "Top" className = "Side" />

        <div id = "Floor" />
      </div>
    </div>
  )
}

export default App