import { useState } from "react";
import "./App.css";
import atendenteSprite from "./assets/atendente-idle.png";
import { chamarSenha, listarSenhas, pegarSenha } from ".";
import Header from "./components/header/Header";

type ServiceType = "agendamento" | "consulta" | "exame";
type NextScreenType = "servico" | "atendimento" | "senha";

export default function App() {
  const [fila, setFila] = useState<(string | undefined)[]>();
  const [filaPreferencial, setFilaPreferencial] = useState<boolean>(true); //mostrar fila normal ou preferencial (boolean para poupar dados)

  const [listaChamados, setListaChamados] = useState<Array<string>>([]);

  const [senhaOficial, setSenhaOficial] = useState<string>("");
  const [proximaTela, setProximaTela] = useState<NextScreenType>("servico");

  let senhaPreferencial: boolean = false;
  let tipoSenha: ServiceType | undefined = undefined;

  function mudarTela(
    proximaTela: NextScreenType,
    preferencial?: boolean,
    tipo?: ServiceType,
  ) {
    if (proximaTela == "atendimento") {
      tipoSenha = tipo || "consulta";
    }
    if (proximaTela == "senha") {
      senhaPreferencial = preferencial || senhaPreferencial;
      getSenha();
    }

    setProximaTela(proximaTela);
  }

  function showFila(preferencial: boolean): void {
    setFilaPreferencial(preferencial);
    setFila(listarSenhas(preferencial));
  }

  function getSenha(): void {
    setSenhaOficial(pegarSenha(senhaPreferencial, tipoSenha ?? "exame"));
    setFila(listarSenhas(filaPreferencial));

    setTimeout(() => mudarTela("servico"), 5000);
  }

  function callSenha(): void {
    setListaChamados([...listaChamados, chamarSenha().code]);
    setFila(listarSenhas(filaPreferencial));
  }

  return (
    <>
      <Header />
      <main>
        <div className="main-container">
          <div className="choice-back">
            <div className="choice-screen">
              {proximaTela == "servico" ? (
                <>
                  <h3>Escolha o tipo de serviço</h3>
                  <div className="button-container">
                    <button
                      onClick={() =>
                        mudarTela("atendimento", false, "agendamento")
                      }
                    >
                      Agendamento
                    </button>
                    <button
                      onClick={() =>
                        mudarTela("atendimento", false, "consulta")
                      }
                    >
                      Consulta
                    </button>
                    <button
                      onClick={() => mudarTela("atendimento", false, "exame")}
                    >
                      Exame
                    </button>
                  </div>
                </>
              ) : proximaTela == "atendimento" ? (
                <>
                  <h3>Escolha o tipo de atendimento</h3>
                  <div className="button-container">
                    <button onClick={() => mudarTela("senha", false)}>
                      Atendimento Normal
                    </button>
                    <button onClick={() => mudarTela("senha", true)}>
                      Atendimento Preferencial
                    </button>
                  </div>
                </>
              ) : (
                <>
                  <h4>Sua senha é</h4>
                  <h1>{senhaOficial}</h1>
                </>
              )}
            </div>
          </div>

          <div>
            <div className="queue-title">
              <h1>Fila de atendimento</h1>
              <div className="title-button-container">
                <button
                  onClick={() => showFila(false)}
                  className={
                    filaPreferencial
                      ? "queue-type-button"
                      : "queue-type-button selected"
                  }
                >
                  Normal
                </button>
                <button
                  onClick={() => showFila(true)}
                  className={
                    filaPreferencial
                      ? "queue-type-button selected"
                      : "queue-type-button"
                  }
                >
                  Preferencial
                </button>
              </div>
            </div>
            <br />
            Início
            {fila ? (
              <ul>
                {fila.map((pessoa, idx) => (
                  <li className="queue-item" key={idx}>
                    <p>Normal | Exame</p>
                    <p>
                      {idx + 1} - {pessoa}
                    </p>
                  </li>
                ))}
              </ul>
            ) : (
              <>
                <p>Não há ninguém na fila.</p>
                <br />
              </>
            )}
            <div className="room-desk-container">
              <div className="tv-bg">
                <div className="tv-main">
                  <h3>Chamando: {listaChamados[listaChamados.length - 1]}</h3>
                  <br />
                  <br />
                  <br />
                  <br />
                  Últimas senhas
                  <br />
                  {listaChamados.map((senha, idx) => (
                    <span key={idx}>{senha}</span>
                  ))}
                </div>
              </div>
              <button onClick={callSenha}>Chamar próximo da fila</button>
              <img src={atendenteSprite} height={270} />
            </div>
          </div>
        </div>
      </main>
      <div className="footer">Desenvolvido por <br/> Darcy Salmazzo e Júlia Rodrigues</div>
    </>
  );
}
