'use client'


import Image from 'next/image'

export default function FooterCKT () {
  return (
    <footer className="bg-gray-900 text-gray-300">
      <div className="container px-4 mx-auto py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div>
            <div className="flex items-center gap-2 mb-4">
              <div className="bg-white rounded-xl md:w-6/12 w-1/2">
                <Image src="/uketatravel.png" width={300} height={99} alt="UK ETA Vistos" className="w-full px-6 py-2" />
              </div>
            </div>
            <p className="text-gray-400 mb-4">
              Assistência profissional para a sua aplicação.
            </p>
          </div>
        </div>
        <div className="border-t border-gray-800 mt-12 pt-8 text-sm text-gray-400">
          <p className="mb-2 text-center md:text-right">
            <b>ukvistos.com</b> é um site pertencente à <b>Passaporte Simples Assessoria e Turismo Ltda.</b>, uma agência de viagens e turismo com sede no Brasil, registrada no <b>CADASTUR</b> do Ministério do Turismo. Importante: o site <b>ukvistos.com</b> é especializado em oferecer <b>assistência na solicitação da ETA do Reino Unido</b> e outras autorizações de viagem. <b>Não somos um escritório de advocacia, não oferecemos aconselhamento jurídico, não intermediamos o processo nem enviamos solicitações em nome dos clientes</b>. Nosso serviço consiste em <b>verificar as informações fornecidas</b>, identificar possíveis <b>erros ou omissões</b> e orientar o cliente para preencher corretamente o formulário no site oficial do governo britânico (<a className="underline font-bold" href="https://gov.uk" target="_blank">gov.uk</a>). A taxa da ETA é de <b>USD 21,60</b>, paga diretamente ao governo. Nossa taxa de assistência é de <b>USD 47,00</b>. Oferecemos <b>suporte ao cliente 24 horas por dia, 7 dias por semana</b>, no seu idioma, para esclarecer dúvidas e garantir que sua solicitação esteja <b>livre de erros que possam causar atrasos ou recusas</b>. Se sua solicitação for negada mesmo após nossa verificação, <b>reembolsamos 100% do valor do
            serviço</b>, desde que <b>não tenha havido recusas anteriores para o mesmo viajante</b>. Para mais informações, <a className="underline font-bold" href="/contato">clique aqui</a>.
          </p>
          <p>© {new Date().getFullYear()} UK ETA Vistos. Todos os direitos reservados.</p>
        </div>
      </div>
    </footer>
  )
}