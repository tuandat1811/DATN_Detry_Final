import React from "react"; //import React library
import Routes from "./Routes/index"; //import Routes component that contains all the routes.

//import Custom Style scss
import "./assets/scss/themes.scss";
import "antd/dist/reset.css"; //import antd css
import Loading from "./components/loading"; //import loading component to show loading screen.
function App() {
  return (
    <React.Fragment>
		<Loading/> 
      <Routes /> 
    </React.Fragment>
  );
}

export default App;
