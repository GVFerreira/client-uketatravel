import Footer from "../_components/footer"
import Header from "../_components/header"

export default function CookiesPolicy() {
  return (
    <>
      <Header />
      <main className="container px-4 mx-auto max-w-4xl space-y-8 py-16">
        <div className="text-center">
          <h1 className="text-6xl font-bold text-center mb-4">Política de Cookies</h1>
          <p className="text-xl font-bold mb-2">Passaporte Simples Assessoria e Turismo Ltda.</p>
          <p className="mb-10">Última atualização: 16 de abril de 2025</p>
        </div>
        <hr />
        <div>
          <h2 className="text-4xl font-bold mb-4">1. O que são cookies?</h2>
          <p>Cookies são pequenos arquivos de texto armazenados no seu dispositivo (computador, tablet, celular) quando você acessa um site. Eles ajudam a melhorar sua experiência de navegação, tornando o uso do site mais eficiente e personalizado.</p>
        </div>
        <hr />
        <div>
          <h2 className="text-4xl font-bold mb-4">2. Como usamos cookies?</h2>
          <p>No site ukvistos.com, utilizamos cookies para:</p>
          <ul className="list-disc ml-6">
            <li>Garantir o funcionamento correto do site;</li>
            <li>Personalizar o conteúdo e lembrar suas preferências;</li>
            <li>Coletar dados estatísticos anônimos para melhorar nossos serviços.</li>
          </ul>
        </div>
        <hr />
        <div>
          <h2 className="text-4xl font-bold mb-4">3. Tipos de cookies que utilizamos</h2>
          <ul className="list-disc ml-6">
            <li>Cookies essenciais: necessários para o funcionamento básico do site, como manter a sessão
            ativa e garantir a segurança;</li>
            <li>Cookies de desempenho: coletam informações sobre o uso do site para que possamos entender
            como ele é utilizado e melhorar sua performance;</li>
            <li>Cookies de funcionalidade: lembram suas preferências para facilitar o uso do site.</li>
          </ul>
        </div>
        <hr />
        <div>
          <h2 className="text-4xl font-bold mb-4">4. Consentimento e controle</h2>
          <p>Ao continuar navegando em nosso site, você concorda com o uso de cookies conforme descrito nesta
          política.</p>
          <p>Você pode gerenciar suas preferências e excluir cookies através das configurações do seu navegador,
          caso deseje.</p>
        </div>
        <hr />
        <div>
          <h2 className="text-4xl font-bold mb-4">5. Alterações nesta política</h2>
          <p>Podemos atualizar esta Política de Cookies a qualquer momento. As alterações serão publicadas nesta
          página com a data da última atualização.</p>
        </div>
        <hr />
        <div>
          <h2 className="text-4xl font-bold mb-4">6. Contato</h2>
          <p>Se tiver dúvidas sobre esta Política de Cookies, entre em contato conosco pelo e-mail: <a className="underline font-bold" href="mailto:support@traveler-assist.com">support@traveler-assist.com</a>.</p>
        </div>
      </main>
      <Footer />
    </>
  )
}