"use server";

import { FormError } from "@/app/util/errors";
import { post } from "@/app/util/fetch";
import { redirect } from "next/navigation";

export default async function createUser(
  _prevState: FormError,
  formData: FormData
) {
  const { error } = await post("users", formData);
  if (!Object.values(error).every((value) => value === "")) {
    return { error };
  }
  redirect("/");
}
