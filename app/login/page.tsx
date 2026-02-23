"use client"

import { Button } from "@/components/ui/button"
import { Field, FieldLabel } from "@/components/ui/field"
import { Input } from "@/components/ui/input"
import { useLoginApi } from "@/hooks/useLoginApi"
import { redirect, RedirectType } from "next/navigation"
import useIsAuthenticated from "react-auth-kit/hooks/useIsAuthenticated"
import useSignIn from "react-auth-kit/hooks/useSignIn"

export default function loginForm() {
    const signIn = useSignIn();
    const isAuth = useIsAuthenticated();

    const handleLogin = (formData: FormData) => {
        useLoginApi(formData).then((data) => {
            let user = data.data.createOrLoginUser;
            
            console.log(signIn({
                auth: {
                    token: user.id,
                    type: 'Bearer'
                },
                userState:{
                    name: user.name,
                    uid: user.id,
                    email: user.email
                }
            }))
            console.log(user);
            // redirect("/character/select", RedirectType.replace);
        })
    }

    const handleIsAuth = () =>{
            console.log(isAuth);
        }

    return (
        <div>
            <h1>Login  or create account</h1>
            <form action={handleLogin}>
                <Field>
                    <FieldLabel>Username</FieldLabel>
                    <Input name="username"></Input>
                </Field>
                <Button>submit</Button>
            </form>

            <Button onClick={handleIsAuth}>isAuth?</Button>
        </div>
    )
}
