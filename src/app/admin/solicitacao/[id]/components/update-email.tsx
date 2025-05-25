'use client'

import { Button } from "@/components/ui/button"
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { z } from "zod"
import { useRouter } from "next/navigation"
import { toast } from "sonner"
import { Input } from "@/components/ui/input"
import { updateEmail } from "../../actions"
import { Loader2 } from "lucide-react"

interface UpdateEmail {
  id: string
  email: string
}

const formSchema = z.object({
  id: z.string().uuid(),
  email: z.string().email({ message: 'Digite um e-mail válido' }),
})

export default function UpdateEmail({data}: {data: UpdateEmail}) {
  const router = useRouter( )

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      id: data.id,
      email: data.email
    },
    mode: 'onChange',
  })
  
  async function onSubmit(data: z.infer<typeof formSchema>) {
    try {
      console.log(data)
      await updateEmail({
        ...data,
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
          name="email"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Novo e-mail:</FormLabel>
              <FormControl>
                <Input
                  {...field}
                  onChange={(e) => {
                    field.onChange(e.target.value)
                  }}
                  required
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <Button type="submit" disabled={form.formState.isSubmitting}>
          {
            form.formState.isSubmitting ? 
              <>
                <Loader2 className="size-5 animate-spin text-muted-foreground"/>
                <span>Atualizando...</span>
              </>
              :
              "Atualizar e-mail"
          }
          
        </Button>
      </form>
    </Form>
  )
}