import { Helmet } from "react-helmet";
import HeaderComp from "../../components/header/HeaderComp";
import FooterComp from "../../components/footer/FooterComp";
// import { useForm, Controller } from "react-hook-form";
// import { yupResolver } from "@hookform/resolvers/yup";
// import * as yup from "yup";
// import { Box, Button, Grid, TextField } from "@mui/material";
// import { Link } from "react-router-dom";

// const schema = yup.object().shape({
//   name: yup.string().required("Họ tên không để trống"),
//   phone: yup
//     .string()
//     .matches(/^\d{10}$/, "Số điện thoại phải có 10 chữ số")
//     .required("Vui lòng nhập số điện thoại"),
// });
const UserInfoPage: React.FC = () => {
  //   const {
  //     handleSubmit,
  //     control,
  //     formState: { errors },
  //   } = useForm({
  //     resolver: yupResolver(schema),
  //   });

  //   const onSubmit = (data: object) => {
  //     console.log(data);
  //   };
  return (
    <>
      <Helmet>
        <title>Thông tin cá nhân</title>
      </Helmet>
      <HeaderComp />
      <main className=" bg-slate-50">
        <div className="container mx-auto py-4">
          <div className=" max-w-xl p-4 rounded-lg mx-auto bg-white">
            <h1 className=" font-semibold text-2xl">Thông tin cá nhân</h1>
          </div>
          {/* <Box
            component="form"
            noValidate
            onSubmit={handleSubmit(onSubmit)}
            sx={{ mt: 3 }}
          >
            <Grid container spacing={2}>
              <Grid item xs={12}>
                <Controller
                  name="name"
                  control={control}
                  defaultValue=""
                  render={({ field }) => (
                    <TextField
                      {...field}
                      fullWidth
                      label="Họ Tên"
                      error={!!errors.name}
                      helperText={errors.name?.message}
                    />
                  )}
                />
              </Grid>

              <Grid item xs={12}>
                <Controller
                  name="phone"
                  control={control}
                  defaultValue=""
                  render={({ field }) => (
                    <TextField
                      {...field}
                      fullWidth
                      label="Số điện thoại"
                      error={!!errors.phone}
                      helperText={errors.phone?.message}
                    />
                  )}
                />
              </Grid>
            </Grid>
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
            >
              Lưu
            </Button>
          </Box> */}
        </div>
      </main>
      <FooterComp />
    </>
  );
};
export default UserInfoPage;
