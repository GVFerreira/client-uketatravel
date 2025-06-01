'use server'

import { api } from "@/http/api-client"

interface Form {
  name: string
  surname: string
  email: string
  subject: string
  message: string
}

interface FormResponse {
  status: boolean
}

export async function sendContactForm(data: Form) {
  const result = await api.post('form-contact', {
    json: data
  }).json<FormResponse>()
  return result
}