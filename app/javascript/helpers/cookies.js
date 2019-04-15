export const cookies = (source = document.cookie) => {
  const cookieString = source
  if (!cookieString) { return {} }

  return cookieString
    .split(/\s*;\s*/)
    .reduce((cookies, keyValue) => {
      const [key, value] = keyValue.split('=')
      return { ...cookies, [key]: (value ? decodeURIComponent(value) : null) }
    }, {})
}

export const getCookie = (name) => cookies()[name]
