import Image from "next/image";

export default function Cabecalho({nome='', curso=''}){

  return (
      <header className="flex flex-col gap-5">
        <div className="w-full flex flex-row px-10 pt-3">
          <Image className="w-[15%] h-[10vh]" src="/Logo_Fatec.png" width={291} height={126} alt="Logo da Fatec Praia Grande"/>
          <div className="w-full flex flex-row-reverse gap-16">
          <Image className="w-[15%] h-[10vh]" src="/Logo_SP.png" width={402} height={140} alt="Logo do Governo do Estado de São Paulo"/>
          <Image className="w-[10%] h-[10vh]" src="/Logo_CPS.png" width={168} height={110} alt="Logo do Centro Paula Souza"/>
          </div>
        </div>
        <nav className="w-full flex flex-row px-10 py-5 bg-red-800 text-white font-bold">
          <h1 className="text-[18pt] w-[60%]">LISTA DE ESTUDANTES - {curso.toUpperCase()}</h1>
          <div className="w-full text-[18pt] flex flex-row-reverse">
              <h2>{nome}</h2>
          </div>
        </nav>
      </header>
  )
}