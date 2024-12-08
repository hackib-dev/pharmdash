export type Medicine = {
  id: number;
  name: string;
  genericName: string;
  brandName: string;
  medicineForm: string;
  medicineDosage: string;
  manufacturer: string;
  expiryDate: string | null;
  batchNumber: string;
  quantityInStock: number;
  pricePerUnit: number;
  prescriptionNeeded: boolean;
  descriptionOfMedicine: string;
  expired: boolean;
  lastUpdated: string;
};
