'use client'

import { useState, useEffect } from "react";

import {Trash2} from 'lucide-react'

import axios from 'axios'

import CabecalhoDiretoria from '../../components/cabecalhoDiretoria'

import Filtro from '../../components/filtro'


export default function Home() {

  const [cursos, setCursos] = useState([{
    cd_curso: '',
    nm_curso: ''
  }])

  const [nome,setNome] = useState('')

  const [filtroNome, setFiltroNome] = useState('')
  const [filtroCurso, setFiltroCurso] = useState('')

  const [professores, setProfessores] = useState([{
    cd_login: '',
    nm_login: '',
    nm_curso: '',
    nm_tipo: ''
  }])

  const [darkscreen, setDarkcreen] = useState('invisible')
  const [erro, setErro] = useState('')
  const [newNome, setNewNome] = useState('')
  const [newCurso, setNewCurso] = useState('0')
  const [newSenha, setNewSenha] = useState('')

  function newValidar(){
    setErro('')
    let val = true

    if(newSenha.length==0){
      setErro('A senha é obrigatória!')
      val = false
    } 

    if(newCurso=='0'){
      setErro('O campo do curso é obrigatório!')
      val = false
    }

    if(newNome.length==0){
      setErro('O campo nome é obrigatório!')
      val = false
    }

    if(val){

      axios({
        method: 'post',
        url: 'https://student-register-bnaf.onrender.com/create',
        data: {
            nm_login: newNome,
            cd_senha: newSenha,
            cd_curso: newCurso
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
      url: `https://student-register-bnaf.onrender.com/loginList?search=${filtroNome}&curso=${filtroCurso}`,
    }).then(res =>{
      setProfessores(res.data)
    })

    axios({
      method: 'get',
      url: `https://student-register-bnaf.onrender.com/curso`,
    }).then(res =>{
      setCursos(res.data.filter(({nm_curso=''})=>nm_curso != 'DIRETORIA'))
    })

  },[filtroNome, filtroCurso])

  const deleteEstagiario = (cd:String)=>{
    axios({
      method: 'delete',
      url: `https://student-register-bnaf.onrender.com/login/${cd}`
    })
  
    setProfessores(professores.filter(({cd_login})=>cd_login != cd))
  }


  return (
    <div className="h-screen">
      <div onClick={e=>{
        setNewNome('')
        setNewCurso('0')
        setNewSenha('')
        setErro('')
        setDarkcreen('invisible')
        }} className={`bg-black/80 fixed w-[100%] h-[100vh] ${darkscreen}`}></div>
      <div className={`fixed bg-white w-[30%] top-[50%] left-[50%] translate-x-[-50%] translate-y-[-50%] ${darkscreen}`}>
      <h1 className="text-red-800 text-[18pt] font-bold text-center">Novo Professor</h1>
      <form onSubmit={e=>{e.preventDefault()}} action="#" className="bg-red-800 text-white w-[92%] mx-auto text-[14pt] p-3 flex flex-col" >
        Nome <input value={newNome} onChange={e=>{setNewNome(e.target.value)}} type="text" className="w-full text-black p-1 mb-3" />
        Curso
        <select id='select' className="w-full text-black p-1 mb-3" value={newCurso} onChange={e=>{setNewCurso(e.target.value)}}>
          <option disabled value={'0'}>Escolha o curso...</option>
          {
            cursos.length>0 &&
            cursos.map(({
              cd_curso,
              nm_curso
            })=>(
              <option key={cd_curso} value={cd_curso}>{nm_curso}</option>
            ))
          }
        </select>
        Senha <input value={newSenha} onChange={e=>{setNewSenha(e.target.value)}} type="password" className="w-full text-black p-1 mb-3" />
        <div className="bg-white text-red-600 w-full text-center">
            {erro}
        </div>
        <input type="button" onClick={e=>{newValidar()}} value="CADASTRAR" className="cursor-pointer text-red-800 bg-white p-3 w-[50%] mx-auto mt-5 hover:bg-red-700 hover:text-white transition-colors" />
      </form>
      </div>
      <CabecalhoDiretoria page='prof' nome={nome} />
      <Filtro 
        filter1={'Nome'} set1={setFiltroNome}
        filter2={'Curso'} set2={setFiltroCurso}
        filter3={''} set3={''}
        btn={setDarkcreen}
        opt='professor'
      />
      <div className="bg-zinc-200 mt-7 text-center mx-auto w-[80%] p-2">
        <table className="mx-auto">
          <thead className="text-[16pt]">
            <tr className="text-left">
              <th className="w-[49%]">Nome</th>
              <th className="w-[49%]">Curso</th>
            </tr>
          </thead>
          <tbody className="text-[12pt]">
            {
              professores.length>0 &&
              professores.filter(({nm_curso})=>nm_curso!='DIRETORIA').map(({
                cd_login,
                nm_curso,
                nm_login
              })=>(
                <tr key={cd_login} className="text-left bg-white h-10">
                  <td className="">{nm_login}</td>
                  <td className="">{nm_curso}</td>
                  <td className=""><Trash2 onClick={e=>{deleteEstagiario(cd_login)}} className="cursor-pointer hover:text-red-800" /></td>
                </tr>
              ))
            }
          </tbody>
        </table>
        {professores.filter(({nm_curso})=>nm_curso!='DIRETORIA').length==0 && <span className="">Não foi possível encontrar nenhum professor...</span>}
      </div>
    </div>
  );
}
