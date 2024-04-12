import { auth, signOut } from "@/auth"


const page = async () => {
  const session = await auth()

  return (
    <div>
      Setting Page
      {JSON.stringify(session)}

      {/* form to log user out */}
      <form
        action={async () => {
          "use server"
          await signOut();

        }}>
        <button type="submit" className="bg-blue-500 text-white p-2 rounded-md">Logout</button>

      </form>

    </div>
  )
}

export default page
