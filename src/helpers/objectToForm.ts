export function objectToForm(object): FormData {
  const form = new FormData();
  for (const key in object) {
    if (object.hasOwnProperty(key)) {
      form.append(key, object[key]);
    }
  }
  return form;
}
