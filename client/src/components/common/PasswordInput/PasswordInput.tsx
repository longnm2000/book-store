import { Controller } from "react-hook-form";
import { Form, Input } from "antd";
import { EyeInvisibleOutlined, EyeTwoTone } from "@ant-design/icons";
interface PasswordInputProps {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  control: any;
  name: string;
  error: boolean;
  helperText: string | undefined;
  label: string;
}

const PasswordInput: React.FC<PasswordInputProps> = ({
  control,
  name,
  error,
  helperText,
  label,
}) => {
  return (
    <Controller
      name={name}
      control={control}
      defaultValue={""}
      render={({ field }) => (
        <Form.Item
          label={label}
          validateStatus={error ? "error" : ""}
          help={helperText}
          className={"capitalize"}
        >
          <Input.Password
            {...field}
            placeholder={label}
            iconRender={(visible) =>
              visible ? <EyeTwoTone /> : <EyeInvisibleOutlined />
            }
          />
        </Form.Item>
      )}
    />
  );
};

export default PasswordInput;
