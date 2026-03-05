import { authkitMiddleware } from '@workos-inc/authkit-nextjs';

export default authkitMiddleware();

// Match against pages that require authentication
// update this for each route that you plan on a asking for the user on
export const config = { matcher: ['/','/character/select', '/character'] };
