import * as React from "react";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogTitle from "@mui/material/DialogTitle";
import { Typography } from "@mui/material";
type TypeAlert = {
  message: string;
  openModal: boolean;
  setOpenModal: (value: boolean) => void;
};

export default function ModalSucess({
  message,
  openModal,
  setOpenModal,
}: TypeAlert) {
  const handleClose = () => {
    setOpenModal(false);
  };

  return (
    <div>
      <Dialog
        open={openModal}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle
          id="alert-dialog-title"
          sx={{ padding: "60px 40px 40px 40px" }}
        >
          <Typography
            sx={{ fontSize: "22px", fontWeight: "500", textAlign: "center" }}
          >
            {message}
          </Typography>
        </DialogTitle>
        <DialogActions>
          {" "}
          <Button onClick={handleClose} autoFocus sx={{ width: "100%" }}>
            <Typography sx={{ fontSize: "20px", color: "black" }}>
              OK
            </Typography>
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}
