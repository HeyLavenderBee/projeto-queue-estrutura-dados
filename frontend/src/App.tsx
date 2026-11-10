import { useState } from "react";
import "./App.css";
import atendenteSprite from "./assets/atendente-idle.png";

type ServiceType = "servico" | "exame" | "atendimento";
type NextScreenType = "servico" | "atendimento" | "senha";

interface NewPasswordType {
  serviceType: ServiceType;
  isPreferential: boolean;
}

export default function App() {
  const [fila, setFila] = useState(["NF093"]);
  const [senhaNova, setSenhaNova] = useState<NewPasswordType>({
    serviceType: "servico",
    isPreferential: false,
  });
  const [senhaOficial, setSenhaOficial] = useState<string>("");
  const [proximaTela, setProximaTela] = useState<NextScreenType>("servico");

  function mudarTela(proximaTela: NextScreenType) {
    if (proximaTela == "senha") {
      getSenha();
    }
    setProximaTela(proximaTela);
  }

  async function getSenha() {
    setSenhaOficial("NF890");
    setFila([...fila, "NF890"]);

    setTimeout(() => mudarTela("servico"), 5000);
  }

  return (
    <>
      <div className="header">Header</div>
      <main>
        <div className="main-container">
          <div className="choice-back">
            <div className="choice-screen">
              {proximaTela == "servico" ? (
                <>
                  <h3>Escolha o tipo de serviço</h3>
                  <div className="button-container">
                    <button onClick={() => mudarTela("atendimento")}>
                      Serviço
                    </button>
                    <button onClick={() => mudarTela("atendimento")}>
                      Exame
                    </button>
                    <button onClick={() => mudarTela("atendimento")}>
                      Atendimento
                    </button>
                  </div>
                </>
              ) : proximaTela == "atendimento" ? (
                <>
                  <h3>Escolha o tipo de atendimento</h3>
                  <div className="button-container">
                    <button onClick={() => mudarTela("senha")}>
                      Atendimento Normal
                    </button>
                    <button onClick={() => mudarTela("senha")}>
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
            <h1>Fila de atendimento</h1>
            Início
            <ul>
              {fila.map((pessoa, idx) => (
                <li className="queue-item" key={idx}>
                  <p>Normal | Exame</p>
                  <p>
                    {idx + 1} -{pessoa}
                  </p>
                </li>
              ))}
            </ul>
            <div className="room-desk-container">
              <div className="tv-bg">
                <div className="tv-main">
                  Senha: NF093 <br/><br/>
                  Últimas senhas<br/>
                  NE723 | PA091 | PA091 | NE723 | PA091 
                </div>
              </div>
              <button>Chamar próximo da fila</button>
              <img src={atendenteSprite} height={270}/>
            </div>
          </div>
        </div>
      </main>
    </>
  );
}
