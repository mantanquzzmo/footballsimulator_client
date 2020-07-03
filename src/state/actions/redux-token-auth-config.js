import { generateAuthActions } from 'redux-token-auth'

const authUrl = process.env.REACT_APP_API_BASEURL

const config = {
  authUrl,
  userAttributes: {
    email: 'email',
  },
  userRegistrationAttributes: {
    email: 'email',
  },
}

const {
  registerUser,
  signInUser,
  signOutUser,
  verifyCredentials,
} = generateAuthActions(config)

export {
  registerUser,
  signInUser,
  signOutUser,
  verifyCredentials,
}