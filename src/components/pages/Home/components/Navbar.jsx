import { Stack ,Box} from "@mui/material";

import AddCategory  from "./AddCategory";
import AddVideo from "./AddVideo";
const Navbar = () => (
  <Stack direction="row" alignItems="center" p={2} my={2} sx={{ position: "sticky", background: '#000', top: 0, justifyContent: "space-between" }}>
    <Box sx={{position:"absolute",right:0,display:"flex"}}>
    <AddCategory />
    <AddVideo />
    </Box>
  </Stack>
);

export default Navbar;