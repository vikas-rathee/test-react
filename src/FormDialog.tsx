import React from "react";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  IconButton,
  Button,
  Box,
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";

type FormDialogProps = {
  open: boolean;
  title: string;
  onClose: () => void;

  /** form body */
  children: React.ReactNode;

  /** action buttons */
  submitText?: string;
  cancelText?: string;
  onSubmit?: () => void;
  onCancel?: () => void;

  /** loading/disabled optional */
  submitDisabled?: boolean;
};

export default function FormDialog({
  open,
  title,
  onClose,
  children,
  submitText = "Submit",
  cancelText = "Cancel",
  onSubmit,
  onCancel,
  submitDisabled,
}: FormDialogProps) {
  return (
    <Dialog open={open} onClose={onClose} maxWidth="sm" fullWidth>
      {/* TITLE */}
      <DialogTitle sx={{ pb: 1 }}>
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
          }}
        >
          <Box fontWeight={600}>{title}</Box>

          <IconButton size="small" onClick={onClose}>
            <CloseIcon />
          </IconButton>
        </Box>
      </DialogTitle>

      {/* CONTENT */}
      <DialogContent>{children}</DialogContent>

      {/* ACTIONS */}
      <DialogActions sx={{ px: 3, pb: 2 }}>
        <Button onClick={onCancel ?? onClose}>{cancelText}</Button>

        <Button variant="contained" onClick={onSubmit} disabled={submitDisabled}>
          {submitText}
        </Button>
      </DialogActions>
    </Dialog>
  );
}
