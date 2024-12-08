import { toast } from "@/hooks/use-toast";

export const HandleApiSuccess = (data: any, message?: string) => {
  toast({
    variant: "default",
    title: "Hooray! You're Good to Go.",
    description: data?.data?.description || message,
  });
};

export const HandleApiError = (error: any) => {
  toast({
    variant: "destructive",
    title: "Uh oh! Something went wrong.",
    description:
      error?.response?.data?.description ||
      "An error occurred, please try again.",
  });
};
