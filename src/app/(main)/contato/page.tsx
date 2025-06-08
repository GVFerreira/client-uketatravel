import Header from "../_components/header"
import Footer from "../_components/footer"
import { MessageSquare } from "lucide-react"
import FormContact from "./form"

export default function Contact () {
  return (
    <div className="flex min-h-screen flex-col">
      <Header />
      <main className="flex-1">
        {/* Contact Section */}
        <section className="py-20 mx-4 bg-background">
          <div className="container m-auto">
            <div className="grid md:grid-cols-2 gap-12 items-start">
            <div className="bg-muted p-8 rounded-lg">
                <h3 className="text-xl font-semibold mb-6">Nos envie uma mensagem</h3>
                <FormContact />
              </div>
              <div>
                <h2 className="text-3xl md:text-4xl font-bold mb-6">Precisa de ajuda?</h2>
                <p className="text-lg text-muted-foreground mb-6">
                  Nossa dedicada equipe está disponível para você através dos canais abaixo para sanar suas dúvidas sobre a aplicação do ETA do Reino Unido.
                </p>
                <div className="space-y-6">
                  <div className="flex items-start gap-4">
                    <div className="w-10 h-10 rounded-full bg-blue-100 dark:bg-blue-950/50 flex items-center justify-center text-blue-600 dark:text-blue-500">
                      <MessageSquare className="size-5" />
                    </div>
                    <div>
                      <h3 className="font-medium mb-1">E-mail</h3>
                      <a href="mailto:support@traveler-assist.com" className="text-muted-foreground">support@traveler-assist.com</a>
                      <p className="text-sm text-muted-foreground">Envie e-mail a qualquer momento que responderemos o mais breve possível.</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  )
}