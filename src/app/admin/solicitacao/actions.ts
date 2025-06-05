import { api } from "@/http/api-client"


export interface GetSolicitationsResponse {
  id: string
  name: string
  surname: string
  passportNumber: string
  phone: string
  email: string
  dateOfBirth: Date
  passportExpiryDate: Date
  nationality: string
  passportCountryOfIssue: string
  address: string
  city: string
  zipCode: number
  country: string
  otherNationality: string | null
  occupation: string | null
  hasCriminalConviction: boolean
  hasCriminalConvictionLastYear: boolean
  crimeHasBeenConvicted: string | null
  countryCrimeHasBeenConvicted: string | null
  convictedMoreThanOneYear: boolean
  hasEverConvictedMoreThanOneYear: boolean
  crimeConvictedMoreThanOneYear: string | null
  countryConvictedMoreThanOneYear: string | null
  initialDateConvictedMoreThanOneYear: Date | null
  endDateConvictedMoreThanOneYear: Date | null
  whichSituationWasInvolvedIn: string | null

  profilePhotoUrl: string | null
  passaportUrl: string | null

  status: string | null
  createdAt: Date
  updatedAt: Date

  payment: [
    { payment: {
        status: string
        createdAt: Date
        transactionAmount: number,
        paymentTypeId: string,
        docType: string,
        docNumber: string
    }}
  ]
}

export async function getSolicitations() {
  const result = await api.get('solicitations').json<GetSolicitationsResponse[]>()

  return result
}

export async function getSolicitation(id: string) {
  const result = await api.post('solicitation', {
    json: {
      solicitationId: id
    }
  }).json<GetSolicitationsResponse>()

  return result
}

export async function updateStatus(data: {id: string, name: string, status: string, email: string, attachmentPath: string | null}) {
  try {
    const update = await api.put('solicitation/update-status', {
      json: {
        id: data.id,
        status: data.status,
        attachmentPath: data.attachmentPath
      }
    }).json()

    return update
  } catch(e) {
    console.log(e)
    return null
  }
}

interface updateEmailResponse {
  solicitationId: string
}

export async function updateEmail({ id, email }: {id: string, email: string}) {
  try {
    const update = await api.put('solicitation/update-email', {
      json: {
        id,
        email
      }
    }).json<updateEmailResponse>()

    return update
  } catch(e) {
    console.log(e)
    return null
  }
}

export async function deleteSolicitation({ id }: {id: string}) {
  try {
    const update = await api.delete('solicitation/delete', {
      json: {
        id
      }
    }).json()

    return update
  } catch(e) {
    console.log(e)
    return null
  }
}
