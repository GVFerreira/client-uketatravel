'use client'

import { Button } from "@/components/ui/button"
import { z } from "zod"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Loader2, Send } from "lucide-react"
import { sendContactForm } from "./action"
import { toast } from "sonner"

const formSchema = z.object({
  name: z.string().min(3, {
    message: 'Digite um nome válido'
  }),
  surname: z.string().min(2, {
    message: 'Digite um nome válido'
  }),
  email: z.string().email(),
  subject: z.string(),
  message: z.string()
})

export default function FormContact () {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: '',
      surname: '',
      email: '',
      subject: '',
      message: ''
    }
  })

  async function onSubmit(data: z.infer<typeof formSchema>) {
    try {
      const sending = await sendContactForm(data)
      if(sending.status) {
        toast('Sucesso', {
          icon: '✅',
          description: 'O formulário foi enviado com sucesso. Em breve a nossa equipe retornará o seu contato.',
          duration: 7000
        })

        form.reset()
      } else {
        toast('Erro', {
          icon: '❌',
          description: 'Erro ao enviar o formulário. Revise suas informações e tente novamente mais tarde.',
          duration: 7000
        })
      }
    } catch(e) {
      console.log(e)
      toast('Erro', {
        icon: '❌',
        description: 'Erro ao enviar o formulário. Revise suas informações e tente novamente mais tarde.',
        duration: 7000
      })
    }
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <FormField
            control={form.control}
            name="name"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Nome</FormLabel>
                <FormControl>
                  <Input
                    {...field}
                    required
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="surname"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Sobrenome</FormLabel>
                <FormControl>
                  <Input
                    {...field}
                    required
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem>
                <FormLabel>E-mail</FormLabel>
                <FormControl>
                  <Input
                    {...field}
                    type="email"
                    required
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="subject"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Assunto</FormLabel>
                <FormControl>
                  <Input
                    {...field}
                    required
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>
        
        <FormField
          control={form.control}
          name="message"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Assunto</FormLabel>
              <FormControl>
                <Textarea
                  className="resize-none"
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <Button className="bg-blue-600 hover:bg-blue-700 dark:bg-blue-600 dark:hover:bg-blue-700 text-white" disabled={form.formState.isSubmitting}>
          {
            form.formState.isSubmitting ?
              <>
                Enviando
                <Loader2 className="size-4 animate-spin" />
              </>
              :
              <>
                Enviar mensagem
                <Send className="size-4" />
              </>
          }
        </Button>
      </form>
    </Form>
  )
}