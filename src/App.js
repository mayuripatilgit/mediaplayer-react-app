import "./App.css";
import "./Comment.css";
import { Route, Routes } from "react-router-dom";
import LoginSuccess from "./Components/LoginSuccess";
import UploadVideo from "./Components/UploadVideo";
import Profile from "./Components/Profile";
import Registration from "./Components/Registration";
import VideoGallery from "./Components/VideoGallery";
import { Sidebar } from "./Components/Sidebar";
import DisplayChannel from "./Components/DisplayChannel";
import Home from "./Components/Home";
import LoginForm from "./Components/ForgotPassword";
import ForgotResetPassword from "./Components/ForgotResetPassword";
import ResetPasswordForm from "./Components/ResetPasswordForm";
import ChannelDemo from "./Components/ChannelDemo";
import ForgotPassword from "./Components/ForgotPassword";
import SingleVideoPage from "./Components/SingleVideoPage";
import Navbar1 from "./Components/Navbar1";
import SearchResults from "./Components/SearchResults";
import SearchBar from "./Components/SearchBar";

function App() {
  return (
    <div className="App">
      {/* <Navbar1/> */}
      <Routes>
        <Route path="/" exact element={<Home />}></Route>



        <Route path="/ChannelDemo" exact element={<ChannelDemo />}></Route>
        <Route path="/Navbar1" exact element={<Navbar1 />}></Route>

        <Route path="/LoginSuccess" exact element={<LoginSuccess />}></Route>
        <Route
          path="/UploadVideo/:channelId"
          exact
          element={<UploadVideo />}
        ></Route>
        <Route path="/Profile" exact element={<Profile />}></Route>


        <Route path="/Registration" exact element={<Registration />}></Route>
        <Route path="/VideoGallery" exact element={<VideoGallery />}></Route>

        <Route path="/Sidebar" exact element={<Sidebar />}></Route>
        <Route
          path="/DisplayChannel"
          exact
          element={<DisplayChannel />}
        ></Route>

        <Route
          path="/ForgotPassword"
          exact
          element={<ForgotPassword />}
        ></Route>
        <Route path="/loginForm" exact element={<LoginForm />}></Route>

        <Route
          path="/ResetPasswordForm"
          exact
          element={<ResetPasswordForm />}
        ></Route>
        <Route
          path="/ForgotResetPassword"
          exact
          element={<ForgotResetPassword />}
        ></Route>

        <Route
          path="/SingleVideoPage/:id"
          exact
          element={<SingleVideoPage />}
        ></Route>
        <Route exact path="/first" Component={SearchBar}/>
        <Route exact path="/Search" Component={SearchResults}/>
      </Routes>
    </div>
  );
}
export default App;
