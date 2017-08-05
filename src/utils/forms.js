export function preparePictureForm({ form, picture }) {
  const title = form.get('title');
  const description = form.get('description');
  const metaTitle = form.get('metaTitle');
  const metaDescription = form.get('metaDescription');
  if (picture.file) {
    form.set('image', picture.file);
  }

  if (!metaTitle) {
    form.set('metaTitle', title);
  }

  if (!metaDescription) {
    form.set('metaDescription', description);
  }

  const fakeId = form.get('fakeId');

  if (fakeId) {
    form.delete('fakeId');
  }

  return form;
}
