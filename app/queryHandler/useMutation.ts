import {
  LoginFormData,
  SignUpFormData,
  AddDrugFormData,
  SellDrugFormData,
} from "@/types.ts";
import { useMutation, useQuery } from "@tanstack/react-query";
import {
  addDrugs,
  getDrugs,
  getDrugsCount,
  loginUser,
  sellDrugs,
  signUpUser,
} from "../api/apiService";
import { HandleApiError, HandleApiSuccess } from "../api/apiResponseHandler";
import { Medicine } from "../(pages)/dashboard/types";

export const useLoginMutation = () => {
  return useMutation({
    mutationFn: (data: LoginFormData) => loginUser(data),
    onSuccess: (data: any) => {
      HandleApiSuccess(data, "You have successfully logged in!");
    },
    onError: HandleApiError,
  });
};

export const useSignUpMutation = () => {
  return useMutation({
    mutationFn: (data: SignUpFormData) => signUpUser(data),
    onSuccess: (data: any) => {
      HandleApiSuccess(data, "You have successfully signed up!");
    },
    onError: HandleApiError,
  });
};

export const useAddDrugsMutation = () => {
  return useMutation({
    mutationFn: (data: AddDrugFormData) => addDrugs(data),
    onSuccess: (data: any) => {
      HandleApiSuccess(data, "You have successfully added drugs to store!");
    },
    onError: HandleApiError,
  });
};

export const useSellDrugsMutation = () => {
  return useMutation({
    mutationFn: (data: SellDrugFormData) => sellDrugs(data),
    onSuccess: (data: any) => {
      HandleApiSuccess(data, "You have successfully sold drugs!");
    },
    onError: HandleApiError,
  });
};

export const useGetDrugsQuery = () => {
  return useQuery({
    queryKey: ["getDrugs"],
    queryFn: getDrugs,
    refetchOnWindowFocus: false,
    refetchOnReconnect: false,
    refetchInterval: false,
  });
};

export const useGetDrugsCountQuery = () => {
  return useQuery({
    queryKey: ["getDrugsCount"],
    queryFn: getDrugsCount,
    refetchOnWindowFocus: false,
    refetchOnReconnect: false,
    refetchInterval: false,
  });
};
