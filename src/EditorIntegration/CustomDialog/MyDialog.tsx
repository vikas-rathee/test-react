import { Button, Dialog, DialogActions, DialogTitle } from "@mui/material";
import type { ReactNode } from "react";

type MyDialogPropsType = {
  title: string;
  content: ReactNode;
  open: boolean;
  okAction: () => void;
  okText: string;
  cancelAction?: () => void;
  cancelText?: string;
};

const MyDialog = ({
  title,
  content,
  open,
  okAction,
  okText,
  cancelAction,
  cancelText,
}: MyDialogPropsType) => {
  return (
    <Dialog open={open} maxWidth="xl" fullWidth>
      <DialogTitle>{title}</DialogTitle>
      {content}
      <DialogActions>
        <Button onClick={okAction} variant="contained">
          {okText}
        </Button>
        {cancelAction && (
          <Button onClick={cancelAction} variant="contained" color="warning">
            {cancelText}
          </Button>
        )}
      </DialogActions>
    </Dialog>
  );
};

export default MyDialog;
