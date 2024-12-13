import { createAuthClient } from 'better-auth/react'
import { APP_URL } from './utils'

import { inferAdditionalFields } from 'better-auth/client/plugins'
import type { auth } from './auth'

export const { signIn, signUp, signOut, useSession, getSession } =
  createAuthClient({
    baseURL: APP_URL,
    plugins: [inferAdditionalFields<typeof auth>()],
  }) as any
