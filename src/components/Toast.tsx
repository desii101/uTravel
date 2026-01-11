import { toast, type TypeOptions } from "react-toastify";


export const pushToast = (type: TypeOptions, message: string, autoClose: number = 3000) => {
    toast(message, {
        type: type,
        autoClose: autoClose,
        theme: 'colored',
        className: 'font-[unset]' 
    });
};