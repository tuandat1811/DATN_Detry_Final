import React from "react";
import Routes from "./Routes/index";

//import Custom Style scss
import "./assets/scss/themes.scss";
import "antd/dist/reset.css";
import Loading from "./components/loading";
function App() {
  return (
    <React.Fragment>
		<Loading/>
      <Routes />
    </React.Fragment>
  );
}

export default App;
