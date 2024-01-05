import { Controller } from "react-hook-form";
import { Form, Input } from "antd";
interface CustomInputProps {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  control: any;
  name: string;
  label: string;
  error: boolean;
  helperText: string | undefined;
  defaultValue: string | number | undefined;
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
        <Form.Item
          label={label}
          help={helperText}
          className={"capitalize"}
          validateStatus={error ? "error" : ""}
        >
          <Input {...field} placeholder={label} />
        </Form.Item>
      )}
    />
  );
};

export default CustomInput;
