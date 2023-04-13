import Header from "./Header";
import { useSelector } from "react-redux";
import { Container} from "react-bootstrap";
import MyEditor from "./MyEditor";
const HomePage = () => {
  const userAuth = useSelector((state) => state.auth.userAuth);

  if (!userAuth.isLogin) {
    return <p> Page Not Found</p>;
  }
  return (
    <>
      <Header></Header>
      <Container>
        <MyEditor></MyEditor>   
      </Container>
    </>
  );
};

export default HomePage;
