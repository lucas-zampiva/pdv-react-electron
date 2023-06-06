const { app, BrowserWindow, ipcMain, protocol, net } = require('electron');
const path = require('path');
const url = require("url");
const Database = require('./database');
let mainWindow;

const db = new Database(
    path.join(process.resourcesPath, 'database.sqlite'), // the resources path if in production build
    (err) => {
        if (err) {
            console.log(`Database Error: ${err}`);
        } else {
            console.log('Database Loaded');
        }
    }
);

function createWindow() {
    mainWindow = new BrowserWindow({
        width: 1278,
        height: 978,
        webPreferences: {
            preload: path.join(__dirname, "preload.js"),
        }
    });

    const appURL = app.isPackaged
        ? url.format({
            pathname: path.join(__dirname, "index.html"),
            protocol: "file:",
            slashes: true,
        })
        : "http://localhost:3000";

    mainWindow.loadURL(appURL);

    if (!app.isPackaged) {
        mainWindow.webContents.openDevTools();
    }
}

function setupLocalFilesNormalizerProxy() {
    protocol.registerHttpProtocol(
        "file",
        (request, callback) => {
            const url = request.url.substr(8);
            callback({ path: path.normalize(`${__dirname}/${url}`) });
        },
        (error) => {
            if (error) console.error("Failed to register protocol");
        }
    );
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

ipcMain.handle('getAllProducts', async (event) => {
    return new Promise((resolve, reject) => {
        db.selectAllProducts((err, rows) => {
            if (err) {
                console.error(err);
                resolve([]); // Retorna um array vazio em caso de erro
            } else {
                //console.log(rows);
                resolve(rows); // Resolve a promessa com os rows
            }
        });
    });
});


app.whenReady().then(() => {
    createWindow();
    buscaTodosProdutos();
    setupLocalFilesNormalizerProxy();
    const interval = 5 * 60 * 1000;
    const interval2 = 30 * 60 * 1000;
    setInterval(buscaVendas, interval);
    setInterval(buscaProdutosNovos, interval2);

    app.on('activate', () => {
        if (BrowserWindow.getAllWindows().length === 0) {
            createWindow();
        }
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

const allowedNavigationDestinations = "https://my-app.com";
app.on("web-contents-created", (event, contents) => {
    contents.on("will-navigate", (event, navigationURL) => {
        const parsedURL = new URL(navigationURL);
        if (!allowedNavigationDestinations.includes(parsedURL.origin)) {
            event.preventDefault();
        }
    });
});
