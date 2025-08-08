import { useEffect } from "react";
const User = () =>{

    useEffect( ()=>{
    const timer =  setInterval(()=>{
        console.log("set Interval called")
    }, 1000)

    return() =>{
        clearInterval(timer)
        console.log("use effect returns")
    }
    },[]) 
        
    return(
        <div className="user">
            <h1>Piyush Dubey</h1>
        </div>
    )
}
export default User;