// "use client";

// import _ from "lodash";
// import { Input } from "@/components/ui/input";
// import { Button } from "@/components/ui/button";
// import { zodResolver } from "@hookform/resolvers/zod";
// import { useForm } from "react-hook-form";
// import { ReloadIcon } from "@radix-ui/react-icons";
// import {
//   Form,
//   FormControl,
//   FormField,
//   FormItem,
//   FormLabel,
//   FormMessage,
// } from "@/components/ui/form";
// import { CombinedPasswordFormData } from "@/types.ts";
// import { CombinedPasswordFormSchema } from "./validations";
// import { useRouter } from "next/navigation";
// import { useAppDispatch, useAppSelector } from "@/store/hooks";
// import Footer from "@/components/Footer/page";
// import Image from "next/image";
// import Logo from "@/assets/images/logo.svg";
// import { FaArrowRight } from "react-icons/fa";
// import { useMutation } from "@tanstack/react-query";
// import { useToast } from "@/hooks/use-toast";
// import Whatsapp from "@/assets/images/whatsapp.svg";
// import {
//   useForgotPasswordMutation,
//   useLoginMutation,
//   useResetPasswordMutation,
// } from "@/app/queryHandler/useMutation";
// import { useEffect, useState } from "react";
// import Mark from "@/assets/images/mark.svg";
// import Link from "next/link";
// import { OtpComponent } from "@/components/Otp";

// const ForgotPassword = () => {
//   const form = useForm<CombinedPasswordFormData>({
//     resolver: zodResolver(CombinedPasswordFormSchema),
//     defaultValues: {
//       phoneNumber: "",
//       newPassword: "",
//       confirmNewPassword: "",
//     },
//   });

//   const router = useRouter();
//   const { toast } = useToast();
//   const dispatch = useAppDispatch();
//   const [isStepOneComplete, setIsStepOneComplete] = useState(false);
//   const [isOtpComplete, setIsOtpComplete] = useState(false);
//   const [isPasswordMatch, setIsPasswordMatch] = useState(false);
//   const [isPasswordComplete, setIsPasswordComplete] = useState(false);
//   const [userRequestId, setUserRequestId] = useState("");
//   const [otp, setOtp] = useState("");

//   const [newPassword, confirmNewPassword] = form.watch([
//     "newPassword",
//     "confirmNewPassword",
//   ]);

//   // STEP ONE
//   const {
//     mutate: forgotPassword,
//     isPending,
//     data: forgotPasswordData,
//   } = useForgotPasswordMutation();

//   useEffect(() => {
//     if (forgotPasswordData) {
//       const requestId = forgotPasswordData?.data?.data?.requestId;

//       setUserRequestId(requestId);
//       setIsStepOneComplete(true);
//     }
//   }, [forgotPasswordData]);

//   const handleStepOneComplete = async (data: CombinedPasswordFormData) => {
//     if (!_.isEmpty(form.formState.errors)) {
//       return;
//     }

//     forgotPassword(data);
//   };

//   // STEP TWO
//   const {
//     mutate: resetPassword,
//     isPending: isPendingResetPassword,
//     isError: isErrorResetPassword,
//     data: resetPasswordData,
//   } = useResetPasswordMutation(newPassword, otp, userRequestId);

//   useEffect(() => {
//     if (resetPasswordData) {
//       router.push("/login");
//     }

//     if (isErrorResetPassword) {
//       setIsPasswordMatch(false);
//       form.reset();
//     }
//   }, [resetPasswordData, isErrorResetPassword, router, form]);

//   const handleCompletePassword = async (data: CombinedPasswordFormData) => {
//     if (!_.isEmpty(form.formState.errors)) {
//       return;
//     }

//     const payload = {
//       ...data,
//       userRequestId,
//     };

//     if (newPassword !== confirmNewPassword) {
//       form.setError("newPassword", {
//         type: "manual",
//         message: "Passwords do not match",
//       });
//       form.setError("confirmNewPassword", {
//         type: "manual",
//         message: "Passwords do not match",
//       });
//       return;
//     }

//     if (newPassword && confirmNewPassword) {
//       if (newPassword === confirmNewPassword) {
//         resetPassword(payload);
//       }
//     }
//   };

//   useEffect(() => {
//     if (newPassword && confirmNewPassword) {
//       if (newPassword == confirmNewPassword) {
//         setIsPasswordMatch(true);
//         form.clearErrors("newPassword");
//         form.clearErrors("confirmNewPassword");
//       } else {
//         setIsPasswordMatch(false);
//       }
//     }
//   }, [newPassword, confirmNewPassword, form]);

//   const handleConfirmAuthorization = async () => {
//     if (!_.isEmpty(form.formState.errors)) {
//       return;
//     }

//     setIsOtpComplete(true);
//   };

//   const onSubmit = async (data: CombinedPasswordFormData) => {
//     if (!_.isEmpty(form.formState.errors)) {
//       return;
//     }
//   };

//   const watchedFields = form.watch();

//   const isFormComplete = Object.values(watchedFields).every(
//     (field) => field === undefined || field === ""
//   );

//   const handleLogin = () => {
//     router.push("login");
//   };

//   return (
//     <div className="bg-white min-h-screen relative">
//       <div className="px-8 py-10">
//         <Link href={"/"}>
//           <Logo />
//         </Link>
//         <div className="mt-10">
//           <p className="text-3xl font-medium mb-4 text-[#3A3A3A] pr-20">
//             Reset Password
//           </p>
//           <p className="mb-6 text-[#5A5A5A] font-medium leading-6">
//             {!isStepOneComplete
//               ? "Kindly enter the phone number you registered with"
//               : isOtpComplete
//               ? "Enter a new password"
//               : "A verification code has been sent to the number you provided. Enter code below to proceed"}
//           </p>

//           <Form {...form}>
//             <form onSubmit={form.handleSubmit(onSubmit)}>
//               {!isStepOneComplete ? (
//                 <>
//                   <div className="space-y-5 mt-10">
//                     <FormField
//                       control={form.control}
//                       name="phoneNumber"
//                       render={({ field }) => (
//                         <FormItem>
//                           <FormControl>
//                             <Input
//                               placeholder="Enter phone number"
//                               className="bg-[#EDEDED]"
//                               type="number"
//                               {...field}
//                             />
//                           </FormControl>
//                           <FormMessage />
//                         </FormItem>
//                       )}
//                     />
//                   </div>
//                   <div className="flex justify-between text-sm mt-3 ">
//                     <p onClick={handleLogin} className="cursor-pointer">
//                       <span className="underline">Login</span> instead?
//                     </p>
//                   </div>
//                   <div className="flex justify-end mt-6">
//                     <Button
//                       size={"lg"}
//                       isFormComplete={isFormComplete}
//                       onClick={(e) => {
//                         e.preventDefault();
//                         form.handleSubmit(handleStepOneComplete)();
//                       }}
//                       icon={<FaArrowRight />}
//                       disabled={isPending}
//                     >
//                       {isPending && (
//                         <ReloadIcon className="mr-2 h-4 w-4 animate-spin" />
//                       )}
//                       Continue
//                     </Button>
//                   </div>
//                 </>
//               ) : isOtpComplete ? (
//                 <>
//                   <div className="space-y-5 mt-10">
//                     <div className="grid grid-cols-12 items-end gap-2">
//                       <div
//                         className={
//                           isPasswordMatch ? "col-span-11" : "col-span-12"
//                         }
//                       >
//                         <FormField
//                           control={form.control}
//                           name="newPassword"
//                           render={({ field }) => (
//                             <FormItem>
//                               <FormLabel>New Password</FormLabel>
//                               <FormControl>
//                                 <Input
//                                   placeholder="Enter your new password"
//                                   className="bg-[#EDEDED]"
//                                   type="password"
//                                   {...field}
//                                 />
//                               </FormControl>
//                               <FormMessage />
//                             </FormItem>
//                           )}
//                         />
//                       </div>

//                       {isPasswordMatch && <Mark />}
//                     </div>

//                     <div className="grid grid-cols-12 items-end gap-2">
//                       <div
//                         className={
//                           isPasswordMatch ? "col-span-11" : "col-span-12"
//                         }
//                       >
//                         <FormField
//                           control={form.control}
//                           name="confirmNewPassword"
//                           render={({ field }) => (
//                             <FormItem>
//                               <FormLabel>Confirm New Password</FormLabel>
//                               <FormControl>
//                                 <Input
//                                   placeholder="Re-enter your new password"
//                                   className="bg-[#EDEDED]"
//                                   type="password"
//                                   {...field}
//                                 />
//                               </FormControl>
//                               <FormMessage />
//                             </FormItem>
//                           )}
//                         />
//                       </div>

//                       {isPasswordMatch && <Mark />}
//                     </div>
//                   </div>

//                   <div className="flex justify-end mt-6">
//                     <Button
//                       size="lg"
//                       //   type="submit"
//                       isFormComplete={isFormComplete}
//                       icon={<FaArrowRight />}
//                       disabled={isPendingResetPassword}
//                       onClick={(e) => {
//                         e.preventDefault();
//                         form.handleSubmit(handleCompletePassword)();
//                       }}
//                     >
//                       {isPendingResetPassword && (
//                         <ReloadIcon className="mr-2 h-4 w-4 animate-spin" />
//                       )}
//                       Submit
//                     </Button>
//                   </div>
//                 </>
//               ) : (
//                 // 2nd Step OTP Verification Step
//                 <div>
//                   <div>
//                     <OtpComponent
//                       otp={otp}
//                       onChange={(value) => setOtp(value)}
//                       handleConfirmAuthorization={handleConfirmAuthorization}
//                     />
//                   </div>
//                 </div>
//               )}

//               <div className="flex items-center mt-40 gap-3 justify-end">
//                 <Link
//                   href={"https://wa.me/2349021768218"}
//                   className=" bg-[#3A3A3A] text-xs rounded-md shadow-lg px-4 py-3 text-white w-fit"
//                 >
//                   Need Help? Chat With Us
//                 </Link>

//                 <Link href={"https://wa.me/2349021768218"}>
//                   <Whatsapp />
//                 </Link>
//               </div>

//               <div className="mt-20">
//                 <Footer />
//               </div>
//             </form>
//           </Form>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default ForgotPassword;
