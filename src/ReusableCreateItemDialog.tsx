import React, { useMemo } from "react";
import { Button, TextField, RadioGroup, FormControlLabel, Radio, Box } from "@mui/material";
import CheckIcon from "@mui/icons-material/Check";
import {
  Home,
  Star,
  Favorite,
  Work,
  Pets,
  Build,
  Flight,
  Face,
  Bolt,
  MusicNote,
  ShoppingCart,
  EmojiEvents,
} from "@mui/icons-material";
import { useForm, Controller } from "react-hook-form";
import FormDialog from "./FormDialog";

type FormValues = {
  name: string;
  description: string;
  color: number;
  icon: number;
};

const ICONS = [
  Home,
  Star,
  Favorite,
  Work,
  Pets,
  Build,
  Flight,
  Face,
  Bolt,
  MusicNote,
  ShoppingCart,
  EmojiEvents,
];

function generateRandomColors(count: number) {
  return Array.from({ length: count }, () => `hsl(${Math.floor(Math.random() * 360)},70%,55%)`);
}

export default function ReusableCreateItemDialog() {
  const [open, setOpen] = React.useState(false);
  const colors = useMemo(() => generateRandomColors(12), []);

  const { control, watch, handleSubmit, reset } = useForm<FormValues>({
    defaultValues: {
      name: "",
      description: "",
      color: 1,
      icon: 1,
    },
  });

  const selectedColorIndex = watch("color");
  const selectedIconIndex = watch("icon");

  const selectedColor = colors[selectedColorIndex - 1];
  const SelectedIcon = ICONS[selectedIconIndex - 1];

  const closeDialog = () => {
    setOpen(false);
    reset();
  };

  const onSubmit = (data: FormValues) => {
    console.log("FORM DATA:", data);
    closeDialog();
  };

  return (
    <>
      <Button variant="contained" onClick={() => setOpen(true)}>
        Open Form
      </Button>

      <FormDialog
        open={open}
        title="Create Item"
        onClose={closeDialog}
        submitText="Create"
        cancelText="Cancel"
        onSubmit={handleSubmit(onSubmit)}
      >
        {/* ICON PREVIEW */}
        <Box
          sx={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            mb: 2,
          }}
        >
          <Box
            sx={{
              width: 72,
              height: 72,
              position: "relative",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            {/* background circle */}
            <Box
              sx={{
                position: "absolute",
                inset: 0,
                borderRadius: "50%",
                backgroundColor: selectedColor,
                opacity: 0.3,
              }}
            />

            {/* main icon */}
            <SelectedIcon
              sx={{
                position: "relative",
                fontSize: 36,
                color: selectedColor,
              }}
            />
          </Box>
        </Box>
        {/* NAME */}
        <Controller
          name="name"
          control={control}
          render={({ field }) => <TextField {...field} label="Name" fullWidth margin="normal" />}
        />

        {/* DESCRIPTION */}
        <Controller
          name="description"
          control={control}
          render={({ field }) => (
            <TextField {...field} label="Description" fullWidth margin="normal" />
          )}
        />

        {/* COLOR GRID */}
        <Box mt={2}>
          <Box fontWeight={600} mb={1}>
            Select Color
          </Box>

          <Controller
            name="color"
            control={control}
            render={({ field }) => (
              <RadioGroup
                value={field.value}
                onChange={(e) => field.onChange(Number(e.target.value))}
              >
                <Box
                  sx={{
                    display: "grid",
                    gridTemplateColumns: "repeat(6, 1fr)",
                    gap: 1,
                  }}
                >
                  {colors.map((color, index) => {
                    const val = index + 1;
                    const selected = field.value === val;

                    return (
                      <FormControlLabel
                        key={val}
                        value={val}
                        control={<Radio sx={{ display: "none" }} />}
                        label={
                          <Box
                            sx={{
                              width: "2.5rem",
                              height: "2.5rem",
                              borderRadius: "50%",
                              backgroundColor: color,
                              display: "flex",
                              alignItems: "center",
                              justifyContent: "center",
                              cursor: "pointer",
                            }}
                          >
                            {selected && <CheckIcon sx={{ color: "white", fontSize: 18 }} />}
                          </Box>
                        }
                        sx={{ margin: 0, justifyContent: "center" }}
                      />
                    );
                  })}
                </Box>
              </RadioGroup>
            )}
          />
        </Box>

        {/* ICON GRID */}
        <Box mt={3}>
          <Box fontWeight={600} mb={1}>
            Select Icon
          </Box>

          <Controller
            name="icon"
            control={control}
            render={({ field }) => (
              <RadioGroup
                value={field.value}
                onChange={(e) => field.onChange(Number(e.target.value))}
              >
                <Box
                  sx={{
                    display: "grid",
                    gridTemplateColumns: "repeat(6, 1fr)",
                    gap: 1,
                  }}
                >
                  {ICONS.map((IconComp, index) => {
                    const val = index + 1;
                    const selected = field.value === val;

                    return (
                      <FormControlLabel
                        key={val}
                        value={val}
                        control={<Radio sx={{ display: "none" }} />}
                        label={
                          <Box
                            sx={{
                              width: "2.5rem",
                              height: "2.5rem",
                              borderRadius: "50%",
                              backgroundColor: "#eee",
                              display: "flex",
                              alignItems: "center",
                              justifyContent: "center",
                              cursor: "pointer",
                              position: "relative",
                              overflow: "hidden",
                            }}
                          >
                            <IconComp fontSize="small" />

                            {selected && (
                              <Box
                                sx={{
                                  position: "absolute",
                                  inset: 0,
                                  backgroundColor: "rgba(25,118,210,0.25)",
                                  display: "flex",
                                  alignItems: "center",
                                  justifyContent: "center",
                                }}
                              >
                                <CheckIcon sx={{ color: "#1976d2", fontSize: 20 }} />
                              </Box>
                            )}
                          </Box>
                        }
                        sx={{ margin: 0, justifyContent: "center" }}
                      />
                    );
                  })}
                </Box>
              </RadioGroup>
            )}
          />
        </Box>
      </FormDialog>
    </>
  );
}
