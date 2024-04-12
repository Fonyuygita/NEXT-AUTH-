"use client"
import { useRouter } from "next/navigation";

interface LoginButtonProps {
    children: React.ReactNode;
    mode?: "modal" | "redirect";
    asChild?: boolean;

}

export const LoginButton = ({
    children,
    mode = "redirect",
    asChild
}: LoginButtonProps) => {

    const router = useRouter()

    const handleClick = () => {
        console.log("Login button clicked")
        router.push("/auth/login")
    }

    if (mode == "modal") {
        return (
            <span>TODO LIST EXPRESSED</span>
        )
    }

    return (
        <span onClick={handleClick} className="cursor-pointer">
            {children}
        </span>
    )

}