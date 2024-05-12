import * as React from "react";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Modal from "@mui/material/Modal";
import TextField from "@mui/material/TextField";
import AddIcon from "@mui/icons-material/Add";
import { useForm } from "react-hook-form";
import { callApiFunction } from "../../../../utils/helper";
import { configFile } from "../../../../config";
import { toast } from "react-toastify";
import { DataContext } from "../index";

const { CategoryUrl } = configFile;

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "black",
  boxShadow: 24,
};
const formStyle = {
  display: "flex",
  flexDirection: "column",
  gap: "10px",
};
export default function AddCategory() {
  const { refreshData } = React.useContext(DataContext);
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset
  } = useForm();
  const onSubmit = async (data) => {
    try {
      const response = await callApiFunction(CategoryUrl, data, "post");
      if (response.status >= 400) throw response;
      toast.success("Category Successfully");
      handleClose();
      refreshData();
    } catch (error) {
      if (error.status) {
        toast.error(error?.data?.error || "Something went wrong");
      }
      console.error("Error:", error);
    }
    reset();
  };

  return (
    <>
      <Button
        onClick={handleOpen}
        color="error"
        variant="contained"
        style={{ marginRight: "10px" }}
      >
        <AddIcon />
        Add Category
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
              id="outlined-basic"
              label="Category"
              variant="outlined"
              error
              helperText={errors.name ? "Category name is required" : ""}
              required
              maxRows={1}
              sx={{ input: { color: "white" } }}
              InputLabelProps={{ shrink: true }}
            />
            <TextField
              id="outlined-basic"
              error
              helperText={errors.name ? "Description is required" : ""}
              {...register("description")}
              label="Description"
              variant="outlined"
              sx={{ color: "white" }}
              minRows={5}
              maxRows={5}
              multiline
              required
              inputProps={{ style: { color: "white" } }}
              InputLabelProps={{ shrink: true }}
            />
            <Button type="submit" variant="contained" color="error">
              Submit
            </Button>
          </form>
        </Box>
      </Modal>
    </>
  );
}
