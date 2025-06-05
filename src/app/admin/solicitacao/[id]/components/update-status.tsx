'use client'

import { Button } from "@/components/ui/button"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { z } from "zod"
import { useRouter } from "next/navigation"
import { toast } from "sonner"
import { updateStatus } from "../../actions"

interface updateStatus {
  id: string
  name: string
  email: string
  status: string | null
  passportNumber: string
}

const formSchema = z.object({
  id: z.string().uuid(),
  name: z.string().min(3, { message: 'Digite um nome válido' }),
  email: z.string().email({ message: 'Digite um e-mail válido' }),
  status: z.string(),
  passportNumber: z.string()
})

export default function UpdateStatus({data}: {data: updateStatus}) {
  const router = useRouter( )

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    mode: 'onChange',
    defaultValues: {
      id: data.id,
      name: data.name,
      email: data.email,
      passportNumber: data.passportNumber
    },
  })
  
  async function onSubmit(data: z.infer<typeof formSchema>) {
    try {
      await updateStatus({
        ...data,
        attachmentPath: ""
      })

      router.refresh()

      toast("Atualizado com sucesso", {
        description: "O status desta solicitação foi atualizado com sucesso"
      })
    } catch(e) {
      console.log(e)
    }
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4 p-4">
        <FormField
          control={form.control}
          name="status"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Status da solicitação:</FormLabel>
              <FormControl>
                <Select defaultValue={data.status || ""} onValueChange={(value) => { field.onChange(value) }}>
                  <SelectTrigger className="w-full">
                    <SelectValue placeholder="Selecionar status" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Solicitação em análise interna">Solicitação em análise interna</SelectItem>
                    <SelectItem value="Recebido pelo Governo UK">Recebido pelo Governo UK</SelectItem>
                    <SelectItem value="Aprovado">Aprovado</SelectItem>
                    <SelectItem value="Recusado">Recusado</SelectItem>
                  </SelectContent>
                </Select>
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <Button type="submit">
          Atualizar status
        </Button>
      </form>
    </Form>
  )
}