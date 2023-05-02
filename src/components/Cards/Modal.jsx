import * as React from "react";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";
import { Stack } from "@mui/material";
import { useNavigate } from "react-router-dom";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "background.paper",
  borderRadius: "10px ",
  boxShadow: 24,
  p: 4,
};

export default function BasicModal({ isOpen, setIsOpen }) {
  const handleClose = () => setIsOpen(false);
  const navigate = useNavigate();

  return (
    <div>
      <Modal
        open={isOpen}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <Typography id="modal-modal-description">
            User must SignIn to Continue to place order.
          </Typography>

          <Stack spacing={2} direction="row" marginTop={2} alignItems="end">
            <Button
              variant="contained"
              color="primary"
              onClick={() => {
                navigate("/login");
              }}
              className="SignIn-btn"
            >
              Go To SignIn
            </Button>
            <Button variant="contained" onClick={() => setIsOpen(false)}>
              Cancel
            </Button>
          </Stack>
        </Box>
      </Modal>
    </div>
  );
}
