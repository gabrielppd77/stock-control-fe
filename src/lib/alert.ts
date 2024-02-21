import Swal, { SweetAlertIcon } from "sweetalert2";

import { AxiosError, HttpStatusCode } from "axios";

import colors from "tailwindcss/colors";

interface ResponseData {
  statusCode: HttpStatusCode;
  message: string | string[];
  error?: string;
}

export function extractError(err: unknown) {
  let title = "Oops...";
  let text = "Algo deu errado!";
  let icon: SweetAlertIcon = "error";

  if (err instanceof AxiosError) {
    const data: ResponseData | undefined = err?.response?.data;
    if (data) {
      title = data.statusCode + " " + (data.error || title);
      text =
        typeof data.message === "string"
          ? data.message
          : data.message.join(",");
      icon =
        data.statusCode === HttpStatusCode.BadRequest ? "warning" : "error";
    }
  }

  Swal.fire({
    icon,
    title,
    text,
    confirmButtonText: "Beleza!",
    showCloseButton: true,
  });
}

export function confirmDelete(onConfirm: () => Promise<void>) {
  Swal.fire({
    icon: "question",
    title: "Você realmente quer remover?",
    text: "As alterações não poderão ser desfeitas",
    showConfirmButton: true,
    showCancelButton: true,
    reverseButtons: true,
    confirmButtonText: "Sim",
    confirmButtonColor: colors.red[500],
    cancelButtonText: "Não",
    showLoaderOnConfirm: true,
    preConfirm: async () => {
     await onConfirm();
    },
    allowOutsideClick: () => !Swal.isLoading()
  });
}
