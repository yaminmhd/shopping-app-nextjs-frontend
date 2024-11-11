export interface FormErrorFields {
  email: string;
  password: string;
  name: string;
  description: string;
  price: string;
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
    name: "",
    description: "",
    price: "",
    server: message,
  };
};

const generateErrorObject = (property: string, message: string) => {
  let errorObject = {
    email: "",
    password: "",
    name: "",
    description: "",
    price: "",
    server: "",
  };
  errorObject = {
    ...errorObject,
    [property]: message.charAt(0).toUpperCase() + message.slice(1),
  };
  return errorObject;
};

const formatFieldErrorMessage = (message: {
  property: string;
  message: string;
}): FormErrorFields => {
  switch (message.property) {
    case "password":
    case "email":
    case "name":
    case "description":
    case "price":
      return generateErrorObject(message.property, message.message);
    default:
      return {
        email: "",
        password: "",
        name: "",
        description: "",
        price: "",
        server: "",
      };
  }
};
