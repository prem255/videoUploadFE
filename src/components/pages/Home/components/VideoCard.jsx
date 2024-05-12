import React from "react";
import {
  Typography,
  Card,
  CardContent,
  CardMedia,
} from "@mui/material";

import { demoThumbnailUrl, demoVideoTitle } from "../../../../utils/constants";

const VideoCard = ({ video }) => {
  return (
    <Card
      sx={{
        width: { xs: "100%", sm: "358px", md: "320px" },
        boxShadow: "none",
        borderRadius: 0,
      }}
      // onClick={setOpen(true)}
    >
      <CardMedia
        image={video.thumbnailUrl || demoThumbnailUrl}
        alt={video?.name}
        sx={{ width: { xs: "100%", sm: "358px" }, height: 180 }}
      />
      {/* </Link> */}
      <CardContent sx={{ backgroundColor: "#1E1E1E", height: "20px" }}>
        <Typography variant="subtitle1" fontWeight="bold" color="#FFF">
          {video?.name.slice(0, 60) || demoVideoTitle.slice(0, 60)}
        </Typography>

      </CardContent>
    </Card>
  );
};

export default VideoCard;
