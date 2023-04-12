import { BrowserRouter } from "react-router-dom";

import { AuthContext } from "./context/AuthContext";
import { useAuth } from "./hooks/useAuth";
import { useRoutes } from "./hooks/useRoutes";
import { Navbar } from "./components/Navbar";
import { ToastContainer } from "react-toastify";

const App = () => {
  const { login, logout, token, userId, ready } = useAuth();
  const isAuthenticated = !!token;
  const routes = useRoutes(isAuthenticated);

  if(!ready){
    return <div>Loading...</div>
  }
  return (
    <AuthContext.Provider
      value={{ login, logout, token, userId, isAuthenticated }}
    >
    
      <BrowserRouter>
      <ToastContainer />
      
      {isAuthenticated && <Navbar />}
      {routes}</BrowserRouter>
    </AuthContext.Provider>
  );
};

export default App;
