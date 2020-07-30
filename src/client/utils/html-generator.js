export const generateElement = (html) => {
  const parser = new DOMParser()
  const newDoc = parser.parseFromString(html, 'text/html')

  return newDoc.body.firstElementChild
}