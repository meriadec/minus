export default store => next => async action => {
  if (!action.type.startsWith('API:')) {
    return next(action)
  }

  const { dispatch } = store
  const prefix = action.type.split(':')[1]

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
    dispatch({ type: `${prefix}_START` })
    const payload = { method, headers, body }
    const data = await fetch(url, payload).then(d => d.json())
    dispatch({ type: `${prefix}_SUCCESS`, payload: { data } })
  } catch (err) {
    dispatch({ type: `${prefix}_ERROR` })
    throw new Error(err)
  }
}
