'use client'

import { useState, useEffect } from "react";

import {Trash2} from 'lucide-react'

import axios from 'axios'

import CabecalhoDiretoria from '../../components/cabecalhoDiretoria'

import Filtro from '../../components/filtro'


export default function Home() {

  

  const [nome,setNome] = useState('')

  const [filtroCurso, setFiltroCurso] = useState('')

  const [cursos, setCursos] = useState([{
    cd_curso: '',
    nm_curso: ''
  }])

  const [darkscreen, setDarkcreen] = useState('invisible')
  const [erro, setErro] = useState('')
  const [newCurso, setNewCurso] = useState('')

  function newValidar(){
    setErro('')


    if(newCurso.length==0){
      setErro('O nome do curso é obrigatório!')
    } 

    if(erro == ''){

      axios({
        method: 'post',
        url: 'https://student-register-bnaf.onrender.com/curso',
        data: {
            nm_curso: newCurso
        }
      }).then(e=>{

        window.location.reload()
      })
    }
    
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
      if (data.length == 0) window.location.replace('http://localhost:3000/') 
    })

    axios({
      method: 'get',
      url: `https://student-register-bnaf.onrender.com/curso?search=${filtroCurso}`,
    }).then(res =>{
      setCursos(res.data)
    })

  },[filtroCurso])

  const deleteEstagiario = (cd:String)=>{
    axios({
      method: 'delete',
      url: `https://student-register-bnaf.onrender.com/curso/${cd}`
    })
  
    setCursos(cursos.filter(({cd_curso})=>cd_curso != cd))
  }


  return (
    <div className="h-screen">
      <div onClick={e=>{
        setNewCurso('')
        setErro('')
        setDarkcreen('invisible')
        }} className={`bg-black/80 fixed w-[100%] h-[100vh] ${darkscreen}`}></div>
      <div className={`fixed bg-white w-[30%] top-[50%] left-[50%] translate-x-[-50%] translate-y-[-50%] ${darkscreen}`}>
      <h1 className="text-red-800 text-[18pt] font-bold text-center">Novo Professor</h1>
      <form onSubmit={e=>{e.preventDefault()}} action="#" className="bg-red-800 text-white w-[92%] mx-auto text-[14pt] p-3 flex flex-col" >
        Curso <input value={newCurso} onChange={e=>{setNewCurso(e.target.value)}} type="text" className="w-full text-black p-1 mb-3" />
        <div className="bg-white text-red-600 w-full text-center">
            {erro}
        </div>
        <input type="button" onClick={e=>{newValidar()}} value="CADASTRAR" className="cursor-pointer text-red-800 bg-white p-3 w-[50%] mx-auto mt-5 hover:bg-red-700 hover:text-white transition-colors" />
      </form>
      </div>
      <CabecalhoDiretoria page='cur' nome={nome} />
      <Filtro 
        filter1={'Curso'} set1={setFiltroCurso}
        filter2={''} set2={''}
        filter3={''} set3={''}
        btn={setDarkcreen}
        opt='curso'
      />
      <div className="bg-zinc-200 mt-7 text-center mx-auto w-[80%] p-2">
        <table className="mx-auto">
          <thead className="text-[16pt]">
            <tr className="text-left">
              <th className="w-[99%]">Nome do Curso</th>
            </tr>
          </thead>
          <tbody className="text-[12pt]">
            {
              cursos.length>0 &&
              cursos.filter(({nm_curso})=>nm_curso!='DIRETORIA').map(({
                cd_curso,
                nm_curso
              })=>(
                <tr key={cd_curso} className="text-left bg-white h-10">
                  <td className="">{nm_curso}</td>
                  <td className=""><Trash2 onClick={e=>{deleteEstagiario(cd_curso)}} className="cursor-pointer hover:text-red-800" /></td>
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
