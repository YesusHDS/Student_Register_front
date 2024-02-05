'use client'

import { useState, useEffect } from "react";

import {Trash2} from 'lucide-react'

import axios from 'axios'

import CabecalhoDiretoria from '../../components/cabecalhoDiretoria'

import Filtro from '../../components/filtro'


export default function Home() {

  

  const [nome,setNome] = useState('')
  const [curso,setCurso] = useState('')
  const [tipo, setTipo] = useState('')

  const [filtroNome, setFiltroNome] = useState('')
  const [filtroEmpresa, setFiltroEmpresa] = useState('')
  const [filtroRA, setFiltroRA] = useState('')

  const [estagiarios, setEstagiarios] = useState([{
    cd_curso: '',
    cd_registromatricula: '',
    dt_periodocomeco: '',
    dt_periodotermino: '',
    nm_empresa: '',
    nm_estagiario: ''
  }])

  const [darkscreen, setDarkcreen] = useState('invisible')
  const [erro, setErro] = useState('')
  const [newNome, setNewNome] = useState('')
  const [newRA, setNewRA] = useState('')
  const [newEmpresa, setNewEmpresa] = useState('')
  const [newComeco, setNewComeco] = useState('')
  const [newTermino, setNewTermino] = useState('')

  function newValidar(){
    setErro('')

    if(newTermino.length==0){
      setErro('O fim do período é obrigatório!')
    } 
    // else{
    //   setNewTermino(`${newTermino.split('-')[2]}/${newTermino.split('-')[1]}/${newTermino.split('-')[0]}`)
    // }

    if(newComeco.length==0){
      setErro('O começo do período é obrigatório!')
    } 
    // else{
    //   setNewComeco(`${newComeco.split('-')[2]}/${newComeco.split('-')[1]}/${newComeco.split('-')[0]}`)
    // }


    if(newEmpresa.length==0){
      setErro('O campo empresa é obrigatório!')
    }


    if(newRA.length==0){
      setErro('O campo RA é obrigatório!')
    }


    if(newNome.length==0){
      setErro('O campo nome é obrigatório!')
    }

    if(erro == ''){

      axios({
        method: 'post',
        url: 'https://student-register-bnaf.onrender.com/estagiario',
        data: {
          cd_curso: localStorage.getItem('cd_curso') ?? '',
          cd_registroMatricula: newRA,
          dt_periodoComeco: `${newComeco.split('-')[1]}/${newComeco.split('-')[2]}/${newComeco.split('-')[0]}`,
          dt_periodoTermino: `${newTermino.split('-')[1]}/${newTermino.split('-')[2]}/${newTermino.split('-')[0]}`,
          nm_empresa: newEmpresa,
          nm_estagiario: newNome
        }
      }).then(e=>{
        setEstagiarios([...estagiarios, {
          cd_curso: localStorage.getItem('cd_curso') ?? '',
          cd_registromatricula: newRA,
          dt_periodocomeco: `${newComeco.split('-')[1]}/${newComeco.split('-')[2]}/${newComeco.split('-')[0]}`,
          dt_periodotermino: `${newTermino.split('-')[1]}/${newTermino.split('-')[2]}/${newTermino.split('-')[0]}`,
          nm_empresa: newEmpresa,
          nm_estagiario: newNome
        }])

        window.location.reload()
      })
    }
    
  }

  useEffect(()=>{

    setNome(localStorage.getItem('nm_login') ?? '')
    setCurso(localStorage.getItem('nm_curso') ?? '')
    setTipo(localStorage.getItem('nm_tipo') ?? '')

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
      url: `https://student-register-bnaf.onrender.com/estagiario?search=${filtroNome}&empresa=${filtroEmpresa}&RA=${filtroRA}`,
    }).then(res =>{
      setEstagiarios(res.data)
    })

  },[filtroNome, filtroEmpresa, filtroRA])

  const deleteEstagiario = (ra:String)=>{
    axios({
      method: 'delete',
      url: `https://student-register-bnaf.onrender.com/estagiario/${ra}`
    })
  
    setEstagiarios(estagiarios.filter(({cd_registromatricula})=>cd_registromatricula != ra))
  }


  return (
    <div className="h-screen">
      <div onClick={e=>{
        setNewNome('')
        setNewRA('')
        setNewEmpresa('')
        setNewComeco('')
        setNewTermino('')
        setErro('')
        setDarkcreen('invisible')
        }} className={`bg-black/80 fixed w-[100%] h-[100vh] ${darkscreen}`}></div>
      <div className={`fixed bg-white w-[30%] top-[50%] left-[50%] translate-x-[-50%] translate-y-[-50%] ${darkscreen}`}>
      <h1 className="text-red-800 text-[18pt] font-bold text-center">Novo Aluno</h1>
      <form onSubmit={e=>{e.preventDefault()}} action="#" className="bg-red-800 text-white w-[92%] mx-auto text-[14pt] p-3 flex flex-col" >
        Nome <input value={newNome} onChange={e=>{setNewNome(e.target.value)}} type="text" className="w-full text-black p-1 mb-3" />
        RA <input value={newRA} onChange={e=>{setNewRA(e.target.value)}} type="text" className="w-full text-black p-1 mb-3" />
        Empresa <input value={newEmpresa} onChange={e=>{setNewEmpresa(e.target.value)}} type="text" className="w-full text-black p-1 mb-3" />
        Período <div><input value={newComeco} onChange={e=>{setNewComeco(e.target.value)}} type="date" className="w-[40%] text-black p-1 mb-3" /> até <input onChange={e=>{setNewTermino(e.target.value)}} type="date" className="w-[40%] text-black p-1 mb-3" /></div>
        <div className="bg-white text-red-600 w-full text-center">
            {erro}
        </div>
        <input type="button" onClick={e=>{newValidar()}} value="CADASTRAR" className="cursor-pointer text-red-800 bg-white p-3 w-[50%] mx-auto mt-5 hover:bg-red-700 hover:text-white transition-colors" />
      </form>
      </div>
      <CabecalhoDiretoria page='est' nome={nome} />
      <Filtro 
        filter1={'Nome'} set1={setFiltroNome}
        filter2={'Empresa'} set2={setFiltroEmpresa}
        filter3={'RA'} set3={setFiltroRA}
        btn={setDarkcreen}
        opt='aluno'
      />
      <div className="bg-zinc-200 mt-7 text-center mx-auto w-[80%] p-2">
        <table className="mx-auto">
          <thead className="text-[16pt]">
            <tr className="text-left">
              <th className="w-[30%]">Nome</th>
              <th className="w-[24%]">RA</th>
              <th className="w-[24%]">Empresa</th>
              <th className="w-[20%]">Período</th>
            </tr>
          </thead>
          <tbody className="text-[12pt]">
            {
              estagiarios.length>0 &&
              estagiarios.map(({
                nm_estagiario, 
                cd_registromatricula, 
                nm_empresa, 
                dt_periodocomeco, 
                dt_periodotermino
              })=>(
                <tr key={cd_registromatricula} className="text-left bg-white h-10">
                  <td className="">{nm_estagiario}</td>
                  <td className="">{cd_registromatricula}</td>
                  <td className="">{nm_empresa}</td>
                  <td className="">{`${dt_periodocomeco.slice(0,10).split('-')[2]}/${dt_periodocomeco.slice(0,10).split('-')[1]}/${dt_periodocomeco.slice(0,10).split('-')[0]}`} até {`${dt_periodotermino.slice(0,10).split('-')[2]}/${dt_periodotermino.slice(0,10).split('-')[1]}/${dt_periodotermino.slice(0,10).split('-')[0]}`}</td>
                  <td className=""><Trash2 onClick={e=>{deleteEstagiario(cd_registromatricula)}} className="cursor-pointer hover:text-red-800" /></td>
                </tr>
              ))
            }
          </tbody>
        </table>
        {estagiarios.length==0 && <span className="">Não foi possível encontrar nenhum estagiário...</span>}
      </div>
    </div>
  );
}
