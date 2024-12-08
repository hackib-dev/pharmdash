import * as z from "zod";

export const AddDrugFormSchema = z.object({
  batchNumber: z.string().min(1, { message: "Batch number is required." }),
  brandName: z.string().min(1, { message: "Brand name is required." }),
  descriptionOfMedicine: z
    .string()
    .min(1, { message: "Description of the medicine is required." }),
  expired: z.boolean(),
  expiryDate: z.string().refine((date) => !isNaN(Date.parse(date)), {
    message: "Invalid expiry date format.",
  }),
  genericName: z.string().min(1, { message: "Generic name is required." }),
  manufacturer: z.string().min(1, { message: "Manufacturer is required." }),
  medicineDosage: z
    .string()
    .min(1, { message: "Medicine dosage is required." }),
  medicineForm: z.string().min(1, { message: "Medicine form is required." }),
  name: z.string().min(1, { message: "Medicine name is required." }),
  prescriptionNeeded: z.boolean(),
  pricePerUnit: z
    .string()
    .min(1, { message: "Price per unit must be at least 0." }),
  quantityInStock: z
    .string()
    .min(1, { message: "Quantity in stock must be at least 0." }),
});

export const SellDrugsFormSchema = z.object({
  address: z.string().min(1, "Address is required"),
  customerName: z.string().min(1, "Customer name is required"),
  medicationSold: z.string().min(1, "Medication is required"),
  price: z.string().min(1, "Price is required"),
  quantity: z.string().min(1, "Quantity is required"),
  soldBy: z.string().min(1, "Sold by is required"),
  zipCode: z.string().min(1, "Zip code is required"),
});
