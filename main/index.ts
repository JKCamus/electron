import { BrowserWindow, app } from "electron";
import isDev from "electron-is-dev";
import { resolve } from "path";
function createWindow() {
  console.log(7);
  const window: BrowserWindow = new BrowserWindow({
    width: 460,
    height: 400,
    transparent: true,
    frame: false,
    webPreferences: {
      nodeIntegration: true,
    },
  });
  console.log('isDev',isDev )
  if (isDev) {
    try {
      require("electron-reloader")(module, {});
    } catch (_) {}
    window.webContents.openDevTools();
    window.loadURL("http://localhost:3000");
  } else {
    window.loadFile(resolve(__dirname, "../render/dist-render/index.html"));
  }
  return window;
}
app.on("ready", () => {
  process.env["ELECTRON_DISABLE_SECURITY_WARNINGS"] = "true"; //关闭web安全警告
  createWindow();
});
