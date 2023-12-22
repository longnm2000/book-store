import {
  FormControl,
  FormHelperText,
  InputLabel,
  OutlinedInput,
} from "@mui/material";
import { Controller } from "react-hook-form";

interface CustomInputProps {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  control: any;
  name: string;
  label: string;
  error: boolean;
  helperText: string | undefined;
  defaultValue: string | undefined;
}

const CustomInput: React.FC<CustomInputProps> = ({
  control,
  name,
  label,
  error,
  helperText,
  defaultValue,
}) => {
  return (
    <Controller
      name={name}
      control={control}
      defaultValue={defaultValue}
      render={({ field }) => (
        <FormControl variant="outlined" fullWidth sx={{ mt: 3 }}>
          <InputLabel size="small" error={error} className="capitalize">
            {label}
          </InputLabel>
          <OutlinedInput
            {...field}
            size="small"
            error={error}
            id={name}
            type={"text"}
            label={label}
            className="capitalize rounded-lg"
          />
          <FormHelperText error id={`${name}-helper-text`}>
            {helperText}
          </FormHelperText>
        </FormControl>
      )}
    />
  );
};

export default CustomInput;
