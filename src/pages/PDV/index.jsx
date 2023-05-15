import React, { useState, useEffect, useRef } from "react";
import ReactDOM from 'react-dom';
import "./styles.css";
import Contato from "../../components/Contato";
import Pagamento from "../../components/Pagamento";
const { ipcRenderer } = window.require('electron');


function PDV() {
    const [products, setProducts] = useState([]);
    const [productCode, setProductCode] = useState("");
    const [productQtd, setProductQtd] = useState(1);
    const [carrinho, setCarrinho] = useState([]);
    const [ultimoProduto, setUltimoProduto] = useState({});
    const tbodyRef = useRef(null);
    const [modalOpen, setModalOpen] = useState(false);
    const [modalPagamentoOpen, setModalPagamentoOpen] = useState(false);

    useEffect(() => {
        ipcRenderer.send('getAllProducts');
        ipcRenderer.on('getAllProducts', (event, rows) => {
            setProducts(rows);
        });

        return () => {
            ipcRenderer.removeAllListeners('getAllProducts');
        };
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

    const handleProductQtdChange = (event) => {
        setProductQtd(event.target.value);
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

    const handleFinishSale = () => {
        const popupWindow = window.open('', 'popupWindow', 'width=800,height=600');
        popupWindow.document.title = 'Meu Formulário';

        popupWindow.document.body.innerHTML = `
              <html>
                <head>
                  <title>Meu Formulário</title>
                </head>
                <body>
                  <div id="formContainer"></div>
                </body>
              </html>
            `;

        const formContainer = popupWindow.document.getElementById('formContainer');
        ReactDOM.render(<Contato />, formContainer);

    };

    const handleOpenModal = () => {
        setModalOpen(true);
    };

    const handleCloseModal = (dadosContato) => {
        console.table(dadosContato)
        setModalOpen(false);
        setModalPagamentoOpen(true);
    };

    const handleCloseModalPagamento = (dadosPagamento) => {
        console.table(dadosPagamento)
        setModalPagamentoOpen(false);
    };

    const handleCancelSale = () => {
        setCarrinho([]);
        setProductCode('');
        setProductQtd(1);
        setUltimoProduto({});
    };

    return (
        <div className="pdv-container">
            <div className="menu"><h1 className="pdv-title">PDV</h1></div>
            <div className="container">
                <div className="container-1">
                    <div className="table-wrapper">
                        <table className="pdv-products-table">
                            <thead>
                                <tr>
                                    <th>#</th>
                                    <th>Código</th>
                                    <th>Descrição</th>
                                    <th>Preço</th>
                                    <th>UN</th>
                                    <th>Preço Final</th>
                                </tr>
                            </thead>
                            <tbody ref={tbodyRef} >
                                {carrinho.map((product, i) => (
                                    <tr key={i}>
                                        <td>{i + 1}</td>
                                        <td>{product.codigo}</td>
                                        <td>{product.nome}</td>
                                        <td>{product.preco}</td>
                                        <td>{product.quantidade}</td>
                                        <td>{product.quantidade * product.preco}</td>
                                    </tr>
                                ))}
                            </tbody>
                            <tfoot>
                                <tr>
                                    <th scope="row" colSpan="5">Total</th>
                                    <td>{carrinho.reduce((accumulator, product) => accumulator + (product.quantidade * product.preco), 0)}</td>
                                </tr>
                            </tfoot>
                        </table>
                    </div>
                </div>
                <div className="container-2">
                    <div className="pdv-add-to-cart-container">
                        <div>
                            <label className="pdv-label">Código de barras:</label>
                            <input type="text" value={productCode} onChange={handleProductCodeChange} onKeyDown={handleKeyDown} className="pdv-input" />
                        </div>
                        <div>
                            <label className="pdv-label">Quantidade: </label>
                            <input type="text" value={productQtd} onChange={handleProductQtdChange} className="pdv-input2" />
                            <button onClick={handleAddToCart} className="pdv-add-to-cart-button"><svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" viewBox="0 0 16 16"> <path d="M0 2.5A.5.5 0 0 1 .5 2H2a.5.5 0 0 1 .485.379L2.89 4H14.5a.5.5 0 0 1 .485.621l-1.5 6A.5.5 0 0 1 13 11H4a.5.5 0 0 1-.485-.379L1.61 3H.5a.5.5 0 0 1-.5-.5zM3.14 5l.5 2H5V5H3.14zM6 5v2h2V5H6zm3 0v2h2V5H9zm3 0v2h1.36l.5-2H12zm1.11 3H12v2h.61l.5-2zM11 8H9v2h2V8zM8 8H6v2h2V8zM5 8H3.89l.5 2H5V8zm0 5a1 1 0 1 0 0 2 1 1 0 0 0 0-2zm-2 1a2 2 0 1 1 4 0 2 2 0 0 1-4 0zm9-1a1 1 0 1 0 0 2 1 1 0 0 0 0-2zm-2 1a2 2 0 1 1 4 0 2 2 0 0 1-4 0z" /> </svg></button>
                        </div>
                    </div>
                    <div className="pdv-resume-product">
                        <h3>Último produto lido:</h3>
                        <p>
                            Código: {ultimoProduto.codigo}<br />
                            Descrição: {ultimoProduto.nome} <br />
                            Quantidade: {ultimoProduto.quantidade} <br />
                            Preço: {ultimoProduto.preco} <br />
                        </p>
                    </div>

                    <div className="pdv-cart-container">
                        {carrinho.length >= 1 && (
                            <>
                                <button onClick={handleOpenModal} className="pdv-finish-sale-button"><svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" viewBox="0 0 24 24"><path d="M22,2H2A1,1,0,0,0,1,3v8a1,1,0,0,0,1,1H5v9a1,1,0,0,0,1,1H18a1,1,0,0,0,1-1V12h3a1,1,0,0,0,1-1V3A1,1,0,0,0,22,2ZM7,20V18a2,2,0,0,1,2,2Zm10,0H15a2,2,0,0,1,2-2Zm0-4a4,4,0,0,0-4,4H11a4,4,0,0,0-4-4V8H17Zm4-6H19V7a1,1,0,0,0-1-1H6A1,1,0,0,0,5,7v3H3V4H21Zm-9,5a3,3,0,1,0-3-3A3,3,0,0,0,12,15Zm0-4a1,1,0,1,1-1,1A1,1,0,0,1,12,11Z" /></svg>Finalizar</button>
                                <button onClick={handleCancelSale} className="pdv-finish-sale-button"><svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" viewBox="0 0 24 24"> <g> <path fill="none" d="M0 0h24v24H0z" /> <path d="M4 8h16v13a1 1 0 0 1-1 1H5a1 1 0 0 1-1-1V8zm2 2v10h12V10H6zm3 2h2v6H9v-6zm4 0h2v6h-2v-6zM7 5V3a1 1 0 0 1 1-1h8a1 1 0 0 1 1 1v2h5v2H2V5h5zm2-1v1h6V4H9z" /> </g> </svg>Cancelar</button>
                            </>
                        )}
                    </div>
                </div>
            </div>
            {modalOpen && <Contato onClose={handleCloseModal} />}
            {modalPagamentoOpen && <Pagamento onClose={handleCloseModalPagamento} valorVenda={carrinho.reduce((accumulator, product) => accumulator + (product.quantidade * product.preco), 0)} />}
        </div>
    );
}

export default PDV;
