export default function Filtro(){
    return(
        <div className="w-full">
            <form className="w-[70%] mx-auto mt-5 text-[16pt] grid grid-cols-2 gap-3  min-w-[800px]" onSubmit={e=>e.preventDefault()} action="#">
                <div className="flex"><span className="m-1 w-[65px]">Nome</span> <input type="text" className="min-w-[220px] p-1 bg-zinc-200 w-[80%]"/></div>
                <div className="flex"><span className="m-1 w-[85px]">Empresa</span> <input type="text" className="min-w-[220px] p-1 bg-zinc-200 w-[80%]"/></div>
                <div className="flex"><span className="m-1 w-[65px]">RA</span> <input type="text" className="min-w-[220px] p-1 bg-zinc-200 w-[80%]"/></div>
                <div className="flex"><span className="m-1 w-[85px]"></span><input className="min-w-[220px] text-white w-[80%] bg-red-800" type="button" value="Cadastrar novo aluno" /></div>
            </form>
        </div>
    )
}