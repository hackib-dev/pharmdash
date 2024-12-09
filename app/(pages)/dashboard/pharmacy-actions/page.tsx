"use client";

import { getCurrentDateTime } from "@/app/utils/reusable";
import { Button } from "@/components/ui/button";
import AddDrugsModal from "@/components/ui/addDrug";
import { useDisclosure, useInitialRender } from "@/hooks";
import { useMemo, useState } from "react";
import _ from "lodash";
import { Input } from "@/components/ui/input";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { ReloadIcon } from "@radix-ui/react-icons";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { AddDrugFormData, SellDrugFormData } from "@/types.ts";
import { useRouter } from "next/navigation";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import Image from "next/image";
import { useMutation } from "@tanstack/react-query";
import BgImage from "@/assets/bgImage.svg";
import { useToast } from "@/hooks/use-toast";
import {
  useAddDrugsMutation,
  useGetDrugsQuery,
  useLoginMutation,
  useSellDrugsMutation,
} from "@/app/queryHandler/useMutation";
import { useEffect } from "react";
import { addMilliseconds } from "date-fns";
import { setCookie } from "@/app/utils/cookies";
import { setUser } from "@/store/slice/userService/userService";
import Link from "next/link";
import { AddDrugFormSchema, SellDrugsFormSchema } from "./validations";
import { Textarea } from "@/components/ui/textarea";
import { Checkbox } from "@/components/ui/checkbox";
import { Switch } from "@/components/ui/switch";
import { DataTable } from "@/components/ui/Table/DataTable";
import { columns } from "../columns";
import { Medicine } from "../types";
import SellDrugsModal from "@/components/ui/sellDrug";

const PharmacyActions = () => {
  const {
    isAddDrugsOpen,
    onOpenAddDrugs,
    onCloseAddDrugs,
    isOpenSellDrugs,
    onOpenSellDrugs,
    onCloseSellDrugs,
  } = useDisclosure();

  const {
    user: { firstName, lastName, userRole },
  } = useAppSelector((state) => state.userService);

  const isInitialRenderComplete = useInitialRender();

  const [isOpenMenu, setIsOpenMenu] = useState(false);

  const { isLoading, isRefetching, data: medicineData } = useGetDrugsQuery();

  const transformedData: Medicine[] = useMemo(() => {
    if (medicineData?.data?.data && Array.isArray(medicineData.data?.data)) {
      return medicineData?.data?.data?.map((medicine: Medicine) => ({
        id: medicine.id,
        name: medicine.name,
        genericName: medicine.genericName,
        brandName: medicine.brandName,
        medicineForm: medicine.medicineForm,
        medicineDosage: medicine.medicineDosage,
        manufacturer: medicine.manufacturer,
        expiryDate: medicine.expiryDate,
        batchNumber: medicine.batchNumber,
        quantityInStock: medicine.quantityInStock,
        pricePerUnit: medicine.pricePerUnit,
        prescriptionNeeded: medicine.prescriptionNeeded,
        descriptionOfMedicine: medicine.descriptionOfMedicine,
        status: medicine.expired ? "Expired" : "Available",
        lastUpdated: medicine.lastUpdated,
      }));
    }
    return [];
  }, [medicineData]);

  const form = useForm<AddDrugFormData>({
    resolver: zodResolver(AddDrugFormSchema),
    defaultValues: {
      batchNumber: "",
      brandName: "",
      descriptionOfMedicine: "",
      expired: false,
      expiryDate: "",
      genericName: "",
      manufacturer: "",
      medicineDosage: "",
      medicineForm: "",
      name: "",
      prescriptionNeeded: false,
      pricePerUnit: "",
      quantityInStock: "",
    },
  });

  const sellDrugsForm = useForm<SellDrugFormData>({
    resolver: zodResolver(SellDrugsFormSchema),
    defaultValues: {
      address: "",
      customerName: "",
      medicationSold: "",
      price: "",
      quantity: "",
      soldBy: firstName,
      zipCode: "",
    },
  });

  const {
    mutate: addDrugs,
    isPending: isPendingAddDrugs,
    data: addDrugsData,
  } = useAddDrugsMutation();

  useEffect(() => {
    if (addDrugsData) {
      form.reset();
      onCloseAddDrugs();
    }
  }, [addDrugsData]);

  const {
    mutate: sellDrugs,
    isPending: isPendingSellDrugs,
    data: sellDrugsData,
  } = useSellDrugsMutation();

  useEffect(() => {
    if (sellDrugsData) {
      sellDrugsForm.reset();
      onCloseSellDrugs();
    }
  }, [sellDrugsData]);

  const handleSellDrugs = async (data: SellDrugFormData) => {
    if (!_.isEmpty(sellDrugsForm.formState.errors)) {
      return;
    }

    const transformedData = {
      ...data,
      medicationSold: Number(data.medicationSold),
      price: Number(data.price),
    };

    sellDrugs(transformedData as unknown as SellDrugFormData);
  };

  const onSubmit = async (data: AddDrugFormData) => {
    if (!_.isEmpty(form.formState.errors)) {
      return;
    }

    addDrugs(data);
  };

  const watchedFields = form.watch();

  const isFormComplete = Object.values(watchedFields).every(
    (field) => field === undefined || field === ""
  );

  return (
    <div>
      <div className="mb-3 md:hidden">
        <p className="font-medium text-sm mb-3">{getCurrentDateTime()}</p>
        <p className="text-lg font-medium">
          Welcome,{" "}
          {isInitialRenderComplete && (
            <span>Pharm. {firstName + " " + lastName}👋🏽</span>
          )}
        </p>
      </div>

      <div>
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-5">
          <p> Total Drugs in Store ({transformedData.length})</p>
          <div className="space-x-3 mt-5 md:mt-0">
            <Button className="bg-[#1BC768]" onClick={onOpenAddDrugs}>
              Add Drug
            </Button>

            <Button className="bg-[#EAC432]" onClick={onOpenSellDrugs}>
              Sell Drug
            </Button>
          </div>
        </div>

        <AddDrugsModal
          isOpenAddDrugs={isAddDrugsOpen}
          onCloseAddDrugs={onCloseAddDrugs}
          headerTextAddDrugs={"New Drug Details"}
          bodyTextAddDrugs={
            <Form {...form}>
              <form
                onSubmit={form.handleSubmit(onSubmit)}
                className="space-y-4"
              >
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3 md:gap-6">
                  <FormField
                    control={form.control}
                    name="batchNumber"
                    render={({ field }) => (
                      <FormItem className="col-span-2 md:col-span-1">
                        <FormLabel className="text-xs uppercase">
                          Batch Number
                        </FormLabel>
                        <FormControl>
                          <Input
                            className="text-xs"
                            placeholder="Enter batch number"
                            {...field}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="brandName"
                    render={({ field }) => (
                      <FormItem className="col-span-2 md:col-span-1">
                        <FormLabel className="text-xs uppercase">
                          Brand Name
                        </FormLabel>
                        <FormControl>
                          <Input
                            className="text-xs"
                            placeholder="Enter brand name"
                            {...field}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <div className="col-span-2">
                    <FormField
                      control={form.control}
                      name="descriptionOfMedicine"
                      render={({ field }) => (
                        <FormItem className="col-span-2 md:col-span-1">
                          <FormLabel className="text-xs uppercase">
                            Description
                          </FormLabel>
                          <FormControl>
                            <Textarea
                              className="text-xs"
                              placeholder="Enter description of medicine"
                              {...field}
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>

                  <FormField
                    control={form.control}
                    name="expiryDate"
                    render={({ field }) => (
                      <FormItem className="col-span-2 md:col-span-1">
                        <FormLabel className="text-xs uppercase">
                          Expiry Date
                        </FormLabel>
                        <FormControl>
                          <Input className="text-xs" type="date" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="genericName"
                    render={({ field }) => (
                      <FormItem className="col-span-2 md:col-span-1">
                        <FormLabel className="text-xs uppercase">
                          Generic Name
                        </FormLabel>
                        <FormControl>
                          <Input
                            className="text-xs"
                            placeholder="Enter generic name"
                            {...field}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="manufacturer"
                    render={({ field }) => (
                      <FormItem className="col-span-2 md:col-span-1">
                        <FormLabel className="text-xs uppercase">
                          Manufacturer
                        </FormLabel>
                        <FormControl>
                          <Input
                            className="text-xs"
                            placeholder="Enter manufacturer"
                            {...field}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="medicineDosage"
                    render={({ field }) => (
                      <FormItem className="col-span-2 md:col-span-1">
                        <FormLabel className="text-xs uppercase">
                          Dosage
                        </FormLabel>
                        <FormControl>
                          <Input
                            className="text-xs"
                            placeholder="Enter dosage"
                            {...field}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="medicineForm"
                    render={({ field }) => (
                      <FormItem className="col-span-2 md:col-span-1">
                        <FormLabel className="text-xs uppercase">
                          Medicine Form
                        </FormLabel>
                        <FormControl>
                          <Input
                            className="text-xs"
                            placeholder="Enter medicine form"
                            {...field}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="name"
                    render={({ field }) => (
                      <FormItem className="col-span-2 md:col-span-1">
                        <FormLabel className="text-xs uppercase">
                          Medicine Name
                        </FormLabel>
                        <FormControl>
                          <Input
                            className="text-xs"
                            placeholder="Enter medicine name"
                            {...field}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="pricePerUnit"
                    render={({ field }) => (
                      <FormItem className="col-span-2 md:col-span-1">
                        <FormLabel className="text-xs uppercase">
                          Price per Unit
                        </FormLabel>
                        <FormControl>
                          <Input
                            className="text-xs"
                            type="number"
                            placeholder="Enter price per unit"
                            {...field}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="quantityInStock"
                    render={({ field }) => (
                      <FormItem className="col-span-2 md:col-span-1">
                        <FormLabel className="text-xs uppercase">
                          Quantity in Stock
                        </FormLabel>
                        <FormControl>
                          <Input
                            className="text-xs"
                            type="number"
                            placeholder="Enter quantity in stock"
                            {...field}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="expired"
                    render={({ field }) => (
                      <FormItem className="flex flex-row items-center justify-between rounded-lg border p-4 col-span-2 md:col-span-1">
                        <div className="space-y-0.5">
                          <FormLabel className="text-xs uppercase">
                            Expired
                          </FormLabel>
                        </div>
                        <FormControl>
                          <Switch
                            checked={field.value}
                            onCheckedChange={field.onChange}
                          />
                        </FormControl>
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="prescriptionNeeded"
                    render={({ field }) => (
                      <FormItem className="flex flex-row items-center justify-between rounded-lg border p-4 col-span-2 md:col-span-1">
                        <div className="space-y-0.5">
                          <FormLabel className="text-xs uppercase">
                            Prescription Needed
                          </FormLabel>
                        </div>
                        <FormControl>
                          <Switch
                            checked={field.value}
                            onCheckedChange={field.onChange}
                          />
                        </FormControl>
                      </FormItem>
                    )}
                  />
                </div>

                <Button
                  className="w-fit bg-[#5932EA]"
                  type="submit"
                  size="lg"
                  disabled={isPendingAddDrugs}
                  isFormComplete={isFormComplete}
                >
                  {isPendingAddDrugs && (
                    <ReloadIcon className="mr-2 h-4 w-4 animate-spin" />
                  )}
                  Add Drug
                </Button>
              </form>
            </Form>
          }
        />

        <SellDrugsModal
          isOpenSellDrugs={isOpenSellDrugs}
          onCloseSellDrugs={onCloseSellDrugs}
          headerTextSellDrugs={"Sell Drug"}
          bodyTextSellDrugs={
            <Form {...sellDrugsForm}>
              <form
                onSubmit={sellDrugsForm.handleSubmit(handleSellDrugs)}
                className="space-y-4"
              >
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3 md:gap-6">
                  <FormField
                    control={sellDrugsForm.control}
                    name="address"
                    render={({ field }) => (
                      <FormItem className="col-span-2 md:col-span-1">
                        <FormLabel className="text-xs uppercase">
                          Address
                        </FormLabel>
                        <FormControl>
                          <Input
                            className="text-xs"
                            placeholder="Enter address"
                            {...field}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={sellDrugsForm.control}
                    name="customerName"
                    render={({ field }) => (
                      <FormItem className="col-span-2 md:col-span-1">
                        <FormLabel className="text-xs uppercase">
                          Customer Name
                        </FormLabel>
                        <FormControl>
                          <Input
                            className="text-xs"
                            placeholder="Enter customer name"
                            {...field}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={sellDrugsForm.control}
                    name="medicationSold"
                    render={({ field }) => (
                      <FormItem className="col-span-2 md:col-span-1">
                        <FormLabel className="text-xs uppercase">
                          Medication Sold
                        </FormLabel>
                        <FormControl>
                          <select
                            className="text-xs w-full p-3 border rounded"
                            {...field}
                            onChange={(e) => {
                              const selectedId = e.target.value;
                              field.onChange(selectedId);
                              const selectedMedication = transformedData.find(
                                (med) => med.id === +selectedId
                              );
                              console.log(selectedMedication?.pricePerUnit);
                              if (selectedMedication) {
                                sellDrugsForm.setValue(
                                  "price",
                                  selectedMedication.pricePerUnit.toString()
                                );
                              }
                            }}
                          >
                            <option value="" disabled>
                              Select medication
                            </option>
                            {transformedData.map((med) => (
                              <option key={med.id} value={med.id}>
                                {med.name}
                              </option>
                            ))}
                          </select>
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={sellDrugsForm.control}
                    name="price"
                    render={({ field }) => (
                      <FormItem className="col-span-2 md:col-span-1">
                        <FormLabel className="text-xs uppercase">
                          Price
                        </FormLabel>
                        <FormControl>
                          <Input
                            className="text-xs"
                            placeholder="Medication price"
                            type="number"
                            readOnly
                            {...field}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={sellDrugsForm.control}
                    name="quantity"
                    render={({ field }) => (
                      <FormItem className="col-span-2 md:col-span-1">
                        <FormLabel className="text-xs uppercase">
                          Quantity
                        </FormLabel>
                        <FormControl>
                          <Input
                            className="text-xs"
                            placeholder="Enter quantity"
                            type="number"
                            {...field}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={sellDrugsForm.control}
                    name="soldBy"
                    render={({ field }) => (
                      <FormItem className="col-span-2 md:col-span-1">
                        <FormLabel className="text-xs uppercase">
                          Sold By
                        </FormLabel>
                        <FormControl>
                          <Input className="text-xs" disabled {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={sellDrugsForm.control}
                    name="zipCode"
                    render={({ field }) => (
                      <FormItem className="col-span-2 md:col-span-1">
                        <FormLabel className="text-xs uppercase">
                          Zip Code
                        </FormLabel>
                        <FormControl>
                          <Input
                            className="text-xs"
                            placeholder="Enter zip code"
                            {...field}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>

                <Button
                  className="w-fit bg-[#5932EA]"
                  type="submit"
                  size="lg"
                  disabled={isPendingSellDrugs}
                  isFormComplete={isFormComplete}
                >
                  {isPendingSellDrugs && (
                    <ReloadIcon className="mr-2 h-4 w-4 animate-spin" />
                  )}
                  Sell Drug
                </Button>
              </form>
            </Form>
          }
        />
      </div>
      <div className=" mx-auto bg-white rounded-[20px] p-5">
        <DataTable
          columns={columns}
          data={transformedData}
          isLoading={isLoading || isRefetching}
        />
      </div>
    </div>
  );
};

export default PharmacyActions;
