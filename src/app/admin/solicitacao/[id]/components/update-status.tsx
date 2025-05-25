'use client'

import { Button } from "@/components/ui/button"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { z } from "zod"
import { useRouter } from "next/navigation"
import { useState } from "react"
import { toast } from "sonner"
import { Input } from "@/components/ui/input"
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
  const [attachment, setAttachment] = useState<string | null>(null)
  const [checkStatusEta, setCheckStatusEta] = useState<boolean>(false)

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

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0]
    if (file) {
      const reader = new FileReader()
      reader.onloadend = () => {
        setAttachment(reader.result as string)
      }
      reader.readAsDataURL(file)
    }
  }

  const handleStatusEta = (selectedOption: any) => {
    if (selectedOption === "Aprovado" || selectedOption === "Recusado") {
      setCheckStatusEta(true)
    } else {
      setCheckStatusEta(false)
    }
  }
  
  async function onSubmit(data: z.infer<typeof formSchema>) {
    try {
      if(attachment) {
        const blob = await (await fetch(attachment)).blob()
        const formData = new FormData()
        formData.append('file', blob, `${new Date().getTime()}_${data.passportNumber}_${data.name}.pdf`)
  
        const uploadResponse = await fetch('/api/upload-eta', {
          method: 'POST',
          body: formData
        })

        const uploadData = await uploadResponse.json()

        if (uploadResponse.ok && uploadData.imagePath) {
          await updateStatus({
            ...data,
            attachmentPath: uploadData.imagePath
          })

          router.refresh()

          toast("Atualizado com sucesso", {
            description: "O status desta solicitação foi atualizado com sucesso"
          })
        }
      } else {
        await updateStatus({
          ...data,
          attachmentPath: null
        })

        router.refresh()

        toast("Atualizado com sucesso", {
          description: "O status desta solicitação foi atualizado com sucesso"
        })
      }
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
                <Select defaultValue={data.status || ""} onValueChange={handleStatusEta}>
                  <SelectTrigger className="w-full">
                    <SelectValue placeholder="Selecionar status" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Em análise">Em análise</SelectItem>
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
        { checkStatusEta &&
            <FormField
            control={form.control}
            name="status"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Anexo da solicitação:</FormLabel>
                <FormControl>
                  <Input
                    {...field}
                    type="file"
                    accept="application/pdf"
                    onChange={handleFileChange}
                    required
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        }

        <Button type="submit">
          Atualizar status
        </Button>
      </form>
    </Form>
  )
}