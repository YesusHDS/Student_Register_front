'use client'

import { useState, useEffect } from "react";

import {Trash2, Pencil, Check} from 'lucide-react'

import axios from 'axios'

import Cabecalho from '../../components/cabecalho'

import Filtro from '../../components/filtro'


export default function Home() {

  const [empresas, setEmpresas] = useState([{
    cd_empresa: '',
    nm_empresa: ''
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
    dt_periodocomeco: '',
    dt_periodotermino: '',
    nm_estagiario: ''
  }])

  const [darkscreen, setDarkcreen] = useState('invisible')
  const [estagiarioScreen, setEstagiarioScreen] = useState('invisible')
  const [erro, setErro] = useState('')
  const [newCurso, setNewCurso] = useState('')
  const [newRA, setNewRA] = useState('')
  const [newStatus, setNewStatus] = useState('0')
  const [newTurno, setNewTurno] = useState('0')
  const [newCiclo, setNewCiclo] = useState('')
  const [newInicioEstagio, setNewInicioEstagio] = useState('')
  const [newHoraEntrada, setNewHoraEntrada] = useState('')
  const [newHorasEstagio, setNewHorasEstagio] = useState('')
  const [newEmpresa, setNewEmpresa] = useState('0')
  const [check, setCheck] = useState(false)
  const [newComeco, setNewComeco] = useState('')
  const [newTermino, setNewTermino] = useState('')
  const [newNome, setNewNome] = useState('')
  const [editFlag, setEditFlag] = useState('')

  function newValidar(){
    setErro('')
    let val = true

    if(newTermino.length==0){
      setErro('O fim do período é obrigatório!')
      val = false
    } 

    if(newComeco.length==0){
      setErro('O começo do período é obrigatório!')
      val = false
    } 

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

    console.log();
    

    if(newEmpresa=='0'){
      setErro('Selecione uma empresa!')
      val = false
    }

    if(newCiclo.length==0){
      setErro('O campo ciclo é obrigatório!')
      val = false
    }

    if(newTurno=='0'){
      setErro('O campo turno é obrigatório!')
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
          cd_curso: localStorage.getItem('cd_curso') ?? '',
          cd_registroMatricula: newRA,
          nm_statusMatricula: newStatus,
          nm_turno: newTurno,
          nm_ciclo: newCiclo,
          dt_inicioEstagio: `${newInicioEstagio.split('-')[1]}/${newInicioEstagio.split('-')[2]}/${newInicioEstagio.split('-')[0]}`,
          qt_horaEstagioEntrada: newHoraEntrada,
          qt_horasEstagio: newHorasEstagio,
          cd_empresa: newEmpresa,
          ic_check: check,
          dt_periodoComeco: `${newComeco.split('-')[1]}/${newComeco.split('-')[2]}/${newComeco.split('-')[0]}`,
          dt_periodoTermino: `${newTermino.split('-')[1]}/${newTermino.split('-')[2]}/${newTermino.split('-')[0]}`,
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
      url: `https://student-register-bnaf.onrender.com/estagiario?search=${filtroNome}&empresa=${filtroEmpresa}&RA=${filtroRA}&curso=${localStorage.getItem('cd_curso')}`,
    }).then(res =>{
      setEstagiarios(res.data)
    })

    axios({
      method: 'get',
      url: `https://student-register-bnaf.onrender.com/empresa`,
    }).then(res =>{
      setEmpresas(res.data)
    })

  },[filtroNome, filtroEmpresa, filtroRA])

  const  deleteEstagiario = (ra:String)=>{
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
    dt_periodocomeco='',
    dt_periodotermino='',
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
      setNewComeco(dt_periodocomeco)
      setNewTermino(dt_periodotermino)
      setNewNome(nm_estagiario)

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
    dt_periodocomeco='',
    dt_periodotermino='',
    nm_estagiario=''})=>{
      axios({
        method: 'put',
        url: `https://student-register-bnaf.onrender.com/estagiario/${cd_registromatricula}`,
        data: {
          cd_curso, 
          dt_periodoComeco: dt_periodocomeco, 
          dt_periodoTermino: dt_periodotermino, 
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
      axios({
        method: 'put',
        url: `https://student-register-bnaf.onrender.com/estagiario/${newRA}`,
        data: {
          cd_curso: newCurso, 
          dt_periodoComeco: newComeco, 
          dt_periodoTermino: newTermino, 
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


  return (
    <div className="h-screen">
      <div onClick={e=>{
        setNewCurso('')
        setNewRA('')
        setNewStatus('0')
        setNewTurno('0')
        setNewCiclo('')
        setNewInicioEstagio('')
        setNewHoraEntrada('')
        setNewHorasEstagio('')
        setNewEmpresa('0')
        setCheck(false)
        setNewComeco('')
        setNewTermino('')
        setNewNome('')
        setErro('')
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
          Turno
          <select className="w-full text-black p-1 mb-3" value={newTurno} onChange={e=>{setNewTurno(e.target.value)}}>
            <option disabled value={'0'}>Selecione o turno...</option>
            <option value={'Matutino'}>Matutino</option>
            <option value={'Vespertino'}>Vespertino</option>
            <option value={'Noturno'}>Noturno</option>
          </select>
          Ciclo <input value={newCiclo} onChange={e=>{setNewCiclo(e.target.value)}} type="text" className="w-full text-black p-1 mb-3" />
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

          Período <div><input value={newComeco} onChange={e=>{setNewComeco(e.target.value)}} type="date" className="w-[40%] text-black p-1 mb-3" /> até <input onChange={e=>{setNewTermino(e.target.value)}} type="date" className="w-[40%] text-black p-1 mb-3" /></div>
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
            <Check onClick={e=>{setEditFlag(''); atualizaEstagiario()}} className="text-[25pt] ml-auto h-9 translate-y-[-10px] hover:text-yellow-800" />
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
            Turno:
            {editFlag==newRA?
              <select className="w-full text-black p-1 mb-3" value={newTurno} onChange={e=>{setNewTurno(e.target.value)}}>
              <option disabled value={'0'}>Selecione o turno...</option>
              <option value={'Matutino'}>Matutino</option>
              <option value={'Vespertino'}>Vespertino</option>
              <option value={'Noturno'}>Noturno</option>
            </select>:
              <p className="ml-3">{newTurno}</p>
            }
          </div>

          <div className="my-3 flex">
            Ciclo:
            {editFlag==newRA?
              <input maxLength={10} type="text" className="ml-3 w-[50%]" id="nm_ciclo" value={newCiclo} onChange={e=>setNewCiclo(e.target.value)} />:
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

          <div className="my-3 flex">
            Começo do estágio:
            {editFlag==newRA?
              <input maxLength={10} type="date" className="ml-3 w-[50%]" id="nm_ciclo" value={newComeco} onChange={e=>setNewComeco(e.target.value)} />:
              <p className="ml-3">{`${newComeco.slice(0,10).split('-')[2]}/${newComeco.slice(0,10).split('-')[1]}/${newComeco.slice(0,10).split('-')[0]}`}</p>
            }
          </div>

          <div className="my-3 flex">
            Término do estágio:
            {editFlag==newRA?
              <input maxLength={10} type="date" className="ml-3 w-[50%]" id="nm_ciclo" value={newTermino} onChange={e=>setNewTermino(e.target.value)} />:
              <p className="ml-3">{`${newTermino.slice(0,10).split('-')[2]}/${newTermino.slice(0,10).split('-')[1]}/${newTermino.slice(0,10).split('-')[0]}`}</p>
            }
          </div>

        </div>
      </div>
      <Cabecalho curso={curso} nome={nome} />
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
              <th className="w-[20%]">Período</th>
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
                ic_check,
                dt_periodocomeco, 
                dt_periodotermino
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
                    dt_periodocomeco,
                    dt_periodotermino,
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
                    dt_periodocomeco,
                    dt_periodotermino,
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
                    dt_periodocomeco,
                    dt_periodotermino,
                    nm_estagiario})}}>{buscaEmpresa(cd_empresa)}</td>
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
                    dt_periodocomeco,
                    dt_periodotermino,
                    nm_estagiario})}}>{`${dt_periodocomeco.slice(0,10).split('-')[2]}/${dt_periodocomeco.slice(0,10).split('-')[1]}/${dt_periodocomeco.slice(0,10).split('-')[0]}`} até {`${dt_periodotermino.slice(0,10).split('-')[2]}/${dt_periodotermino.slice(0,10).split('-')[1]}/${dt_periodotermino.slice(0,10).split('-')[0]}`}</td>
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
                    dt_periodocomeco,
                    dt_periodotermino,
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
