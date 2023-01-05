import * as React from "react";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";

type TypeConfirm = {
  message: string;
  openModal: boolean;
  setOpenModal: (value: boolean) => void;
  setAccept: () => void;
};

export const ModalConfirm = ({
  message,
  openModal,
  setOpenModal,
  setAccept,
}: TypeConfirm) => {
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
        <DialogTitle id="alert-dialog-title">{message}</DialogTitle>
        <DialogActions>
          <Button onClick={setAccept} autoFocus>
            Confirmar
          </Button>
          <Button onClick={handleClose}>Cancelar</Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};
