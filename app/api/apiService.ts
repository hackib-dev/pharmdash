import { Medicine } from "../(pages)/dashboard/types";
import axios from "../utils/axios";
import {
  LoginFormData,
  SignUpFormData,
  AddDrugFormData,
  SellDrugFormData,
} from "@/types.ts";

export const loginUser = async (data: LoginFormData) => {
  const response = await axios().post("/login", data);
  return response;
};

export const signUpUser = async (data: SignUpFormData) => {
  const response = await axios().post("/signup", data);
  return response;
};

export const addDrugs = async (data: AddDrugFormData) => {
  const response = await axios().post("/add-drugs", data);
  return response;
};

export const sellDrugs = async (data: SellDrugFormData) => {
  const response = await axios().post("/sell-medication", data);
  return response;
};

export const getDrugs = async () => {
  const response = await axios().get("/get-all-drugs");
  return response;
};

export const getDrugsCount = async () => {
  const response = await axios().get("/dashboard-count");
  return response;
};
