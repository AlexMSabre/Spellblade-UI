import { signOut } from "next-auth/react";
import { redirect } from "next/dist/server/api-utils";

export default function SignOutButton() {
  const handleLogout = async () => {
    const clientId = "1slqesqo5geh3296ligg5qdh44";
    const logoutUri = "http://localhost:3000/api/auth/signout";
    const cognitoDomain = "https://us-east-2d43mi2szh.auth.us-east-2.amazoncognito.com";
    const cognitoLogoutUrl = `${cognitoDomain}/logout?client_id=${clientId}&logout_uri=${encodeURIComponent(logoutUri)}`;
    console.log(cognitoLogoutUrl);
    // 4. Sign out locally in NextAuth, then redirect straight to Cognito
    await signOut({
      callbackUrl: cognitoLogoutUrl,
    });

    await signOut();
  };

  return (
    <button onClick={handleLogout}>
      Sign Out Everywhere
    </button>
  );
}