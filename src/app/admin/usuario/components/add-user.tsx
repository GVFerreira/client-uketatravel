'use client'

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Sheet, SheetClose, SheetContent, SheetDescription, SheetFooter, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet"
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { z } from "zod"
import { useState } from "react"
import { useRouter } from "next/navigation"
import { createUser } from "../action"
import { toast } from "sonner"

const formSchema = z.object({
  name: z.string().min(3, { message: 'Digite um nome válido' }),
  email: z.string().email({ message: 'Digite um e-mail válido' }),
  password: z.string().min(8, { message: 'Sua senha deve conter ao menos 8 caracteres' }),
  passwordCheck: z.string().min(8, { message: 'Sua senha deve conter ao menos 8 caracteres' }),
}).refine((data) => data.password === data.passwordCheck, {
  message: 'As senhas não conferem',
  path: ['passwordCheck']
})


export default function AddUser() {
  const [sheetOpen, setSheetOpen] = useState(false)
  const router = useRouter()

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    mode: 'onChange'
  })

  async function onSubmit(data: z.infer<typeof formSchema>) {
    const request = await createUser({name: data.name, email: data.email, password: data.password})

    function success() {
      setSheetOpen(false)
      router.refresh()
      toast('Usuário criado com sucesso')
    }

    function failure() {
      toast('Um usuário com esse e-mail já existe', {
        description: 'Digite outro e-mail'
      })
    }

    if(request.status === 201) {
      success()
    } else {
      failure()
    }
    
  }

  return(
    <Sheet open={sheetOpen} onOpenChange={setSheetOpen}>
      <SheetTrigger asChild>
        <Button size="sm">
          Adicionar usuário
        </Button>
      </SheetTrigger>
      <SheetContent>
        <SheetHeader>
          <SheetTitle>Usuário</SheetTitle>
          <SheetDescription>
            Adicione mais perfis para sua aplicação
          </SheetDescription>
        </SheetHeader>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="grid gap-4 py-4">
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Nome</FormLabel>
                  <FormControl>
                    <Input
                      {...field}
                      placeholder="Ex: João Silva"
                      minLength={3}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>E-mail</FormLabel>
                  <FormControl>
                    <Input
                      {...field}
                      placeholder="Ex: contato@ukvistos.com"
                      type="email"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="password"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Senha</FormLabel>
                  <FormControl>
                    <Input
                      {...field}
                      minLength={8}
                      type="password"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="passwordCheck"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Confirmar senha</FormLabel>
                  <FormControl>
                    <Input
                      {...field}
                      minLength={8}
                      type="password"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <Button type="submit" size="sm" className="w-fit ml-auto" disabled={form.formState.isSubmitting}>
              {
                form.formState.isSubmitting ? "Cadastrando usuário" : "Adicionar"
              }
            </Button>
          </form>
          <SheetFooter>
            <SheetClose asChild>
              <Button variant="destructive" size="sm">
                Cancelar
              </Button>
            </SheetClose>
          </SheetFooter>
        </Form>
      </SheetContent>
    </Sheet>
  )
}