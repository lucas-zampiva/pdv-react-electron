import React, { useState } from 'react';
import { Button, Modal, Box } from '@mui/material';

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
        <Modal open={true} onClose={onClose}>
            <Box sx={style}>
                <form onSubmit={handleSubmit}>
                    <h2>Pagamento</h2>
                    <div class="row row-cols-1 row-cols-md-2 g-5 mb-5">
                        <div class="col">
                            <input id="radio-dinheiro" name="radio-dinheiro" type="radio" value='dinheiro' class="btn-check" onChange={handleRadioChange} checked={formaPagamento === 'dinheiro' ? true : false} />
                            <label class="btn btn-outline btn-outline-dashed btn-active-light-primary p-7 d-flex align-items-center h-100" for="radio-dinheiro">
                                <i class="ki-duotone ki-bill fs-3hx text-primary">
                                    <span class="path1"></span>
                                    <span class="path2"></span>
                                    <span class="path3"></span>
                                    <span class="path4"></span>
                                    <span class="path5"></span>
                                    <span class="path6"></span>
                                </i>
                                <span class="d-block fw-semibold text-start">
                                    <span class="text-dark fw-bold d-block fs-3">Dinheiro</span>
                                </span>
                            </label>
                        </div>
                        <div class="col">
                            <input id="radio-pix" name="radio-pix" type="radio" value='pix' class="btn-check" onChange={handleRadioChange} checked={formaPagamento === 'pix' ? true : false} />
                            <label class="btn btn-outline btn-outline-dashed btn-active-light-primary p-7 d-flex align-items-center h-100" for="radio-pix">
                                <i class="ki-duotone ki-paypal fs-3hx text-primary">
                                    <span class="path1"></span>
                                    <span class="path2"></span>
                                </i>
                                <span class="d-block fw-semibold text-start">
                                    <span class="text-dark fw-bold d-block fs-3">Pix</span>
                                </span>
                            </label>
                        </div>
                    </div>
                    <div class="row row-cols-1 row-cols-md-2 g-5  mb-10">
                        <div class="col">
                            <input id="radio-credito" name="radio-credito" type="radio" value='credito' class="btn-check" onChange={handleRadioChange} checked={formaPagamento === 'credito' ? true : false} />
                            <label class="btn btn-outline btn-outline-dashed btn-active-light-primary p-7 d-flex align-items-center h-100" for="radio-credito">
                                <i class="ki-duotone ki-credit-cart fs-3hx text-primary">
                                    <span class="path1"></span>
                                    <span class="path2"></span>
                                </i>
                                <span class="d-block fw-semibold text-start">
                                    <span class="text-dark fw-bold d-block fs-3">Crédito</span>
                                </span>
                            </label>
                        </div>
                        <div class="col">
                            <input id="radio-debito" name="radio-debito" type="radio" value='debito' class="btn-check" onChange={handleRadioChange} checked={formaPagamento === 'debito' ? true : false} />
                            <label class="btn btn-outline btn-outline-dashed btn-active-light-primary p-7 d-flex align-items-center h-100" for="radio-debito">
                                <i class="ki-duotone ki-two-credit-cart fs-3hx text-primary">
                                    <span class="path1"></span>
                                    <span class="path2"></span>
                                    <span class="path3"></span>
                                    <span class="path4"></span>
                                    <span class="path5"></span>
                                </i>
                                <span class="d-block fw-semibold text-start">
                                    <span class="text-dark fw-bold d-block fs-3">Débito</span>
                                </span>
                            </label>
                        </div>
                    </div>
                    <div className="card-rounded bg-primary bg-opacity-5 p-10 mb-15 pdv-resume-product  mb-10">
                        <div class="fv-row" id="kt_ecommerce_add_product_discount_percentage">
                            <label class="form-label">Definir porcentagem de desconto</label>
                            <div class="d-flex flex-column justify-content-center text-center">
                                <div class="d-flex align-items-start mb-7">
                                    <span class="fw-bold fs-3x" id="kt_ecommerce_add_product_discount_label">{desconto}</span>
                                    <span class="fw-bold fs-4 mt-1 ms-2">%</span>
                                </div>
                            </div>
                            <input type="range" value={desconto} className="pdv-input" onChange={e => setDesconto(e.target.value)} min="0" max="100" />
                        </div>
                    </div>
                    <div class="d-flex flex-stack bg-success rounded-3 p-6 mb-5">
                        <div class="fs-6 fw-bold text-white">
                            <span class="d-block lh-1 mb-2">Valor venda</span>
                            <span class="d-block mb-9">Descontos</span>
                            <span class="d-block fs-2qx lh-1">Total</span>
                        </div>
                        <div class="fs-6 fw-bold text-white text-end">
                            <span class="d-block lh-1 mb-2" data-kt-pos-element="total">R${valorVenda}</span>
                            <span class="d-block mb-9" data-kt-pos-element="discount">-R${(valorVenda * (desconto / 100)).toFixed(2)}</span>
                            <span class="d-block fs-2qx lh-1" data-kt-pos-element="grant-total">R$ {(valorVenda - (valorVenda * (desconto / 100))).toFixed(2)}</span>
                        </div>
                    </div>
                    <Button type="submit" className='btn btn-primary'>Enviar</Button>
                </form>
            </Box>
        </Modal >
    );
}
