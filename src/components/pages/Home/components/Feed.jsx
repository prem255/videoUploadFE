import { useContext, useEffect, useState } from "react";
import { Box, Stack } from "@mui/material";

import { NotFound, Sidebar, Videos } from "./";
import { DataContext } from "../index";
import { callApiFunction } from "../../../../utils/helper";
import { configFile } from "../../../../config";
const { VideoUrl } = configFile;

const Feed = () => {
  const { catData, videoData, setVideoData } = useContext(DataContext);
  const [selectedCategory, setSelectedCategory] = useState("All");
  useEffect(() => {
    (async () => {
      try {
        if (catData) {
          let id = "";
          let url = VideoUrl;
          if (selectedCategory !== "All") {
            id = catData.find((o) => o.name === selectedCategory)._id;
            url = VideoUrl + "/cat/" + id;
          }
          if (url) {
            let res = await callApiFunction(url, {}, "get");
            setVideoData(res.data);
          }
        }
      } catch (err) {}
    })();
  }, [selectedCategory]);
  return (
    <Stack sx={{ flexDirection: { sx: "column", md: "row" } }}>
      <Box
        sx={{
          height: { sx: "auto", md: "92vh" },
          borderRight: "1px solid #3d3d3d",
          px: { sx: 0, md: 2 },
        }}
      >
        <Sidebar
          selectedCategory={selectedCategory}
          setSelectedCategory={setSelectedCategory}
          cat={catData}
        />
      </Box>
      <Box p={2} sx={{ overflowY: "auto", height: "90vh", flex: 2 }}>
        {!catData && !catData.length ? (
          <NotFound />
        ) : (
          <Videos videos={videoData}></Videos>
        )}
      </Box>
    </Stack>
  );
};

export default Feed;
