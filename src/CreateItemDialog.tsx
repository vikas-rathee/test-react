import React, { useMemo } from "react";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  TextField,
  RadioGroup,
  FormControlLabel,
  Radio,
  Box,
  Grid,
} from "@mui/material";
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

export default function CreateItemDialog() {
  const [open, setOpen] = React.useState(false);

  const colors = useMemo(() => generateRandomColors(12), []);

  const { control, handleSubmit, reset } = useForm<FormValues>({
    defaultValues: {
      name: "",
      description: "",
      color: 1,
      icon: 1,
    },
  });

  const onSubmit = (data: FormValues) => {
    console.log("FORM DATA:", data);
    setOpen(false);
    reset();
  };

  return (
    <>
      <Button variant="contained" onClick={() => setOpen(true)}>
        Open Form
      </Button>

      <Dialog open={open} onClose={() => setOpen(false)} maxWidth="sm" fullWidth>
        <DialogTitle>Create Item</DialogTitle>

        <DialogContent sx={{ mt: 1 }}>
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

          {/* COLOR RADIO GRID */}
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
                  <Grid container spacing={1}>
                    {colors.map((color, index) => {
                      const val = index + 1;
                      const selected = field.value === val;

                      return (
                        <Grid item xs={2} key={val}>
                          <FormControlLabel
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
                                  border: selected ? "2px solid black" : "2px solid transparent",
                                }}
                              >
                                {selected && <CheckIcon sx={{ color: "white", fontSize: 18 }} />}
                              </Box>
                            }
                            sx={{ margin: 0 }}
                          />
                        </Grid>
                      );
                    })}
                  </Grid>
                </RadioGroup>
              )}
            />
          </Box>

          {/* ICON RADIO GRID */}
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
                  <Grid container spacing={1}>
                    {ICONS.map((IconComp, index) => {
                      const val = index + 1;
                      const selected = field.value === val;

                      return (
                        <Grid item xs={2} key={val}>
                          <FormControlLabel
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
                                  border: selected ? "2px solid black" : "2px solid transparent",
                                }}
                              >
                                <IconComp fontSize="small" />

                                {selected && (
                                  <CheckIcon
                                    sx={{
                                      position: "absolute",
                                      color: "green",
                                      fontSize: 16,
                                      top: -4,
                                      right: -4,
                                      background: "white",
                                      borderRadius: "50%",
                                    }}
                                  />
                                )}
                              </Box>
                            }
                            sx={{ margin: 0 }}
                          />
                        </Grid>
                      );
                    })}
                  </Grid>
                </RadioGroup>
              )}
            />
          </Box>
        </DialogContent>

        <DialogActions>
          <Button onClick={() => setOpen(false)}>Cancel</Button>
          <Button variant="contained" onClick={handleSubmit(onSubmit)}>
            Submit
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
}
