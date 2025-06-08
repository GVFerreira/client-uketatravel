import Footer from "../_components/footer"
import Header from "../_components/header"

export default function PrivacyPolicy() {
  return (
    <>
      <Header />
      <main className="container px-4 mx-auto max-w-4xl space-y-8 py-16">
        <div className="text-center">
          <h1 className="text-6xl font-bold text-center mb-4">Política de Privacidade</h1>
          <p className="text-xl font-bold mb-2">Passaporte Simples Assessoria e Turismo Ltda.</p>
          <p className="mb-10">Última atualização: 16 de abril de 2025</p>
          <p>A Passaporte Simples Assessoria e Turismo Ltda., operadora do site ukvistos.com, está comprometida em proteger a sua privacidade e garantir a segurança dos seus dados pessoais. Esta Política de Privacidade explica como coletamos, usamos, armazenamos e protegemos as suas informações ao utilizar nossos serviços.</p>
        </div>
        <hr />
        <div>
          <h2 className="text-4xl font-bold mb-4">1. Informações que Coletamos</h2>
          <p>Coletamos os dados pessoais que você nos fornece ao preencher nosso formulário de solicitação, tais
          como:</p>
          <ul className="list-disc ml-6">
            <li>Nome completo;</li>
            <li>Dados do passaporte;</li>
            <li>Endereço de e-mail;</li>
            <li>Outros dados necessários para a solicitação da ETA.</li>
          </ul>
          <p>Além disso, coletamos informações técnicas automaticamente por meio de cookies durante a navegação
          em nosso site.</p>
        </div>
        <hr />
        <div>
          <h2 className="text-4xl font-bold mb-4">2. Como Usamos Seus Dados</h2>
          <p>Utilizamos os seus dados para:</p>
          <ul className="list-disc ml-6">
            <li>Realizar a análise e assistência na solicitação da ETA junto ao site oficial do governo do Reino
            Unido;</li>
            <li>Enviar comunicações relacionadas ao serviço prestado, como confirmação de pagamento,
            andamento e resultado da solicitação;</li>
            <li>Melhorar a sua experiência em nosso site por meio do uso de cookies.</li>
          </ul>
        </div>
        <hr />
        <div>
          <h2 className="text-4xl font-bold mb-4">3. Armazenamento e Retenção de Dados</h2>
          <p>Seus dados pessoais são armazenados de forma segura por um período máximo de <b>2 dias</b> após a
          conclusão do serviço, após o qual são <b>permanentemente excluídos</b> de nossos sistemas.</p>
        </div>
        <hr />
        <div>
          <h2 className="text-4xl font-bold mb-4">4. Compartilhamento de Dados</h2>
          <p>Garantimos que <b>NÃO</b> compartilhamos, vendemos ou alugamos seus dados pessoais para terceiros.</p>
        </div>
        <hr />
        <div>
          <h2 className="text-4xl font-bold mb-4">5. Segurança dos Dados</h2>
          <p>Adotamos medidas técnicas e organizacionais para proteger seus dados contra acessos não autorizados,
          alterações, divulgação ou destruição.</p>
        </div>
        <hr />
        <div>
          <h2 className="text-4xl font-bold mb-4">6. Seus Direitos</h2>
          <p>Você pode solicitar a qualquer momento:</p>
          <ul className="list-disc ml-6">
            <li>Acesso às informações que temos sobre você;</li>
            <li>Correção de dados incorretos;</li>
            <li>Exclusão dos seus dados, respeitando o prazo legal e operacional de armazenamento.</li>
          </ul>
          <p>Para exercer seus direitos ou tirar dúvidas sobre a privacidade, entre em contato pelo e-mail:
          <a href="mailto:support@traveler-assist.com">support@traveler-assist.com</a>.</p>
        </div>
        <hr />
        <div>
          <h2 className="text-4xl font-bold mb-4">7. Alterações nesta Política</h2>
          <p>Podemos atualizar esta Política de Privacidade a qualquer momento, sendo as mudanças publicadas
          nesta página com a data da última atualização.</p>
        </div>
        <hr />
        <div>
          <h2 className="text-4xl font-bold mb-4">8. Contato</h2>
          <p>Se você tiver alguma dúvida ou preocupação sobre esta Política de Privacidade, entre em contato conosco.</p>
        </div>
      </main>
      <Footer />
    </>
  )
}