import { useSelector } from "react-redux";
import { Container} from "react-bootstrap";
import MyEditor from "./MyEditor";

const ComposeEmail = () => {
  const userAuth = useSelector((state) => state.auth.userAuth);
  if (!userAuth.isLogin) {
    return <p> Page Not Found</p>;
  }
  return (
    <>
      <Container>
        <MyEditor></MyEditor>   
      </Container>
    </>
  );
};

export default ComposeEmail;
