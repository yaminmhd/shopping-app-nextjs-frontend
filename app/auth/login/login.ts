"use server";

import {FormError, parseClientFormError} from "@/app/util/errors";
import { post } from "@/app/util/fetch";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { jwtDecode } from "jwt-decode";
import { AUTHENTICATION_COOKIE } from "../auth-cookie";
import {z} from "zod";

export default async function login(_prevState: FormError, formData: FormData) {
  const schema = z.object({
    email: z.string().min(1, {message: "Email is required"}).email(),
    password: z.string().min(1, {message: "Password is required"})
  })

  const loginValidationResponse = schema.safeParse({
    email: formData.get("email"),
    password: formData.get("password"),
  });

  if (!loginValidationResponse.success) {
    return parseClientFormError(loginValidationResponse.error.errors);
  }
  const { error: serverErrorMessage } = await post("auth/login", formData, setAuthCookie);
  if (serverErrorMessage) {
    return {
      error: {
        client: {email: "", password: ""},
        server: serverErrorMessage
      }
    };
  }
  redirect("/");
}

const setAuthCookie = (response: Response) => {
  const setCookieHeader = response.headers.get("Set-Cookie");
  if (setCookieHeader) {
    const token = setCookieHeader.split(";")[0].split("=")[1];
    cookies().set({
      name: AUTHENTICATION_COOKIE,
      value: token,
      secure: true,
      httpOnly: true,
      expires: new Date(jwtDecode(token).exp! * 1000),
    });
  }
};
