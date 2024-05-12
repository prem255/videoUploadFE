import React from "react";
import { useForm } from "react-hook-form";
import { toast } from "react-toastify";

import { TextField, Box, Modal, Button, Autocomplete } from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import CloudUploadIcon from "@mui/icons-material/CloudUpload";
import { styled } from "@mui/material/styles";
import axios from "axios";
import { configFile } from "../../../../config";
import { DataContext } from "../index";
const { VideoUrl } = configFile;

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  background: "black",
  width: 400,
  boxShadow: 24,
  p: 4,
};
const formStyle = {
  display: "flex",
  flexDirection: "column",
  gap: "10px",
  p: 4,
};
const VisuallyHiddenInput = styled("input")({
  clip: "rect(0 0 0 0)",
  clipPath: "inset(50%)",
  height: 1,
  overflow: "hidden",
  position: "absolute",
  bottom: 0,
  left: 0,
  whiteSpace: "nowrap",
  background: "red",
  width: 1,
});

const AddVideo = () => {
  const { catData,refreshData } = React.useContext(DataContext);
  let catData1 = [];
  if (catData && catData.length)
    catData1 = catData.map((i) => {
      i.label = i.name;
      return i;
    });
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const { register, handleSubmit,reset} = useForm();
  // const onSubmit = (data) => console.log(data);
  const onSubmit = async (data) => {
    try {
      const formData = new FormData();
      let catVal = catData.find((o) => o.name === data.category);
      if (catVal) {
        data.categoryId = catVal._id;
        delete data.category;
      }
      formData.append("video", data.video[0]);
      Object.keys(data).forEach((key) => {
        if (key !== "video") {
          formData.append(key, data[key]);
        }
      });

      const response = await axios.post(VideoUrl, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
      if (response) toast.success("Video uploaded");
      refreshData();
      if(response.status>399) throw response
    } catch (error) {
      console.log(error);
      toast.error("Something went wrong");
    } finally {
      handleClose();
      reset();
    }
  };

  return (
    <>
      <Button
        onClick={handleOpen}
        color="error"
        variant="contained"
        style={{ marginRight: "10px" }}
      >
        <AddIcon /> Add Video
      </Button>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <form onSubmit={handleSubmit(onSubmit)} style={formStyle}>
            <TextField
              {...register("name", {
                pattern: /^[A-Za-z]+$/i,
              })}
              label="Name"
              variant="outlined"
              error
              maxRows={1}
              required
              sx={{ input: { color: "white" } }}
              InputLabelProps={{ shrink: true }}
            />
            <TextField
              {...register("description", {
                maxLength: {
                  value: 200,
                  message: "Description cannot be longer than 200 characters",
                },
              })}
              label="Description"
              variant="outlined"
              error
              minRows={5}
              maxRows={5}
              multiline
              required
              inputProps={{ style: { color: "white" } }}
              InputLabelProps={{ shrink: true }}
            />
            <TextField
              {...register("thumbnailUrl")}
              label="Thumbnail"
              variant="outlined"
              error
              maxRows={1}
              required
              sx={{ input: { color: "white" } }}
              InputLabelProps={{ shrink: true }}
            />
            <Autocomplete
              disablePortal
              id="combo-box-demo"
              options={catData1}
              renderInput={(params) => (
                <TextField
                  {...params}
                  {...register("categoryId")}
                  variant="outlined"
                  error
                  label="Category"
                  required
                  sx={{ input: { color: "white" } }}
                  InputLabelProps={{ shrink: true }}
                />
              )}
            />
            <Button
              component="label"
              role={undefined}
              variant="contained"
              tabIndex={-1}
              color="error"
              startIcon={<CloudUploadIcon />}
            >
              Upload file
              <VisuallyHiddenInput
                {...register("video")}
                type="file"
                required
                accept="video/mp4,video/x-m4v,video/*"
              />
            </Button>
            <Button type="submit" variant="contained" color="error">
              Submit
            </Button>
          </form>
        </Box>
      </Modal>
    </>
  );
};
export default AddVideo;
