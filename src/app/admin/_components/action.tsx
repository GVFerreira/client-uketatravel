import { api } from "@/http/api-client";

interface GetDolarResponse {
  buyQuote: number
  ok: boolean
}

export async function getDolar() {
  const result = api.get('dollar').json<GetDolarResponse>()
  return result
}

interface UpdateDolarRequest {
  buyQuote: number
}

interface UpdateDolarResponse {
  ok: boolean
}
export async function updateDolar(data: UpdateDolarRequest) {
  const result = api.post('dollar', {
    json: data
  }).json<UpdateDolarResponse>()

  return result
}