import axios from "axios"
import type { Company } from "../../../features/profile/profileSlice"

export interface RegisterForm {
  email: string
  password: string
  username: string
  firstName: string
  lastName: string | null
  middleName: string | null
  bio: string
  role: "ALUMNI"
  graduationYear: number
  companies: Company[]
}

export const registerUser = async (formData: RegisterForm) => {
  try {
    const response = await axios.post(
      "http://localhost:8080/api/user/register",
      JSON.stringify(formData),
    )
    return response.data
  } catch (error) {
    alert(error)
  }
}
