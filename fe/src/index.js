//import React from 'react';
import React from "react";
//import ReactDOM from "react-dom";
import ReactDOM from "react-dom/client";
//import App component
import App from "./App";
import { BrowserRouter } from "react-router-dom"; //import BrowserRouter component for routing
import { Provider } from 'react-redux'; //import Provider component from react-redux
import reportWebVitals from "./reportWebVitals"; //import reportWebVitals function for performance measurement
import { createStore } from "redux"; //import createStore function from redux
import rootReducer from "./redux/rootReducer"; //import rootReducer from redux
//create store for redux with rootReducer. RootReducer is a function that contains all the reducers.
const store = createStore(
	rootReducer,
  );
//render App component inside BrowserRouter component inside Provider component inside root element. 
//Also get root element using getElementById function.
const root = ReactDOM.createRoot( document.getElementById( "root" ) );
root.render(

	<React.Fragment>
		<Provider store={ store }> 
			<BrowserRouter>
				<App />
			</BrowserRouter>
		</Provider>

	</React.Fragment>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
