import "./styles/_main.scss";
import Home from "./pages/Home/Home";
import { Provider } from "react-redux";
import setupStore from "./redux/store";

const App = () => {
  return (
    <Provider store={setupStore}>
      <Home />
    </Provider>
  );
};

export default App;
