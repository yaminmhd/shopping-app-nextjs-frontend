import {ZodIssue} from "zod";

export interface FormErrorFields {
  email: string;
  password: string;
}

export interface FormError {
  error: {
    client: FormErrorFields,
    server: string;
  }
}

export interface ServerError {
  message: string;
  error: string;
  statusCode: number;
}

export const getErrorMessage = (response: any) => {
  if (response.message) {
    if (Array.isArray(response.message)) {
      return "Unknown error occurred";
    }
    return response.message
  }
};


export const parseClientFormError = (errors: ZodIssue[]) => {
  const parsedError = errors.reduce((acc, curr) => {
    if (curr.path[0] === "email" || curr.path[0] === "password") {
      acc[curr.path[0]] = curr.message;
    }
    return acc;
  }, {email: "", password: ""});
  return {
    error: {
      client: parsedError,
      server: ""
    },
  }
}