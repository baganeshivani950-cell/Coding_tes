export function validatePdfFile(file?: File | null, maxSizeMB = 10): string | true {
  if (!file) return "No file provided";
  if (file.type !== "application/pdf" && !file.name.toLowerCase().endsWith(".pdf"))
    return "Only PDF files are accepted";
  if (file.size > maxSizeMB * 1024 * 1024) return `File must be < ${maxSizeMB} MB`;
  return true;
}
