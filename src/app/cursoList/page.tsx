'use client'

import { useState, useEffect } from "react";

import {Trash2, Pencil, Check} from 'lucide-react'

import axios from 'axios'

import CabecalhoDiretoria from '../../components/cabecalhoDiretoria'

import Filtro from '../../components/filtro'


export default function Home() {

  

  const [nome,setNome] = useState('')

  const [filtroCurso, setFiltroCurso] = useState('')

  const [cursos, setCursos] = useState([{
    cd_curso: '',
    nm_curso: '',
    nm_cicloestagio: ''
  }])

  const [ciclos, setCiclos] = useState([{
    cd_ciclo: '',
    cd_curso: '',
    nm_ciclo: ''
  }])

  const [darkscreen, setDarkcreen] = useState('invisible')
  const [newCursoScreen, setNewCursoScreen] = useState('invisible')
  const [ciclosScreen, setCiclosScreen] = useState('invisible')
  const [erro, setErro] = useState('')
  const [newCurso, setNewCurso] = useState('')
  const [newCicloEstagio, setNewCicloEstagio] = useState('')
  const [cicloQtd, setCicloQtd] = useState('')
  const [editFlag, setEditFlag] = useState('')
  const [cicloName,setCicloName] = useState('')
  const [cursoCod,setCursoCod] = useState('')

  function newValidar(){
    setErro('')
    let val = true
    
    if(newCicloEstagio.length==0){
      setErro('O ciclo mínimo para estágio é obrigatório!')
      val = false
      
    } else if(Number(newCicloEstagio) <= 0){
      setErro('Ciclo mínimo para estágio inválido!')
      val = false
    } else if(Number(newCicloEstagio) > Number(cicloQtd)){
      setErro('Ciclo mínimo para estágio maior que quantidade de ciclos!')
      val = false
    }

    if(Number(cicloQtd) <= 0){
      setErro('Quantidade de ciclos inválida!')
      val = false
    }

    if(cicloQtd.length==0){
      setErro('A quantidade de ciclos é obrigatória!')
      val = false
    }

    if(newCurso.length==0){
      setErro('O nome do curso é obrigatório!')
      val = false
    }

    if(val){

      axios({
        method: 'post',
        url: 'https://student-register-bnaf.onrender.com/curso',
        data: {
            nm_curso: newCurso,
            nm_cicloEstagio: newCicloEstagio
        }
      }).then(e=>{
        
        criarCiclos(e.data)

      })
    }
    
  }

  async function criarCiclos(cd_curso:String){
    console.log('Teste');

    for(let i=1;i<=Number(cicloQtd);i++){
      await axios({
        method: 'post',
        url: 'https://student-register-bnaf.onrender.com/ciclo',
        data:{
          cd_curso,
          nm_ciclo: `Ciclo ${i}`
        }
      })
    }

    window.location.reload()

  }

  function buscarCiclos(cd_curso:String){
    axios({
      method: 'get',
      url: `https://student-register-bnaf.onrender.com/ciclo?curso=${cd_curso}`
    }).then(res=>{
      setCiclos(res.data)

      setDarkcreen('visible')
      
      setCiclosScreen('visible')

    })


  }

  useEffect(()=>{

    setNome(localStorage.getItem('nm_login') ?? '')

    axios({
      method: 'post',
      url: 'https://student-register-bnaf.onrender.com/sessionCheck',
      data: {
        token: localStorage.getItem('token')
      }
    }).then(({data})=>{
      if (data.length == 0) window.location.replace('http://localhost:3000') 
    })

    axios({
      method: 'get',
      url: `https://student-register-bnaf.onrender.com/curso?search=${filtroCurso}`,
    }).then(res =>{
      setCursos(res.data)      
    })

  },[filtroCurso])

  const deleteCurso = (cd:String)=>{
    axios({
      method: 'delete',
      url: `https://student-register-bnaf.onrender.com/curso/${cd}`
    })
  
    setCursos(cursos.filter(({cd_curso})=>cd_curso != cd))
  }

  const deleteCiclo = (cd:String)=>{
    axios({
      method: 'delete',
      url: `https://student-register-bnaf.onrender.com/ciclo/${cd}`
    })
  
    setCiclos(ciclos.filter(({cd_ciclo})=>cd_ciclo != cd))
  }

  const atualizaCiclo = (cd_curso:String, cd:String)=>{
    axios({
      method: 'put',
      url: `https://student-register-bnaf.onrender.com/ciclo/${cd}`,
      data:{
        cd_curso,
        nm_ciclo: cicloName
      }
    }).then(res=>{
      buscarCiclos(cd_curso)
    })
  }

  const criaCiclo = ()=>{
    axios({
      method: 'post',
      url: `https://student-register-bnaf.onrender.com/ciclo`,
      data:{
        cd_curso: cursoCod,
        nm_ciclo: 'Novo ciclo'
      }
    }).then(res=>{
      buscarCiclos(cursoCod)
    })
  }


  return (
    <div className="h-screen">
      <div onClick={e=>{
        setNewCurso('')
        setErro('')
        setDarkcreen('invisible')
        setCiclosScreen('invisible')
        setNewCursoScreen('invisible')
        setEditFlag('')
        setCicloName('')
        }} className={`bg-black/80 fixed w-[100%] h-[100vh] ${darkscreen}`}></div>
      <div className={`fixed bg-white w-[30%] top-[50%] left-[50%] translate-x-[-50%] translate-y-[-50%] ${newCursoScreen}`}>
      <h1 className="text-red-800 text-[18pt] font-bold text-center">Novo Curso</h1>
      <form onSubmit={e=>{e.preventDefault()}} action="#" className="bg-red-800 text-white w-[92%] mx-auto text-[14pt] p-3 flex flex-col" >
        Nome do curso <input value={newCurso} onChange={e=>{setNewCurso(e.target.value)}}
        type="text" className="w-full text-black p-1 mb-3" />
        Quantidade de Ciclos <input value={cicloQtd} onChange={e=>{setCicloQtd(e.target.value)}}
        type="number" className="w-full text-black p-1 mb-3" />
        Ciclo mínimo para estágio <input value={newCicloEstagio} onChange={e=>{setNewCicloEstagio(e.target.value)}}
        type="number" className="w-full text-black p-1 mb-3" />
        <div className="bg-white text-red-600 w-full text-center">
            {erro}
        </div>
        <input type="button" onClick={e=>{newValidar()}} value="CADASTRAR" className="cursor-pointer text-red-800 bg-white p-3 w-[50%] mx-auto mt-5 hover:bg-red-700 hover:text-white transition-colors" />
      </form>
      </div>
      <div className={`fixed p-2 bg-white w-[30%] top-[50%] left-[50%] translate-x-[-50%] translate-y-[-50%] ${ciclosScreen}`}>
        <div className="flex font-bold mx-auto w-[80%]">
          <h1 className="text-red-800 text-[18pt] ml-5">Ciclos</h1>
          <button className="text-[25pt] ml-auto h-9 translate-y-[-10px] hover:text-green-500" onClick={e=>{criaCiclo()}}>+</button>
        </div>
        <div className="bg-zinc-200 mx-auto w-[80%] p-2">

          { ciclos.length>0?
            ciclos.map(({cd_ciclo, nm_ciclo, cd_curso})=>(
              <div key={cd_ciclo} className="p-3  hover:bg-slate-50 flex">
                {editFlag==cd_ciclo?
                  <input maxLength={10} type="text" className="w-[50%]" id="nm_ciclo" value={cicloName} onChange={e=>setCicloName(e.target.value)} />:
                  <p className="">{nm_ciclo}</p>
                }
                <div className="ml-auto">
                  {editFlag!=cd_ciclo?
                  <Pencil height={18} onClick={e=>{setEditFlag(cd_ciclo); setCicloName(nm_ciclo)}} className="inline cursor-pointer hover:text-yellow-800" />:
                  <Check height={18} onClick={e=>{setEditFlag(''); atualizaCiclo(cd_curso, cd_ciclo)}} className="inline cursor-pointer hover:text-yellow-800" />}
                  <Trash2 height={18} onClick={e=>{deleteCiclo(cd_ciclo)}} className="inline cursor-pointer hover:text-red-800" />
                </div>
              </div>
            )):
            <div>Nenhum ciclo cadastrado...</div>
          }
        </div>
      </div>
      <CabecalhoDiretoria page='cur' nome={nome} />
      <Filtro 
        filter1={'Curso'} set1={setFiltroCurso}
        filter2={''} set2={''}
        filter3={''} set3={''}
        btn={setDarkcreen}
        btn2={setNewCursoScreen}
        opt='curso'
      />
      <div className="bg-zinc-200 mt-7 text-center mx-auto w-[80%] p-2">
        <table className="mx-auto">
          <thead className="text-[16pt]">
            <tr className="text-left">
              <th className="w-[99%]">Nome do Curso</th>
              <th className="">Ciclo de Estágio</th>
            </tr>
          </thead>
          <tbody className="text-[12pt]">
            {
              cursos.length>0 &&
              cursos.filter(({nm_curso})=>nm_curso!='DIRETORIA').map(({
                cd_curso,
                nm_curso,
                nm_cicloestagio
              })=>(
                <tr 
                key={cd_curso} 
                className="text-left bg-white h-10 cursor-pointer hover:bg-slate-50"
                >
                  <td onClick={e=>{buscarCiclos(cd_curso); setCursoCod(cd_curso)}} className="">{nm_curso}</td>
                  <td className="">{nm_cicloestagio}</td>
                  <td className=""><Trash2 onClick={e=>{deleteCurso(cd_curso)}} className="cursor-pointer hover:text-red-800" /></td>
                </tr>
                
              ))
            }
          </tbody>
        </table>
        {cursos.filter(({nm_curso})=>nm_curso!='DIRETORIA').length==0 && <span className="">Não foi possível encontrar nenhum curso...</span>}
      </div>
    </div>
  );
}
