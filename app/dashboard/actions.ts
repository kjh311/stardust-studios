"use server";

import { createClient } from "@/utils/supabase/server";
import { db } from "@/db";
import { images } from "@/db/schema";
import { revalidatePath } from "next/cache";

/**
 * Handles the server-side logic for uploading a processed hero image 
 * to Supabase Storage and recording it in the database.
 */
export async function uploadHeroImageAction(formData: FormData, metadata: { sharpness: number, confidence: number, poseRatio: number }) {
  const supabase = await createClient();

  // 1. Auth Check
  const { data: { user }, error: authError } = await supabase.auth.getUser();
  if (authError || !user) {
    return { success: false, error: "User not authenticated" };
  }

  const file = formData.get("file") as File;
  if (!file) {
    return { success: false, error: "No file provided" };
  }

  // 2. Storage Upload
  // Path: [user_id]/[timestamp]_face.jpg
  const timestamp = Date.now();
  const filePath = `${user.id}/${timestamp}_face.jpg`;

  const { data: storageData, error: storageError } = await supabase.storage
    .from("user-uploads")
    .upload(filePath, file, {
      contentType: "image/jpeg",
      upsert: true,
    });

  if (storageError) {
    console.error("Storage Error:", storageError);
    return { success: false, error: `Upload failed: ${storageError.message}` };
  }

  // 3. Database Registration
  try {
    await db.insert(images).values({
      userId: user.id,
      storagePath: storageData.path,
      status: "pending",
      metadata: metadata,
    });

    revalidatePath("/dashboard");
    return { 
      success: true, 
      path: storageData.path,
      timestamp 
    };
  } catch (dbError) {
    console.error("Database Error:", dbError);
    // Cleanup storage if DB fails? (Optional, but good practice)
    await supabase.storage.from("user-uploads").remove([filePath]);
    return { success: false, error: "Failed to register image in database" };
  }
}
