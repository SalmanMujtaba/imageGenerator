import React, { useState, useEffect } from 'react';

const loadingHOC = ( Component ) => {
  return function Authenticated({ props }) {
    const [ isLoad, setLoading ] = useState(false);
    const [ value, setValue ] = useState("");
    const [ images, setImages ] = useState([]);
    const [ error, setError ] = useState(false);

    useEffect(() => {
      async function getImages() {
        if(!!value) {
          setLoading(true);
          await fetch(`https://source.unsplash.com/600x300/?${value}/`)
            .then( response => {
              if(response 
                && response.status === 200 
                && response.ok 
                && response.url) {
                  console.log(response);
                  if( response.url.includes("404")) {
                    setError(true);
                  } else {
                    setImages(images => [...images, response.url]);
                    setError(false);
                  }
                setLoading(false);
              }
            }).catch( error => {
              setError( error );
            });
          
        }
      }
      getImages();
    }, [value]);

    const setLoadingState = ( isLoading ) => {
      setLoading( isLoading );
    }
    const handleSubmit = (value ) =>{
      setValue(value);
    }

    return (
      <>
        { 
          isLoad && <p className="center-align loading-class">Fetching Data Please Wait....</p>
        }        
        {
          isLoad === false && 
          <Component {...props} error={error} data={[...images]} handle={handleSubmit} loadingClick={setLoadingState}></Component>
        }
      </>
    )
  }
}

export default loadingHOC;