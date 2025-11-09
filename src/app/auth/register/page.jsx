"use client";
import Image from "next/image";
import Link from "next/link";
import React, { useState } from "react";
import * as yup from "yup";
import { useFormik } from "formik";
import { toast } from "react-toastify";
import { useRouter } from "next/navigation";
import Header from "@/components/header/Header";
import Heading from "@/components/Heading";
import { authService } from "@/api/authService";
import { useTheme } from "next-themes";

const page = () => {
  const router = useRouter();

  const [showPass, setShowPass] = useState(false);
  const { theme } = useTheme();

  const schema = yup.object().shape({
    name: yup.string().required("Vui lòng nhập tên!"),
    email: yup.string().email("Email không hợp lệ!").required("Vui lòng nhập Email!"),
    phonenumber: yup.string().required("Vui lòng nhập số điện thoại!"),
    gender: yup.string().required("Vui lòng chọn giới tính!"),
    password: yup.string().min(6, "Mật khẩu phải có ít nhất 6 ký tự!").required("Vui lòng nhập mật khẩu!"),
    confirmPassword: yup
      .string()
      .min(6, "Nhập lại mật khẩu phải có ít nhất 6 ký tự!")
      .oneOf([yup.ref("password"), null], "Mật khẩu nhập lại không khớp!")
      .required("Vui lòng nhập lại mật khẩu!"),
  });

  const formik = useFormik({
    initialValues: {
      name: "",
      email: "",
      phonenumber: "",
      gender: "",
      password: "",
      confirmPassword: "",
    },
    validationSchema: schema,
    onSubmit: async (values) => {
      try {
        await authService.register(values);
        toast.success("Đăng ký thành công!");
        formik.resetForm();
        router.push("/auth/login");
      } catch (error) {
        toast.error(error.response.data.message);
      }
    },
  });

  return (
    <div className='bg-[#fff] dark:bg-gray-900 dark:text-gray-100 md:bg-[#f9f9f9] md:pt-[110px] transition-colors duration-300'>
      <Heading title='Đăng ký' description='' keywords='' />
      <div className='hidden md:block'>
        <Header />
      </div>

      <div className='bg-[#fff] dark:bg-gray-800 dark:border-gray-700 dark:shadow-gray-700/30 lg:w-[60%] md:w-[90%] md:mx-auto md:border md:border-[#a3a3a3a3] md:border-solid md:rounded-[10px] md:shadow-[rgba(0,0,0,0.24)_0px_3px_8px] md:overflow-hidden transition-colors duration-300'>
        <div className='flex flex-col items-center py-[30px] h-screen md:h-full'>
          <h3 className='text-[#4A4B4D] dark:text-gray-100 text-[30px] font-bold pb-[20px]'>Đăng ký</h3>
          <Image src='/assets/logo_app.png' alt='' height={150} width={150} className='mb-[10px]' />

          <form onSubmit={formik.handleSubmit} className='flex flex-col items-center w-full'>
            {/* Name */}
            <div className='w-[90%] my-[10px]'>
              <div
                className={`relative flex items-center bg-[#f5f5f5] dark:bg-gray-700 text-[#636464] dark:text-gray-100 rounded-[12px] gap-[8px] border border-solid overflow-hidden ${
                  formik.touched.name && formik.errors.name ? "border-red-500" : "border-[#7a7a7a] dark:border-gray-600"
                }`}
              >
                <div className='relative w-[25px] h-[25px] ml-[20px]'>
                  <Image
                    src={`/assets/account${theme === "dark" ? "_white" : ""}.png`}
                    alt=''
                    layout='fill'
                    loading='lazy'
                  />
                </div>
                <input
                  type='text'
                  name='name'
                  value={formik.values.name}
                  onChange={formik.handleChange("name")}
                  onBlur={formik.handleBlur("name")}
                  placeholder='Nhập tên'
                  className='bg-transparent text-[18px] py-[20px] pr-[20px] pl-[10px] w-full focus:outline-none'
                />
              </div>
              {formik.touched.name && formik.errors.name && (
                <div className='text-red-500 text-sm mt-[5px] ml-[20px]'>{formik.errors.name}</div>
              )}
            </div>

            {/* Email */}
            <div className='w-[90%] my-[10px]'>
              <div
                className={`relative flex items-center bg-[#f5f5f5] dark:bg-gray-700 text-[#636464] dark:text-gray-100 rounded-[12px] gap-[8px] border border-solid overflow-hidden ${
                  formik.touched.email && formik.errors.email
                    ? "border-red-500"
                    : "border-[#7a7a7a] dark:border-gray-600"
                }`}
              >
                <div className='relative w-[25px] h-[25px] ml-[20px]'>
                  <Image
                    src={`/assets/email${theme === "dark" ? "_white" : ""}.png`}
                    alt=''
                    layout='fill'
                    loading='lazy'
                  />
                </div>
                <input
                  type='email'
                  name='email'
                  value={formik.values.email}
                  onChange={formik.handleChange("email")}
                  onBlur={formik.handleBlur("email")}
                  placeholder='Nhập email của bạn'
                  className='bg-transparent text-[18px] py-[20px] pr-[20px] pl-[10px] w-full focus:outline-none'
                />
              </div>
              {formik.touched.email && formik.errors.email && (
                <div className='text-red-500 text-sm mt-[5px] ml-[20px]'>{formik.errors.email}</div>
              )}
            </div>

            {/* Phone */}
            <div className='w-[90%] my-[10px]'>
              <div
                className={`relative flex items-center bg-[#f5f5f5] dark:bg-gray-700 text-[#636464] dark:text-gray-100 rounded-[12px] gap-[8px] border border-solid overflow-hidden ${
                  formik.touched.phonenumber && formik.errors.phonenumber
                    ? "border-red-500"
                    : "border-[#7a7a7a] dark:border-gray-600"
                }`}
              >
                <div className='relative w-[25px] h-[25px] ml-[20px]'>
                  <Image
                    src={`/assets/phone${theme === "dark" ? "_white" : ""}.png`}
                    alt=''
                    layout='fill'
                    loading='lazy'
                  />
                </div>
                <input
                  type='text'
                  name='phonenumber'
                  value={formik.values.phonenumber}
                  onChange={formik.handleChange("phonenumber")}
                  onBlur={formik.handleBlur("phonenumber")}
                  placeholder='Nhập số điện thoại'
                  className='bg-transparent text-[18px] py-[20px] pr-[20px] pl-[10px] w-full focus:outline-none'
                />
              </div>
              {formik.touched.phonenumber && formik.errors.phonenumber && (
                <div className='text-red-500 text-sm mt-[5px] ml-[20px]'>{formik.errors.phonenumber}</div>
              )}
            </div>

            {/* Password */}
            <div className='w-[90%] my-[10px]'>
              <div
                className={`relative flex items-center bg-[#f5f5f5] dark:bg-gray-700 text-[#636464] dark:text-gray-100 rounded-[12px] gap-[8px] border border-solid overflow-hidden ${
                  formik.touched.password && formik.errors.password
                    ? "border-red-500"
                    : "border-[#7a7a7a] dark:border-gray-600"
                }`}
              >
                <div className='relative w-[25px] h-[25px] ml-[20px]'>
                  <Image
                    src={`/assets/lock${theme === "dark" ? "_white" : ""}.png`}
                    alt=''
                    layout='fill'
                    loading='lazy'
                  />
                </div>
                <input
                  type={showPass ? "text" : "password"}
                  name='password'
                  value={formik.values.password}
                  onChange={formik.handleChange("password")}
                  onBlur={formik.handleBlur("password")}
                  placeholder='Nhập mật khẩu của bạn'
                  className='bg-transparent text-[18px] py-[20px] pr-[20px] pl-[10px] w-full focus:outline-none'
                />
                <Image
                  src={
                    showPass
                      ? `/assets/eye_show${theme === "dark" ? "_white" : ""}.png`
                      : `/assets/eye_hide${theme === "dark" ? "_white" : ""}.png`
                  }
                  alt=''
                  width={25}
                  height={25}
                  className='absolute top-[50%] right-[5%] translate-y-[-50%] cursor-pointer'
                  onClick={() => setShowPass(!showPass)}
                />
              </div>
              {formik.touched.password && formik.errors.password && (
                <div className='text-red-500 text-sm mt-[5px] ml-[20px]'>{formik.errors.password}</div>
              )}
            </div>

            {/* Submit Button */}
            <button
              type='submit'
              className={`text-center text-[#fff] font-semibold w-[90%] p-[20px] rounded-full my-[10px] shadow-md hover:shadow-lg transition-all ${
                formik.isValid && formik.dirty ? "bg-[#fc6011] cursor-pointer" : "bg-[#f5854d] cursor-not-allowed"
              }`}
            >
              Đăng ký
            </button>
          </form>

          <p className='text-[#636464] dark:text-gray-300 font-semibold my-[10px]'>
            Đã có tài khoản{" "}
            <Link href='/auth/login' className='text-[#fc6011] dark:text-orange-400 cursor-pointer'>
              Đăng nhập
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default page;
