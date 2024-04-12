"use client"

import { z } from "zod"

import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { FormControl, Form, FormField, FormItem, FormLabel, FormMessage } from "../ui/form"
import { CardWrapper } from "./card-wrapper"
import { LoginSchemas } from "@/schemas"
import { Input } from "../ui/input"
import { Button } from "../ui/button"
import { FormError } from "../form-error"
import { FormSuccess } from "../form-success"
import { login } from "@/actions/login"
import { useState, useTransition } from "react"
import { useSearchParams } from "next/navigation"
import Link from "next/link"



export const LoginForm = () => {

    const searchParams=useSearchParams();
    const urlError=searchParams.get("error") === "OAuthAccountNotLinked" ? "You can logged in with this email" : ""
    console.log(urlError)
    // setting up our pending state
    const [error, setError]=useState<string | undefined>('')
    const [success, setSuccess]=useState<string | undefined>('')

    const [isPending, startTransition]=useTransition()
    const form = useForm<z.infer<typeof LoginSchemas>>({
        resolver: zodResolver(LoginSchemas),
        defaultValues: {
            email: "",
            password: "",
        }
    })

    //  GET OUR INPUTS VALUES
    const onSubmit = (values: z.infer<typeof LoginSchemas>) => {
// after submitting we want to go ahead and clear all errors and all success
setError("")
setSuccess("")


        startTransition(()=>{
            login(values)
            .then((data)=>{
                setError(data?.error);
                    //TODO : Add when we add  2FA
                setSuccess(data?.success)
            })
        })
    }

    return (
        <CardWrapper headerLabel="We;come to CH" backButtonLabel="Dont, have an account?" backButtonHref="/auth/register">
     
            {/* login form goes here, but first, we have to create a form schema */}
            <Form {...form}>
                <form
                    onSubmit={form.handleSubmit(onSubmit)}
                    className="space-y-6"
                >
                    <div className="space-y-4">

                        {/*  EMAIL FIELD */}
                        <FormField
                            control={form.control}
                            name="email"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Email</FormLabel>
                                    <FormControl>
                                        <Input
                                            {...field}
                                        disabled={isPending}
                                            placeholder="fonyuygita@gmail.com"
                                            type="email"
                                        />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        {/*  END OF EMAIL FIELD */}

                        {/*  PASSWORD FIELD */}

                        <FormField
                            control={form.control}
                            name="password"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Password</FormLabel>
                                    <FormControl>
                                        <Input
                                            {...field}
                                            disabled={isPending}
                                            placeholder="**************"
                                            type="password"
                                        />
                                    </FormControl>
                                    <Button variant="link" asChild>
                                        <Link href="/auth/reset-password" className="my-3 text-bold">Forgot password</Link>
                                    </Button>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />

                        {/*  END OF PASSWORD FORM FIELD */}

                    </div>
                    <FormError message={error! || urlError} />
                    <FormSuccess message={success!} />

                    <Button
                    disabled={isPending}
                        type="submit"
                        className="w-full"
                    >
                        Login
                    </Button>
                </form>
            </Form>
        </CardWrapper>
    )
}