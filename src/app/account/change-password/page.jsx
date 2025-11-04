"use client";
import Header from "@/components/header/Header";
import Heading from "@/components/Heading";
import NavBar from "@/components/header/NavBar";
import Image from "next/image";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import { toast } from "react-toastify";
import * as yup from "yup";
import { useFormik } from "formik";
import { useSocket } from "@/context/socketContext";
import { authService } from "@/api/authService";

const page = () => {
  const { notifications } = useSocket();

  const [showPass, setShowPass] = useState(false);

  const schema = yup.object().shape({
    oldPassword: yup.string().required("Vui lòng nhập mật khẩu cũ!"),
    newPassword: yup.string().min(6, "Mật khẩu phải có ít nhất 6 ký tự!").required("Vui lòng nhập mật khẩu!"),
    confirmPassword: yup
      .string()
      .min(6, "Nhập lại mật khẩu phải có ít nhất 6 ký tự!")
      .oneOf([yup.ref("newPassword"), null], "Mật khẩu nhập lại không khớp!")
      .required("Vui lòng nhập lại mật khẩu!"),
  });

  const formik = useFormik({
    initialValues: {
      oldPassword: "",
      newPassword: "",
      confirmPassword: "",
    },
    validationSchema: schema,
    onSubmit: async (values) => {
      try {
        await authService.changePassword(values);
        toast.success("Cập nhật thành công!");
        formik.resetForm();
      } catch (error) {
        console.error(error);
      }
    },
  });

  return (
    <div className='pt-[30px] pb-[100px] px-[20px] md:pt-[75px] md:mt-[20px] md:px-0 bg-white dark:bg-gray-900 text-gray-900 dark:text-gray-100 transition-colors duration-300 min-h-screen'>
      <Heading title='Đổi mật khẩu' description='' keywords='' />
      <div className='hidden md:block'>
        <Header page='account' />
      </div>

      <div className='flex items-center justify-between md:hidden'>
        <h3 className='text-gray-800 dark:text-gray-100 text-[28px] font-bold'>Đổi mật khẩu</h3>
        <Link href='/notifications' className='relative w-[30px] pt-[30px] md:w-[25px] md:pt-[25px]'>
          <Image src='/assets/notification.png' alt='' layout='fill' objectFit='contain' />
          {notifications.filter((noti) => noti.status === "unread").length > 0 && (
            <div className='absolute top-[-6px] right-[-6px] w-[21px] h-[21px] text-center rounded-full bg-[#fc6011] border border-white flex items-center justify-center'>
              <span className='text-[11px] text-white'>
                {notifications.filter((noti) => noti.status === "unread").length}
              </span>
            </div>
          )}
        </Link>
      </div>

      <div className='bg-white dark:bg-gray-800 lg:w-[60%] md:w-[80%] md:mx-auto md:border md:border-gray-300 dark:md:border-gray-700 md:rounded-[10px] md:shadow-[rgba(0,0,0,0.24)_0px_3px_8px] md:p-[20px] transition-colors duration-300'>
        <div className='flex flex-col items-center mt-[20px]'>
          <h3 className='text-gray-800 dark:text-gray-100 text-[26px] font-bold pb-[10px] hidden md:block'>
            Đổi mật khẩu
          </h3>
        </div>

        <form onSubmit={formik.handleSubmit} className='flex flex-col gap-[20px] md:gap-[10px] bg-transparent'>
          {[
            { name: "oldPassword", label: "Mật khẩu cũ", placeholder: "Nhập mật khẩu cũ của bạn" },
            { name: "newPassword", label: "Mật khẩu mới", placeholder: "Nhập mật khẩu của bạn" },
            { name: "confirmPassword", label: "Nhập lại mật khẩu", placeholder: "Nhập lại mật khẩu" },
          ].map(({ name, label, placeholder }) => (
            <div key={name}>
              <div className='relative flex items-center bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-200 w-full rounded-[12px] gap-[8px] overflow-hidden'>
                <span className='absolute top-[12px] left-[20px] text-[13px] md:text-[11px] opacity-80'>{label}</span>
                <input
                  type={showPass ? "text" : "password"}
                  name={name}
                  value={formik.values[name]}
                  onChange={formik.handleChange(name)}
                  onBlur={formik.handleBlur(name)}
                  placeholder={placeholder}
                  className='bg-gray-200 dark:bg-gray-600 text-[18px] w-full px-[20px] pt-[28px] pb-[12px] rounded-[12px] outline-none focus:ring-2 focus:ring-[#fc6011] transition-all'
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
              {formik.touched[name] && formik.errors[name] ? (
                <div className='text-red-500 text-sm mt-[5px] ml-[20px]'>{formik.errors[name]}</div>
              ) : null}
            </div>
          ))}

          <button
            type='submit'
            className={`text-center text-white font-semibold w-full p-[20px] rounded-full my-[10px] shadow-[rgba(0,0,0,0.24)_0px_3px_8px] transition-all duration-300 ${
              formik.isValid && formik.dirty
                ? "bg-[#fc6011] hover:bg-[#e55500] cursor-pointer"
                : "bg-[#f5854d]/70 cursor-not-allowed"
            }`}
          >
            Lưu
          </button>
        </form>
      </div>

      <div className='block md:hidden'>
        <NavBar page='account' />
      </div>
    </div>
  );
};

export default page;
