const { app, BrowserWindow, ipcMain, net } = require('electron');
const path = require('path');
const Database = require('./database');
const axios = require('axios');

const db = new Database(path.join(__dirname, 'database.sqlite'));

let mainWindow;

function createWindow() {
    mainWindow = new BrowserWindow({
        width: 800,
        height: 600,
        webPreferences: {
            nodeIntegration: true,
            contextIsolation: false,
            enableRemoteModule: true,
            preload: path.join(__dirname, 'preload.js')
        }
    });
    mainWindow.webContents.openDevTools();
    mainWindow.loadURL('http://localhost:3000');
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
    const interval = 1 * 60 * 1000;
    setInterval(buscaVendas, interval);

    app.on('activate', () => {
        if (BrowserWindow.getAllWindows().length === 0) {
            createWindow();
        }
    });

    /*ipcMain.on('getAllUsers', (event) => {
        db.selectAll((err, rows) => {
            if (err) {
                console.error(err);
                event.reply('getAllUsers', []);
            } else {
                event.reply('getAllUsers', rows);
            }
        });
    });

    ipcMain.on('addUser', (event, user) => {
        db.insert(user, (err) => {
            if (err) {
                console.error(err);
            }
            event.reply('addUser', err ? null : user);
        });
    });

    ipcMain.on('updateUser', (event, user) => {
        db.update(user, (err) => {
            if (err) {
                console.error(err);
            }
            event.reply('updateUser', err ? null : user);
        });
    });

    ipcMain.on('deleteUser', (event, id) => {
        db.delete(id, (err) => {
            if (err) {
                console.error(err);
            }
            event.reply('deleteUser', err ? null : id);
        });
    });*/

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
