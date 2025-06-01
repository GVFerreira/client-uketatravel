import { Card, CardContent } from "@/components/ui/card"
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel"
import Autoplay from "embla-carousel-autoplay"

export default function Testemonial() {
  const testemonials = [
    {
      name: "Lucas V.",
      location: "Recife / PE",
      quote:
        "O processo foi incrivelmente tranquilo. Recebi minha ETA do Reino Unido em menos de 24 horas e não tive nenhum problema durante minha viagem a Londres. Recomendo muito!",
      rating: 4,
    },
    {
      name: "Thiago C.",
      location: "Porto Alegre / RS",
      quote:
        "Eu estava preocupado em cometer erros na minha aplicação, mas o serviço de revisão identificou um erro que eu teria deixado passar. Valeu cada centavo!",
      rating: 5,
    },
    {
      name: "Felipe R.",
      location: "Brasília / DF",
      quote:
        "Como viajante frequente a negócios para o Reino Unido, esse serviço me economizou muito tempo. A equipe de suporte foi muito prestativa quando tive dúvidas.",
      rating: 5,
    },
    {
      name: "Renata A.",
      location: "Curitiba / PR",
      quote:
        "O atendimento foi excelente do início ao fim. Tiraram todas as minhas dúvidas por e-mail e ainda revisaram meu formulário antes do envio. Me senti muito mais seguro.",
      rating: 5,
    },
    {
      name: "Mariana T.",
      location: "São Paulo / SP",
      quote:
        "Tive um problema com um dado que preenchi errado, mas a equipe detectou antes do envio e me ajudou a corrigir. Se não fosse por isso, eu teria perdido tempo e dinheiro.",
      rating: 5,
    },
    {
      name: "Lucas M.",
      location: "Belo Horizonte / MG",
      quote:
        "Excelente custo-benefício. Paguei pelo serviço com revisão e valeu cada centavo. Tudo aprovado rapidamente e sem dor de cabeça.",
      rating: 4,
    },
    {
      name: "Maria G.",
      location: "Fortaleza / CE",
      quote:
        "O processo todo levou menos de um dia. Recebi minha ETA e já estava com tudo pronto para embarcar. Atendimento rápido, claro e muito eficiente.",
      rating: 5,
    }
  ]

  return (
    <Carousel 
      opts={{
        loop: true
      }}
      plugins={[
        Autoplay({
          delay: 2000,
        }),
      ]}
    >
      <CarouselContent className="-ml-8">
        { testemonials.map((testimonial, index) => (
          <CarouselItem key={index} className="basis-2/3 lg:basis-1/3 pl-8 my-6">
            <Card className="border-none shadow-xl">
              <CardContent className="p-6">
                <div className="flex mb-4">
                  {Array(testimonial.rating)
                    .fill(0)
                    .map((_, i) => (
                      <svg key={i} className="w-5 h-5 text-yellow-500" fill="currentColor" viewBox="0 0 20 20">
                        <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                      </svg>
                    ))}
                </div>
                <p className="text-muted-foreground mb-4 italic">"{testimonial.quote}"</p>
                <div className="flex items-center">
                  <div className="w-10 h-10 bg-blue-100 dark:bg-blue-950/50 rounded-full flex items-center justify-center text-blue-600 dark:text-blue-500 font-semibold">
                    {testimonial.name.charAt(0)}
                  </div>
                  <div className="ml-3">
                    <h4 className="font-medium">{testimonial.name}</h4>
                    <p className="text-sm text-muted-foreground">{testimonial.location}</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </CarouselItem>
        ))}
      </CarouselContent>
      <CarouselPrevious />
      <CarouselNext />
    </Carousel>

    
  )
}