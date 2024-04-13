// js Docs

/**
 * An array of routes accessible to the public.
 * This routes do not require authentication.
 * @type {string[]}
 * 
*/

export const publicRoute=[
    "/",
    "/auth/new-verification"
]


/**
 * An array of routes use for authentication
 * will redirect logged in user to /settings
 * @type {string[]}
.
 * @type {string[]}
 * 
*/

export const authRoutes=[
    "/auth/login",
    "/auth/register",
    "/auth/error",
    "/auth/reset-password",
    "/auth/new-password"


]


/**
 * Prefix for API authentication routes
 * Routes that start with this prefix are used for api authentication purposes

 * @type {string}
 * 
*/

export const apiAuthPrefix="/api/auth"

/**
 * The default redirect path after logging in
 * @type {string}
 * 
*/

export const DEFAULT_LOGIN_REDIRECT="/settings";
