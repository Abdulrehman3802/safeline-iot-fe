import { setAuthToken } from './axios'
// Function to set the authentication token
const setAuthenticationToken = (token) => {
  setAuthToken(token)
}

export { setAuthenticationToken }
