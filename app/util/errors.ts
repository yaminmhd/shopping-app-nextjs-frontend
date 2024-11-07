export const getErrorMessage = (response: any) => {
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
}) => {
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
