export const showSuccess = (msg, toast) => {
  toast.current.show({
    severity: "success",
    summary: "Success",
    detail: msg,
    life: 3000,
  });
};
export const showError = (msg, toast) => {
  toast.current.show({
    severity: "error",
    summary: "هناك خطأ !!",
    detail: msg,
    life: 3000,
  });
};

export const showInfo = (msg, toast) => {
  toast.current.show({
    severity: 'info',
    summary: 'تنبيه',
    detail: msg,
    life: 3000,
  });
}

export const showWarn = (msg, toast) => {
  toast.current.show({
    severity: "warn",
    summary: "تحذير",
    detail: msg,
    life: 3000,
  });
}

export const showSticky = (msg, toast) => {
  toast.current.show({
    severity: "info",
    summary: "Sticky",
    detail: msg,
    sticky: true,
  });
}