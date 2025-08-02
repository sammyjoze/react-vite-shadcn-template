import { toast } from "@/hooks/use-toast"

export const showToast = {
  success: (title: string, description?: string) => {
    toast({
      title,
      description,
      variant: "default",
    })
  },

  error: (title: string, description?: string) => {
    toast({
      title,
      description,
      variant: "destructive",
    })
  },

  warning: (title: string, description?: string) => {
    toast({
      title,
      description,
      variant: "default",
    })
  },

  info: (title: string, description?: string) => {
    toast({
      title,
      description,
      variant: "default",
    })
  },
}

export const showApiError = (error: any, fallbackMessage = "Something went wrong") => {
  const message = error?.message || error?.error || fallbackMessage
  showToast.error("Error", message)
}

export const showApiSuccess = (message: string) => {
  showToast.success("Success", message)
}

export const showLoadingToast = (title: string) => {
  return toast({
    title,
    description: "Please wait...",
    variant: "default",
  })
}

export const dismissToast = (toastId?: string) => {
  // Implementation depends on your toast library
  // This is a placeholder
} 