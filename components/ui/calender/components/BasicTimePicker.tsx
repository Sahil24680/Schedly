import * as React from "react";
import { DesktopTimePicker } from "@mui/x-date-pickers/DesktopTimePicker";
import { DemoContainer } from "@mui/x-date-pickers/internals/demo";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { PickersTextField } from "@mui/x-date-pickers/PickersTextField";
import {
  PickersLayout,
  PickersLayoutProps,
} from "@mui/x-date-pickers/PickersLayout";
import { styled } from "@mui/material/styles";
import Box from "@mui/material/Box";
import dayjs, { Dayjs } from "dayjs";

type DatePickerProps = {
  value: Date | null;
  onChange: (val: Date | null) => void;
};

const StyledPickersTextField = styled(PickersTextField)({
  width: "100%",
  color: "#71717a",
  borderRadius: "6px",
  borderWidth: "1px",
  borderColor: "#71717a",
  border: "1px solid",
  backgroundColor: "transparent",
});

const StyledWrapper = styled("div")({
  backgroundColor: "#3f3f46", 
  borderRadius: 6,
  padding: 8,
  "& .MuiClock-root": {
    backgroundColor: "#3f3f46",
  },
  "& .MuiClockNumber-root": {
    color: "#fff",
  },
  "& .MuiClock-pin, & .MuiClockPointer-thumb": {
    backgroundColor: "#fff",
  },
  "& .MuiSvgIcon-root": {
    color: "#fff",
  },
});

function CustomLayout(props: PickersLayoutProps<any>) {
  return (
    <StyledWrapper>
      <PickersLayout {...props} />
    </StyledWrapper>
  );
}

export default function ({ value, onChange }: DatePickerProps) {
  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <Box sx={{ width: "100%", minWidth: 0 }}>
        <DemoContainer components={["DesktopTimePicker"]}>
          <DesktopTimePicker
            label=""
            value={value ? dayjs(value) : null}
            onChange={(newVal: Dayjs | null) =>
              onChange(newVal ? newVal.toDate() : null)
            }
            slots={{
              textField: StyledPickersTextField,
              layout: CustomLayout,
            }}
            slotProps={{
              textField: {
                fullWidth: true,
                InputProps: {
                  style: {
                    color: "white",
                    backgroundColor: "transparent",
                  },
                },
                InputLabelProps: {
                  style: { color: "#d4d4d8" },
                },
                sx: {
                  "& .MuiInputAdornment-root svg": {
                    color: "#ffffff",
                  },
                },
              },
              digitalClockItem: {
                sx: {
                  color: "#fff",
                  "&.Mui-selected": {
                    backgroundColor: "transparent !important",
                  },
                },
              },
              digitalClockSectionItem: {
                sx: {
                  color: "#fff",
                  "&.Mui-selected": {
                    backgroundColor: "transparent !important",
                  },
                },
              },
            }}
          />
        </DemoContainer>
      </Box>
    </LocalizationProvider>
  );
}
