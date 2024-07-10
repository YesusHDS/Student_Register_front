'use client'

import { useState, useEffect } from "react";

import {Trash2, Pencil, Check} from 'lucide-react'

import axios from 'axios'

import CabecalhoDiretoria from '../../components/cabecalhoDiretoria'

import Filtro from '../../components/filtro'


export default function Home() {

  

  const [nome,setNome] = useState('')

  const [filtroEmpresa, setFiltroEmpresa] = useState('')

  const [empresas, setEmpresas] = useState([{
    cd_empresa: '',
    nm_empresa: ''
  }])

  const [darkscreen, setDarkcreen] = useState('invisible')
  const [erro, setErro] = useState('')
  const [newEmpresa, setNewEmpresa] = useState('')
  const [editEmpresa, setEditEmpresa] = useState('')

  function newValidar(){
    setErro('')
    let val = true


    if(newEmpresa.length==0){
      setErro('O nome da empresa é obrigatório!')
      val = false
    }

    if(val){

      axios({
        method: 'post',
        url: 'https://student-register-bnaf.onrender.com/empresa',
        data: {
            nm_empresa: newEmpresa
        }
      }).then(res=>{
        window.location.reload()
      })
    }
    
  }

  useEffect(()=>{

    if(localStorage.getItem('nm_tipo') == 'professor') window.location.replace("https://sr-front.vercel.app/studentList")

    setNome(localStorage.getItem('nm_login') ?? '')

    axios({
      method: 'post',
      url: 'https://student-register-bnaf.onrender.com/sessionCheck',
      data: {
        token: localStorage.getItem('token')
      }
    }).then(({data})=>{
      if (data.length == 0) window.location.replace('https://sr-front.vercel.app') 
    })

    axios({
      method: 'get',
      url: `https://student-register-bnaf.onrender.com/empresa?search=${filtroEmpresa}`,
    }).then(res =>{
      setEmpresas(res.data)      
    })

  },[filtroEmpresa])

  const deleteEmpresa = (cd:String)=>{
    axios({
      method: 'delete',
      url: `https://student-register-bnaf.onrender.com/empresa/${cd}`
    })
  
    setEmpresas(empresas.filter(({cd_empresa})=>cd_empresa != cd))
  }

  const atualizaEmpresa = (cd_empresa:String)=>{

    axios({
      method: 'put',
      url: `https://student-register-bnaf.onrender.com/empresa/${cd_empresa}`,
      data:{
        nm_empresa: newEmpresa
      }
    }).then(res=>{

      axios({
        method: 'get',
        url: `https://student-register-bnaf.onrender.com/empresa?search=${filtroEmpresa}`,
      }).then(res =>{
        setEmpresas(res.data)      
      })
    })
  }


  return (
    <div className="h-screen">
      <div onClick={e=>{
        setNewEmpresa('')
        setErro('')
        setDarkcreen('invisible')
        }} className={`bg-black/80 fixed w-[100%] h-[100vh] ${darkscreen}`}></div>
      <div className={`fixed bg-white w-[30%] top-[50%] left-[50%] translate-x-[-50%] translate-y-[-50%] ${darkscreen}`}>
      <h1 className="text-red-800 text-[18pt] font-bold text-center">Nova Empresa</h1>
      <form onSubmit={e=>{e.preventDefault()}} action="#" className="bg-red-800 text-white w-[92%] mx-auto text-[14pt] p-3 flex flex-col" >
        Nome da empresa <input value={newEmpresa} onChange={e=>{setNewEmpresa(e.target.value)}}
        type="text" className="w-full text-black p-1 mb-3" />
       
        <div className="bg-white text-red-600 w-full text-center">
            {erro}
        </div>
        <input type="button" onClick={e=>{newValidar()}} value="CADASTRAR" className="cursor-pointer text-red-800 bg-white p-3 w-[50%] mx-auto mt-5 hover:bg-red-700 hover:text-white transition-colors" />
      </form>
      </div>
      <CabecalhoDiretoria page='emp' nome={nome} />
      <Filtro 
        filter1={'Nome'} set1={setFiltroEmpresa}
        filter2={''} set2={''}
        filter3={''} set3={''}
        btn={setDarkcreen}
        btn2={''}
        opt='empresa'
      />
      <div className="bg-zinc-200 mt-7 text-center mx-auto w-[80%] p-2">
        <table className="mx-auto">
          <thead className="text-[16pt]">
            <tr className="text-left">
              <th className="w-[99%]">Nome da Empresa</th>
            </tr>
          </thead>
          <tbody className="text-[12pt]">
            {
              empresas.length>0 &&
              empresas.map(({
                cd_empresa,
                nm_empresa
              })=>(
                <tr 
                key={cd_empresa} 
                className="text-left bg-white h-10 cursor-default"
                >
                  
                  {editEmpresa==cd_empresa?
                    <td><input type="text" className="w-[50%]" id="cd_curso" value={newEmpresa} onChange={e=>setNewEmpresa(e.target.value)} /></td>:
                    <td className="">{nm_empresa}</td>
                  }

                  {editEmpresa!=cd_empresa?
                    <td><Pencil onClick={e=>{setEditEmpresa(cd_empresa); setNewEmpresa(nm_empresa)}} className="cursor-pointer hover:text-yellow-800" /></td>:
                    <td><Check onClick={e=>{setEditEmpresa(''); atualizaEmpresa(cd_empresa)}} className="cursor-pointer hover:text-yellow-800" /></td>
                  }
                  <td className=""><Trash2 onClick={e=>{deleteEmpresa(cd_empresa)}} className="cursor-pointer hover:text-red-800" /></td>
                </tr>
                
              ))
            }
          </tbody>
        </table>
        {empresas.length==0 && <span className="">Não foi possível encontrar nenhuma empresa...</span>}
      </div>
    </div>
  );
}
