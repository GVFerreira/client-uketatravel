'use client'

import { Button } from "@/components/ui/button"
import { Form } from "@/components/ui/form"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { z } from "zod"
import { useRouter } from "next/navigation"
import { toast } from "sonner"
import { deleteSolicitation } from "../../actions"
import { Loader2 } from "lucide-react"

const formSchema = z.object({
  id: z.string().uuid()
})

export default function Delete({ data }: { data: { id: string } }) {
  const router = useRouter( )

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      id: data.id
    },
    mode: 'onChange',
  })
  
  async function onSubmit(data: z.infer<typeof formSchema>) {
    try {
      await deleteSolicitation({ id: data.id })

      router.push('/admin/solicitacao')

      toast("Deletado com sucesso", {
        description: "Esta solicitação foi deletada com sucesso"
      })

    } catch(e) {
      console.log(e)
    }
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4 p-4">
        <Button type="submit" disabled={form.formState.isSubmitting} className="bg-red-600 hover:bg-red-500 transition-all">
          {
            form.formState.isSubmitting ? 
              <>
                <Loader2 className="size-5 animate-spin text-muted-foreground"/>
                <span>Deletando...</span>
              </>
              :
              "Deletar solicitação"
          }
          
        </Button>
      </form>
    </Form>
  )
}