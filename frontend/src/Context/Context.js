
import { createContext,useState} from "react";
export const Appcontext=createContext();

const Appcontextprovider=(props)=>{
    const [signupSuccess, setsignupSuccess] = useState(false);
     const [loginSuccess, setLoginSuccess] = useState(false); 
    const value={
     signupSuccess,
     setsignupSuccess,
     loginSuccess,
     setLoginSuccess
    }
    return(
        <Appcontext.Provider value={value}>
             {props.children}
        </Appcontext.Provider>
    )
}

export default Appcontextprovider;
