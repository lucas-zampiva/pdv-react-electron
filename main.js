const { app, BrowserWindow, ipcMain, net } = require('electron');
const path = require('path');
const Database = require('./database');
const axios = require('axios');

const db = new Database(path.join(__dirname, 'database.sqlite'));

let mainWindow;

function createWindow() {
    mainWindow = new BrowserWindow({
        width: 1278,
        height: 978,
        webPreferences: {
            nodeIntegration: true,
            contextIsolation: false,
            enableRemoteModule: true,
            preload: path.join(__dirname, 'preload.js')
        }
    });
    mainWindow.webContents.openDevTools();
    mainWindow.loadURL('http://localhost:3000');
    //mainWindow.setFullScreen(true);
}

// Verifique se há conexão com a internet
function temConexaoComInternet() {
    return new Promise((resolve, reject) => {
        const request = net.request('https://www.google.com');

        request.on('response', () => {
            resolve(true); // Há conexão com a internet
        });

        request.on('error', () => {
            resolve(false); // Não há conexão com a internet
        });

        request.end();
    });
}

function buscaVendas() {
    temConexaoComInternet().then((conexaoAtiva) => {
        db.selectAllOrders((err, rows) => {
            if (err) {
                console.error(err);
            } else {
                if (rows) {
                    rows.forEach(element => {
                        let body = {
                            id: element.id,
                            venda: JSON.parse(element.json)
                        }

                        /*axios.post('https://sua-api.com/endpoint', body).then(function (response) {
                            db.deleteVenda(response);
                        }).catch(function (error) {
                            console.error(error);
                        });*/
                    });
                }


            }
        });
    }).catch((error) => {
        console.error('Erro ao verificar a conexão com a internet:', error);
    });
}

function buscaProdutosNovos() {
    temConexaoComInternet().then((conexaoAtiva) => {
        /*axios.get('https://sua-api.com/products-novos')
            .then(function (response) {
                db.insertProduct(response);
            }).catch(function (error) {
                console.error(error);
            });*/
    }).catch((error) => {
        console.error('Erro ao verificar a conexão com a internet:', error);
    });
}

function buscaTodosProdutos() { //somente se não tiver nenhum cadastrado
    db.selectAllProducts((err, rows) => {
        if (err || rows.length == 0) {
            /*axios.get('https://sua-api.com/products')
                .then(function (response) {
                    db.insertProduct(response);
                }).catch(function (error) {
                    console.error(error);
                });*/
        }
    });
}


app.whenReady().then(() => {
    createWindow();
    buscaTodosProdutos();
    const interval = 5 * 60 * 1000;
    const interval2 = 30 * 60 * 1000;
    setInterval(buscaVendas, interval);
    setInterval(buscaProdutosNovos, interval2);

    app.on('activate', () => {
        if (BrowserWindow.getAllWindows().length === 0) {
            createWindow();
        }
    });

    ipcMain.on('getAllProducts', (event) => {
        db.selectAllProducts((err, rows) => {
            if (err) {
                console.error(err);
                event.reply('getAllProducts', []);
            } else {
                event.reply('getAllProducts', rows);
            }
        });
    });

    ipcMain.on('addVenda', (event, venda) => {
        db.insertVenda(venda, (err) => {
            if (err) {
                console.error(err);
            }
            event.reply('addVenda', err ? null : venda);
        });
    });
});

app.on('window-all-closed', () => {
    if (process.platform !== 'darwin') {
        app.quit();
    }
});
