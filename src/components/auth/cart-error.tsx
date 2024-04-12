import { Card, CardFooter, CardHeader } from "../ui/card"
// import { CardWrapper } from "./card-wrapper"
import { FaExclamationTriangle } from "react-icons/fa"
import { Header } from "./header"
import { BackButton } from "./back-button"

export const ErrorCard=()=>{
    return(

        <Card className="w-[400px] shadow-md">
     <CardHeader>
        <Header label="Oops! Something went wrong!"/>
     </CardHeader>
     <CardFooter>
        <BackButton label="Back to login" href="/auth/login"/>
        <div className="w-full flex justify-center items-center">
<FaExclamationTriangle className="text-destructive"/>
            </div>
     </CardFooter>
        </Card>
    )
}