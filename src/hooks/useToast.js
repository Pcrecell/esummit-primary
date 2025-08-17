import { useState, useCallback } from "react";

export const useToast = () => {
  const [toast, setToast] = useState({
    message: "",
    type: "success",
    isVisible: false,
  });

  const showToast = useCallback((message, type = "success") => {
    setToast({
      message,
      type,
      isVisible: true,
    });

    // Auto-hide after 4 seconds for success/error messages
    if (type !== "loading") {
      setTimeout(() => {
        setToast(prev => ({ ...prev, isVisible: false }));
      }, 4000);
    }
  }, []);

  const hideToast = useCallback(() => {
    setToast(prev => ({ ...prev, isVisible: false }));
  }, []);

  const showSuccess = useCallback((message) => showToast(message, "success"), [showToast]);
  const showError = useCallback((message) => showToast(message, "error"), [showToast]);
  const showLoading = useCallback((message) => showToast(message, "loading"), [showToast]);

  return {
    toast,
    showToast,
    hideToast,
    showSuccess,
    showError,
    showLoading,
  };
};
