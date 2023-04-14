import LoginSignup from "./components/LoginSignup.js/LoginSignup";
import ComposeEmail from "./components/Pages/Home/ComposeEmail";
import { Route, Routes } from "react-router-dom";
import { useSelector } from "react-redux";
import InboxPage from "./components/Pages/Inbox/InboxPage";
import Header from "./components/Pages/Home/Header";
import ViewMessage from "./components/Pages/Inbox/ViewMessagePage";


function App() {
  const isLogin = useSelector(state=> state.auth.userAuth.isLogin);
  console.log(isLogin)
  return (
    <>
    <Header></Header>
    <Routes>
      {!isLogin && <Route path={'/'} element={<LoginSignup></LoginSignup>}></Route>}
      {isLogin && <Route path={'/compose-email'} element={<ComposeEmail/>}></Route>}
      {!isLogin && <Route path={'*'} element={<LoginSignup/>}></Route>}
      {isLogin && <Route path={'*'} element={<ComposeEmail/>}></Route>}
      {isLogin&& <Route path="inbox" element={<InboxPage/>}></Route> }
      <Route path="/inbox/:id" element={<ViewMessage/>}></Route>
    </Routes>
    

    </>
    
  );
}

export default App;
