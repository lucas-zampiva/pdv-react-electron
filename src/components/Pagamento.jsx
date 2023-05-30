import React, { useState } from 'react';
import { Modal, Box } from '@mui/material';

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

export default function Pagamento({ onClose, valorVenda }) {
    const [formaPagamento, setFormaPagamento] = useState('dinheiro');
    const [desconto, setDesconto] = useState(0);

    const handleSubmit = (e) => {
        e.preventDefault();
        const valorVendaComDesconto = (valorVenda - (valorVenda * (desconto / 100)));
        const dadosPagamento = {
            formaPagamento: formaPagamento,
            desconto: desconto,
            valorVenda: valorVendaComDesconto
        };
        onClose(dadosPagamento); // Fechar a modal após a submissão
    };

    const handleRadioChange = (e) => {
        setFormaPagamento(e.target.value);
    };

    return (
        <Modal open={true} onClose={onClose} slotProps={{ backdrop: { onClick: () => { } } }} disableEscapeKeyDown>
            <Box sx={style}>
                <form onSubmit={handleSubmit}>
                    <h2>Pagamento</h2>
                    <div className="row row-cols-1 row-cols-md-2 g-5 mb-5">
                        <div className="col">
                            <input id="radio-dinheiro" name="radio-dinheiro" type="radio" value='dinheiro' className="btn-check" onChange={handleRadioChange} checked={formaPagamento === 'dinheiro' ? true : false} />
                            <label className="btn btn-outline btn-outline-dashed btn-active-light-primary p-7 d-flex align-items-center h-100" htmlFor="radio-dinheiro">
                                <i className="ki-duotone ki-bill fs-3hx text-primary">
                                    <span className="path1"></span>
                                    <span className="path2"></span>
                                    <span className="path3"></span>
                                    <span className="path4"></span>
                                    <span className="path5"></span>
                                    <span className="path6"></span>
                                </i>
                                <span className="d-block fw-semibold text-start">
                                    <span className="text-dark fw-bold d-block fs-3">Dinheiro</span>
                                </span>
                            </label>
                        </div>
                        <div className="col">
                            <input id="radio-pix" name="radio-pix" type="radio" value='pix' className="btn-check" onChange={handleRadioChange} checked={formaPagamento === 'pix' ? true : false} />
                            <label className="btn btn-outline btn-outline-dashed btn-active-light-primary p-7 d-flex align-items-center h-100" htmlFor="radio-pix">
                                <i className="ki-duotone ki-paypal fs-3hx text-primary">
                                    <span className="path1"></span>
                                    <span className="path2"></span>
                                </i>
                                <span className="d-block fw-semibold text-start">
                                    <span className="text-dark fw-bold d-block fs-3">Pix</span>
                                </span>
                            </label>
                        </div>
                    </div>
                    <div className="row row-cols-1 row-cols-md-2 g-5  mb-10">
                        <div className="col">
                            <input id="radio-credito" name="radio-credito" type="radio" value='credito' className="btn-check" onChange={handleRadioChange} checked={formaPagamento === 'credito' ? true : false} />
                            <label className="btn btn-outline btn-outline-dashed btn-active-light-primary p-7 d-flex align-items-center h-100" htmlFor="radio-credito">
                                <i className="ki-duotone ki-credit-cart fs-3hx text-primary">
                                    <span className="path1"></span>
                                    <span className="path2"></span>
                                </i>
                                <span className="d-block fw-semibold text-start">
                                    <span className="text-dark fw-bold d-block fs-3">Crédito</span>
                                </span>
                            </label>
                        </div>
                        <div className="col">
                            <input id="radio-debito" name="radio-debito" type="radio" value='debito' className="btn-check" onChange={handleRadioChange} checked={formaPagamento === 'debito' ? true : false} />
                            <label className="btn btn-outline btn-outline-dashed btn-active-light-primary p-7 d-flex align-items-center h-100" htmlFor="radio-debito">
                                <i className="ki-duotone ki-two-credit-cart fs-3hx text-primary">
                                    <span className="path1"></span>
                                    <span className="path2"></span>
                                    <span className="path3"></span>
                                    <span className="path4"></span>
                                    <span className="path5"></span>
                                </i>
                                <span className="d-block fw-semibold text-start">
                                    <span className="text-dark fw-bold d-block fs-3">Débito</span>
                                </span>
                            </label>
                        </div>
                    </div>
                    <div className="card-rounded bg-primary bg-opacity-5 p-10 mb-15 pdv-resume-product  mb-10">
                        <div className="fv-row" id="kt_ecommerce_add_product_discount_percentage">
                            <label className="form-label">Definir porcentagem de desconto</label>
                            <div className="d-flex flex-column justify-content-center text-center">
                                <div className="d-flex align-items-start mb-7">
                                    <span className="fw-bold fs-3x" id="kt_ecommerce_add_product_discount_label">{desconto}</span>
                                    <span className="fw-bold fs-4 mt-1 ms-2">%</span>
                                </div>
                            </div>
                            <input type="range" value={desconto} className="pdv-input" onChange={e => setDesconto(e.target.value)} min="0" max="100" />
                        </div>
                    </div>
                    <div className="d-flex flex-stack bg-success rounded-3 p-6 mb-5">
                        <div className="fs-6 fw-bold text-white">
                            <span className="d-block lh-1 mb-2">Valor venda</span>
                            <span className="d-block mb-9">Descontos</span>
                            <span className="d-block fs-2qx lh-1">Total</span>
                        </div>
                        <div className="fs-6 fw-bold text-white text-end">
                            <span className="d-block lh-1 mb-2" data-kt-pos-element="total">R${valorVenda}</span>
                            <span className="d-block mb-9" data-kt-pos-element="discount">-R${(valorVenda * (desconto / 100)).toFixed(2)}</span>
                            <span className="d-block fs-2qx lh-1" data-kt-pos-element="grant-total">R$ {(valorVenda - (valorVenda * (desconto / 100))).toFixed(2)}</span>
                        </div>
                    </div>
                    <button type="submit" className='btn btn-primary'>Enviar</button>
                </form>
            </Box>
        </Modal >
    );
}
