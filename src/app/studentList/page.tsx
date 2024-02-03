'use client'

import { useState, useEffect } from "react";

import axios from 'axios'

import Cabecalho from '../../components/cabecalho'
import Filtro from '../../components/filtro'

export default function Home() {

  const [nome,setNome] = useState('')
  const [curso,setCurso] = useState('')

  const [filtroNome, setFiltroNome] = useState('')
  const [filtroEmpresa, setFiltroEmpresa] = useState('')
  const [filtroRA, setFiltroRA] = useState('')

  useEffect(()=>{

    setNome(localStorage.getItem('nm_login') ?? '')
    setCurso(localStorage.getItem('nm_curso') ?? '')

    axios({
      method: 'post',
      url: 'https://student-register-bnaf.onrender.com/sessionCheck',
      data: {
        token: localStorage.getItem('token')
      }
    }).then(({data})=>{
      if (data.length == 0) window.location.replace('http://localhost:3000/') 
    })
  },[])

  return (
    <div className="h-screen">
        <Cabecalho curso={curso} nome={nome} />
        <Filtro />
        <table>
          <thead>
            <tr>
              <th>Nome</th>
              <th>RA</th>
              <th>Empresa</th>
              <th>Período</th>
            </tr>
          </thead>
          <tbody>
            
          </tbody>
        </table>
    </div>
  );
}
