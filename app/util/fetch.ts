import { cookies } from "next/headers";
import { API_URL } from "../constants/api";
import { getErrorMessage } from "./errors";

const getHeaders = () => ({
  Cookie: cookies().toString(),
});

export const post = async (
  path: string,
  formData: FormData,
  callbackFn?: (response: Response) => void
) => {
  const response = await fetch(`${API_URL}/${path}`, {
    method: "POST",
    headers: { "Content-Type": "application/json", ...getHeaders() },
    body: JSON.stringify(Object.fromEntries(formData)),
  });
  const parsedResponse = await response.json();
  if (!response.ok) {
    return { error: getErrorMessage(parsedResponse) };
  }

  if (callbackFn) {
    callbackFn(response);
  }

  return { response, error: { email: "", password: "", server: "" } };
};

export const get = async (path: string) => {
  const response = await fetch(`${API_URL}/${path}`, {
    headers: { ...getHeaders() },
  });

  return response.json();
};
