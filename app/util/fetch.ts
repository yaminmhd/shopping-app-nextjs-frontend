import {cookies} from "next/headers";
import {API_URL} from "../constants/api";
import {getErrorMessage} from "./errors";

export const getHeaders = () => ({
  Cookie: cookies().toString(),
});

export const post = async (
  path: string,
  data: FormData | object,
  callbackFn?: (response: Response) => void
) => {
  const body = data instanceof FormData ? Object.fromEntries(data) : data;
  const response = await fetch(`${API_URL}/${path}`, {
    method: "POST",
    headers: {"Content-Type": "application/json", ...getHeaders()},
    body: JSON.stringify(body),
  });
  const parsedResponse = await response.json();
  if (!response.ok) {
    return {error: getErrorMessage(parsedResponse)};
  }

  if (callbackFn) {
    callbackFn(response);
  }

  return {
    error: {
      email: "",
      password: "",
      name: "",
      description: "",
      price: "",
      server: "",
    },
    data: parsedResponse
  };
};

export const get = async <T>(path: string, tags?: string[], params?: URLSearchParams) => {
  const url = params ? `${API_URL}/${path}?${params}` : `${API_URL}/${path}`;
  console.log(url);
  const response = await fetch(url, {
    headers: {...getHeaders()},
    next: {
      tags
    }
  });

  return await response.json() as T;
};
