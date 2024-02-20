import Swal, { SweetAlertIcon } from "sweetalert2";

import { AxiosError, HttpStatusCode } from "axios";

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
