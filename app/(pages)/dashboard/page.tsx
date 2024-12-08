"use client";

import {
  useGetDrugsCountQuery,
  useGetDrugsQuery,
} from "@/app/queryHandler/useMutation";
import Image from "next/image";
import { getCurrentDateTime } from "@/app/utils/reusable";
import { useInitialRender } from "@/hooks";
import { useAppSelector } from "@/store/hooks";
import IconOne from "@/assets/iconOne.png";
import IconTwo from "@/assets/iconTwo.png";
import IconThree from "@/assets/iconThree.png";
import { Medicine } from "./types";
import { useMemo } from "react";
import { DataTable } from "@/components/ui/Table/DataTable";
import { columns } from "./columns";
import { ReloadIcon } from "@radix-ui/react-icons";
import {
  FaExclamation,
  FaMoneyBill,
  FaPlus,
  FaSalesforce,
} from "react-icons/fa";
import { FaMoneyBill1, FaMoneyCheckDollar } from "react-icons/fa6";

const Dashboard = () => {
  const {
    user: { firstName, lastName, userRole },
  } = useAppSelector((state) => state.userService);

  const isInitialRenderComplete = useInitialRender();

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

  const {
    isLoading: isLoadingDrugCount,
    isRefetching: isRefetchingDrugCount,
    data: drugCountData,
  } = useGetDrugsCountQuery();

  const {
    countOfDrugs = 0,
    countOfExpiresDrugs = 0,
    countOfSoldDrugs = 0,
  } = drugCountData?.data?.data || {};

  return (
    <div>
      <div className="mb-5 md:hidden">
        <p className="font-medium mb-3">{getCurrentDateTime()}</p>

        <p className=" font-medium">
          Welcome,{" "}
          {isInitialRenderComplete && (
            <span>Pharm. {firstName + " " + lastName}👋🏽</span>
          )}
        </p>
      </div>

      <div className=" mx-auto bg-white rounded-[20px] px-12 py-8 grid grid-cols-1 md:grid-cols-3 mb-8 gap-y-10 md:gap-y-0 divide-x-0 divide-y md:divide-y-0 md:divide-x divide-[#E4E2F8] ">
        <div className="flex items-center gap-3 ">
          <div className="flex justify-center items-center rounded-full h-14 w-14  bg-green-100">
            <FaPlus width={100} height={100} color="green" />
          </div>
          <div>
            <p className="text-xs text-[#ACACAC]">Total Drugs</p>
            <p className="text-2xl font-bold">
              {drugCountData &&
              (isLoadingDrugCount || isRefetchingDrugCount) ? (
                <ReloadIcon className="mr-2 h-4 w-4 animate-spin" />
              ) : (
                countOfDrugs
              )}
            </p>
            <div className="flex gap-1"></div>
          </div>
        </div>
        <div className="flex items-center gap-3 pl-0 md:pl-[20%] pt-[10%] md:pt-0">
          <div className="flex justify-center items-center rounded-full h-14 w-14  bg-red-100">
            <FaExclamation width={100} height={100} color="red" />
          </div>
          <div>
            <p className="text-xs text-[#ACACAC]">Expired Drugs</p>
            <p className="text-2xl font-bold">
              {drugCountData &&
              (isLoadingDrugCount || isRefetchingDrugCount) ? (
                <ReloadIcon className="mr-2 h-4 w-4 animate-spin" />
              ) : (
                countOfExpiresDrugs
              )}
            </p>
            <div className="flex gap-1"></div>
          </div>
        </div>
        <div className="flex items-center gap-3 pl-0 md:pl-[20%] pt-[10%] md:pt-0">
          <div className="flex justify-center items-center rounded-full h-14 w-14  bg-green-100">
            <FaMoneyBill1 width={100} height={100} color="green" />
          </div>

          <div>
            <p className="text-xs text-[#ACACAC]">Sold Drugs</p>
            <p className="text-2xl font-bold">
              {drugCountData &&
              (isLoadingDrugCount || isRefetchingDrugCount) ? (
                <ReloadIcon className="mr-2 h-4 w-4 animate-spin" />
              ) : (
                countOfSoldDrugs
              )}
            </p>
          </div>
        </div>
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

export default Dashboard;
