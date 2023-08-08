import React from "react"; //import React
import { Button } from "reactstrap"; //import Button from reactstrap

const ScrolltoTop = () => {
  window.onscroll = function () {
    scrollFunction(); //add scroll eventlistener
  };
    // When the user clicks on the button, scroll to the top of the document
    // Show / hide button based on scroll position.
  function scrollFunction() {
    const mybutton = document.getElementById("back-to-top");
    if(mybutton) {
		if (
			document.body.scrollTop > 20 ||
			document.documentElement.scrollTop > 20
		  ) {
			mybutton.style.display = "block";
		  } else {
			mybutton.style.display = "none";
		  }

	}
    
  }
  //scroll to top function
  const scrollTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth"
    });
  };

  return (
    <Button id="back-to-top" className="p-0" onClick={scrollTop}>
      <i className="mdi mdi-arrow-up"></i>
    </Button>
  );
};

export default ScrolltoTop;
