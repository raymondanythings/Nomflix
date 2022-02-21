import { useEffect } from "react";
import {
  BrowserRouter as Router,
  Outlet,
  Route,
  Routes,
  useLocation,
} from "react-router-dom";
import Header from "./Components/Header";
import useTitle from "./Hooks/useTitle";
import Home from "./Routes/Home";
import Search from "./Routes/Search";
import Tv from "./Routes/Tv";

function App() {
  return (
    <Router basename={process.env.PUBLIC_URL}>
      <Header />
      <Routes>
        <Route path="" element={<TitleRouter />}>
          <Route path="/tv" element={<Tv />} />
          <Route path="/search" element={<Search />} />
          <Route path="/" element={<Home />} />
          <Route path="/movies/:movieId" element={<Home />} />
          <Route path="/tv/:movieId" element={<Tv />} />
          <Route path="/search/:movieId" element={<Search />} />
        </Route>
      </Routes>
    </Router>
  );
}

export default App;

function TitleRouter() {
  const location = useLocation();
  const setTitle = useTitle("Home");

  useEffect(() => {
    const params = new URLSearchParams(location.search);
    const name = params.get("name");
    if (name) {
      setTitle(name);
    } else if (location.pathname.includes("tv")) {
      setTitle("Tv");
    } else if (location.pathname.includes("search")) {
      const result = params.get("keyword");
      setTitle(`Search for '${result}'`);
    } else {
      setTitle("Movie");
    }
  }, [location, setTitle]);
  return (
    <>
      <Outlet />
    </>
  );
}
