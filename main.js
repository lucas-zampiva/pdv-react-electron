const { app, BrowserWindow, ipcMain } = require('electron');
const path = require('path');
const Database = require('./database');

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

app.whenReady().then(() => {
    createWindow();

    app.on('activate', () => {
        if (BrowserWindow.getAllWindows().length === 0) {
            createWindow();
        }
    });

    ipcMain.on('getAllUsers', (event) => {
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
});

app.on('window-all-closed', () => {
    if (process.platform !== 'darwin') {
        app.quit();
    }
});
