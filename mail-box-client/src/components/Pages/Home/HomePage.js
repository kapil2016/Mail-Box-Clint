import Header from "./Header"
import { useSelector } from "react-redux";

const HomePage = ()=>{
 const userAuth = useSelector(state=> state.auth.userAuth);

if(!userAuth.isLogin){
    return <p> Page Not Found</p>;
}
    return (
        <>
        <Header></Header>
        <p>
            welcome to mail box 
        </p>
        </>
    )
}

export default HomePage ;