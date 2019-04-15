import { getCookie } from 'helpers/cookies'

const csrfToken = () => getCookie('CSRF-Token')

export default csrfToken
