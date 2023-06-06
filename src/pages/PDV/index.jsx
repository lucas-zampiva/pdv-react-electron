import React, { useState, useEffect, useRef } from "react";
import "./styles.css";
import Contato from "../../components/Contato";
import Pagamento from "../../components/Pagamento";

function PDV() {
    const [products, setProducts] = useState([]);
    const [productCode, setProductCode] = useState("");
    const [productQtd, setProductQtd] = useState(1);
    const [carrinho, setCarrinho] = useState([]);
    const [ultimoProduto, setUltimoProduto] = useState({});
    const tbodyRef = useRef(null);
    const [modalOpen, setModalOpen] = useState(false);
    const [modalPagamentoOpen, setModalPagamentoOpen] = useState(false);
    const [dadosContatoVenda, setDadosContatoVenda] = useState({});

    useEffect(() => {
        window.electron.receive('getAllProducts').then((products) => {
            setProducts(products);
        })
    }, []);

    useEffect(() => {
        if (tbodyRef.current && carrinho.length > 0) {
            tbodyRef.current.lastChild.scrollIntoView({ behavior: 'smooth' });
        }
    }, [carrinho]);

    const handleProductCodeChange = (event) => {
        setProductCode(event.target.value);
    };

    const handleKeyDown = (event) => {
        if (event.key === 'Enter') {
            handleAddToCart();
        }
    };

    const handleProductQtdChange = (action) => {
        if (action === 'plus') {
            let qtd = productQtd + 1;
            setProductQtd(qtd);
        } else {
            let qtd = productQtd - 1;
            if (qtd < 1) {
                qtd = 1;
            }
            setProductQtd(qtd);
        }

    };

    const handleProductCartQtdChange = (action, product, position) => {
        if (action === 'plus') {
            product.quantidade = product.quantidade + 1;
            carrinho[position] = product;
        } else {
            let qtd = product.quantidade - 1;
            if (qtd < 1) {
                qtd = 1;
            }
            product.quantidade = qtd;
            carrinho[position] = product;
        }
        setCarrinho([...carrinho]);
    };

    const handleAddToCart = () => {
        const found = products.find(element => element.codigo === productCode);
        if (found) {
            const deepClone = JSON.parse(JSON.stringify(found));
            deepClone.quantidade = productQtd;
            setCarrinho([...carrinho, deepClone]);
            setProductCode('');
            setProductQtd(1);
            setUltimoProduto(deepClone);
        } else {
            console.log('produto nao encontrado');
        }
    };

    const handleOpenModal = () => {
        setModalOpen(true);
    };

    const handleCloseModal = (dadosContato) => {
        setDadosContatoVenda(dadosContato);
        setModalOpen(false);
        setModalPagamentoOpen(true);
    };

    const handleCloseModalPagamento = (dadosPagamento) => {
        setModalPagamentoOpen(false);

        const venda = {
            itens: carrinho,
            contato: dadosContatoVenda,
            pagamento: dadosPagamento
        }

        window.electron.send('addVenda', venda);
        handleCancelSale();
    };

    const handleCancelSale = () => {
        setCarrinho([]);
        setProductCode('');
        setProductQtd(1);
        setUltimoProduto({});
    };

    return (
        <div className="pdv-container">
            <div className="menu card card-flush bg-body">
                <div className="card-header">
                    <h1 className="card-title fw-bold text-gray-800 fs-2qx">Venda atual</h1>
                    <div className="card-toolbar">
                        <button onClick={handleCancelSale} className="btn btn-light-primary fs-4 fw-bold py-4">
                            <svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" fill="currentColor" viewBox="0 0 24 24"> <g> <path fill="none" d="M0 0h24v24H0z" /> <path d="M4 8h16v13a1 1 0 0 1-1 1H5a1 1 0 0 1-1-1V8zm2 2v10h12V10H6zm3 2h2v6H9v-6zm4 0h2v6h-2v-6zM7 5V3a1 1 0 0 1 1-1h8a1 1 0 0 1 1 1v2h5v2H2V5h5zm2-1v1h6V4H9z" /> </g> </svg>
                        </button>
                    </div>
                </div>
            </div>
            <div className="container">
                <div className="container-1 card card-flush bg-body">
                    <div className="card-body pt-0">
                        <div className="table-responsive mb-8">
                            <table className="table align-middle gs-0 gy-4 my-0">
                                <thead>
                                    <tr>
                                        <th className="min-w-175px"></th>
                                        <th className="w-125px"></th>
                                        <th className="w-60px"></th>
                                    </tr>
                                </thead>
                                <tbody ref={tbodyRef} >
                                    {carrinho.map((product, i) => (
                                        <tr key={i}>
                                            <td>
                                                <div className="d-flex align-items-center">
                                                    <svg className="w-50px h-50px rounded-3 me-3" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100" width="50px" height="50px"><g id=""><path d="M89.419,35.147l1.558-9.345c0.865-5.191-0.589-10.471-3.991-14.485C83.586,7.302,78.618,5,73.356,5 c-8.768,0-16.179,6.278-17.621,14.927l-0.377,2.26c-1.199-1.346-2.945-2.186-4.862-2.186c-0.259,0-0.521,0.016-0.779,0.047 c-0.244,0.031-0.483,0.073-0.718,0.129V16c0-4.411-3.589-8-8-8H29c-4.411,0-8,3.589-8,8v5c0,0.952,0.17,1.876,0.485,2.737 C18.688,26.336,17,30.031,17,34v1h-2.5C7.607,35,2,40.607,2,47.5c0,4.005,1.913,7.689,5,10.006V66c0,15.439,12.561,26,28,26h32 c15.439,0,28-10.561,28-26v-8.494c3.087-2.317,5-6.001,5-10.006C100,41.26,95.404,36.073,89.419,35.147z" opacity=".35" /><path fill="#f2f2f2" d="M87.419,33.147l1.558-9.345c0.865-5.191-0.589-10.471-3.991-14.485C81.586,5.302,76.618,3,71.356,3 c-8.768,0-16.179,6.278-17.621,14.927l-0.377,2.26c-1.199-1.346-2.945-2.186-4.862-2.186c-0.259,0-0.521,0.016-0.779,0.047 c-0.244,0.031-0.483,0.073-0.718,0.129V14c0-4.411-3.589-8-8-8H27c-4.411,0-8,3.589-8,8v5c0,0.952,0.17,1.876,0.485,2.737 C16.688,24.336,15,28.031,15,32v1h-2.5C5.607,33,0,38.607,0,45.5c0,4.005,1.913,7.689,5,10.006V64c0,15.439,12.561,26,28,26h32 c15.439,0,28-10.561,28-26v-8.494c3.087-2.317,5-6.001,5-10.006C98,39.26,93.404,34.073,87.419,33.147z" /><path fill="#f9b84f" d="M71.529,10L71.529,10c-5.606,0-10.391,3.718-11.313,8.792L56,42h23.253l3.588-19.749 C84.006,15.838,78.616,10,71.529,10z" /><path fill="#40396e" d="M49.5,40c-0.829,0-1.5-0.672-1.5-1.5c0-5.835-0.979-13.735-0.988-13.814c-0.103-0.821,0.48-1.571,1.302-1.674 c0.816-0.109,1.572,0.479,1.674,1.302C50.03,24.645,51,32.476,51,38.5C51,39.328,50.329,40,49.5,40z" /><path fill="#96c362" d="M53,38h-4v0c0-6.075,4.925-11,11-11h4v0C64,33.075,59.075,38,53,38z" /><path fill="#96c362" d="M39,26H27c-3.314,0-6,2.686-6,6v10h24V32C45,28.686,42.314,26,39,26z" /><rect width="12" height="15" x="27" y="16" fill="#96c362" /><rect width="12" height="5" x="27" y="14" fill="#ffe8d9" /><circle cx="44.5" cy="41.5" r="8.5" fill="#de5147" /><circle cx="55.5" cy="41.5" r="8.5" fill="#de5147" /><path fill="#d47f56" d="M66,82H32c-11.046,0-20-6.954-20-18V49h74v15C86,75.046,77.046,82,66,82z" /><path fill="#d47f56" d="M85.5,50h-73C10.015,50,8,47.985,8,45.5v0c0-2.485,2.015-4.5,4.5-4.5h73c2.485,0,4.5,2.015,4.5,4.5v0 C90,47.985,87.985,50,85.5,50z" /><path d="M85.5,50h-73C10.015,50,8,47.985,8,45.5v0c0-2.485,2.015-4.5,4.5-4.5h73c2.485,0,4.5,2.015,4.5,4.5v0 C90,47.985,87.985,50,85.5,50z" opacity=".35" /><path d="M30.5,58h-7c-0.829,0-1.5-0.672-1.5-1.5s0.671-1.5,1.5-1.5h7c0.829,0,1.5,0.672,1.5,1.5S31.329,58,30.5,58z" opacity=".35" /><path d="M44.5,58h-7c-0.829,0-1.5-0.672-1.5-1.5s0.671-1.5,1.5-1.5h7c0.829,0,1.5,0.672,1.5,1.5S45.329,58,44.5,58z" opacity=".35" /><path d="M74.5,58h-7c-0.829,0-1.5-0.672-1.5-1.5s0.671-1.5,1.5-1.5h7c0.829,0,1.5,0.672,1.5,1.5S75.329,58,74.5,58z" opacity=".35" /><path d="M60.5,58h-7c-0.829,0-1.5-0.672-1.5-1.5s0.671-1.5,1.5-1.5h7c0.829,0,1.5,0.672,1.5,1.5S61.329,58,60.5,58z" opacity=".35" /><path d="M30.5,76h-7c-0.829,0-1.5-0.672-1.5-1.5s0.671-1.5,1.5-1.5h7c0.829,0,1.5,0.672,1.5,1.5S31.329,76,30.5,76z" opacity=".35" /><path d="M44.5,76h-7c-0.829,0-1.5-0.672-1.5-1.5s0.671-1.5,1.5-1.5h7c0.829,0,1.5,0.672,1.5,1.5S45.329,76,44.5,76z" opacity=".35" /><path d="M74.5,76h-7c-0.829,0-1.5-0.672-1.5-1.5s0.671-1.5,1.5-1.5h7c0.829,0,1.5,0.672,1.5,1.5S75.329,76,74.5,76z" opacity=".35" /><path d="M60.5,76h-7c-0.829,0-1.5-0.672-1.5-1.5s0.671-1.5,1.5-1.5h7c0.829,0,1.5,0.672,1.5,1.5S61.329,76,60.5,76z" opacity=".35" /><path d="M24.5,67h-7c-0.829,0-1.5-0.672-1.5-1.5s0.671-1.5,1.5-1.5h7c0.829,0,1.5,0.672,1.5,1.5S25.329,67,24.5,67z" opacity=".35" /><path d="M38.5,67h-7c-0.829,0-1.5-0.672-1.5-1.5s0.671-1.5,1.5-1.5h7c0.829,0,1.5,0.672,1.5,1.5S39.329,67,38.5,67z" opacity=".35" /><path d="M67.5,67h-7c-0.829,0-1.5-0.672-1.5-1.5s0.671-1.5,1.5-1.5h7c0.829,0,1.5,0.672,1.5,1.5S68.329,67,67.5,67z" opacity=".35" /><path d="M81.5,67h-7c-0.829,0-1.5-0.672-1.5-1.5s0.671-1.5,1.5-1.5h7c0.829,0,1.5,0.672,1.5,1.5S82.329,67,81.5,67z" opacity=".35" /><path d="M53.5,67h-7c-0.829,0-1.5-0.672-1.5-1.5s0.671-1.5,1.5-1.5h7c0.829,0,1.5,0.672,1.5,1.5S54.329,67,53.5,67z" opacity=".35" /><rect width="12" height="3" x="27" y="19" fill="#40396e" opacity=".35" /><path fill="#ef8630" d="M77,21.5c0,0-2.552,1.5-5.7,1.5c-3.148,0-5.7-1.5-5.7-1.5s2.552-1.5,5.7-1.5C74.448,20,77,21.5,77,21.5z" /><path fill="#ef8630" d="M77,28.5c0,0-2.552,1.5-5.7,1.5c-3.148,0-5.7-1.5-5.7-1.5s2.552-1.5,5.7-1.5C74.448,27,77,28.5,77,28.5z" /><path fill="#ef8630" d="M76,35.5c0,0-2.552,1.5-5.7,1.5c-3.148,0-5.7-1.5-5.7-1.5s2.552-1.5,5.7-1.5C73.448,34,76,35.5,76,35.5z" /><path fill="#40396e" d="M65,85H33c-13.327,0-23-8.832-23-21V52.574c-2.961-1.038-5-3.837-5-7.074c0-4.136,3.364-7.5,7.5-7.5H20v-6 c0-3.839,2.459-7.23,6-8.486v-1.685c-1.164-0.413-2-1.525-2-2.829v-5c0-1.654,1.346-3,3-3h12c1.654,0,3,1.346,3,3v5 c0,1.304-0.836,2.416-2,2.829v1.685c2.927,1.036,5.127,3.531,5.792,6.559c0.797,0.089,1.575,0.261,2.33,0.513 c2.128-3.411,5.662-5.764,9.641-6.406l0.905-5.43C59.706,12.521,65.042,8,71.356,8c3.789,0,7.367,1.658,9.815,4.549 c2.449,2.891,3.497,6.692,2.874,10.431L81.541,38H85.5c4.136,0,7.5,3.364,7.5,7.5c0,3.237-2.039,6.036-5,7.074V64 C88,76.168,78.327,85,65,85z M12.5,41C10.019,41,8,43.019,8,45.5c0,2.205,1.577,4.071,3.749,4.438 C12.471,50.06,13,50.685,13,51.417V64c0,10.43,8.411,18,20,18h32c11.589,0,20-7.57,20-18V51.417c0-0.732,0.529-1.357,1.251-1.479 C88.423,49.571,90,47.705,90,45.5c0-2.481-2.019-4.5-4.5-4.5h-5.729c-0.441,0-0.859-0.194-1.145-0.53 c-0.285-0.337-0.408-0.781-0.335-1.217l2.795-16.768c0.478-2.865-0.326-5.78-2.204-7.997C77.005,12.271,74.261,11,71.356,11 c-4.842,0-8.934,3.467-9.73,8.243l-1.09,6.539c-0.114,0.682-0.679,1.197-1.368,1.249c-3.867,0.287-7.329,2.625-9.034,6.101 c-0.362,0.738-1.251,1.049-1.995,0.691C46.999,33.277,45.774,33,44.5,33c-0.79,0-1.461-0.612-1.513-1.401 c-0.178-2.687-2.146-4.939-4.787-5.479c-0.698-0.143-1.2-0.757-1.2-1.47V20.5c0-0.828,0.671-1.5,1.5-1.5H39v-5H27v5h0.5 c0.829,0,1.5,0.672,1.5,1.5v4.15c0,0.713-0.502,1.327-1.2,1.47C25.019,26.688,23,29.16,23,32v7.5c0,0.828-0.671,1.5-1.5,1.5H12.5z" /><rect width="75" height="3" x="11" y="50" fill="#40396e" opacity=".35" /></g></svg>
                                                    <span className="fw-bold text-gray-800 cursor-pointer text-hover-primary fs-6 me-1">{product.nome}</span>
                                                </div>
                                            </td>
                                            <td>
                                                <div className="position-relative d-flex align-items-center" data-kt-dialer="true" data-kt-dialer-min="1" data-kt-dialer-max="10" data-kt-dialer-step="1" data-kt-dialer-decimals="0">
                                                    <button type="button" onClick={() => handleProductCartQtdChange('minus', product, i)} className="btn btn-icon btn-sm btn-light btn-icon-gray-400" data-kt-dialer-control="decrease">
                                                        <i className="ki-duotone ki-minus fs-3x"></i>
                                                    </button>
                                                    <div className="form-control border-0 text-center px-0 fs-3 fw-bold text-gray-800 w-30px">{product.quantidade}</div>
                                                    <button type="button" onClick={() => handleProductCartQtdChange('plus', product, i)} className="btn btn-icon btn-sm btn-light btn-icon-gray-400" data-kt-dialer-control="increase">
                                                        <i className="ki-duotone ki-plus fs-3x"></i>
                                                    </button>
                                                </div>
                                            </td>
                                            <td className="text-end">
                                                <span className="fw-bold text-primary fs-2" data-kt-pos-element="item-total">R${product.quantidade * product.preco}</span>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                        {carrinho.length >= 1 && (
                            <>
                                <div className="d-flex flex-stack bg-success rounded-3 p-6 mb-11">
                                    <div className="fs-6 fw-bold text-white">
                                        <span className="d-block fs-2qx lh-1">Total</span>
                                    </div>
                                    <div className="fs-6 fw-bold text-white text-end">
                                        <span className="d-block fs-2qx lh-1" data-kt-pos-element="grant-total">R$ {carrinho.reduce((accumulator, product) => accumulator + (product.quantidade * product.preco), 0)}</span>
                                    </div>
                                </div>
                            </>
                        )}
                    </div>
                </div>
                <div className="container-2  card card-flush bg-body">
                    <div className="card-body pt-0">
                        <div className="d-flex align-items-center position-relative mb-n7 mb-10">
                            <i className="ki-duotone ki-barcode fs-1 position-absolute ms-4">
                                <span className="path1"></span>
                                <span className="path2"></span>
                                <span className="path3"></span>
                                <span className="path4"></span>
                                <span className="path5"></span>
                                <span className="path6"></span>
                                <span className="path7"></span>
                                <span className="path8"></span>
                            </i>
                            <input type="text" value={productCode} onChange={handleProductCodeChange} onKeyDown={handleKeyDown} data-kt-ecommerce-edit-order-filter="search" className="form-control form-control-solid w-100 w-lg-50 ps-12" placeholder="Código de barras" />
                        </div>
                        <div className="d-flex align-items-center flex-wrap pdv-add-to-cart-container mb-10">
                            <div style={{ width: "100%" }} className="position-relative d-flex align-items-center" data-kt-dialer="true" data-kt-dialer-min="1" data-kt-dialer-max="10" data-kt-dialer-step="1" data-kt-dialer-decimals="0">
                                <button type="button" onClick={() => handleProductQtdChange('minus')} className="btn btn-icon btn-sm btn-light btn-icon-gray-400" data-kt-dialer-control="decrease">
                                    <i className="ki-duotone ki-minus fs-3x"></i>
                                </button>
                                <div className="form-control border-0 text-center px-0 fs-3 fw-bold text-gray-800 w-30px">{productQtd}</div>
                                <button type="button" onClick={() => handleProductQtdChange('plus')} className="btn btn-icon btn-sm btn-light btn-icon-gray-400" data-kt-dialer-control="increase">
                                    <i className="ki-duotone ki-plus fs-3x"></i>
                                </button>
                                <button style={{ width: "100%", marginLeft: "10px" }} onClick={handleAddToCart} className="btn btn-primary"><svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" viewBox="0 0 16 16"> <path d="M0 2.5A.5.5 0 0 1 .5 2H2a.5.5 0 0 1 .485.379L2.89 4H14.5a.5.5 0 0 1 .485.621l-1.5 6A.5.5 0 0 1 13 11H4a.5.5 0 0 1-.485-.379L1.61 3H.5a.5.5 0 0 1-.5-.5zM3.14 5l.5 2H5V5H3.14zM6 5v2h2V5H6zm3 0v2h2V5H9zm3 0v2h1.36l.5-2H12zm1.11 3H12v2h.61l.5-2zM11 8H9v2h2V8zM8 8H6v2h2V8zM5 8H3.89l.5 2H5V8zm0 5a1 1 0 1 0 0 2 1 1 0 0 0 0-2zm-2 1a2 2 0 1 1 4 0 2 2 0 0 1-4 0zm9-1a1 1 0 1 0 0 2 1 1 0 0 0 0-2zm-2 1a2 2 0 1 1 4 0 2 2 0 0 1-4 0z" /> </svg></button>
                            </div>
                        </div>
                        {carrinho.length >= 1 && (
                            <>
                                <div className="card-rounded bg-primary bg-opacity-5 p-10 mb-15 pdv-resume-product">
                                    <h3 className="text-dark fw-bold mb-11">Último produto:</h3>
                                    <div className="d-flex align-items-center">
                                        <i className="ki-duotone ki-barcode fs-1 text-primary me-5">
                                            <span className="path1"></span>
                                            <span className="path2"></span>
                                            <span className="path3"></span>
                                            <span className="path4"></span>
                                            <span className="path5"></span>
                                            <span className="path6"></span>
                                            <span className="path7"></span>
                                            <span className="path8"></span>
                                        </i>
                                        <div className="d-flex flex-column">
                                            <h5 className="text-gray-800 fw-bold">{ultimoProduto.codigo}</h5>
                                        </div>
                                    </div>
                                    <div className="d-flex align-items-center">
                                        <i className="ki-duotone ki-subtitle fs-1 text-primary me-5">
                                            <span className="path1"></span>
                                            <span className="path2"></span>
                                            <span className="path3"></span>
                                            <span className="path4"></span>
                                            <span className="path5"></span>
                                        </i>
                                        <div className="d-flex flex-column">
                                            <h5 className="text-gray-800 fw-bold">{ultimoProduto.nome}</h5>
                                        </div>
                                    </div>
                                    <div className="d-flex align-items-center">
                                        <i className="ki-duotone ki-lots-shopping fs-1 text-primary me-5">
                                            <span className="path1"></span>
                                            <span className="path2"></span>
                                            <span className="path3"></span>
                                            <span className="path4"></span>
                                            <span className="path5"></span>
                                            <span className="path6"></span>
                                            <span className="path7"></span>
                                            <span className="path8"></span>
                                        </i>
                                        <div className="d-flex flex-column">
                                            <h5 className="text-gray-800 fw-bold">{ultimoProduto.quantidade}</h5>
                                        </div>
                                    </div>
                                    <div className="d-flex align-items-center">
                                        <i className="ki-duotone ki-tag fs-1 text-primary me-5">
                                            <span className="path1"></span>
                                            <span className="path2"></span>
                                            <span className="path3"></span>
                                        </i>
                                        <div className="d-flex flex-column">
                                            <h5 className="text-gray-800 fw-bold">{ultimoProduto.preco}</h5>
                                        </div>
                                    </div>
                                </div>
                                <div className="pdv-cart-container">
                                    <button style={{ width: "100%" }} onClick={handleOpenModal} className="btn btn-primary">Finalizar</button>
                                </div>
                            </>
                        )}
                    </div>
                </div>
            </div>
            {modalOpen && <Contato onClose={handleCloseModal} />}
            {modalPagamentoOpen && <Pagamento onClose={handleCloseModalPagamento} valorVenda={carrinho.reduce((accumulator, product) => accumulator + (product.quantidade * product.preco), 0)} />}
        </div >
    );
}

export default PDV;
