export default store => next => async action => {
  if (!action.type.startsWith('API:')) {
    return next(action)
  }

  const { dispatch } = store
  const suffix = action.type.split(':')[1]

  const { method = 'GET' } = action.payload
  let { url = '', body } = action.payload

  url = `${__APIURL__}${url}`

  const headers = {
    Accept: 'application/json',
    'Content-Type': 'application/json',
  }

  if (body) {
    body = JSON.stringify(body)
  }

  try {
    dispatch({ type: `${suffix}_START` })
    const payload = { method, headers, body }
    const data = await fetch(url, payload).then(d => d.json())
    dispatch({ type: `${suffix}_SUCCESS`, payload: { data } })
  } catch (err) {
    dispatch({ type: `${suffix}_ERROR` })
    throw new Error(err)
  }
}
