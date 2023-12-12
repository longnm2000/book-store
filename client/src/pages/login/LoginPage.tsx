import { Box, Button, Grid, Link, TextField } from "@mui/material";
import * as yup from "yup";
import { useForm, Controller } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import FooterComp from "../../components/footer/FooterComp";
const schema = yup.object().shape({
  email: yup
    .string()
    .required("Email không được để trống")
    .matches(/^[a-z0-9]+@[a-z]+\.[a-z]{2,3}$/, "Email không hợp lệ")
    .max(50, "Email không dài quá 50 ký tự"),
  password: yup
    .string()
    .min(8, "Mật khẩu phải có ít nhất 8 ký tự")
    .max(50, "Mật khẩu không quá 50 ký tự")
    .required("Vui lòng nhập mật khẩu"),
});

const LoginPage: React.FC = () => {
  const {
    handleSubmit,
    control,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
  });

  const onSubmit = async (data: object) => {
    console.log(data);
  };
  return (
    <>
      <div className="sm:py-20  mx-auto bg-no-repeat bg-center bg-cover bg-[url('https://marketplace.canva.com/EAD2962NKnQ/2/0/1600w/canva-rainbow-gradient-pink-and-purple-virtual-background-_Tcjok-d9b4.jpg')]">
        <div className=" w-fit mx-auto p-2 md:p-4 md:rounded-lg bg-white shadow-xl">
          <Box
            onSubmit={handleSubmit(onSubmit)}
            component="form"
            className=" max-w-md mx-auto"
          >
            <h1 className=" font-semibold text-3xl text-center mb-3">
              Đăng Nhập
            </h1>
            <Controller
              name="email"
              control={control}
              defaultValue=""
              render={({ field }) => (
                <TextField
                  {...field}
                  margin="normal"
                  required
                  fullWidth
                  id="email"
                  label="Email"
                  name="email"
                  autoComplete="email"
                  autoFocus
                  error={!!errors.email}
                  helperText={errors.email?.message}
                />
              )}
            />
            <Controller
              name="password"
              control={control}
              defaultValue=""
              render={({ field }) => (
                <TextField
                  {...field}
                  margin="normal"
                  required
                  fullWidth
                  name="password"
                  label="Mật khẩu"
                  type="password"
                  id="password"
                  autoComplete="current-password"
                  error={!!errors.password}
                  helperText={errors.password?.message}
                />
              )}
            />

            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
            >
              Đăng nhập
            </Button>
            <Grid container>
              <Grid item xs>
                <Link href="#" variant="body2">
                  Quên mật khẩu
                </Link>
              </Grid>
              <Grid item>
                <Link href="#" variant="body2">
                  Không có tài khoản? Đăng ký
                </Link>
              </Grid>
            </Grid>
          </Box>
          <div className=" max-w-md mx-auto">
            <p className="mt-3">Hoặc đăng nhập bằng</p>
            <Button fullWidth variant="outlined" sx={{ mt: 3, mb: 2 }}>
              Facebook
            </Button>
          </div>
        </div>
      </div>
      <FooterComp />
    </>
  );
};
export default LoginPage;
