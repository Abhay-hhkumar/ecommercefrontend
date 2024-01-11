import React,{useState,useEffect} from 'react';
import { useNavigate, useLocation } from 'react-router-dom';

const Spinner = ({path="login"}) => {

    // show the spinner for few sectons then we navigate to
    const [count,setCount]=useState(3);
    const navigate =useNavigate();
    const location = useLocation();
    
    useEffect(()=>{
          const interval = setInterval(()=>{

                // decrement the value of "prevValue" after every 1 second
                setCount((prevValue)=>{
                    return --prevValue;
                } );
            },1000);

          count === 0 && navigate(`/${path}`, {state: location.pathname});

            return ()=> clearInterval(interval);
       },[count, navigate,path]);

  return (
    <>
    <div className="d-flex flex-column justify-content-center align-items-center" style={{height:"100vh"}}>
        <h3 className="Text-center">Please Login first, Redirecting to you in {count} seconds</h3>
          <div className="spinner-border" role="status">
            <span className="visually-hidden">Loading...</span>
          </div>
    </div>
    </>
  )
}

export default Spinner
