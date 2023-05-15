import React, { useState } from 'react';
import { Button, Modal, Box } from '@mui/material';

const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 400,
    bgcolor: 'background.paper',
    border: '2px solid #000',
    boxShadow: 24,
    p: 4,
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
                <h2>Dados contato</h2>
                <form onSubmit={handleSubmit}>
                    <div>
                        <label className="pdv-label">Nome: </label>
                        <input type="text" value={nome} className="pdv-input" onChange={e => setNome(e.target.value)} />
                    </div>
                    <div>
                        <label className="pdv-label">Sobrenome: </label>
                        <input type="text" value={sobrenome} className="pdv-input" onChange={e => setSobronome(e.target.value)} />
                    </div>
                    <div>
                        <label className="pdv-label">CPF: </label>
                        <input type="text" value={cpf} className="pdv-input" onChange={e => setCpf(e.target.value)} />
                    </div>
                    <div>
                        <label className="pdv-label">Telefone: </label>
                        <input type="text" value={telefone} className="pdv-input" onChange={e => setTelefone(e.target.value)} />
                    </div>
                    <div>
                        <label className="pdv-label">UF: </label>
                        <input type="text" value={estado} className="pdv-input" onChange={e => setEstado(e.target.value)} />
                    </div>
                    <div>
                        <label className="pdv-label">Cidade: </label>
                        <input type="text" value={cidade} className="pdv-input" onChange={e => setCidade(e.target.value)} />
                    </div>
                    <div>
                        <label className="pdv-label">Bairro: </label>
                        <input type="text" value={bairro} className="pdv-input" onChange={e => setBairro(e.target.value)} />
                    </div>
                    <div>
                        <label className="pdv-label">Rua: </label>
                        <input type="text" value={rua} className="pdv-input" onChange={e => setRua(e.target.value)} />
                    </div>
                    <div>
                        <label className="pdv-label">Número: </label>
                        <input type="text" value={numero} className="pdv-input" onChange={e => setNumero(e.target.value)} />
                    </div>
                    <button type="button" onClick={handleFantasiaContato} className="pdv-finish-sale-button">Fantasia</button>
                    <Button type="submit">Enviar</Button>
                </form>
            </Box>
        </Modal >
    );
}
