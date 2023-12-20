import {
  FormControl,
  FormHelperText,
  InputLabel,
  OutlinedInput,
  IconButton,
  InputAdornment,
} from "@mui/material";
import { Controller } from "react-hook-form";
import { useState } from "react";
import { Visibility, VisibilityOff } from "@mui/icons-material";

interface PasswordInputProps {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  control: any;
  name: string;
  error: boolean;
  helperText: string | undefined;
}

const PasswordInput: React.FC<PasswordInputProps> = ({
  control,
  name,
  error,
  helperText,
}) => {
  const [showPassword, setShowPassword] = useState(false);

  const handleClickShowPassword = () => setShowPassword((show) => !show);

  const handleMouseDownPassword = (
    event: React.MouseEvent<HTMLButtonElement>
  ) => {
    event.preventDefault();
  };

  return (
    <Controller
      name={name}
      control={control}
      defaultValue={""}
      render={({ field }) => (
        <FormControl variant="outlined" fullWidth sx={{ mt: 2 }}>
          <InputLabel error={error}>Mật khẩu</InputLabel>
          <OutlinedInput
            {...field}
            error={error}
            id={name}
            type={showPassword ? "text" : "password"}
            autoComplete="current-password"
            endAdornment={
              <InputAdornment position="end">
                <IconButton
                  aria-label="toggle password visibility"
                  onClick={handleClickShowPassword}
                  onMouseDown={handleMouseDownPassword}
                  edge="end"
                >
                  {showPassword ? <Visibility /> : <VisibilityOff />}
                </IconButton>
              </InputAdornment>
            }
            label="Password"
          />
          <FormHelperText error id={`${name}-helper-text`}>
            {helperText}
          </FormHelperText>
        </FormControl>
      )}
    />
  );
};

export default PasswordInput;
