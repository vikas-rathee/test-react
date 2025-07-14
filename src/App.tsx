import "./App.css";
import { useRoutes } from "react-router-dom";
import routes from "./routes";
// import "./EditorIntegration/MonacoEditor/MonacoLoader";

function App() {
  const element = useRoutes(routes);

  return <>{element}</>;
}

export default App;
