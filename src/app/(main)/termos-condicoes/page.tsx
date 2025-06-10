import Footer from "../_components/footer"
import Header from "../_components/header"

export default function TermsConditions() {
  return (
    <>
      <Header />
      <main className="container px-4 mx-auto max-w-4xl space-y-8 py-16">
        <div className="text-center">
          <h1 className="text-6xl font-bold text-center mb-4">Termos & Condições</h1>
          <p className="text-xl font-bold mb-2">Passaporte Simples Assessoria e Turismo Ltda.</p>
          <p className="mb-10">Última atualização: 16 de abril de 2025</p>
          <p>Seja bem-vindo ao site uketavistos.com, operado por Passaporte Simples Assessoria e Turismo Ltda., inscrita no CNPJ sob o nº 52.427.303/0001-99, com sede no Brasil e registrada no CADASTUR do Ministério do Turismo.</p>
          <p>Ao utilizar nossos serviços, você concorda com os seguintes termos e condições:</p>
        </div>
        <hr />
        <div>
          <h2 className="text-4xl font-bold mb-4">1. Serviço Prestado</h2>
          <p>Prestamos <b>assistência especializada para solicitação da ETA (Autorização Eletrônica de Viagem) do
          Reino Unido</b>. Nosso serviço inclui:</p>
          <ul className="list-disc ml-6">
            <li>Análise das informações fornecidas pelo cliente;</li>
            <li>Preenchimento e acompanhamento da solicitação no site oficial do governo britânico (<a className="underline font-bold" href="https://gov.uk">gov.uk</a>);</li>
            <li>Envio do resultado por e-mail ao cliente.</li>
          </ul>
          <p><b>Importante</b>: Não somos um escritório de advocacia, não oferecemos consultoria jurídica, não intermediamos processos legais e <b>não enviamos solicitações em nome dos clientes</b>. Nosso serviço é estritamente consultivo e de suporte.</p>
        </div>
        <hr />
        <div>
          <h2 className="text-4xl font-bold mb-4">2. Taxas</h2>
          <p>A taxa cobrada pelo governo britânico para emissão da ETA é de <b>USD 21,60</b>, paga diretamente ao site
          oficial.</p>
          <p>Nosso serviço de assistência possui uma taxa de <b>USD 47,00</b>, que <b>não</b> está incluso a taxa do Governo,
          conforme informado no rodapé do site e durante o processo de checkout.</p>
        </div>
        <hr />
        <div>
          <h2 className="text-4xl font-bold mb-4">3. Prazos de Entrega</h2>
          <p>O prazo para análise e envio do resultado ao cliente é de até <b>72 horas úteis</b> após a confirmação do
          pagamento.</p>
        </div>
        <hr />
        <div>
          <h2 className="text-4xl font-bold mb-4">4. Suporte</h2>
          <p>Nosso atendimento é realizado exclusivamente via e-mail, por meio do endereço: <a className="underline font-bold" href="mailto:support@traveler-assist.com">support@traveler-assist.com</a>.</p>
          <p>O suporte está disponível <b>24 horas</b> por dia, <b>7 dias</b> por semana.</p>
        </div>
        <hr />
        <div>
          <h2 className="text-4xl font-bold mb-4">5. Responsabilidades</h2>
          <ul className="list-disc ml-6">
            <li>Não garantimos a <b>aprovação da ETA</b>, pois a decisão é exclusiva das autoridades britânicas.</li>
            <li>
              <p>Não nos responsabilizamos por:</p>
              <ul className="ml-6 list-decimal">
                <li>Dados incorretos ou incompletos fornecidos pelo cliente;</li>
                <li>Problemas técnicos no site do governo britânico;</li>
                <li>Recusas motivadas por histórico migratório, antecedentes ou outros critérios aplicados
                pelas autoridades do Reino Unido;</li>
                <li>Atrasos causados por fatores externos à nossa operação.</li>
              </ul>
            </li>
          </ul>
        </div>
        <hr />
        <div>
          <h2 className="text-4xl font-bold mb-4">6. Reembolsos</h2>
          <p>Oferecemos <b>reembolso integral</b> da taxa de assistência em caso de <b>recusa da solicitação</b>, desde que:</p>
          <ul className="list-disc ml-6">
            <li>Não tenha havido recusas anteriores para o mesmo viajante;</li>
            <li>O cliente não tenha solicitado o reembolso após o prazo de <b>72 horas</b> a contar da confirmação do
            pagamento.</li>
          </ul>
          <p>Para mais detalhes, consulte nossa <a className="underline font-bold" href="/politica-reembolso">Política de Reembolso</a>.</p>
        </div>
        <hr />
        <div>
          <h2 className="text-4xl font-bold mb-4">7. Privacidade e Dados Pessoais</h2>
          <ul className="list-disc ml-6">
            <li>Os dados fornecidos são armazenados por até 2 dias e, em seguida, permanentemente
            excluídos.</li>
            <li>Não compartilhamos dados com terceiros sob nenhuma circunstância.</li>
            <li>Utilizamos <b>cookies</b> em nosso site para melhorar a navegação e a experiência do usuário. Ao
            continuar usando o site, você concorda com o uso de cookies.</li>
          </ul>
        </div>
        <hr />
        <div>
          <h2 className="text-4xl font-bold mb-4">8. Modificações</h2>
          <p>A <b>Passaporte Simples</b> reserva-se o direito de alterar estes termos a qualquer momento. As alterações
          passam a valer a partir da data de publicação no site.</p>
        </div>
      </main>
      <Footer />
    </>
  )
}