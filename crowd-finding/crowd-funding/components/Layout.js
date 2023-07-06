import React from "react";

function Layout(props) {
  return (
    <div>
        <h1>Header</h1>
        {props.children}
    </div>
  )
}

export default Layout
