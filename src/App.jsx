import Header from "./components/Header/Header";
import "./App.css";
import { Toaster } from "react-hot-toast";
import LocationList from "./components/LocationList/LocationList";
import { Routes, Route } from "react-router-dom";
import AppLayou from "./components/AppLayou/AppLayou";
import Hotels from "./components/Hotels/Hotels";
import HotelsProvider from "./components/context/HotelsProvider";
import SingleHotel from "./components/SingleHotel/SingleHotel";
import BookmarLayout from "./components/BookmarLayout/BookmarLayout";
import BookmarkProvider from "./components/context/BookmarkListContext";
import Bookmark from "./components/Bookmark/Bookmark";
import SingleBookmark from "./components/SingleBookmark/SingleBookmark";
import AddNewBookmark from "./components/AddNewBookmark/AddNewBookmark";
import AuthProvider from "./components/context/AuthProvider";
import Login from "./components/Login/Login";
import ProtectedRoute from "./components/ProtectedRoute/ProtectedRoute";
function App() {
  return (
    <AuthProvider>
      <BookmarkProvider>
        <HotelsProvider>
          <Toaster />
          <Header />
          <Routes>
            <Route path="/" element={<LocationList />}></Route>
            <Route path="/login" element={<Login />}></Route>
            <Route path="/hotels" element={<AppLayou />}>
              <Route index element={<Hotels />}></Route>
              <Route path=":id" element={<SingleHotel />}></Route>
            </Route>
            <Route
              path="/bookmark"
              element={
                <ProtectedRoute>
                  <BookmarLayout />
                </ProtectedRoute>
              }
            >
              <Route index element={<Bookmark />}></Route>
              <Route path=":id" element={<SingleBookmark />}></Route>
              <Route path="add" element={<AddNewBookmark />}></Route>
            </Route>
          </Routes>
        </HotelsProvider>
      </BookmarkProvider>
    </AuthProvider>
  );
}

export default App;
