import Image from "next/image";

export default function Cabecalho({nome='', curso=''}){

  nome = nome.split(' ')

  let dropdown = false

  return (
      <header className="flex flex-col gap-5">
        <div className="w-full flex flex-row px-10 pt-3">
          <Image className="w-[15%] h-[10vh]" priority={true} src="/Logo_Fatec.png" width={291} height={126} alt="Logo da Fatec Praia Grande"/>
          <div className="w-full flex flex-row-reverse gap-16">
          <Image className="w-[15%] h-[10vh]" priority={true} src="/Logo_SP.png" width={402} height={140} alt="Logo do Governo do Estado de São Paulo"/>
          <Image className="w-[10%] h-[10vh]" priority={true} src="/Logo_CPS.png" width={168} height={110} alt="Logo do Centro Paula Souza"/>
          </div>
        </div>
        <nav className="w-full text-white font-bold">
          <div className="flex row-span-2">
            <h1 className="text-[18pt] w-[90%]  py-[1.5%] px-[2%] bg-red-800">CADASTRO DE ESTUDANTES - {curso.toUpperCase()}</h1>
            <div onClick={e=>{
              let drop = document.getElementById('drop')
              let down = document.getElementById('down')

              if(dropdown){
                dropdown = !dropdown

                down.style='transform: translate(0,-100%); transition: all 0.5s ease-in-out'
                drop.style='transition: all 0.9s ease-in-out'
                setTimeout(()=>{
                  drop.style=''
                },900)

              } else{
                down.style='transform: translate(0,0%); transition: all 0.5s ease-in-out; z-index: 0'
                drop.style='background-color: rgb(127, 29, 29)'

                dropdown = !dropdown
              }
            }} id='drop' className={`cursor-pointer text-[18pt] w-[10%] py-[1.5%] bg-red-800 hover:bg-red-900 transition-colors`}>
                <h2 className={'text-center'}>{nome[0]}</h2>
            </div>
          </div>
          <span id='down' onClick={e=>{
            localStorage.clear()
            window.location.replace('http://localhost:3000/')
            
          }} className="cursor-pointer font-normal text-[16pt] bg-red-900 hover:text-red-800 transition-colors text-center w-[10%] absolute right-0 translate-y-[-100%] z-[-1]">Sair</span>
        </nav>
      </header>
  )
}