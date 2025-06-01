import Footer from "../_components/footer"
import Header from "../_components/header"

export default function PrivacyPolicy() {
  return (
    <>
      <Header />
      <main className="container mx-auto max-w-4xl space-y-8 py-16">
        <div className="text-center">
          <h1 className="text-6xl font-bold text-center mb-4">Política de Reembolso</h1>
          <p className="text-xl font-bold mb-2">Passaporte Simples Assessoria e Turismo Ltda.</p>
          <p className="mb-10">Última atualização: 16 de abril de 2025</p>
          <p>Esta Política de Reembolso aplica-se aos serviços prestados por Passaporte Simples Assessoria e Turismo Ltda., operadora do site ukvistos.com, especializada em assistência na solicitação da ETA (Autorização Eletrônica de Viagem) para o Reino Unido.</p>
        </div>
        <hr />
        <div>
          <h2 className="text-4xl font-bold mb-4">1. Condições para Reembolso</h2>
          <p className="mb-2">O cliente poderá solicitar o reembolso da <b>taxa de assistência</b> nos seguintes casos:</p>
          <p className="font-bold">a) Recusa da solicitação pela autoridade britânica</p>
          <p>Oferecemos <b>reembolso integral</b> da taxa de assistência <b>(USD 47,00)</b> caso a ETA seja recusada <b>mesmo após a verificação e preenchimento feitos por nossa equipe</b>.</p>
          <p><b>Importante:</b></p>
          <ul className="list-disc ml-6">
            <li>A taxa de <b>USD 12,90</b> paga diretamente ao governo britânico não é reembolsável.</li>
            <li>O reembolso <b>somente será realizado</b> se <b>não houver recusas anteriores</b> para a mesma
            pessoa (mesmo nome, passaporte e dados pessoais).</li>
          </ul>
          <p className="font-bold">b) Solicitação de cancelamento antes do início da análise</p>
          <p>O cliente poderá solicitar o cancelamento e reembolso da taxa de assistência <b>somente se a solicitação
          for feita antes do início do processo de análise</b> por nossa equipe.</p>
          <p>Como o prazo para entrega do serviço é de até 72 horas, <b>a solicitação de cancelamento deve ser feita dentro de no máximo 6 horas após a confirmação do pagamento</b>. Após esse período, consideramos o processo iniciado.</p>
        </div>
        <hr />
        <div>
          <h2 className="text-4xl font-bold mb-4">2. Como solicitar o reembolso</h2>
          <p>O cliente deve enviar um e-mail para <a className="underline font-bold" href="mailto:support@traveler-assist.com">support@traveler-assist.com</a>, com o seguinte assunto: <br /><b>"Solicitação de Reembolso – [Nome do Viajante]"</b></p>
          <p>O e-mail deve conter:</p>
          <ul className="list-disc ml-6">
            <li>Nome completo;</li>
            <li>Número do passaporte utilizado na solicitação;</li>
            <li>E-mail utilizado na compra;</li>
            <li>Motivo da solicitação.</li>
          </ul>
          <p>Nos comprometemos a analisar os pedidos em até <b>5 dias úteis</b>, e, se aprovado, o reembolso será
          processado pelo mesmo método de pagamento utilizado no checkout.</p>
        </div>
        <hr />
        <div>
          <h2 className="text-4xl font-bold mb-4">3. Situações em que o reembolso não será concedido</h2>
          <ul className="list-disc ml-6">
            <li>Solicitação feita após a análise e preenchimento já terem sido iniciados;</li>
            <li> Dados incorretos fornecidos pelo cliente que tenham causado a recusa;</li>
            <li>Recusas anteriores do mesmo solicitante;</li>
            <li>Solicitações incompletas, sem os dados necessários para identificação do pedido;</li>
            <li>Mudança de planos de viagem sem relação com a autorização em si.</li>
          </ul>
        </div>
        <hr />
      </main>
      <Footer />
    </>
  )
}