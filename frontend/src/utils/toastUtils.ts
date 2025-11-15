import { toast } from 'react-toastify';

export const showSuccessToast = (msg: string) => toast.success(msg);
export const showErrorToast = (msg: string) => toast.error(msg);
