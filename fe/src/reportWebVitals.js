//if onPerfEntry is not undefined, then import web-vitals and call getCLS, getFID, getFCP, getLCP, getTTFB
//then call getCLS, getFID, getFCP, getLCP, getTTFB with onPerfEntry as parameter. 
//also import getCLS, getFID, getFCP, getLCP, getTTFB from web-vitals
//finally export reportWebVitals function, pass the onPerfEntry callback to each web-vitals metric.

//web-vitals is a library that measures performance metrics like Largest Contentful Paint (LCP). 
//It is used to measure the performance of the application.
const reportWebVitals = onPerfEntry => {
  if (onPerfEntry && onPerfEntry instanceof Function) {
    import('web-vitals').then(({ getCLS, getFID, getFCP, getLCP, getTTFB }) => {
      getCLS(onPerfEntry);
      getFID(onPerfEntry);
      getFCP(onPerfEntry);
      getLCP(onPerfEntry);
      getTTFB(onPerfEntry);
    });
  }
};

export default reportWebVitals;
