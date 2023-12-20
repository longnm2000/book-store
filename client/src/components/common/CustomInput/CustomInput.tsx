import { TextField } from "@mui/material";
import { Controller } from "react-hook-form";

interface CustomInputProps {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  control: any;
  name: string;
  error: boolean;
  helperText: string | undefined;
}

const CustomInput: React.FC<CustomInputProps> = ({
  control,
  name,
  error,
  helperText,
}) => {
  return (
    <Controller
      name={name}
      control={control}
      defaultValue={""}
      render={({ field }) => (
        <TextField
          {...field}
          margin="normal"
          fullWidth
          id={name}
          label={name}
          autoComplete={name}
          error={error}
          helperText={helperText}
          className="capitalize "
        />
      )}
    />
  );
};

export default CustomInput;
