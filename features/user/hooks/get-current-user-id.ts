import { auth } from "@/auth"

export const getCurrentUserId = async () => {
  const session = await auth()
 
  if (!session?.user) return null
 
  return session.user.id
}