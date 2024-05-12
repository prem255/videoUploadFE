import React from "react";
import { Stack, Box, Modal, Button } from "@mui/material";
import { configFile } from "../../../../config";
import { Loader, NotFound, VideoCard } from "./";
const { VideoUrl } = configFile;
const boxStyle = {
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  position: "fixed",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: "300px",
  height: "200px",
  flowDirection: "row",
  gap: 5,
  boxShadow: "0px 4px 8px rgba(0, 0, 0, 0.1)",
  borderRadius: "8px",
};
function OpenVideoPopUp({ open, setOpen, url }) {

  return (
    <Modal
      open={open}
      onClose={() => setOpen(false)}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
    >
      <Box sx={boxStyle}>
        <video width="640" height="360" controls>
          <source src={VideoUrl + "/" + url} type="video/mp4" />
          Your browser does not support the video tag.
        </video>
        <Button
          onClick={() => setOpen(false)}
          color="error"
          variant="contained"
        >
          Close
        </Button>
      </Box>
    </Modal>
  );
}
const Videos = ({ videos, direction }) => {
  const [open, setOpen] = React.useState(false);
  const [url, setUrl] = React.useState("");

  if (!videos?.length) return <NotFound />;

  const handleCardClick = (index) => {
    setOpen(true);
    setUrl(index);
  };

  return (
    <Stack
      direction={direction || "row"}
      flexWrap="wrap"
      justifyContent="start"
      alignItems="start"
      gap={3}
    >
      <OpenVideoPopUp open={open} setOpen={setOpen} url={url} />
      {videos.map((item, idx) => (
        <Box key={idx} onClick={() => handleCardClick(item.videoUrl)}>
          <VideoCard video={item} />
        </Box>
      ))}
    </Stack>
  );
};

export default Videos;
