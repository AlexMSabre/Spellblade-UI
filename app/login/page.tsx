"use client"

import { Button } from "@/components/ui/button"
import { Field, FieldLabel } from "@/components/ui/field"
import { Input } from "@/components/ui/input"
import { useLoginApi } from "@/hooks/useLoginApi"
import { Form } from "react-hook-form"

export default function characterForm() {

    return ( 
        <div>
            <h1>Login  or create account</h1>
            <form action={useLoginApi}>
                <Field>
                    <FieldLabel>Username</FieldLabel>
                    <Input name="username"></Input>
                </Field>
                <Button>submit</Button>
            </form>
        </div>
    )
}
