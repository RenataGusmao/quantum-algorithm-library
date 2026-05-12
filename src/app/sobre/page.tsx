import Link from "next/link";

export default function SobrePage() {
  return (
    <section className="page-section">
      <div className="container about-page">
        <div className="about-hero">
          <span className="tag">Sobre a plataforma</span>

          <h1>Uma biblioteca para explorar, comparar e compreender algoritmos quânticos.</h1>

          <p>
            A Quantum Algorithm Library foi desenvolvida para reunir informações
            estruturadas sobre algoritmos quânticos, facilitando o estudo, a
            comparação e a escolha da solução mais adequada para diferentes tipos
            de problemas computacionais.
          </p>

          <div className="about-actions">
            <Link href="/algoritmos" className="button-link">
              Explorar algoritmos
            </Link>

            <Link href="/busca-guiada" className="secondary-link">
              Usar busca guiada
            </Link>
          </div>
        </div>

        <div className="about-grid">
          <article className="card about-card-large">
            <h2>Objetivo do projeto</h2>
            <p>
              O principal objetivo da plataforma é tornar o conhecimento sobre
              algoritmos quânticos mais acessível, organizado e aplicável. Em vez
              de apresentar apenas uma lista técnica, o sistema estrutura cada
              algoritmo com informações como categoria, complexidade, aplicações,
              vantagens, limitações e nível de dificuldade.
            </p>
            <p>
              Dessa forma, estudantes, pesquisadores e profissionais conseguem
              compreender melhor quando um algoritmo pode ser utilizado, quais
              problemas ele resolve e quais critérios devem ser considerados antes
              de sua escolha.
            </p>
          </article>

          <article className="card about-card">
            <h2>Para quem é</h2>
            <p>
              A plataforma é voltada para estudantes, docentes, pesquisadores,
              desenvolvedores e equipes interessadas em computação quântica,
              especialmente aqueles que precisam consultar algoritmos de forma
              clara, rápida e comparável.
            </p>
          </article>

          <article className="card about-card">
            <h2>Como funciona</h2>
            <p>
              Os algoritmos são organizados em uma biblioteca navegável. O usuário
              pode explorar os registros, comparar características entre soluções
              e utilizar uma busca guiada para encontrar opções mais alinhadas ao
              tipo de problema analisado.
            </p>
          </article>
        </div>

        <div className="about-section">
          <h2>Principais recursos</h2>

          <div className="feature-grid">
            <div className="feature-item">
              <strong>Biblioteca estruturada</strong>
              <span>Consulta organizada por algoritmos, categorias e características.</span>
            </div>

            <div className="feature-item">
              <strong>Comparação entre algoritmos</strong>
              <span>Análise lado a lado para apoiar decisões e estudos técnicos.</span>
            </div>

            <div className="feature-item">
              <strong>Busca guiada</strong>
              <span>Recomendação orientada pelo tipo de problema e necessidade do usuário.</span>
            </div>

            <div className="feature-item">
              <strong>Área administrativa</strong>
              <span>Cadastro e atualização dos algoritmos por meio de uma interface interna.</span>
            </div>
          </div>
        </div>

        <div className="about-highlight">
          <div>
            <span className="tag">Visão futura</span>
            <h2>Uma base evolutiva para estudos em computação quântica</h2>
            <p>
              A proposta é que a plataforma possa crescer continuamente, recebendo
              novos algoritmos, melhorias na experiência do usuário, suporte a
              múltiplos idiomas e recursos inteligentes de recomendação.
            </p>
          </div>

          <Link href="/comparar" className="button-link">
            Comparar algoritmos
          </Link>
        </div>
      </div>
    </section>
  );
}