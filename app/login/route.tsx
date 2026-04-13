import { getSignInUrl } from '@workos-inc/authkit-nextjs';
import { redirect } from 'next/navigation';

//redirects to the Work OS signin
export const GET = async () => {
  const signInUrl = await getSignInUrl();

  return redirect(signInUrl);
};
