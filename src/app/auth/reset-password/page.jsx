"use client";
import Image from "next/image";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import * as yup from "yup";
import { useFormik } from "formik";
import { toast } from "react-toastify";
import { useRouter } from "next/navigation";
import Header from "@/components/header/Header";
import Heading from "@/components/Heading";
import { authService } from "@/api/authService";
import { useForgotPassEmail } from "@/context/forgotPassEmailContext";

const page = () => {
  const router = useRouter();

  const [showPass, setShowPass] = useState(false);

  const { email } = useForgotPassEmail();

  useEffect(() => {
    if (email.length === 0) {
      router.push("/auth/forgot-password");
    }
  }, [email]);

  const schema = yup.object().shape({
    newPassword: yup.string().min(6, "Mật khẩu phải có ít nhất 6 ký tự!").required("Vui lòng nhập mật khẩu!"),
    confirmPassword: yup
      .string()
      .min(6, "Nhập lại mật khẩu phải có ít nhất 6 ký tự!")
      .oneOf([yup.ref("newPassword"), null], "Mật khẩu nhập lại không khớp!")
      .required("Vui lòng nhập lại mật khẩu!"),
  });

  const formik = useFormik({
    initialValues: {
      newPassword: "",
      confirmPassword: "",
    },
    validationSchema: schema,
    onSubmit: async (values) => {
      try {
        await authService.resetPassword({ email, newPassword: values.newPassword });
        formik.resetForm();

        toast.success("Cập nhật thành công!");
        router.push("/auth/login");
      } catch (error) {
        toast.error(error.response.data.message);
      }
    },
  });

  return (
    <div className='bg-[#fff] dark:bg-gray-900 dark:text-gray-100 md:bg-[#f9f9f9] md:pt-[110px]'>
      <Heading title='Lấy lại mật khẩu' description='' keywords='' />
      <div className='hidden md:block'>
        <Header />
      </div>

      <div className='bg-[#fff] dark:bg-gray-800 lg:w-[60%] md:w-[90%] md:mx-auto md:border md:border-[#a3a3a3a3] dark:md:border-gray-700 md:border-solid md:rounded-[10px] md:shadow-[rgba(0,0,0,0.24)_0px_3px_8px] dark:md:shadow-[rgba(255,255,255,0.05)_0px_3px_8px] md:overflow-hidden'>
        <div className='flex flex-col items-center justify-between py-[30px] h-screen'>
          <div className='flex flex-col items-center w-full'>
            <h3 className='text-[#4A4B4D] dark:text-gray-100 text-[30px] font-bold pb-[20px]'>Mật khẩu mới</h3>
            <Image src='/assets/logo_app.png' alt='' height={150} width={150} className='mb-[10px]' />

            <form onSubmit={formik.handleSubmit} className='flex flex-col items-center w-full'>
              {/* 🔑 Mật khẩu mới */}
              <div className='w-[90%] my-[10px]'>
                <div
                  className={`relative flex items-center bg-[#f5f5f5] dark:bg-gray-700 text-[#636464] dark:text-gray-100 rounded-[12px] gap-[8px] border border-solid overflow-hidden ${
                    formik.touched.newPassword && formik.errors.newPassword
                      ? "border-red-500"
                      : "border-[#7a7a7a] dark:border-gray-600"
                  }`}
                >
                  <div className='relative w-[25px] h-[25px] ml-[20px]'>
                    <Image src='/assets/lock.png' alt='' layout='fill' loading='lazy' />
                  </div>
                  <input
                    type={showPass ? "text" : "password"}
                    value={formik.values.newPassword}
                    onChange={formik.handleChange("newPassword")}
                    onBlur={formik.handleBlur("newPassword")}
                    placeholder='Nhập mật khẩu mới'
                    className='bg-[#f5f5f5] dark:bg-gray-700 text-[18px] py-[20px] pr-[20px] pl-[10px] w-full placeholder-gray-500 dark:placeholder-gray-300 focus:outline-none'
                  />
                  <Image
                    src={showPass ? "/assets/eye_show.png" : "/assets/eye_hide.png"}
                    alt=''
                    width={25}
                    height={25}
                    className='absolute top-[50%] right-[25px] translate-y-[-50%] cursor-pointer'
                    onClick={() => setShowPass(!showPass)}
                  />
                </div>
                {formik.touched.newPassword && formik.errors.newPassword && (
                  <div className='text-red-500 text-sm mt-[5px] ml-[20px]'>{formik.errors.newPassword}</div>
                )}
              </div>

              {/* 🔁 Nhập lại mật khẩu */}
              <div className='w-[90%] my-[10px]'>
                <div
                  className={`relative flex items-center bg-[#f5f5f5] dark:bg-gray-700 text-[#636464] dark:text-gray-100 rounded-[12px] gap-[8px] border border-solid overflow-hidden ${
                    formik.touched.confirmPassword && formik.errors.confirmPassword
                      ? "border-red-500"
                      : "border-[#7a7a7a] dark:border-gray-600"
                  }`}
                >
                  <div className='relative w-[25px] h-[25px] ml-[20px]'>
                    <Image src='/assets/lock.png' alt='' layout='fill' loading='lazy' />
                  </div>
                  <input
                    type={showPass ? "text" : "password"}
                    name='confirmPassword'
                    value={formik.values.confirmPassword}
                    onChange={formik.handleChange("confirmPassword")}
                    onBlur={formik.handleBlur("confirmPassword")}
                    placeholder='Nhập lại mật khẩu'
                    className='bg-[#f5f5f5] dark:bg-gray-700 text-[18px] py-[20px] pr-[20px] pl-[10px] w-full placeholder-gray-500 dark:placeholder-gray-300 focus:outline-none'
                  />
                  <Image
                    src={showPass ? "/assets/eye_show.png" : "/assets/eye_hide.png"}
                    alt=''
                    width={25}
                    height={25}
                    className='absolute top-[50%] right-[25px] translate-y-[-50%] cursor-pointer'
                    onClick={() => setShowPass(!showPass)}
                  />
                </div>
                {formik.touched.confirmPassword && formik.errors.confirmPassword && (
                  <div className='text-red-500 text-sm mt-[5px] ml-[20px]'>{formik.errors.confirmPassword}</div>
                )}
              </div>

              {/* 🔘 Nút submit */}
              <button
                type='submit'
                className={`text-center text-[#fff] font-semibold w-[90%] p-[20px] rounded-full my-[10px] shadow-md hover:shadow-lg transition-all ${
                  formik.isValid && formik.dirty
                    ? "bg-[#fc6011] cursor-pointer hover:bg-[#e55a0f]"
                    : "bg-[#f5854d] cursor-not-allowed opacity-80"
                }`}
              >
                Tiếp
              </button>
            </form>
          </div>

          {/* 🔗 Link đăng nhập */}
          <p className='text-[#636464] dark:text-gray-300 font-semibold mt-[30px] mb-[10px]'>
            Đã có tài khoản{" "}
            <Link href='/auth/login' className='text-[#fc6011] dark:text-orange-400 cursor-pointer hover:underline'>
              Đăng nhập
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default page;
