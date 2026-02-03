let showToast;

export const registerToast = (fn) => {
    showToast = fn;
};

const toastService = {
    success: (msg) => showToast?.("success", msg),
    error: (msg) => showToast?.("error", msg),
    warning: (msg) => showToast?.("warning", msg),
    info: (msg) => showToast?.("info", msg),
};

export default toastService;