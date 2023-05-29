import React, { useState } from 'react';
import { Button, Modal, Box } from '@mui/material';
import "../pages/PDV/styles.css";

const style = {
    top: '50%',
    left: '50%',
    padding: '25px',
    transform: 'translate(-50%, -50%)',
    position: 'relative',
    display: 'flex',
    flexDirection: 'column',
    width: 550,
    pointerEvents: 'auto',
    backgroundColor: '#ffffff',
    backgroundClip: 'padding-box',
    border: '0 solid rgba(0, 0, 0, 0.175)',
    borderRadius: '0.95rem',
    boxShadow: '0 0.5rem 1rem rgba(0, 0, 0, 0.1)',
    outline: 0
};

export default function Contato({ onClose }) {
    const [nome, setNome] = useState('');
    const [sobrenome, setSobronome] = useState('');
    const [cpf, setCpf] = useState('');
    const [telefone, setTelefone] = useState('');
    const [estado, setEstado] = useState('');
    const [cidade, setCidade] = useState('');
    const [bairro, setBairro] = useState('');
    const [rua, setRua] = useState('');
    const [numero, setNumero] = useState('');

    const handleSubmit = (e) => {
        e.preventDefault();
        const dadosContato = {
            nome,
            sobrenome,
            cpf,
            telefone,
            estado,
            cidade,
            bairro,
            rua,
            numero
        }
        onClose(dadosContato); // Fechar a modal após a submissão
    };

    const handleFantasiaContato = (event) => {
        setNome('Nome');
        setSobronome('Fantasia');
        setCpf('000.000.000-00');
        setTelefone('(00) 0 0000-0000');
        setEstado('XX');
        setCidade('Cidade');
        setBairro('Bairro');
        setRua('Rua');
        setNumero('00');
    };

    return (
        <Modal open={true} onClose={onClose}>
            <Box sx={style}>
                <h2>Dados do contato</h2>
                <form onSubmit={handleSubmit}>
                    <div className="row mb-5">
                        <div className="col-md-6 fv-row fv-plugins-icon-container">
                            <label className="required fs-5 fw-semibold mb-2">Nome</label>
                            <input type="text" value={nome} className="form-control form-control-solid" placeholder="" name="first-name" onChange={e => setNome(e.target.value)} />
                        </div>
                        <div className="col-md-6 fv-row fv-plugins-icon-container">
                            <label className="required fs-5 fw-semibold mb-2">Sobrenome</label>
                            <input type="text" value={sobrenome} onChange={e => setSobronome(e.target.value)} className="form-control form-control-solid" placeholder="" name="last-name" />
                        </div>
                    </div>
                    <div className="row mb-5">
                        <div className="col-md-6 fv-row fv-plugins-icon-container">
                            <label className="required fs-5 fw-semibold mb-2">CPF</label>
                            <input type="text" value={cpf} className="form-control form-control-solid" placeholder="" name="first-name" onChange={e => setCpf(e.target.value)} />
                        </div>
                        <div className="col-md-6 fv-row fv-plugins-icon-container">
                            <label className="required fs-5 fw-semibold mb-2">Telefone</label>
                            <input type="text" value={telefone} className="form-control form-control-solid" placeholder="" name="first-name" onChange={e => setTelefone(e.target.value)} />
                        </div>
                    </div>

                    <div className="row mb-5">
                        <div className="col-md-6 fv-row fv-plugins-icon-container">
                            <label className="required fs-5 fw-semibold mb-2">Cidade</label>
                            <input type="text" value={cidade} className="form-control form-control-solid" placeholder="" name="first-name" onChange={e => setCidade(e.target.value)} />
                        </div>
                        <div className="col-md-6 fv-row fv-plugins-icon-container">
                            <label className="required fs-5 fw-semibold mb-2">Bairro</label>
                            <input type="text" value={bairro} className="form-control form-control-solid" placeholder="" name="first-name" onChange={e => setBairro(e.target.value)} />
                        </div>
                    </div>
                    <div className="row mb-5">
                        <div className="col-md-6 fv-row fv-plugins-icon-container">
                            <label className="required fs-5 fw-semibold mb-2">Rua</label>
                            <input type="text" value={rua} className="form-control form-control-solid" placeholder="" name="first-name" onChange={e => setRua(e.target.value)} />
                        </div>
                        <div className="col-md-6 fv-row fv-plugins-icon-container">
                            <label className="required fs-5 fw-semibold mb-2">Número</label>
                            <input type="text" value={numero} className="form-control form-control-solid" placeholder="" name="first-name" onChange={e => setNumero(e.target.value)} />
                        </div>
                    </div>
                    <div className="row mb-5">
                        <div className="col-md fv-row fv-plugins-icon-container">
                            <label className="required fs-5 fw-semibold mb-2">UF</label>
                            <select name="category" data-control="select2" value={estado} onChange={e => setEstado(e.target.value)} data-hide-search="true" data-placeholder="Select a Category..." className="form-select form-select-solid " data-select2-id="select2-data-13-ysyc" tabindex="-1" aria-hidden="true" data-kt-initialized="1">
                                <option value="XX" data-select2-id="select2-data-15-5clv">Fantasia</option>
                                <option value="AC" data-select2-id="select2-data-15-5clv">Acre</option>
                                <option value="AL" data-select2-id="select2-data-15-5clv">Alagoas</option>
                                <option value="AP" data-select2-id="select2-data-15-5clv">Amapá</option>
                                <option value="AM" data-select2-id="select2-data-15-5clv">Amazonas</option>
                                <option value="BA" data-select2-id="select2-data-15-5clv">Bahia</option>
                                <option value="CE" data-select2-id="select2-data-15-5clv">Ceará</option>
                                <option value="DF" data-select2-id="select2-data-15-5clv">Destrito Federal</option>
                                <option value="ES" data-select2-id="select2-data-15-5clv">Espírito Santo</option>
                                <option value="GO" data-select2-id="select2-data-15-5clv">Goiás</option>
                                <option value="MA" data-select2-id="select2-data-15-5clv">Maranhão</option>
                                <option value="MT" data-select2-id="select2-data-15-5clv">Mato Grosso</option>
                                <option value="MS" data-select2-id="select2-data-15-5clv">Mato Grosso Do Sul</option>
                                <option value="MG" data-select2-id="select2-data-15-5clv">Minas Gerais</option>
                                <option value="PA" data-select2-id="select2-data-15-5clv">Pará</option>
                                <option value="PB" data-select2-id="select2-data-15-5clv">Paraíba</option>
                                <option value="PR" data-select2-id="select2-data-15-5clv">Paraná</option>
                                <option value="PE" data-select2-id="select2-data-15-5clv">Pernambuco</option>
                                <option value="PI" data-select2-id="select2-data-15-5clv">Piauí</option>
                                <option value="RJ" data-select2-id="select2-data-15-5clv">Rio de Janeiro</option>
                                <option value="RN" data-select2-id="select2-data-15-5clv">Rio Grande do Norte</option>
                                <option value="RS" data-select2-id="select2-data-15-5clv">Rio Grande do Sul</option>
                                <option value="RO" data-select2-id="select2-data-15-5clv">Rondônia</option>
                                <option value="RR" data-select2-id="select2-data-15-5clv">Roraima</option>
                                <option value="SC" data-select2-id="select2-data-15-5clv">Santa Catarina</option>
                                <option value="SP" data-select2-id="select2-data-15-5clv">São Paulo</option>
                                <option value="SE" data-select2-id="select2-data-15-5clv">Sergipe</option>
                                <option value="TO" data-select2-id="select2-data-15-5clv">Tocantins</option>
                            </select>
                        </div>
                    </div>
                    <button type="button" onClick={handleFantasiaContato} className="btn btn-light-primary fs-4 fw-bold py-4">Fantasia</button>
                    <Button type="submit" className='btn btn-primary'>Enviar</Button>
                </form>
            </Box>
        </Modal >
    );
}
