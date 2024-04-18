import { isAxiosError } from "axios";

export const catchAsyncError = (error: any) : string => {
    let errorMessage = error.message;
    if(isAxiosError(error)){
        const errorResponse = error.response?.data;
        if(errorResponse) errorMessage = errorResponse.error;
    }

    return errorMessage;
}