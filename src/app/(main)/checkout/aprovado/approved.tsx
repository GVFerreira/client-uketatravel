import Link from "next/link"

import { CheckCircle, Tickets } from "lucide-react"
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle
} from "@/components/ui/card"
import { Button } from "@/components/ui/button"

export function ApprovedContent() {
  return (
    <main className="flex-1 flex items-center justify-center py-12 px-4 md:px-6">
      <Card className="w-full max-w-md">
        <CardHeader className="text-center">
          <div className="mx-auto mb-4 bg-primary/10 w-16 h-16 rounded-full flex items-center justify-center">
            <CheckCircle className="w-8 h-8 text-green-600" />
          </div>
          <CardTitle className="text-2xl font-bold">Sua solicitação de inscrição para obter o ETA do Reino Unido foi registrada com sucesso!</CardTitle>
          <CardDescription>Sua solicitação foi concluída com sucesso</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="bg-muted p-4 rounded-lg">
            <h3 className="font-semibold mb-2">Detalhes da compra:</h3>
            <p>Data da compra: {new Date().toLocaleDateString("pt-BR")}</p>
          </div>
          <p className="text-center text-muted-foreground">
            Assim que o pagamento for processado, sua inscrição começará. Sugerimos que você fique de olho na sua caixa de entrada de e-mail, conforme indicado durante o processo de inscrição, para futuras comunicações e atualizações relacionadas ao seu pedido.
          </p>
          <p className="text-center text-muted-foreground">
            Se você deseja adicionar uma nova pessoa, clique no botão abaixo:
          </p>
        </CardContent>
        <CardFooter className="flex justify-center">
          <Link href="/form">
            <Button className="w-full">
              <Tickets className="mr-2 size-4" />
              Adicionar novo solicitante
            </Button>
          </Link>
        </CardFooter>
      </Card>
    </main>
  )
}