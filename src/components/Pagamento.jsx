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

export default function Pagamento({ onClose, valorVenda }) {
    const [formaPagamento, setFormaPagamento] = useState('dinheiro');
    const [desconto, setDesconto] = useState('');

    const handleSubmit = (e) => {
        e.preventDefault();
        const dadosPagamento = {};
        onClose(dadosPagamento); // Fechar a modal após a submissão
    };

    const handleRadioChange = (e) => {
        setFormaPagamento(e.target.value);
    };

    return (
        <Modal open={true} onClose={onClose}>
            <Box sx={style}>
                <form onSubmit={handleSubmit}>
                    <h2>Pagamento</h2>
                    <div>
                        <label htmlFor="radio-dinheiro">Didinheiro: </label>
                        <input id="radio-dinheiro" name="radio-dinheiro" type="radio" value='dinheiro' onChange={handleRadioChange} checked={formaPagamento === 'dinheiro'} />
                    </div>
                    <div>
                        <label htmlFor="radio-pix">Pix: </label>
                        <input id="radio-pix" name="radio-pix" type="radio" value='pix' onChange={handleRadioChange} checked={formaPagamento === 'pix'} />
                    </div>
                    <div>
                        <label htmlFor="radio-credito">Cartão de crédito: </label>
                        <input id="radio-credito" name="radio-credito" type="radio" value='credito' onChange={handleRadioChange} checked={formaPagamento === 'credito'} />
                    </div>
                    <div>
                        <label htmlFor="radio-debito">Cartão de débito: </label>
                        <input id="radio-debito" name="radio-debito" type="radio" value='debito' onChange={handleRadioChange} checked={formaPagamento === 'debito'} />
                    </div>
                    <h2>Desconto</h2>
                    <div>
                        <label className="pdv-label">Desconto (%): </label>
                        <input type="number" value={desconto} className="pdv-input" onChange={e => setDesconto(e.target.value)} />
                    </div>
                    <div>
                        Valor final: <strong>{(valorVenda - (valorVenda * (desconto / 100))).toFixed(2)}</strong>
                    </div>
                    <Button type="submit">Enviar</Button>
                </form>
            </Box>
        </Modal >
    );
}
