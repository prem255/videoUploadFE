import { Navbar, Feed } from "./components";
import { createContext, useState, useEffect } from "react";
import { configFile } from "../../../config";
import { callApiFunction } from "../../../utils/helper";

const { CategoryUrl, VideoUrl } = configFile;
export const DataContext = createContext();
function Home() {
  const [catData, setCatData] = useState([]);
  const [videoData, setVideoData] = useState([]);

  const fetchData = async () => {
    const data = await callApiFunction(CategoryUrl, {}, "get");
    const videoData = await callApiFunction(VideoUrl, {}, "get");
    setCatData(data.data);
    setVideoData(videoData.data);
  };

  useEffect(() => {
    fetchData(); // Initial fetch when component mounts
  }, []);

  // Function to refresh data
  const refreshData = async () => {
    fetchData();
  };

  return (
    <>
      <DataContext.Provider
        value={{ catData, setCatData, videoData, setVideoData, refreshData }}
      >
        <Navbar />
        <Feed />
      </DataContext.Provider>
    </>
  );
}

export default Home;
