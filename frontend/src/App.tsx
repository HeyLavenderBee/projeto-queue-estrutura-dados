import "./App.css";

export default function App(){
  return (
    <>
      <div>Header</div>
      <h3>Fila</h3>
      <div>
        <div>
          pessoa 1
        </div>
        <div>
          pessoa 2
        </div>
        <div>
          pessoa 3
        </div>
      </div>
      <div className="choice-screen">
        <p>Escolha o tipo de atendimento</p>
        <div>
          <button>Atendimento Normal</button>
          <button>Atendimento Preferencial</button>
        </div>
      </div>
    </>
  );
}