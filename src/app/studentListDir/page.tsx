'use client'

import { useState, useEffect } from "react";

import {Trash2, Pencil, Check} from 'lucide-react'

import axios from 'axios'

import CabecalhoDiretoria from '../../components/cabecalhoDiretoria'

import Filtro from '../../components/filtro'


export default function Home() {

  const [cursos, setCursos] = useState([{
    cd_curso: '',
    nm_curso: ''
  }])

  const [empresas, setEmpresas] = useState([{
    cd_empresa: '',
    nm_empresa: ''
  }])

  const [turnos, setTurnos] = useState([{
    cd_turno: '',
    cd_curso: '',
    nm_turno: ''
  }])

  const [turnosOpt, setTurnosOpt] = useState([{
    cd_turno: '',
    cd_curso: '',
    nm_turno: ''
  }])

  const [ciclos, setCiclos] = useState([{
    cd_ciclo: '',
    cd_curso: '',
    nm_ciclo: ''
  }])

  const [ciclosOpt, setCiclosOpt] = useState([{
    cd_ciclo: '',
    cd_curso: '',
    nm_ciclo: ''
  }])
  
  const [nome,setNome] = useState('')
  const [curso,setCurso] = useState('')
  const [tipo, setTipo] = useState('')

  const [filtroNome, setFiltroNome] = useState('')
  const [filtroEmpresa, setFiltroEmpresa] = useState('')
  const [filtroRA, setFiltroRA] = useState('')

  const [estagiarios, setEstagiarios] = useState([{
    cd_curso: '',
    cd_registromatricula: '',
    nm_statusmatricula: '',
    nm_turno: '',
    nm_ciclo: '',
    dt_inicioestagio: '',
    qt_horaestagioentrada: '',
    qt_horasestagio: '',
    cd_empresa: '',
    ic_check: false,
    nm_estagiario: ''
  }])

  const [darkscreen, setDarkcreen] = useState('invisible')
  const [estagiarioScreen, setEstagiarioScreen] = useState('invisible')
  const [erro, setErro] = useState('')
  const [newCurso, setNewCurso] = useState('0')
  const [newRA, setNewRA] = useState('')
  const [newStatus, setNewStatus] = useState('0')
  const [newTurno, setNewTurno] = useState('0')
  const [newCiclo, setNewCiclo] = useState('0')
  const [newInicioEstagio, setNewInicioEstagio] = useState('')
  const [newHoraEntrada, setNewHoraEntrada] = useState('')
  const [newHorasEstagio, setNewHorasEstagio] = useState('')
  const [newEmpresa, setNewEmpresa] = useState('0')
  const [check, setCheck] = useState(false)
  const [newNome, setNewNome] = useState('')
  const [editFlag, setEditFlag] = useState('')

  function newValidar(){
    setErro('')
    let val = true

    if(newHorasEstagio.length==0){
      setErro('Insira a carga horária diária!')
      val = false
    }

    if(newHoraEntrada.length==0){
      setErro('Insira o horário de entrada no estágio!')
      val = false
    }

    if(newInicioEstagio.length==0){
      setErro('Insira a data de início do estágio!')
      val = false
    }

    if(newEmpresa=='0'){
      setErro('Selecione uma empresa!')
      val = false
    }

    if(newCiclo=='0' || newCiclo=='1' || newCiclo=='2'){
      setErro('O campo ciclo é obrigatório!')
      val = false
    }

    if(newTurno=='0' || newTurno=='1' || newTurno=='2'){
      setErro('O campo turno é obrigatório!')
      val = false
    }

    if(newCurso=='0'){
      setErro('Selecione um curso!')
      val = false
    }

    if(newStatus=='0'){
      setErro('O status da matricula é obrigatório!')
      val = false
    }

    if(newRA.length==0){
      setErro('O campo RA é obrigatório!')
      val = false
    }

    if(newNome.length==0){
      setErro('O campo nome é obrigatório!')
      val = false
    }

    if(val){

      axios({
        method: 'post',
        url: 'https://student-register-bnaf.onrender.com/estagiario',
        data: {
          cd_curso: newCurso,
          cd_registroMatricula: newRA,
          nm_statusMatricula: newStatus,
          nm_turno: newTurno,
          nm_ciclo: newCiclo,
          dt_inicioEstagio: `${newInicioEstagio.split('-')[1]}/${newInicioEstagio.split('-')[2]}/${newInicioEstagio.split('-')[0]}`,
          qt_horaEstagioEntrada: newHoraEntrada,
          qt_horasEstagio: newHorasEstagio,
          cd_empresa: newEmpresa,
          ic_check: check,
          nm_estagiario: newNome
        }
      }).then(e=>{

        window.location.reload()
      }).catch(e=>{
        setErro('Não repita o RA!')
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
      url: `https://student-register-bnaf.onrender.com/curso`,
    }).then(res =>{
      setCursos(res.data.filter(({nm_curso=''})=>nm_curso != 'DIRETORIA'))
    })

    axios({
      method: 'get',
      url: `https://student-register-bnaf.onrender.com/estagiario?search=${filtroNome}&empresa=${filtroEmpresa}&RA=${filtroRA}`,
    }).then(res =>{
      setEstagiarios(res.data)
    })

    axios({
      method: 'get',
      url: `https://student-register-bnaf.onrender.com/empresa`,
    }).then(res =>{
      setEmpresas(res.data)
    })

    axios({
      method: 'get',
      url: `https://student-register-bnaf.onrender.com/turno`,
    }).then(res =>{
      setTurnos(res.data)
    })

    axios({
      method: 'get',
      url: `https://student-register-bnaf.onrender.com/ciclo`,
    }).then(res =>{
      setCiclos(res.data)
    })

  },[filtroNome, filtroEmpresa, filtroRA])

  const deleteEstagiario = (ra:String)=>{
    axios({
      method: 'delete',
      url: `https://student-register-bnaf.onrender.com/estagiario/${ra}`
    })
  
    setEstagiarios(estagiarios.filter(({cd_registromatricula})=>cd_registromatricula != ra))
  }

  const buscaEmpresa = (cd:String)=>{
    let name = empresas.find(({cd_empresa})=>cd_empresa == cd)?.nm_empresa

    return name
  }

  const buscaCurso = (cd:String)=>{
    let name = cursos.find(({cd_curso})=>cd_curso == cd)?.nm_curso

    return name
  }

  const buscaTurno = (cd:String)=>{
    let turnosOpt = turnos.filter(({cd_curso})=>cd_curso == cd)

    setTurnosOpt(turnosOpt)
  }

  const buscaCiclo = (cd:String)=>{
    let ciclosOpt = ciclos.filter(({cd_curso})=>cd_curso == cd)

    setCiclosOpt(ciclosOpt)
  }

  const setarEstagiario = ({
    cd_curso='',
    cd_registromatricula='',
    nm_statusmatricula='',
    nm_turno='',
    nm_ciclo='',
    dt_inicioestagio='',
    qt_horaestagioentrada='',
    qt_horasestagio='',
    cd_empresa='',
    ic_check=false,
    nm_estagiario=''})=>{
      setNewCurso(cd_curso)
      setNewRA(cd_registromatricula)
      setNewStatus(nm_statusmatricula)
      setNewTurno(nm_turno)
      setNewCiclo(nm_ciclo)
      setNewInicioEstagio(dt_inicioestagio)
      setNewHoraEntrada(qt_horaestagioentrada)
      setNewHorasEstagio(qt_horasestagio)
      setNewEmpresa(cd_empresa)
      setCheck(ic_check)
      setNewNome(nm_estagiario)
      buscaCiclo(cd_curso)
      buscaTurno(cd_curso)

    setEstagiarioScreen('visible')
  }

  const alteraCheck = ({
    cd_curso='',
    cd_registromatricula='',
    nm_statusmatricula='',
    nm_turno='',
    nm_ciclo='',
    dt_inicioestagio='',
    qt_horaestagioentrada='',
    qt_horasestagio='',
    cd_empresa='',
    ic_check=false,
    nm_estagiario=''})=>{
      axios({
        method: 'put',
        url: `https://student-register-bnaf.onrender.com/estagiario/${cd_registromatricula}`,
        data: {
          cd_curso,
          cd_empresa, 
          nm_estagiario,
          nm_statusMatricula: nm_statusmatricula,
          nm_turno,
          nm_ciclo,
          dt_inicioEstagio: dt_inicioestagio,
          qt_horaEstagioEntrada: qt_horaestagioentrada,
          qt_horasEstagio: qt_horasestagio,
          ic_check
        }
      }).then(res=>{
        window.location.reload()
      })

  }

  const atualizaEstagiario = ()=>{
    setErro('')
    let val = true

    if(newHorasEstagio.length==0){
      setErro('Insira a carga horária diária!')
      val = false
    }

    if(newHoraEntrada.length==0){
      setErro('Insira o horário de entrada no estágio!')
      val = false
    }

    if(newInicioEstagio.length==0){
      setErro('Insira a data de início do estágio!')
      val = false
    }

    if(newEmpresa=='0'){
      setErro('Selecione uma empresa!')
      val = false
    }

    if(newCiclo=='0' || newCiclo=='1' || newCiclo=='2'){
      setErro('O campo ciclo é obrigatório!')
      val = false
    }

    if(ciclosOpt.length==0){
      setErro('O campo ciclo é obrigatório!')
      val = false
    }

    if(newTurno=='0' || newTurno=='1' || newTurno=='2'){
      setErro('O campo turno é obrigatório!')
      val = false
    }

    if(turnosOpt.length==0){
      setErro('O campo turno é obrigatório!')
      val = false
    }

    if(newCurso=='0'){
      setErro('Selecione um curso!')
      val = false
    }

    if(newStatus=='0'){
      setErro('O status da matricula é obrigatório!')
      val = false
    }

    if(newRA.length==0){
      setErro('O campo RA é obrigatório!')
      val = false
    }

    if(newNome.length==0){
      setErro('O campo nome é obrigatório!')
      val = false
    }

    if(val){
      axios({
        method: 'put',
        url: `https://student-register-bnaf.onrender.com/estagiario/${newRA}`,
        data: {
          cd_curso: newCurso, 
          cd_empresa: newEmpresa, 
          nm_estagiario: newNome,
          nm_statusMatricula: newStatus,
          nm_turno: newTurno,
          nm_ciclo: newCiclo,
          dt_inicioEstagio: newInicioEstagio,
          qt_horaEstagioEntrada: newHoraEntrada,
          qt_horasEstagio: newHorasEstagio,
          ic_check: check
        }
      }).then(res=>{
        window.location.reload()
      })
    }

  }

  return (
    <div className="h-screen">
      <div onClick={e=>{
        setNewCurso('0')
        setNewRA('')
        setNewStatus('0')
        setNewTurno('0')
        setNewCiclo('0')
        setNewInicioEstagio('')
        setNewHoraEntrada('')
        setNewHorasEstagio('')
        setNewEmpresa('0')
        setCheck(false)
        setNewNome('')
        setErro('')
        setEditFlag('')
        setDarkcreen('invisible')
        setEstagiarioScreen('invisible')
        }} className={`bg-black/80 fixed w-[100%] h-[100vh] ${darkscreen == 'visible' || estagiarioScreen == 'visible'? 'visible': 'invisible'}`}></div>
      <div className={`fixed bg-white w-[30%] min-w-[300px] top-[50%] left-[50%] translate-x-[-50%] translate-y-[-50%] ${darkscreen}`}>
        <h1 className="text-red-800 text-[18pt] font-bold text-center">Novo Aluno</h1>
        <form onSubmit={e=>{e.preventDefault()}} action="#" className="bg-red-800 text-white w-[92%] mx-auto text-[14pt] p-3 flex flex-col h-[10cm] overflow-auto" >
          Nome <input value={newNome} onChange={e=>{setNewNome(e.target.value)}} type="text" className="w-full text-black p-1 mb-3" />
          RA <input value={newRA} onChange={e=>{setNewRA(e.target.value)}} type="text" className="w-full text-black p-1 mb-3" />

          Status da Matricula 
          <select className="w-full text-black p-1 mb-3" value={newStatus} onChange={e=>{setNewStatus(e.target.value)}}>
            <option disabled value={'0'}>Selecione o status...</option>
            <option value={'Matriculado'}>Matriculado</option>
            <option value={'Trancado'}>Trancado</option>
          </select>

          Curso
          <select id='select' className="w-full text-black p-1 mb-3" value={newCurso} onChange={e=>{setNewCurso(e.target.value); buscaTurno(e.target.value); buscaCiclo(e.target.value)}}>
            <option disabled value={'0'}>Selecione o curso...</option>
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

          Turno
          <select disabled={newCurso!='0' && turnosOpt.length>0?false:true} className="w-full text-black p-1 mb-3" value={newCurso=='0'?'1':turnosOpt.length>0?newTurno:'2'} onChange={e=>{setNewTurno(e.target.value)}}>
            <option disabled value={'0'}>Selecione o turno...</option>
            <option disabled hidden value={'1'}>Selecione o curso primeiro...</option>
            <option disabled hidden value={'2'}>Curso sem turnos...</option>
            {
              turnosOpt.length>0 &&
              turnosOpt.map(({
                cd_turno,
                nm_turno
              })=>(
                <option key={cd_turno} value={nm_turno}>{nm_turno}</option>
              ))
            }
          </select>
          Ciclo 
          <select disabled={newCurso!='0' && ciclosOpt.length>0?false:true} className="w-full text-black p-1 mb-3" value={newCurso=='0'?'1':ciclosOpt.length>0?newCiclo:'2'} onChange={e=>{setNewCiclo(e.target.value)}}>
            <option disabled value={'0'}>Selecione o ciclo...</option>
            <option disabled hidden value={'1'}>Selecione o curso primeiro...</option>
            <option disabled hidden value={'2'}>Curso sem ciclos...</option>
            {
              ciclosOpt.length>0 &&
              ciclosOpt.map(({
                cd_ciclo,
                nm_ciclo
              })=>(
                <option key={cd_ciclo} value={nm_ciclo}>{nm_ciclo}</option>
              ))
            }
          </select>
          Empresa
          <select id='select' className="w-full text-black p-1 mb-3" value={newEmpresa} onChange={e=>{setNewEmpresa(e.target.value)}}>
            <option disabled value={'0'}>Selecione a empresa...</option>
            {
              empresas.length>0 &&
              empresas.map(({
                cd_empresa,
                nm_empresa
              })=>(
                <option key={cd_empresa} value={cd_empresa}>{nm_empresa}</option>
              ))
            }
          </select>

          Data de início do estágio 
          <div><input type="date" className="w-full text-black p-1 mb-3" value={newInicioEstagio} onChange={e=>{setNewInicioEstagio(e.target.value)}} /></div>

          Hora de entrada
          <input type="number" max={24} min={0} className="w-full text-black p-1 mb-3" value={newHoraEntrada} onChange={e=>{setNewHoraEntrada(e.target.value)}} />

          Carga horária diária
          <input type="number" max={24} min={0} className="w-full text-black p-1 mb-3" value={newHorasEstagio} onChange={e=>{setNewHorasEstagio(e.target.value)}} />

          <div className="bg-white text-red-600 w-full text-center">
              {erro}
          </div>
          <input type="button" onClick={e=>{newValidar()}} value="CADASTRAR" className="cursor-pointer text-red-800 bg-white p-3 w-[50%] mx-auto mt-5 hover:bg-red-700 hover:text-white transition-colors" />
        </form>
      </div>
      <div className={`fixed p-2 bg-white w-[30%] top-[50%] left-[50%] translate-x-[-50%] translate-y-[-50%] ${estagiarioScreen}`}>
        <div className="flex">
          <h1 className="text-red-800 text-[18pt] font-bold text-center">Estagiario</h1>
          {editFlag!=newRA?
            <Pencil onClick={e=>{setEditFlag(newRA)}} className="text-[25pt] ml-auto h-9 translate-y-[-10px] hover:text-yellow-800" />:
            <Check onClick={e=>{atualizaEstagiario()}} className="text-[25pt] ml-auto h-9 translate-y-[-10px] hover:text-yellow-800" />
          }
        </div>
        <div className="font-bold mx-auto w-[80%]" >

          <div className="my-3 flex">
            Nome:
            {editFlag==newRA?
              <input maxLength={10} type="text" className="ml-3 w-[50%]" id="nm_ciclo" value={newNome} onChange={e=>setNewNome(e.target.value)} />:
              <p className="ml-3">{newNome}</p>
            }

          </div>

          <div className="my-3 flex">
            RA:<p className="ml-3">{newRA}</p>
          </div>

          <div className="my-3 flex">
            Status da matricula:
            {editFlag==newRA?
              <select className="w-full text-black p-1 mb-3" value={newStatus} onChange={e=>{setNewStatus(e.target.value)}}>
              <option disabled value={'0'}>Selecione o status...</option>
              <option value={'Matriculado'}>Matriculado</option>
              <option value={'Trancado'}>Trancado</option>
            </select>:
              <p className="ml-3">{newStatus}</p>
            }
          </div>

          <div className="my-3 flex">
            Curso:
            {editFlag==newRA?
              <select id='select' className="w-full text-black p-1 mb-3" value={newCurso} onChange={e=>{setNewCurso(e.target.value); buscaTurno(e.target.value); setNewTurno('0'); buscaCiclo(e.target.value); setNewCiclo('0') }}>
              <option disabled value={'0'}>Selecione o curso...</option>
              {
                cursos.length>0 &&
                cursos.map(({
                  cd_curso,
                  nm_curso
                })=>(
                  <option key={cd_curso} value={cd_curso}>{nm_curso}</option>
                ))
              }
            </select>:
              <p className="ml-3">{buscaCurso(newCurso)}</p>
            }
            
          </div>

          <div className="my-3 flex">
            Turno:
            {editFlag==newRA?
              <select disabled={newCurso!='0' && turnosOpt.length>0?false:true} className="w-full text-black p-1 mb-3" value={newCurso=='0'?'1':turnosOpt.length>0?newTurno:'2'} onChange={e=>{setNewTurno(e.target.value)}}>
                <option disabled value={'0'}>Selecione o turno...</option>
                <option disabled hidden value={'1'}>Selecione o curso primeiro...</option>
                <option disabled hidden value={'2'}>Curso sem turnos...</option>
                {
                  turnosOpt.length>0 &&
                  turnosOpt.map(({
                    cd_turno,
                    nm_turno
                  })=>(
                    <option key={cd_turno} value={nm_turno}>{nm_turno}</option>
                  ))
                }
              </select>:
              <p className="ml-3">{newTurno}</p>
            }
          </div>

          <div className="my-3 flex">
            Ciclo:
            {editFlag==newRA?
              <select disabled={newCurso!='0' && ciclosOpt.length>0?false:true} className="w-full text-black p-1 mb-3" value={newCurso=='0'?'1':ciclosOpt.length>0?newCiclo:'2'} onChange={e=>{setNewCiclo(e.target.value)}}>
              <option disabled value={'0'}>Selecione o ciclo...</option>
              <option disabled hidden value={'1'}>Selecione o curso primeiro...</option>
              <option disabled hidden value={'2'}>Curso sem ciclos...</option>
              {
                ciclosOpt.length>0 &&
                ciclosOpt.map(({
                  cd_ciclo,
                  nm_ciclo
                })=>(
                  <option key={cd_ciclo} value={nm_ciclo}>{nm_ciclo}</option>
                ))
              }
            </select>:
              <p className="ml-3">{newCiclo}</p>
            }
          </div>

          <div className="my-3 flex">
            Empresa:
            {editFlag==newRA?
              <select id='select' className="w-full text-black p-1 mb-3" value={newEmpresa} onChange={e=>{setNewEmpresa(e.target.value)}}>
              <option disabled value={'0'}>Selecione a empresa...</option>
              {
                empresas.length>0 &&
                empresas.map(({
                  cd_empresa,
                  nm_empresa
                })=>(
                  <option key={cd_empresa} value={cd_empresa}>{nm_empresa}</option>
                ))
              }
            </select>:
              <p className="ml-3">{buscaEmpresa(newEmpresa)}</p>
            }
            
          </div>

          <div className="my-3 flex">
            Data de início do estágio:
            {editFlag==newRA?
              <input maxLength={10} type="date" className="ml-3 w-[50%]" id="nm_ciclo" value={newInicioEstagio} onChange={e=>setNewInicioEstagio(e.target.value)} />:
              <p className="ml-3">{`${newInicioEstagio.slice(0,10).split('-')[2]}/${newInicioEstagio.slice(0,10).split('-')[1]}/${newInicioEstagio.slice(0,10).split('-')[0]}`}</p>
            }
          </div>

          <div className="my-3 flex">
            Hora de entrada:
            {editFlag==newRA?
              <input maxLength={10} type="text" className="ml-3 w-[50%]" id="nm_ciclo" value={newHoraEntrada} onChange={e=>setNewHoraEntrada(e.target.value)} />:
              <p className="ml-3">{newHoraEntrada}</p>
            }
          </div>

          <div className="my-3 flex">
            Carga horária diária:
            {editFlag==newRA?
              <input maxLength={10} type="text" className="ml-3 w-[50%]" id="nm_ciclo" value={newHorasEstagio} onChange={e=>setNewHorasEstagio(e.target.value)} />:
              <p className="ml-3">{newHorasEstagio}</p>
            }
          </div>

          <div className="bg-white text-red-600 w-full text-center">
              {erro}
          </div>

        </div>
      </div>
      <CabecalhoDiretoria page='est' nome={nome} />
      <Filtro 
        filter1={'Nome'} set1={setFiltroNome}
        filter2={'Empresa'} set2={setFiltroEmpresa}
        filter3={'RA'} set3={setFiltroRA}
        btn={setDarkcreen}
        btn2={''}
        opt='aluno'
      />
      <div className="bg-zinc-200 mt-7 text-center mx-auto w-[80%] p-2">
        <table className="mx-auto">
          <thead className="text-[16pt]">
            <tr className="text-left">
              <th className="w-[30%]">Nome</th>
              <th className="w-[24%]">RA</th>
              <th className="w-[24%]">Empresa</th>
              <th className="w-[20%]"></th>
            </tr>
          </thead>
          <tbody className="text-[12pt]">
            {
              estagiarios.length>0 &&
              estagiarios.map(({
                cd_curso,
                nm_estagiario, 
                cd_registromatricula, 
                cd_empresa, 
                nm_statusmatricula,
                nm_turno,
                nm_ciclo,
                dt_inicioestagio,
                qt_horaestagioentrada,
                qt_horasestagio,
                ic_check
              })=>(
                <tr key={cd_registromatricula} className="text-left bg-white h-10 cursor-pointer hover:bg-slate-50">
                  <td className="" onClick={e=>{setarEstagiario({
                    cd_curso,
                    cd_registromatricula,
                    nm_statusmatricula,
                    nm_turno,
                    nm_ciclo,
                    dt_inicioestagio,
                    qt_horaestagioentrada,
                    qt_horasestagio,
                    cd_empresa,
                    ic_check,
                    nm_estagiario})}}>{nm_estagiario}</td>
                  <td className="" onClick={e=>{setarEstagiario({
                    cd_curso,
                    cd_registromatricula,
                    nm_statusmatricula,
                    nm_turno,
                    nm_ciclo,
                    dt_inicioestagio,
                    qt_horaestagioentrada,
                    qt_horasestagio,
                    cd_empresa,
                    ic_check,
                    nm_estagiario})}}>{cd_registromatricula}</td>
                  <td className="" onClick={e=>{setarEstagiario({
                    cd_curso,
                    cd_registromatricula,
                    nm_statusmatricula,
                    nm_turno,
                    nm_ciclo,
                    dt_inicioestagio,
                    qt_horaestagioentrada,
                    qt_horasestagio,
                    cd_empresa,
                    ic_check,
                    nm_estagiario})}}>{buscaEmpresa(cd_empresa)}</td>
                  <td className=""><input type="checkbox" checked={ic_check} onChange={e=>{alteraCheck({
                    cd_curso,
                    cd_registromatricula,
                    nm_statusmatricula,
                    nm_turno,
                    nm_ciclo,
                    dt_inicioestagio,
                    qt_horaestagioentrada,
                    qt_horasestagio,
                    cd_empresa,
                    ic_check: !ic_check,
                    nm_estagiario
                  })}} /></td>
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
