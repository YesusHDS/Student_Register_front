export default function Filtro({filter1='', filter2='', filter3='', set1, set2, set3, btn, btn2, opt}){


    return(
        <div className="w-full">
            <form className="w-[70%] mx-auto mt-5 text-[16pt] grid grid-cols-2 gap-3  min-w-[800px]" onSubmit={e=>e.preventDefault()} action="#">
                <div className="flex"><span className="m-1 w-[65px]">{filter1}</span> <input onChange={e=>{set1(e.target.value)}} type="text" className="min-w-[220px] p-1 bg-zinc-200 w-[80%]"/></div>
                <div className="flex"><span className="m-1 w-[85px]">{filter2}</span> {filter2!='' && <input onChange={e=>{set2(e.target.value)}} type="text" className="min-w-[220px] p-1 bg-zinc-200 w-[80%]"/>} </div>
                <div className="flex"><span className="m-1 w-[65px]">{filter3}</span> {filter3!='' && <input onChange={e=>{set3(e.target.value)}} type="text" className="min-w-[220px] p-1 bg-zinc-200 w-[80%]"/>} </div>
                <div className="flex"><span className="m-1 w-[85px]"></span><input onClick={e=>{
                    btn('visible')
                    if(btn2) btn2('visible')
                }} className=" cursor-pointer min-w-[220px] text-white w-[80%] bg-red-700 hover:bg-red-800" type="button" value={`Cadastrar novo ${opt}`} /></div>
            </form>
        </div>
    )
}