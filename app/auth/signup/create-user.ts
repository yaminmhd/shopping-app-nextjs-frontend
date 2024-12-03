"use server";

import {FormError, parseClientFormError} from "@/app/util/errors";
import {post} from "@/app/util/fetch";
import {redirect} from "next/navigation";
import {z} from "zod";

export default async function createUser(
  _prevState: FormError,
  formData: FormData
) {// Minimum 8 characters, at least one uppercase letter, one lowercase letter, one number and one special character
  const passwordValidation = new RegExp(
    /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,}$/
  );
  const schema = z.object({
    email: z.string().min(1, {message: "Email is required"}).email(),
    password: z
      .string()
      .min(1, {message: "Password is required"})
      .regex(passwordValidation, {message: 'Your password is not valid'})
  })

  const registrationValidationResponse = schema.safeParse({
    email: formData.get("email"),
    password: formData.get("password"),
  });

  if (!registrationValidationResponse.success) {
    return parseClientFormError(registrationValidationResponse.error.errors);
  }

  const {error: serverErrorMessage} = await post("users", formData);
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
