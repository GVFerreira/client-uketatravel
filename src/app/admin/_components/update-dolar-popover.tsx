'use client'

import { Button } from "@/components/ui/button";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { zodResolver } from "@hookform/resolvers/zod";
import { DollarSign, Loader2 } from "lucide-react";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { getDolar, updateDolar } from "./action";
import { toast } from "sonner";

const formSchema = z.object({
  buyQuote: z.coerce.number().positive("Valor deve ser maior que zero"),
})

export default function UpdateDolarPopover() {
  const [open, setOpen] = useState(false)
  
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    mode: 'onChange',
    defaultValues: {
      buyQuote: 0
    }
  })

  // Carrega a cotação atual ao montar
  useEffect(() => {
    async function loadDolar() {
      const dolar = await getDolar()
      if (dolar?.buyQuote) {
        form.reset({ buyQuote: dolar.buyQuote })
      }
    }

    loadDolar()
  }, [form])

  async function onSubmit(data: z.infer<typeof formSchema>) {
    try {
      const updated = await updateDolar(data)

      if (updated && updated.ok) {
        toast("Dólar atualizado", {
          icon: '✅',
          description: `Nova cotação: R$ ${data.buyQuote.toFixed(3)}`
        })
      } else {
        toast("Erro ao atualizar o dólar", {
          icon: '❌',
          description: 'No momento não foi possível atualizar a cotação do dólar. Tente novamente mais tarde'
        })
      }
    } catch (error) {
      console.error(error)
      toast("Erro inesperado ao atualizar o dólar", {
        icon: '❌',
        description: 'Contate o desenvolvedor para ciência e resolução.'
      })
    }
  }

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger className="flex items-center gap-3 rounded-lg px-3 transition-all hover:text-muted-foreground">
        <DollarSign className="size-5" />
        Dólar
      </PopoverTrigger>
      <PopoverContent className="ml-6 flex flex-col items-end">
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="grid gap-4 py-4 w-full">
            <FormField
              control={form.control}
              name="buyQuote"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Cotação do dólar</FormLabel>
                  <FormControl>
                    <Input
                      {...field}
                      type="number"
                      step="0.01"
                      required
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <Button type="submit" size="sm" className="w-fit ml-auto" disabled={form.formState.isSubmitting}>
              {
                form.formState.isSubmitting ? 
                <>
                  Atualizando dólar
                  <Loader2 className="size-4 animate-spin ml-2" />
                </> :
                "Atualizar dólar"
              }
            </Button>
          </form>
          <Button variant="destructive" size="sm" type="button" onClick={() => setOpen(false)}>
            Cancelar
          </Button>
        </Form>
      </PopoverContent>
    </Popover>
  )
}
