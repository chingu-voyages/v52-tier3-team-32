"use server";

import db from "./db";
import { profileSchema, validateWithZodSchema } from "./schemas";
import { clerkClient, currentUser } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";

const showError = (error: unknown): { message: string } => {
  return {
    message: error instanceof Error ? error.message : "There is an error",
  };
};

export const createProfileAction = async (
  prevState: any,
  formData: FormData
) => {
  try {
    const user = await currentUser();
    if (!user) throw new Error("Please login to create a profile");

    const rawData = Object.fromEntries(formData);
    const validatedFields = validateWithZodSchema(profileSchema, rawData);

    await db.profile.create({
      data: {
        clerkId: user.id,
        email: user.emailAddresses[0].emailAddress,
        profileImage: user.imageUrl ?? "",
        ...validatedFields,
      },
    });
    await clerkClient.users.updateUserMetadata(user.id, {
      privateMetadata: {
        hasProfile: true,
      },
    });
  } catch (error) {
    return showError(error);
  }

  // we could change this to redirect to the actual form. Or apply a different flow.
  redirect("/");
};

// I just did this because I though it is a cool feature, we of course can drop it

export const fetchProfile = async (): Promise<unknown> => {
  const user = await currentUser();
  if (!user) return null;

  const profile = await db.profile.findUnique({
    where: {
      clerkId: user.id,
    },
    select: {
      profileImage: true,
    },
  });

  return profile;
};
