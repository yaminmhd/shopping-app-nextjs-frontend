export interface FormErrorFields {
  email: string;
  password: string;
  server: string;
}
export interface FormError {
  error: FormErrorFields;
}

export const getErrorMessage = (response: any) => {
  console.log("response", response);
  if (response.message) {
    if (Array.isArray(response.message)) {
      return formatFieldErrorMessage(response.message[0]);
    }
    return formatServerError(response.message);
  }

  return formatServerError("Unknown error occurred");
};

const formatServerError = (message: string) => {
  return {
    email: "",
    password: "",
    server: message,
  };
};

const formatFieldErrorMessage = (message: {
  property: string;
  message: string;
}): FormErrorFields => {
  let errorObject = {
    email: "",
    password: "",
    server: "",
  };

  if (message.property === "password") {
    errorObject = {
      ...errorObject,
      password:
        message.message.charAt(0).toUpperCase() + message.message.slice(1),
    };
  }

  if (message.property === "email") {
    errorObject = {
      ...errorObject,
      email: message.message.charAt(0).toUpperCase() + message.message.slice(1),
    };
  }

  return errorObject;
};
