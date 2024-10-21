import Left from "./components/left/Left.jsx"
import Logout from "./components/left/Logout.jsx"
import Login from "./components/login/Login.jsx"
import Right from "./components/right/Right.jsx"
import Signup from "./components/signup/Signup.jsx"
import { Routes, Route, Navigate } from "react-router-dom"
import { useAuth } from "./context/AuthProvider.jsx"
import Loading from "./components/loading/Loading.jsx"
// import { useSocket } from "../src/context/SocketContext.jsx";
function App() {
  // const { onlineUsers } = useSocket();
  // console.log("App ma online uses: ", onlineUsers);

  const { authUser } = useAuth();

  return (
    <>

      <Routes>
        <Route path="/" element={authUser ? (<div className="flex h-screen">
          <Logout />
          <Left />
          <Right />
        </div>) : (<Navigate to={"/login"} />)}>

        </Route>

        <Route path="/login" element={!authUser ? <Login /> : <Navigate to={"/"} />} />

        <Route path="/signup" element={!authUser ? <Signup /> : <Navigate to={"/"} />} />

      </Routes>

    </>
  )
}

export default App
