import { DemoContainer } from "@mui/x-date-pickers/internals/demo";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DesktopDatePicker } from "@mui/x-date-pickers/DesktopDatePicker";
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

// 2) New: wrap PickersLayout in a div that applies our zinc-700 + white text rules
const StyledWrapper = styled("div")({
  backgroundColor: "#3f3f46", // zinc-700
  borderRadius: "8px",
  padding: "8px",

  // Make the calendar surface also zinc-700
  "& .MuiDateCalendar-root": {
    backgroundColor: "#3f3f46",
  },

  // Month/Year header and dropdown arrow
  "& .MuiPickersCalendarHeader-root, & .MuiPickersCalendarHeader-label": {
    color: "#ffffff",
  },

  // Day-of-week labels: S, M, T, W, T, F, S
  "& .MuiDayCalendar-weekDayLabel": {
    color: "#ffffff",
  },

  // Date cells (1, 2, 3, …)
  "& .MuiPickersDay-root": {
    color: "#ffffff",
  },

  // Navigation arrows (prev/next month)
  "& .MuiSvgIcon-root": {
    color: "#ffffff",
  },
});

// 3) A correctly-typed layout slot component
function CustomLayout(props: PickersLayoutProps<any>) {
  return (
    <StyledWrapper>
      <PickersLayout {...props} />
    </StyledWrapper>
  );
}

export default function BasicDatePicker({ value, onChange }: DatePickerProps) {
  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <Box
        sx={{
          width: "100%",
          minWidth: 0,
        }}
      >
        <DemoContainer components={["DatePicker"]}>
          <DesktopDatePicker
            value={value ? dayjs(value) : null}
            onChange={(newVal: Dayjs | null) =>
              onChange(newVal ? newVal.toDate() : null)
            }
            label=""
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
            }}
          />
        </DemoContainer>
      </Box>
    </LocalizationProvider>
  );
}
