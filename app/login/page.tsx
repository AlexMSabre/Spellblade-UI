"use client"

import { Button } from "@/components/ui/button"
import { Field, FieldLabel } from "@/components/ui/field"
import { Input } from "@/components/ui/input"
import { useLoginApi } from "@/hooks/useLoginApi"
import { redirect, RedirectType } from "next/navigation"
import useSignIn from "react-auth-kit/hooks/useSignIn"

export default function loginForm() {
    const signIn = useSignIn();

    const handleLogin = (formData: FormData) => {
        useLoginApi(formData).then((data) => {
            signIn({
                auth: {
                    token: data.data.createOrLoginUser.id,
                    type: 'Bearer'
                }
            })
            redirect("/character", RedirectType.replace);
        })
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
        </div>
    )
}
