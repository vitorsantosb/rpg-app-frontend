import Swal from "sweetalert2";

const Toast = Swal.mixin({
  toast: true,
  position: "top-end",
  showConfirmButton: false,
  timer: 3000,
  timerProgressBar: true,
});

export const NotificationMessages = {
  success(message: string, title = "Sucesso"){
    return Swal.fire({
      icon: 'success',
      title,
      text: message,
      confirmButtonText: 'Ok'
    });
  },

  error(message: string, title = "Error"){
    return Swal.fire({
      icon: 'error',
      title,
      text: message,
      confirmButtonText: 'Ok'
    });
  },

  warning(message: string, title = "Warning"){
    return Swal.fire({
      icon: 'warning',
      title,
      text: message,
      confirmButtonText: 'Entendi'
    });
  },

  info(message: string, title = "Info"){
    return Swal.fire({
      icon: 'info',
      title,
      text: message,
      confirmButtonText: 'Ok'
    });
  },

  confirm(message: string, title = "Confirma"){
    return Swal.fire({
      icon: 'question',
      title,
      text: message,
      confirmButtonText: 'Ok'
    });
  },

  toasty: {
    success(message: string) {
      return Toast.fire({
        icon: "success",
        title: message,
      });
    },

    error(message: string) {
      return Toast.fire({
        icon: "error",
        title: message,
      });
    },

    info(message: string) {
      return Toast.fire({
        icon: "info",
        title: message,
      });
    },

    warning(message: string) {
      return Toast.fire({
        icon: "warning",
        title: message,
      });
    },
  }
}
