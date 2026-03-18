/**
 * @file: src/utils/imageHelpers.ts
 * @description: Utility functions for image processing. Handles conversion between
 * browser Blobs and Base64 strings for AI multimodal compatibility.
 * @dependencies: None
 */

export const blobToBase64 = (blob: Blob): Promise<string> => {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onloadend = () => resolve(reader.result as string);
    reader.onerror = reject;
    reader.readAsDataURL(blob);
  });
};
