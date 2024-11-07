"use server";

import { FormError } from "@/app/util/errors";
import { post } from "@/app/util/fetch";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { jwtDecode } from "jwt-decode";

export default async function login(_prevState: FormError, formData: FormData) {
  const { error } = await post("auth/login", formData, setAuthCookie);
  if (!Object.values(error).every((value) => value === "")) {
    return { error };
  }
  redirect("/");
}

const setAuthCookie = (response: Response) => {
  const setCookieHeader = response.headers.get("Set-Cookie");
  if (setCookieHeader) {
    const token = setCookieHeader.split(";")[0].split("=")[1];
    cookies().set({
      name: "Authentication",
      value: token,
      secure: true,
      httpOnly: true,
      expires: new Date(jwtDecode(token).exp! * 1000),
    });
  }
};
