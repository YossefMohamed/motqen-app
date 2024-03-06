import { sanitizeUrl } from "@braintree/sanitize-url";

function insertImage(editor) {
  // Prompt for image URL and ensure user cancels or enters a value
  const url = window.prompt("Enter an image URL:");
  if (url === null || url === "") {
    return;
  }

  // Sanitize the URL to prevent potential security vulnerabilities,
  // using a trusted library like `sanitize-url` (not included by default)
  const sanitizedUrl = sanitizeUrl(url); // Assuming 'sanitizeUrl' is imported

  // Set the image node using the sanitized URL
  editor.chain().focus().setImage({ src: sanitizedUrl }).run();
}

export { insertImage };
