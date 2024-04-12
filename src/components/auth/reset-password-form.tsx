"use client"

import { z } from "zod"

import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { FormControl, Form, FormField, FormItem, FormLabel, FormMessage } from "../ui/form"
import { CardWrapper } from "./card-wrapper"
import { LoginSchemas, ResetPasswordSchemas } from "@/schemas"
import { Input } from "../ui/input"
import { Button } from "../ui/button"
import { FormError } from "../form-error"
import { FormSuccess } from "../form-success"
import { login } from "@/actions/login"
import { useState, useTransition } from "react"



export const ResetPassword = () => {



    const [error, setError]=useState<string | undefined>('')
    const [success, setSuccess]=useState<string | undefined>('')

    const [isPending, startTransition]=useTransition()
    const form = useForm<z.infer<typeof ResetPasswordSchemas>>({
        resolver: zodResolver(ResetPasswordSchemas),
        defaultValues: {
            email: "",
            
        }
    })

    //  GET OUR INPUTS VALUES
    const onSubmit = (values: z.infer<typeof ResetPasswordSchemas>) => {
// after submitting we want to go ahead and clear all errors and all success
setError("")
setSuccess("")


        // startTransition(()=>{
        //     login(values)
        //     .then((data)=>{
        //         setError(data?.error);
        //             //TODO : Add when we add  2FA
        //         setSuccess(data?.success)
        //     })
        // })
    }

    return (
        <CardWrapper headerLabel="Reset Your Password" backButtonLabel="No need resetting?" backButtonHref="/auth/login" >
     
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

                    </div>
                    <FormError message={error!} />
                    <FormSuccess message={success!} />

                    <Button
                    disabled={isPending}
                        type="submit"
                        className="w-full"
                    >
                       Change password
                    </Button>
                </form>
            </Form>
        </CardWrapper>
    )
}