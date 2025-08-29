import { Outlet } from "react-router-dom";
import Map from "../Map/Map";
import { useBookmar } from "../context/BookmarkListContext";

function BookmarLayout() {
  const { bookmarks } = useBookmar();
  return (
    <div className="appLayout">
      <div className="sidebar">
        <Outlet />
      </div>
      <Map markerLocations={bookmarks} />
    </div>
  );
}

export default BookmarLayout;
