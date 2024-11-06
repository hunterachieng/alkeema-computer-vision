export const uploadImage = async (data: FormData) => {
  try {
    const response = await fetch("/api/image_upload", {
      method: "POST",
      body: data,
    });

    const result = await response.json();
    return result;
  } catch (error) {
    throw new Error((error as Error).message);
  }
};
