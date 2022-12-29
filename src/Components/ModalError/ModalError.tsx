import * as React from "react";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import { Typography } from "@mui/material";
type TypeAlert = {
  message: string;
  openModal: boolean;
  setOpenModal: (value: boolean) => void;
};

export default function AlertDialog({
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
        <Button
          onClick={handleClose}
          autoFocus
          sx={{ position: "fixed", marginLeft: "340px" }}
        >
         <Typography sx={{ fontSize: "20px",color:"black" }}>
          X
          </Typography>
        </Button>
        <DialogTitle id="alert-dialog-title" sx={{ padding: "60px 40px 40px 40px" }}>
          <Typography sx={{ fontSize: "22px", fontWeight: "500" }}>
            {message}
          </Typography>
        </DialogTitle>
        <DialogActions></DialogActions>
      </Dialog>
    </div>
  );
}
