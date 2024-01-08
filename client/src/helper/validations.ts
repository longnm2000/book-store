import * as yup from "yup";

export const nameValidation = yup
  .string()
  .required("Họ tên không để trống")
  .max(50, "Họ tên không dài quá 50 ký tự");

export const emailValidation = yup
  .string()
  .required("Email không được để trống")
  .matches(/^[a-z0-9]+@[a-z]+\.[a-z]{2,3}$/, "Email không hợp lệ")
  .max(50, "Email không dài quá 50 ký tự");

export const passwordValidation = yup
  .string()
  .min(8, "Mật khẩu phải có ít nhất 8 ký tự")
  .max(50, "Mật khẩu không quá 50 ký tự")
  .required("Mật khẩu không để trống");

export const phoneValidation = yup
  .string()
  .matches(/^\d{10}$/, "Số điện thoại phải có 10 chữ số")
  .required("Vui lòng nhập số điện thoại");
