export const fileToBase64 = (file: File): Promise<string> => {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => {
      if (typeof reader.result === "string") {
        // Remove the Data-URL declaration
        const base64String = reader.result.split(",")[1];
        resolve(base64String);
      } else {
        reject(new Error("Failed to convert file to base64"));
      }
    };
    reader.onerror = (error) => reject(error);
  });
};

export const fileToGenerativePart = async (file: File) => {
  try {
    const base64EncodedData = await fileToBase64(file);

    return {
      inlineData: {
        data: base64EncodedData,
        mimeType: file.type || "application/octet-stream",
      },
    };
  } catch (error) {
    console.error("Error processing file:", error);
    throw new Error("Failed to process file");
  }
};
