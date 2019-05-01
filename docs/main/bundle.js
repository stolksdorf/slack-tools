(function(f){if(typeof exports==="object"&&typeof module!=="undefined"){module.exports=f()}else if(typeof define==="function"&&define.amd){define([],f)}else{var g;if(typeof window!=="undefined"){g=window}else if(typeof global!=="undefined"){g=global}else if(typeof self!=="undefined"){g=self}else{g=this}g.main = f()}})(function(){var define,module,exports;return (function(){function r(e,n,t){function o(i,f){if(!n[i]){if(!e[i]){var c="function"==typeof require&&require;if(!f&&c)return c(i,!0);if(u)return u(i,!0);var a=new Error("Cannot find module '"+i+"'");throw a.code="MODULE_NOT_FOUND",a}var p=n[i]={exports:{}};e[i][0].call(p.exports,function(r){var n=e[i][1][r];return o(n||r)},p,p.exports,r,e,n,t)}return n[i].exports}for(var u="function"==typeof require&&require,i=0;i<t.length;i++)o(t[i]);return o}return r})()({"C:\\Dropbox\\root\\Programming\\Javascript\\slack-tools\\client\\main\\main.jsx":[function(require,module,exports){
function _extends() { _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

require('./main.less');

const React = require('react');

const {
  Title
} = require('vitreum/headtags');

const HEIGHT = 200,
      WIDTH = 200;

function TextCanvas({
  text,
  size,
  lineheight,
  setDataURL,
  setSize
}) {
  const getMaxSize = (lines, size = 70) => {
    ctx.font = `bold ${size + 1}px Calibri`;
    const biggest = Math.max(...lines.map(text => ctx.measureText(text).width));
    if (biggest >= WIDTH) return size;
    return getMaxSize(lines, size + 1);
  };

  const canvas = React.useRef(null);
  const [ctx, setCtx] = React.useState(null);
  React.useEffect(() => {
    canvas.current && setCtx(canvas.current.getContext('2d'));
  }, [canvas]);
  React.useEffect(() => {
    ctx && text && setSize(getMaxSize(text.split('\n')));
  }, [text]);

  if (ctx) {
    ctx.clearRect(0, 0, canvas.current.width, canvas.current.height);
    ctx.font = `bold ${size}px Calibri`;
    ctx.fillStyle = '#000';
    ctx.textBaseline = 'middle';
    const lines = text.split('\n');
    lines.map((line, idx) => {
      const width = (WIDTH - ctx.measureText(line).width) / 2;
      const height = HEIGHT / 2 - (lines.length - 1) * lineheight / 2 + idx * lineheight;
      ctx.fillText(line, width, height);
    });
    setDataURL(canvas.current.toDataURL('image/png'));
  }

  ;
  return React.createElement("canvas", {
    ref: canvas,
    width: WIDTH,
    height: HEIGHT
  });
}

const {
  Favicon
} = require('vitreum/headtags');

function EmojiMaker(props) {
  const [text, setText] = React.useState('Yes');
  const [size, setSize] = React.useState(150);
  const [lineheight, setLineheight] = React.useState(75);
  const [dataURL, setDataURL] = React.useState('');
  return React.createElement("div", {
    className: "EmojiMaker"
  }, React.createElement(Favicon, {
    href: dataURL
  }), React.createElement("h2", null, "Slack Text Emoji Maker"), React.createElement("div", {
    className: "controls"
  }, React.createElement("div", null, React.createElement("label", null, "Text"), React.createElement("textarea", {
    value: text,
    onChange: evt => setText(evt.target.value),
    rows: 3
  })), React.createElement("div", null, React.createElement("label", null, "Size"), React.createElement("input", {
    type: "range",
    min: 80,
    max: 250,
    value: size,
    onChange: evt => setSize(evt.target.value)
  }), size, React.createElement("button", {
    onClick: () => setSize(150)
  }, "Standard Size")), React.createElement("div", null, React.createElement("label", null, "Spacing"), React.createElement("input", {
    type: "range",
    min: 40,
    max: 120,
    value: lineheight,
    onChange: evt => setLineheight(evt.target.value)
  }), lineheight)), React.createElement("div", {
    className: "render"
  }, React.createElement(TextCanvas, {
    text,
    size,
    lineheight,
    setDataURL,
    setSize
  }), React.createElement("div", {
    className: "example"
  }, "This is it used in text. ", React.createElement("img", {
    className: "sample",
    src: dataURL
  }), " Also the tab icon is updated.")), React.createElement("div", {
    className: "instructions"
  }, React.createElement("h3", null, "instructions"), React.createElement("ol", null, React.createElement("li", null, "Customize your text emoji"), React.createElement("li", null, React.createElement("a", {
    href: dataURL,
    target: "_blank",
    download: `${text.replace('\n', '_')}.png`
  }, "Download It")), React.createElement("li", null, React.createElement("a", {
    href: "https://coolsville.slack.com/customize/emoji",
    target: "_blank"
  }, "Add Emoji to Slack")))));
} ///////////////////////////


const transforms = require('./text.transforms.js');

function TextTransform(props) {
  const [text, setText] = React.useState('oh hello.');
  const divider = React.createElement("br", null);
  return React.createElement("div", {
    className: "TextTransform"
  }, React.createElement("h2", null, "Text Transform"), React.createElement("div", {
    className: "transforms"
  }, React.createElement("textarea", {
    onChange: evt => setText(evt.target.value),
    value: text
  }), React.createElement("textarea", {
    readOnly: true,
    value: Object.values(transforms).map(fn => fn(text)).join('\n\n')
  })));
} //////////////////


function Main(_ref) {
  let props = _extends({}, _ref);

  return React.createElement("div", _extends({
    className: `Main`
  }, props), React.createElement(Title, null, "Slack Tools"), React.createElement("h1", null, "Slack Tools"), React.createElement("hr", null), React.createElement(TextTransform, null), React.createElement("hr", null), React.createElement(EmojiMaker, null));
}

;
module.exports = Main;
},{"./main.less":1,"./text.transforms.js":2,"react":undefined,"vitreum/headtags":undefined}],1:[function(require,module,exports){

},{}],2:[function(require,module,exports){
const runes = require('runes');

const core = `0123456789qwertyuiopasdfghjklzxcvbnmQWERTYUIOPASDFGHJKLZXCVBNM\`-=[]\\;',./~_+{}|:"<>?!@#$%^&*()`;

const createMap = string => {
  let map = {};
  runes(string).map((char, idx) => map[core[idx]] = char);
  return text => {
    return text.split('').map(char => {
      return map[char] || char;
    }).join('');
  };
};

const tiny = createMap(`⁰¹²³⁴⁵⁶⁷⁸⁹ᵠʷᵉʳᵗʸᵘᶦᵒᵖᵃˢᵈᶠᵍʰʲᵏˡᶻˣᶜᵛᵇⁿᵐᵠᵂᴱᴿᵀʸᵁᴵᴼᴾᴬˢᴰᶠᴳᴴᴶᴷᴸᶻˣᶜⱽᴮᴺᴹ\`⁻⁼[]\\;',./~_⁺{}|:"<>ˀᵎ@#$%^&*⁽⁾`);
const fullwidth = createMap(`０１２３４５６７８９ｑｗｅｒｔｙｕｉｏｐａｓｄｆｇｈｊｋｌｚｘｃｖｂｎｍＱＷＥＲＴＹＵＩＯＰＡＳＤＦＧＨＪＫＬＺＸＣＶＢＮＭ\`－＝[]＼；＇,.／~＿ ｛｝|："＜＞？！＠＃＄％＾＆＊（）`);
const old_timey = createMap(`0123456789𝖖𝖜𝖊𝖗𝖙𝖞𝖚𝖎𝖔𝖕𝖆𝖘𝖉𝖋𝖌𝖍𝖏𝖐𝖑𝖟𝖝𝖈𝖛𝖇𝖓𝖒𝕼𝖂𝕰𝕽𝕿𝖄𝖀𝕴𝕺𝕻𝕬𝕾𝕯𝕱𝕲𝕳𝕵𝕶𝕷𝖅𝖃𝕮𝖁𝕭𝕹𝕸\`-=[]\\;',./~_+{}|:"<>?!@#$%^&*()`);
const italics = createMap(`0123456789𝘲𝘸𝘦𝘳𝘵𝘺𝘶𝘪𝘰𝘱𝘢𝘴𝘥𝘧𝘨𝘩𝘫𝘬𝘭𝘻𝘹𝘤𝘷𝘣𝘯𝘮𝘘𝘞𝘌𝘙𝘛𝘠𝘜𝘐𝘖𝘗𝘈𝘚𝘋𝘍𝘎𝘏𝘑𝘒𝘓𝘡𝘟𝘊𝘝𝘉𝘕𝘔\`-=[]\\;',./~_+{}|:"<>?!@#$%^&*()`);
const cthulu1 = createMap(`0̶1̶2̸3̶4̴5̷6̷7̸8̵9̵q̷w̵e̶r̴t̶y̸u̴i̶o̸p̵a̵s̷d̶f̵g̶h̸j̵k̵l̸z̵x̵c̵v̷b̴n̸m̶Q̵W̷E̴R̴T̵Y̶U̵I̵O̸P̵A̸S̶D̷F̶G̸H̵J̶K̵L̶Z̴X̶C̷V̸B̷N̸M̴\̶\`̷-̴≠[̸]̴\̵\̵;̶'̸,̵.̵/̵~̷_̸+̷{̵}̴|̷:̴"̵≮>̵?̵!̶@̷#̴$̷%̸^̵&̵*̵(̴)̸`);
const cthulu2 = createMap(`0̴͓̣̪̊̆͑1̸͍̱̊́2̶͈̰̲͉̅̅3̴̡̢̥̹̳́̏4̷̛͉̞̻̾̉͆̚5̵̪̈́͆̕6̴̡̼̮̲̠̾̔̑7̴̧̰͎͈̻̈̈́͋͘͝8̴̨̦̝̱̽̈̏9̶͔̖͎̺̦͊̓q̵̧̜͚̫̈́̎̆̅͠ẃ̷͚̞͖̝͒́ē̴̳̳̙̇̽̆r̷͉͐̕͝t̴̞̥̗̎͊̋ͅy̷̛͚͈̝̫̚͜͠ǘ̶̘͕̹̫̠̀ĩ̸͙̏̍͠o̴͉̞͎̙͔͌̊p̸̩̝̍̈́͊͠à̸͖͖͜s̵̛͚̤͓̫̟̿̀͘d̵̢̓̈́̈͘f̵̹̫̱̽̅̾͜͝ḡ̸̫̥̑͒̇͛ȟ̷̙̜͔̙̇͐̕͝j̴̢̛̙̳̜͋̈́̋͝k̵̨̗̦̦̯̽͘l̸̡̙̭͈͈͒̍̐̚z̷̠̹̗̀͜x̷̹̣̺͖̎̋c̴͙̲̽̈̉̈v̶̙͙̔̊̅b̷̤̖͌͆̽͜n̷̮͈̩̻̱̈́́͘m̸̢̀̑̑͘Q̸̛̯͑̀W̴͈͆E̴̛̹͙͐̋͝͝R̶̯͙͔̝͝T̵̨͚̮͕͗̑Y̷̤̓̄̇̚͝Ū̷̳̗͌̈́̉̀Į̸̹̪̼͗̅͊̾͛Ơ̷̤̹̦̹͛Ṕ̵͔̰̱͑̾̎̄A̴̧͓̺̓̈́S̷͈͓̖͑̑ͅD̵͓̠̰͚͝F̵͍͑̀̚G̵̢̹͓̺̩͂̉Ḣ̶̘̪̝̫͙̋̿J̷̤̗̹̀́K̸̨̥̞̤̗͑L̸̝̥̍̕͠Z̵̡̿͝X̴̤̙̙̯̂̽̑͝ͅC̶͈̖̃́̒V̷͓̹͝B̷̢̠̰̲̂́̊̈́̈́Ņ̶̠͔̩͝M̷̨̺͂̉͛̊͌\̸̨͗\`̴̝̣͉̊-̷̲̭͍̥̉̈́=̶̺͛̓[̷̡̩̖͓̳̌̑̐̕]̸͍̦͒̈́\̵̗͊̈́̿̑\̴̧͇͉͛̍̆;̴̧͙̜̼̖̉̓'̵̧̛̛̤̭̬̑͗ͅ,̸͉̱̥̼̾̿͐̈͠.̸̧͙͑̊͊/̴̢͚̰͉̥͑̆́̀̚~̸̡͇̜̹͂̆̀̆̃_̶̼̗͊͒̀̕+̵̢̖͛̋̀͠{̴̲͍͙̈́͐}̸̧̧͉͉̩͂̆̃|̸̨̯̳̍̊̔̂͘:̸̨̣̫̲̍͜͝"̸̛̰̹̏́̈́≮̯͚̮̒̂̋̉≯̢̻̗͕̈͋̚͜͠?̴̧͔̌̔̊͐̅!̴͉͋̈́̇̉͌@̸̤̃#̴̹̍̓̄͝$̶̤̝̻̑̊̎̈́͑ͅ%̶̢̈́^̶̖̳͉̤͛̾͂&̷̣͙͛̇̀̄*̶̰̠̄̃̄͘͝ͅ(̵̧̼̯̺͂͂̋͒̒)̷̨̙͋̚`);
const cthulu3 = createMap(`0̶̡̧̘̟̳̤͐̾̈́̈́̈͌̂̑͘̕͠1̸̛͖̤͈͗̏̌̚2̵͖̠̳̹͚̻̂́̇͗̽̚3̶̧̨̢̩̯̈́̅̇͗͗̈́̎̈4̶̘͙̜̌̂̎̎̋̐͗͒͝͝5̸̢̛̮̰̳͙̝̠͍̪̈́͑̅̈́̓͑̓͝6̴̨̭͎̝̗̩̘̪̤̜̓̀̂͑̽ͅ7̸͍̣̲̱̅̎̒̑̎̈́̀͘8̷̛̲̪͉̗̆̔̏̈̇̀̓9̵͚͕̩̱͉̅q̵̨̩̹̟̥̖̹̋̋̂͗́̍̿͘͘͝ẁ̴̡͕̗͗̍̊̉̑̕͘é̴͚̱̞͙̜̓͊̐͒̈́r̷̡͔̱͓̲̦̖̯̬͚̓̓͊̊͆ţ̶̛̛̙̻̜́̃̅͆̂̊̕͝y̴̧̗̯̖̭̜̬͎̘͌͝͝u̷̧͆̽͌͆͝i̷̛̞̤̖̫͆̄̃̄̓̆͜ò̴̠̣͚̘̆̊͘p̷̡̭͉̉͆̍͆̽̒̓̀̏͘͜͝ä̵̙̪̱̳̟̬͓̬́͑̌̐̈͊̚͘͜͝s̴̻̄͐̌d̷̖̼͇̩̈́̄̆͂̀̍͜f̴͚̪̳̘̩͈̳̮̹͓͋̇̈͛͌́̀̓͘g̷͈̺̘̯̃̈̄̿̿̾̈́͘͘͘h̴̢̛̛̼̯̱͈̫̩̻̙͑̽́̋̎̋̊̚j̶̧̪̠̙̼̰̭̖͠k̶̡̦̯̠̩͓̹̫̭̋̽͝l̸͍̀̅̽͊͋̚z̸̡͕͔̖̲͖̰͈͇̕x̸̢͔̻͉̺̼̪͙͛̄́͛ͅc̶͎̀v̵̪̗͕̿b̶̨͈̫̦͇̰̼̞̦̆͆̐̓͗̕͝n̴̮̒͋͊͒̿̌͘m̴̙͍̔͐̑͌̕Q̵̨̝̥͇͖̬̞͕̮̼̂̃́̾̀͂̍̍̕͘͝W̶̤̯̘̮͕̽͗͂̂͜͝Ȩ̶̝͗͗̓́͋R̸̢̭͆̂͜T̸̡̗̪̻̯̣̀̉͛Y̵̧̛͇̝̲͈͍̏̏̅̈́̐ͅŲ̸̰̭͚̘̠͎͍̰͗̓͌͠Ĩ̴͖̜̺͓̟̗͖͎̥͙̓̌̈́̇̀͌̍̚͜O̷̱͉̺̪̩̳̫̎̎͜ͅP̸̙̬̝͕̱̯͔̘̎̽́̋͂̔̆̌A̵̗̙̖̼̬̙̮̻̯̝͝S̴̼̞͚̤̳͐̎̃D̷̝͈̱̬̍̊̓͒̊̏͜Ḟ̸̡̨̨̱͖̱͖̪̫G̴̛̲̮̙̖͙̙̒̓̀̇͆̑H̵̛̙̮͌̾̑̀̽̐́̌͘͠J̶̢̧̬̠͖̥́͜K̶̨̧̥̳̜̂̎̓̄̔̆̋͝L̷̘͉̜̪͛̅̍̄̓͒̆Z̴̧̫̣͓̞̟̆̚͝X̸̢͈͕͖͍̜̺͌͊̀̓͂̕C̵̛͕̳̏̈́͛͝V̸͙͓͖͓̦͇̯̗̝̳̇B̵͕̲͕̯̤͚̟̫̊̈́͊ͅͅN̵̘̋̂͆Ḿ̸̧̨̛̫̆͆̂\̷͙̗̗̞̅͋́̅̄͆̊ͅ\`̸̡͌̄̀̇̔̋̏̐̀͗͝-̶̻̦̝̲̯̳̗̈́̍̓̋̋̓̌̄̌̈́̚=̷̘͎̳̩̹̫͖̃̽̎̏͐̃̓͗͜͠[̶̖̻̃̆̌̀̈́̄̾̃̍͝]̷̲͇̋̃̿̄̕\̷̤̬̍̈́̿̽̓͛̓̈́͊͝\̷̨͔̥͓̱̹̼͊͒;̷̨̗̲̮̬̬̤̞̈́́̓̑̂̐̆͘̚'̵̞̻̯̙̇̊͌͌̇̒,̴̯̫̽̆̂̊̾͌͒̾̚.̶̗̺̟͈̮͐̕/̶̡̛̠̖̜̱̣̔͒͊̔͋̂̃͊͒̈~̶̡̰̦̥̘̱̮̺̜̟̼͐̇́̀͛̊̚̚͘͘̚_̴͚͋̆́͗̉+̸̻͖̙̓̽͆̕͜{̵̢͍͖̘͔̮̥̜̪̠̄}̶̨̟̫̬̬̲̯̣͒̑̐͐̔̂͒̈́͝͠|̵̜̪̑̉̄̿̚:̶̛̟̽̄̽̇̓̓͝"̴̻̯̣̜̱̆̀̈́̌̚̕<̴̢̧͔̖̮̤͈̟̱͒͑̔͌̀̈́̂̿͠͝≯̞̳̮̞̇̈́̉̄͆͛̃͊̀͘?̸̧̛̯͕̱̭̤̮̲̱̈́̊̔̔͂̈̏̾͒̚!̸̛̦̻̮͛͂̕@̷̥͔̠̗̤̦͋̋͛̐͆͜͜#̵̢͘$̸̡̨̨͓̱̼̞̠̠̪̟͋̆̂%̵̹̯̘͚͔̩̝̩̂̀́̓͝^̶̢̯̫̠͖͕̬̹̌̍͑̇̉͂̃̑́&̵̛͇̭̲̭̋̓̒̍͐̂̈*̸̘͇̟̼̲̩̎̈́̔̄̄̃̑(̶̬̯͉͂̈́̇͛̿̇)̸͓̿̃`);
const cthulu4 = createMap(`0̸̯͍̲͖̠̩̠̯̗͒̐̈̽̉͂̎̚͝ͅ1̵̧̮̘̘͖͈̿͌͒̉͌̍͘͠ͅ2̸̨̡̫̫̠̟̊͒̂̈̊̅͑̈͜3̷̲͇̳̂͐̕4̷͉͈͉̆̅͌̇̀̃̑͛5̴̩̝̙̖͍̅̅̃̀̿̎͊̈̓̀͘6̴̠̤̙͇̥͔̣͙̯̟̄̿̓̔̈́͂7̷̢̘̘̦̺͆̓̾8̴̧̘̆̾̋̄͂̓̐͝9̸̨̢̦̘͙́͑́̽̒q̶̧̧̢͖̳̯̭̆͗̋͋̋͋͗͑̈́͝w̷̢̮̗̮͎̍̊̍͆͗͛͊͑̑ḛ̵̞́͊̀̈́̾́̚͘r̴̹̼̗͊̒̋͑̓͊̈̽̔̀͂ț̶̡͈̺͖̳͚͑̀́͗̊͛͌̕ͅy̴̰̟̦̟̻̎̇͊͛̇̽̅̓̑u̶̜̙͑͋̔͗̽̃̋̈͗͌͝i̶̡̬̼̖̻̗͑̊͜ǫ̴̮̜̥͕̠̤̺͕̉̊̈͜͠ͅp̵̪̞̟̺̯̻͎̟̲̂͗͌̎̎̍̕͜ä̶̡̗͔͎̦̖̯͎̣̻̦̆ş̷̫̯͍̗̗̹̬͎̳́̀̉͊͌͜͝d̸̨̽f̴͚̘͚͓͇͕͔̬́̍̃̆̃́̇͠ĝ̸̣̝̈ḩ̴̬̰͖̭̞͖̮̙̳̜̐j̶̡̹̭͔͚̼̫͍͇̟̳̀̒͐̒͐̓͗͠k̵̨̛̛̜̭̜̘͕͚̹̬̣̈́̒͊̈́̋̔̋l̵̢̘͈͚̼̪͌̌̀̾́̀͗͂͛̉̌ͅͅz̶̡̼͖̘̩͕̰͙̣͎̋͂̓͒̓̀̏́͝ͅẍ̶͕̟̱̭͕̰̣̻́͑̈́͋͋̉̅c̵̘͖̭͙͕̟̱̪̺͍̀̇̈́͜v̵̜͙̪̼̍̇̒̏̌̏̆ͅb̷̫̭̦͊́̀͐̈́̄̽͒̉͘ṅ̸̤̾͆̋̓̊͂̃͐m̵̤̯͓̭̙̘̫̎̀̌̏̒̀͊͘Q̴͙̝̖͔̳̘̣̰͂͒W̸̨̯̮̱͎͔̝̉̈́̍̒̅̅͜͠ͅͅẺ̷̥̮̤͚̈́̆̊͌͛͑̓̚̕͜͝R̵̢̧̛̥͖̲̩͕̃̐̀̾̌̽̐͝T̸̟͒Y̷̡͓͉̜̞̻̜̔͛̓̅̑̾̚̕͜U̵̞̔͛͑̓̆͊I̶̡͕̱̹̹̿̏͝Ǫ̷̏͂̔̈̆͗͛̇̄̽P̵̛͔̙͖̜̜̱͗͐̈́̓͌̽̕̕̚ͅÃ̸̼͋Ŝ̴̗̪̳̌̓́̿͘̚͠D̶̢̧͓̜̙̝͍̺̖͈̤̅F̷̧̱̺̭̺̫̩̹̲͑̇͂̀̆̈́̚͝G̷̱͎̺̃̐͒̈́̃͋̋͌̇͗H̴̘̳̣̥̗̰̲͕̋̌̑͊̑͘͠J̴̡̦̪̰̰̦̾̓̋̕K̸̬̂̔͐̈́͐̃L̶͚̼͇͓̯̗͌̐͊͝Z̶͇͇͙̠̣͆̉̓̽͠X̵̟̲͠C̶͔͖̫͂̂͐̀̅͌̇̈́̚͜V̷̞̜͇͖͛̀B̴̛͕̩͈͕̮͙̤̓̏̀̍͗́̚͠N̷̩͇̯͆̅̿̈͝M̷̫̫̜̣̑̀̀̆̓̍͝ͅ\̴͙̭̳͗͐̾̎͌\`̵̧̈́̔͒͂͗͝-̸̳͚͔͖͕̊=̶̡̝̜͐̊̍̆̚ͅ[̸̤̠̟͕̭̠̽̀͑̇̕͠]̷̨̧̣̯͉̻̅̒\̸̙͔̎́͗̈́̋͝\̶̧̛̘̼̙̝̮̓̌̏̆̈̑͌̔;̴̜̞̅̂'̷̢̨̹̱̱̟̫̝̲̲̔̌̉ͅ,̵̱̍̀̇͂̚̚͝.̶͓̪̣͍̻͚̈́/̴̨̡̩͖͔̬̯͙̺̻̀̂̾̅̉̒̇̅̕~̶̢̰̑̂̾̈́̀̐̈́̊͝_̸͖͔̮͙̜͈̙̦̎̇̈́́̃͌̆+̸̡͖̜̯̼̥̭͊͌{̷̝̻͊ͅ}̷̩͇̰͓̼̝̜͌̋̈́̓͌̽̓̃͜͠|̷̖̠̖͉̺̠̈́̕̕:̸̖̟̗̦͈͉̳͓͕͇͌̓́̕ͅ"̴̢̛͙̞͈̙̫̱̓͊̍́͗̈́͂̉̍͜<̷̟̮̯͈̞̖̪̞͙̞̒̎̂͐̅̿̇̇͋̕ͅ>̵̫̘͓̞͇͖̤̒́̆̃̊̚͝?̵̢́̇̅̓͆͑̉̕͜!̸̭̞̫̂̑͒̈̈́̾@̵̨̢͓̭̼̬͎̗̟̳͚̎̿͗̏̏̉̾̀̿̉̚#̷͖͎̥̾̋͐̈́̈͘$̶͙͔̉͆͌͊̏͛̍̀̅̕͠%̶̨̮̞̩̖̣̦͙̓̊̄̕ͅ^̶̺̳͍̂͝&̵̙̠̣̲̺͙̪́̌̈́̈̀̅̄͆̚̕͝*̶̨̢͔̮͚̝̯̙̞͐͗(̵̢̖̯͔͇̮̹͓̪̖̌̈̋̾͐͜)̶̣͓̺̅̂̚̕`);
module.exports = {
  tiny,
  fullwidth,
  old_timey,
  clapback: text => `👏${text.split(' ').join('👏')}👏`,
  goofy: text => text.toLowerCase().split('').map((char, idx) => idx % 2 == 0 ? char : char.toUpperCase()).join(''),
  song: text => `🎵${italics(text)}🎵` // cthulu : (text)=>{
  // 	const chunk = Math.floor(text.length/4);
  // 	console.log(chunk);
  // 	console.log(text.substr(chunk*0,chunk))
  // 	console.log(text.substr(chunk*1,chunk))
  // 	console.log(text.substr(chunk*2,chunk))
  // 	console.log(text.substr(chunk*3))
  // 	return cthulu1(text);
  // 	return [
  // 		cthulu1(text.substr(chunk*0,chunk)),
  // 		cthulu2(text.substr(chunk*1,chunk)),
  // 		cthulu3(text.substr(chunk*2,chunk)),
  // 		cthulu4(text.substr(chunk*3))
  // 	].join('');
  // }
  // alert: +3

};
},{"runes":undefined}]},{},[])("C:\\Dropbox\\root\\Programming\\Javascript\\slack-tools\\client\\main\\main.jsx")
});

//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm5vZGVfbW9kdWxlcy9icm93c2VyLXBhY2svX3ByZWx1ZGUuanMiLCJjbGllbnQvbWFpbi9tYWluLmpzeCIsImNsaWVudC9tYWluL21haW4ubGVzcyIsImNsaWVudC9tYWluL3RleHQudHJhbnNmb3Jtcy5qcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQTtBQ0FBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDakpBOztBQ0FBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBIiwiZmlsZSI6ImdlbmVyYXRlZC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzQ29udGVudCI6WyIoZnVuY3Rpb24oKXtmdW5jdGlvbiByKGUsbix0KXtmdW5jdGlvbiBvKGksZil7aWYoIW5baV0pe2lmKCFlW2ldKXt2YXIgYz1cImZ1bmN0aW9uXCI9PXR5cGVvZiByZXF1aXJlJiZyZXF1aXJlO2lmKCFmJiZjKXJldHVybiBjKGksITApO2lmKHUpcmV0dXJuIHUoaSwhMCk7dmFyIGE9bmV3IEVycm9yKFwiQ2Fubm90IGZpbmQgbW9kdWxlICdcIitpK1wiJ1wiKTt0aHJvdyBhLmNvZGU9XCJNT0RVTEVfTk9UX0ZPVU5EXCIsYX12YXIgcD1uW2ldPXtleHBvcnRzOnt9fTtlW2ldWzBdLmNhbGwocC5leHBvcnRzLGZ1bmN0aW9uKHIpe3ZhciBuPWVbaV1bMV1bcl07cmV0dXJuIG8obnx8cil9LHAscC5leHBvcnRzLHIsZSxuLHQpfXJldHVybiBuW2ldLmV4cG9ydHN9Zm9yKHZhciB1PVwiZnVuY3Rpb25cIj09dHlwZW9mIHJlcXVpcmUmJnJlcXVpcmUsaT0wO2k8dC5sZW5ndGg7aSsrKW8odFtpXSk7cmV0dXJuIG99cmV0dXJuIHJ9KSgpIiwiZnVuY3Rpb24gX2V4dGVuZHMoKSB7IF9leHRlbmRzID0gT2JqZWN0LmFzc2lnbiB8fCBmdW5jdGlvbiAodGFyZ2V0KSB7IGZvciAodmFyIGkgPSAxOyBpIDwgYXJndW1lbnRzLmxlbmd0aDsgaSsrKSB7IHZhciBzb3VyY2UgPSBhcmd1bWVudHNbaV07IGZvciAodmFyIGtleSBpbiBzb3VyY2UpIHsgaWYgKE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbChzb3VyY2UsIGtleSkpIHsgdGFyZ2V0W2tleV0gPSBzb3VyY2Vba2V5XTsgfSB9IH0gcmV0dXJuIHRhcmdldDsgfTsgcmV0dXJuIF9leHRlbmRzLmFwcGx5KHRoaXMsIGFyZ3VtZW50cyk7IH1cblxucmVxdWlyZSgnLi9tYWluLmxlc3MnKTtcblxuY29uc3QgUmVhY3QgPSByZXF1aXJlKCdyZWFjdCcpO1xuXG5jb25zdCB7XG4gIFRpdGxlXG59ID0gcmVxdWlyZSgndml0cmV1bS9oZWFkdGFncycpO1xuXG5jb25zdCBIRUlHSFQgPSAyMDAsXG4gICAgICBXSURUSCA9IDIwMDtcblxuZnVuY3Rpb24gVGV4dENhbnZhcyh7XG4gIHRleHQsXG4gIHNpemUsXG4gIGxpbmVoZWlnaHQsXG4gIHNldERhdGFVUkwsXG4gIHNldFNpemVcbn0pIHtcbiAgY29uc3QgZ2V0TWF4U2l6ZSA9IChsaW5lcywgc2l6ZSA9IDcwKSA9PiB7XG4gICAgY3R4LmZvbnQgPSBgYm9sZCAke3NpemUgKyAxfXB4IENhbGlicmlgO1xuICAgIGNvbnN0IGJpZ2dlc3QgPSBNYXRoLm1heCguLi5saW5lcy5tYXAodGV4dCA9PiBjdHgubWVhc3VyZVRleHQodGV4dCkud2lkdGgpKTtcbiAgICBpZiAoYmlnZ2VzdCA+PSBXSURUSCkgcmV0dXJuIHNpemU7XG4gICAgcmV0dXJuIGdldE1heFNpemUobGluZXMsIHNpemUgKyAxKTtcbiAgfTtcblxuICBjb25zdCBjYW52YXMgPSBSZWFjdC51c2VSZWYobnVsbCk7XG4gIGNvbnN0IFtjdHgsIHNldEN0eF0gPSBSZWFjdC51c2VTdGF0ZShudWxsKTtcbiAgUmVhY3QudXNlRWZmZWN0KCgpID0+IHtcbiAgICBjYW52YXMuY3VycmVudCAmJiBzZXRDdHgoY2FudmFzLmN1cnJlbnQuZ2V0Q29udGV4dCgnMmQnKSk7XG4gIH0sIFtjYW52YXNdKTtcbiAgUmVhY3QudXNlRWZmZWN0KCgpID0+IHtcbiAgICBjdHggJiYgdGV4dCAmJiBzZXRTaXplKGdldE1heFNpemUodGV4dC5zcGxpdCgnXFxuJykpKTtcbiAgfSwgW3RleHRdKTtcblxuICBpZiAoY3R4KSB7XG4gICAgY3R4LmNsZWFyUmVjdCgwLCAwLCBjYW52YXMuY3VycmVudC53aWR0aCwgY2FudmFzLmN1cnJlbnQuaGVpZ2h0KTtcbiAgICBjdHguZm9udCA9IGBib2xkICR7c2l6ZX1weCBDYWxpYnJpYDtcbiAgICBjdHguZmlsbFN0eWxlID0gJyMwMDAnO1xuICAgIGN0eC50ZXh0QmFzZWxpbmUgPSAnbWlkZGxlJztcbiAgICBjb25zdCBsaW5lcyA9IHRleHQuc3BsaXQoJ1xcbicpO1xuICAgIGxpbmVzLm1hcCgobGluZSwgaWR4KSA9PiB7XG4gICAgICBjb25zdCB3aWR0aCA9IChXSURUSCAtIGN0eC5tZWFzdXJlVGV4dChsaW5lKS53aWR0aCkgLyAyO1xuICAgICAgY29uc3QgaGVpZ2h0ID0gSEVJR0hUIC8gMiAtIChsaW5lcy5sZW5ndGggLSAxKSAqIGxpbmVoZWlnaHQgLyAyICsgaWR4ICogbGluZWhlaWdodDtcbiAgICAgIGN0eC5maWxsVGV4dChsaW5lLCB3aWR0aCwgaGVpZ2h0KTtcbiAgICB9KTtcbiAgICBzZXREYXRhVVJMKGNhbnZhcy5jdXJyZW50LnRvRGF0YVVSTCgnaW1hZ2UvcG5nJykpO1xuICB9XG5cbiAgO1xuICByZXR1cm4gUmVhY3QuY3JlYXRlRWxlbWVudChcImNhbnZhc1wiLCB7XG4gICAgcmVmOiBjYW52YXMsXG4gICAgd2lkdGg6IFdJRFRILFxuICAgIGhlaWdodDogSEVJR0hUXG4gIH0pO1xufVxuXG5jb25zdCB7XG4gIEZhdmljb25cbn0gPSByZXF1aXJlKCd2aXRyZXVtL2hlYWR0YWdzJyk7XG5cbmZ1bmN0aW9uIEVtb2ppTWFrZXIocHJvcHMpIHtcbiAgY29uc3QgW3RleHQsIHNldFRleHRdID0gUmVhY3QudXNlU3RhdGUoJ1llcycpO1xuICBjb25zdCBbc2l6ZSwgc2V0U2l6ZV0gPSBSZWFjdC51c2VTdGF0ZSgxNTApO1xuICBjb25zdCBbbGluZWhlaWdodCwgc2V0TGluZWhlaWdodF0gPSBSZWFjdC51c2VTdGF0ZSg3NSk7XG4gIGNvbnN0IFtkYXRhVVJMLCBzZXREYXRhVVJMXSA9IFJlYWN0LnVzZVN0YXRlKCcnKTtcbiAgcmV0dXJuIFJlYWN0LmNyZWF0ZUVsZW1lbnQoXCJkaXZcIiwge1xuICAgIGNsYXNzTmFtZTogXCJFbW9qaU1ha2VyXCJcbiAgfSwgUmVhY3QuY3JlYXRlRWxlbWVudChGYXZpY29uLCB7XG4gICAgaHJlZjogZGF0YVVSTFxuICB9KSwgUmVhY3QuY3JlYXRlRWxlbWVudChcImgyXCIsIG51bGwsIFwiU2xhY2sgVGV4dCBFbW9qaSBNYWtlclwiKSwgUmVhY3QuY3JlYXRlRWxlbWVudChcImRpdlwiLCB7XG4gICAgY2xhc3NOYW1lOiBcImNvbnRyb2xzXCJcbiAgfSwgUmVhY3QuY3JlYXRlRWxlbWVudChcImRpdlwiLCBudWxsLCBSZWFjdC5jcmVhdGVFbGVtZW50KFwibGFiZWxcIiwgbnVsbCwgXCJUZXh0XCIpLCBSZWFjdC5jcmVhdGVFbGVtZW50KFwidGV4dGFyZWFcIiwge1xuICAgIHZhbHVlOiB0ZXh0LFxuICAgIG9uQ2hhbmdlOiBldnQgPT4gc2V0VGV4dChldnQudGFyZ2V0LnZhbHVlKSxcbiAgICByb3dzOiAzXG4gIH0pKSwgUmVhY3QuY3JlYXRlRWxlbWVudChcImRpdlwiLCBudWxsLCBSZWFjdC5jcmVhdGVFbGVtZW50KFwibGFiZWxcIiwgbnVsbCwgXCJTaXplXCIpLCBSZWFjdC5jcmVhdGVFbGVtZW50KFwiaW5wdXRcIiwge1xuICAgIHR5cGU6IFwicmFuZ2VcIixcbiAgICBtaW46IDgwLFxuICAgIG1heDogMjUwLFxuICAgIHZhbHVlOiBzaXplLFxuICAgIG9uQ2hhbmdlOiBldnQgPT4gc2V0U2l6ZShldnQudGFyZ2V0LnZhbHVlKVxuICB9KSwgc2l6ZSwgUmVhY3QuY3JlYXRlRWxlbWVudChcImJ1dHRvblwiLCB7XG4gICAgb25DbGljazogKCkgPT4gc2V0U2l6ZSgxNTApXG4gIH0sIFwiU3RhbmRhcmQgU2l6ZVwiKSksIFJlYWN0LmNyZWF0ZUVsZW1lbnQoXCJkaXZcIiwgbnVsbCwgUmVhY3QuY3JlYXRlRWxlbWVudChcImxhYmVsXCIsIG51bGwsIFwiU3BhY2luZ1wiKSwgUmVhY3QuY3JlYXRlRWxlbWVudChcImlucHV0XCIsIHtcbiAgICB0eXBlOiBcInJhbmdlXCIsXG4gICAgbWluOiA0MCxcbiAgICBtYXg6IDEyMCxcbiAgICB2YWx1ZTogbGluZWhlaWdodCxcbiAgICBvbkNoYW5nZTogZXZ0ID0+IHNldExpbmVoZWlnaHQoZXZ0LnRhcmdldC52YWx1ZSlcbiAgfSksIGxpbmVoZWlnaHQpKSwgUmVhY3QuY3JlYXRlRWxlbWVudChcImRpdlwiLCB7XG4gICAgY2xhc3NOYW1lOiBcInJlbmRlclwiXG4gIH0sIFJlYWN0LmNyZWF0ZUVsZW1lbnQoVGV4dENhbnZhcywge1xuICAgIHRleHQsXG4gICAgc2l6ZSxcbiAgICBsaW5laGVpZ2h0LFxuICAgIHNldERhdGFVUkwsXG4gICAgc2V0U2l6ZVxuICB9KSwgUmVhY3QuY3JlYXRlRWxlbWVudChcImRpdlwiLCB7XG4gICAgY2xhc3NOYW1lOiBcImV4YW1wbGVcIlxuICB9LCBcIlRoaXMgaXMgaXQgdXNlZCBpbiB0ZXh0LiBcIiwgUmVhY3QuY3JlYXRlRWxlbWVudChcImltZ1wiLCB7XG4gICAgY2xhc3NOYW1lOiBcInNhbXBsZVwiLFxuICAgIHNyYzogZGF0YVVSTFxuICB9KSwgXCIgQWxzbyB0aGUgdGFiIGljb24gaXMgdXBkYXRlZC5cIikpLCBSZWFjdC5jcmVhdGVFbGVtZW50KFwiZGl2XCIsIHtcbiAgICBjbGFzc05hbWU6IFwiaW5zdHJ1Y3Rpb25zXCJcbiAgfSwgUmVhY3QuY3JlYXRlRWxlbWVudChcImgzXCIsIG51bGwsIFwiaW5zdHJ1Y3Rpb25zXCIpLCBSZWFjdC5jcmVhdGVFbGVtZW50KFwib2xcIiwgbnVsbCwgUmVhY3QuY3JlYXRlRWxlbWVudChcImxpXCIsIG51bGwsIFwiQ3VzdG9taXplIHlvdXIgdGV4dCBlbW9qaVwiKSwgUmVhY3QuY3JlYXRlRWxlbWVudChcImxpXCIsIG51bGwsIFJlYWN0LmNyZWF0ZUVsZW1lbnQoXCJhXCIsIHtcbiAgICBocmVmOiBkYXRhVVJMLFxuICAgIHRhcmdldDogXCJfYmxhbmtcIixcbiAgICBkb3dubG9hZDogYCR7dGV4dC5yZXBsYWNlKCdcXG4nLCAnXycpfS5wbmdgXG4gIH0sIFwiRG93bmxvYWQgSXRcIikpLCBSZWFjdC5jcmVhdGVFbGVtZW50KFwibGlcIiwgbnVsbCwgUmVhY3QuY3JlYXRlRWxlbWVudChcImFcIiwge1xuICAgIGhyZWY6IFwiaHR0cHM6Ly9jb29sc3ZpbGxlLnNsYWNrLmNvbS9jdXN0b21pemUvZW1vamlcIixcbiAgICB0YXJnZXQ6IFwiX2JsYW5rXCJcbiAgfSwgXCJBZGQgRW1vamkgdG8gU2xhY2tcIikpKSkpO1xufSAvLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy9cblxuXG5jb25zdCB0cmFuc2Zvcm1zID0gcmVxdWlyZSgnLi90ZXh0LnRyYW5zZm9ybXMuanMnKTtcblxuZnVuY3Rpb24gVGV4dFRyYW5zZm9ybShwcm9wcykge1xuICBjb25zdCBbdGV4dCwgc2V0VGV4dF0gPSBSZWFjdC51c2VTdGF0ZSgnb2ggaGVsbG8uJyk7XG4gIGNvbnN0IGRpdmlkZXIgPSBSZWFjdC5jcmVhdGVFbGVtZW50KFwiYnJcIiwgbnVsbCk7XG4gIHJldHVybiBSZWFjdC5jcmVhdGVFbGVtZW50KFwiZGl2XCIsIHtcbiAgICBjbGFzc05hbWU6IFwiVGV4dFRyYW5zZm9ybVwiXG4gIH0sIFJlYWN0LmNyZWF0ZUVsZW1lbnQoXCJoMlwiLCBudWxsLCBcIlRleHQgVHJhbnNmb3JtXCIpLCBSZWFjdC5jcmVhdGVFbGVtZW50KFwiZGl2XCIsIHtcbiAgICBjbGFzc05hbWU6IFwidHJhbnNmb3Jtc1wiXG4gIH0sIFJlYWN0LmNyZWF0ZUVsZW1lbnQoXCJ0ZXh0YXJlYVwiLCB7XG4gICAgb25DaGFuZ2U6IGV2dCA9PiBzZXRUZXh0KGV2dC50YXJnZXQudmFsdWUpLFxuICAgIHZhbHVlOiB0ZXh0XG4gIH0pLCBSZWFjdC5jcmVhdGVFbGVtZW50KFwidGV4dGFyZWFcIiwge1xuICAgIHJlYWRPbmx5OiB0cnVlLFxuICAgIHZhbHVlOiBPYmplY3QudmFsdWVzKHRyYW5zZm9ybXMpLm1hcChmbiA9PiBmbih0ZXh0KSkuam9pbignXFxuXFxuJylcbiAgfSkpKTtcbn0gLy8vLy8vLy8vLy8vLy8vLy8vXG5cblxuZnVuY3Rpb24gTWFpbihfcmVmKSB7XG4gIGxldCBwcm9wcyA9IF9leHRlbmRzKHt9LCBfcmVmKTtcblxuICByZXR1cm4gUmVhY3QuY3JlYXRlRWxlbWVudChcImRpdlwiLCBfZXh0ZW5kcyh7XG4gICAgY2xhc3NOYW1lOiBgTWFpbmBcbiAgfSwgcHJvcHMpLCBSZWFjdC5jcmVhdGVFbGVtZW50KFRpdGxlLCBudWxsLCBcIlNsYWNrIFRvb2xzXCIpLCBSZWFjdC5jcmVhdGVFbGVtZW50KFwiaDFcIiwgbnVsbCwgXCJTbGFjayBUb29sc1wiKSwgUmVhY3QuY3JlYXRlRWxlbWVudChcImhyXCIsIG51bGwpLCBSZWFjdC5jcmVhdGVFbGVtZW50KFRleHRUcmFuc2Zvcm0sIG51bGwpLCBSZWFjdC5jcmVhdGVFbGVtZW50KFwiaHJcIiwgbnVsbCksIFJlYWN0LmNyZWF0ZUVsZW1lbnQoRW1vamlNYWtlciwgbnVsbCkpO1xufVxuXG47XG5tb2R1bGUuZXhwb3J0cyA9IE1haW47IiwiIiwiY29uc3QgcnVuZXMgPSByZXF1aXJlKCdydW5lcycpO1xuXG5jb25zdCBjb3JlID0gYDAxMjM0NTY3ODlxd2VydHl1aW9wYXNkZmdoamtsenhjdmJubVFXRVJUWVVJT1BBU0RGR0hKS0xaWENWQk5NXFxgLT1bXVxcXFw7JywuL35fK3t9fDpcIjw+PyFAIyQlXiYqKClgO1xuXG5jb25zdCBjcmVhdGVNYXAgPSBzdHJpbmcgPT4ge1xuICBsZXQgbWFwID0ge307XG4gIHJ1bmVzKHN0cmluZykubWFwKChjaGFyLCBpZHgpID0+IG1hcFtjb3JlW2lkeF1dID0gY2hhcik7XG4gIHJldHVybiB0ZXh0ID0+IHtcbiAgICByZXR1cm4gdGV4dC5zcGxpdCgnJykubWFwKGNoYXIgPT4ge1xuICAgICAgcmV0dXJuIG1hcFtjaGFyXSB8fCBjaGFyO1xuICAgIH0pLmpvaW4oJycpO1xuICB9O1xufTtcblxuY29uc3QgdGlueSA9IGNyZWF0ZU1hcChg4oGwwrnCssKz4oG04oG14oG24oG34oG44oG54bWgyrfhtYnKs+G1l8q44bWY4bam4bWS4bWW4bWDy6LhtYjhtqDhtY3KsMqy4bWPy6HhtrvLo+G2nOG1m+G1h+KBv+G1kOG1oOG1guG0seG0v+G1gMq44bWB4bS14bS84bS+4bSsy6LhtLDhtqDhtLPhtLThtLbhtLfhtLjhtrvLo+G2nOKxveG0ruG0uuG0uVxcYOKBu+KBvFtdXFxcXDsnLC4vfl/igbp7fXw6XCI8PsuA4bWOQCMkJV4mKuKBveKBvmApO1xuY29uc3QgZnVsbHdpZHRoID0gY3JlYXRlTWFwKGDvvJDvvJHvvJLvvJPvvJTvvJXvvJbvvJfvvJjvvJnvvZHvvZfvvYXvvZLvvZTvvZnvvZXvvYnvvY/vvZDvvYHvvZPvvYTvvYbvvYfvvYjvvYrvvYvvvYzvvZrvvZjvvYPvvZbvvYLvvY7vvY3vvLHvvLfvvKXvvLLvvLTvvLnvvLXvvKnvvK/vvLDvvKHvvLPvvKTvvKbvvKfvvKjvvKrvvKvvvKzvvLrvvLjvvKPvvLbvvKLvvK7vvK1cXGDvvI3vvJ1bXe+8vO+8m++8hywu77yPfu+8vyDvvZvvvZ1877yaXCLvvJzvvJ7vvJ/vvIHvvKDvvIPvvITvvIXvvL7vvIbvvIrvvIjvvIlgKTtcbmNvbnN0IG9sZF90aW1leSA9IGNyZWF0ZU1hcChgMDEyMzQ1Njc4OfCdlpbwnZac8J2WivCdlpfwnZaZ8J2WnvCdlprwnZaO8J2WlPCdlpXwnZaG8J2WmPCdlonwnZaL8J2WjPCdlo3wnZaP8J2WkPCdlpHwnZaf8J2WnfCdlojwnZab8J2Wh/CdlpPwnZaS8J2VvPCdloLwnZWw8J2VvfCdlb/wnZaE8J2WgPCdlbTwnZW68J2Vu/CdlazwnZW+8J2Vr/CdlbHwnZWy8J2Vs/CdlbXwnZW28J2Vt/CdloXwnZaD8J2VrvCdloHwnZWt8J2VufCdlbhcXGAtPVtdXFxcXDsnLC4vfl8re318OlwiPD4/IUAjJCVeJiooKWApO1xuY29uc3QgaXRhbGljcyA9IGNyZWF0ZU1hcChgMDEyMzQ1Njc4OfCdmLLwnZi48J2YpvCdmLPwnZi18J2YuvCdmLbwnZiq8J2YsPCdmLHwnZii8J2YtPCdmKXwnZin8J2YqPCdmKnwnZir8J2YrPCdmK3wnZi78J2YufCdmKTwnZi38J2Yo/CdmK/wnZiu8J2YmPCdmJ7wnZiM8J2YmfCdmJvwnZig8J2YnPCdmJDwnZiW8J2Yl/CdmIjwnZia8J2Yi/CdmI3wnZiO8J2Yj/CdmJHwnZiS8J2Yk/CdmKHwnZif8J2YivCdmJ3wnZiJ8J2YlfCdmJRcXGAtPVtdXFxcXDsnLC4vfl8re318OlwiPD4/IUAjJCVeJiooKWApO1xuY29uc3QgY3RodWx1MSA9IGNyZWF0ZU1hcChgMMy2Mcy2Msy4M8y2NMy0Ncy3Nsy3N8y4OMy1Ocy1ccy3d8y1Zcy2csy0dMy2ecy4dcy0acy2b8y4cMy1Ycy1c8y3ZMy2Zsy1Z8y2aMy4asy1a8y1bMy4esy1eMy1Y8y1dsy3Ysy0bsy4bcy2Ucy1V8y3Rcy0Usy0VMy1Wcy2Vcy1Scy1T8y4UMy1Qcy4U8y2RMy3Rsy2R8y4SMy1Ssy2S8y1TMy2Wsy0WMy2Q8y3Vsy4Qsy3Tsy4Tcy0XFzMtlxcYMy3Lcy0Pcy4W8y4Xcy0XFzMtVxczLU7zLYnzLgszLUuzLUvzLV+zLdfzLgrzLd7zLV9zLR8zLc6zLRcIsy1PMy4Psy1P8y1Icy2QMy3I8y0JMy3Jcy4Xsy1Jsy1Ksy1KMy0Kcy4YCk7XG5jb25zdCBjdGh1bHUyID0gY3JlYXRlTWFwKGAwzLTMisyGzZHNk8yjzKoxzLjMis2BzY3MsTLMtsyFzIXNiMywzLLNiTPMtM2BzI/MocylzKLMucyzNMy3zL7MicyazJvNhs2JzJ7MuzXMtc2EzYbMlcyqNsy0zL7MlMyRzLzMrsyyzKHMoDfMtM2YzIjNnc2EzYvMsM2OzYjMp8y7OMy0zL3MiMyPzKjMpsydzLE5zLbNis2DzZTMls2OzLrMpnHMtc2EzaDMjsyGzIXMp8yczZrMq3fMt8yBzZLMgc2azJ7NlsydZcy0zITMh8y9zIbMs8yzzJlyzLfNnc2QzJXNiXTMtMyOzYrMi8yezKXNhcyXecy3zaDMmsybzZzNms2IzJ3Mq3XMts2EzYDMmM2VzLnMq8ygacy4zIPMj82gzI3NmW/MtM2MzIrNicyezY7Mmc2UcMy4zI3NoM2EzYrMqcydYcy4zYDNls2WzZxzzLXMv82AzZjMm82azKTNk8yrzJ9kzLXNmM2DzYTMiMyiZsy1zL3NncyFzL7MucyrzZzMsWfMuMyEzJHNksyHzZvMq8ylaMy3zZ3MjMyVzIfNkMyZzJzNlMyZasy0zJvNi82EzIvNncyZzKLMs8yca8y1zL3NmMyXzKbMpsyozK9szLjNksyNzJrMkMyZzK3NiM2IzKF6zLfMgMygzLnMl82ceMy3zI7Mi8y5zKPMus2WY8y0zL3MiMyJzIjNmcyydsy2zJTMisyFzJnNmWLMt82MzYbMvc2czKTMlm7Mt82EzIHNmMyuzYjMqcy7zLFtzLjNgMyRzJHNmMyiUcy4zZHNgMybzK9XzLTNhs2IRcy0zJvNkM2dzIvNncy5zZlSzLbNncyvzZnNlMydVMy1zZfMkc2azKjMrs2VWcy3zYPNncyazITMh8ykVcy3zITNjM2EzInMgMyzzJdJzLjNl8yFzYrMvs2bzLnMqsy8zKhPzLfMm82bzKTMucymzLlQzLXNgc2RzL7MjsyEzZTMsMyxQcy0zJPNhM2TzKfMulPMt82RzJHNiM2FzZPMlkTMtc2dzZPMoMywzZpGzLXNkc2AzJrNjUfMtc2CzInMuc2TzLrMqcyiSMy2zIfMi8y/zJjMqsydzKvNmUrMt8yAzYHMpMyXzLlLzLjNkcylzJ7MpMyozJdMzLjMlc2gzI3MncylWsy1zL/NncyhWMy0zILNncy9zJHMpM2FzJnMmcyvQ8y2zIPMgcySzYjMllbMt82dzZPMuULMt8yCzYHMis2EzYTMoMywzLLMok7Mts2dzKfMoM2UzKlNzLfNgsyJzZvMis2MzKjMulxczLjNl8yoXFxgzLTMisydzKPNiS3Mt8yJzYTMssytzY3MpT3Mts2bzYPMulvMt8yMzJHMkMyVzKnMls2TzLPMoV3MuM2SzYTNjcymXFzMtc2KzYTMv8yRzJdcXMy0zZvMjcyGzYfNicynO8y0zInMk82ZzJzMvMyWzKcnzLXMkcybzZfMm8ykzYXMrcyszKcszLjMvsy/zZDNoMyIzYnMscylzLwuzLjNkcyKzYrMp82ZL8y0zJrNkcyGzYHNgM2azLDNicylzKJ+zLjNgsyGzYDMhsyDzYfMnMyhzLlfzLbNis2SzJXMgMy8zJcrzLXNm8yLzaDNgMyizJZ7zLTNhM2QzLLNjc2Zfcy4zYLMhsyDzYnNicynzKnMp3zMuM2YzI3MisyUzILMr8yzzKg6zLjNncyNzKjMo8yrzLLNnFwizLjMj82BzYTMm8ywzLk8zLjMksyCzIvMicyvzZrMrj7MuM2gzIjMms2LzLvMosyXzZzNlT/MtMyMzJTMis2QzIXNlMynIcy0zYvNhMyHzInNjM2JQMy4zIPMpCPMtMyNzZ3Ng8yEzLkkzLbMkcyKzI7NhM2RzKTMncy7zYUlzLbNhMyiXsy2zZvMvs2CzJbMs82JzKQmzLfNm8yHzIDMhMyjzZkqzLbMhMyDzITNmM2dzYXMsMygKMy1zYLNgsyLzZLMksy8zKfMr8y6Kcy3zJrNi8yZzKhgKTtcbmNvbnN0IGN0aHVsdTMgPSBjcmVhdGVNYXAoYDDMts2QzL7NmM2EzYTMiM2MzJXMgsyRzaDMmMyfzKHMs8ynzKQxzLjNl8yPzJrMjMybzZbMpM2IMsy1zILNgcyHzJrNl8y9zZbMoMyzzLnNmsy7M8y2zYTMhcyHzZfNl82EzI7MiMynzKjMqcyizK80zLbMjMyCzI7MjsyLzJDNl82SzZ3NncyYzZnMnDXMuM2dzJvNhM2RzIXNhM2DzZHMk8yuzLDMs82ZzKLMncygzY3MqjbMtMyTzYDMgs2RzL3Mrc2OzJ3MqMyXzKnNhcyYzKrMpMycN8y4zIXNmMyOzJLMkcyOzYTNgM2NzKPMssyxOMy3zJvMhsyUzI/MiMyHzIDNg8yyzKrNicyXOcy1zIXNms2VzKnMsc2Jccy1zIvMi8yCzZfNmMyBzZ3NmMyNzL/Mqcy5zKjMn8ylzJbMuXfMtMyAzZfMjcyKzInMlcyRzZjNlcyhzJdlzLTMgc2DzYrMkM2SzYTNmsyxzJ7Nmcyccsy3zJPMk82KzIrNhs2UzLHNk8yyzKHMpsyWzK/MrM2adMy2zIHNncyDzIXMm82GzILMm8yKzJXMmcy7zJzMp3nMtM2dzYzNncyXzK/MlsytzJzMp8yszY7MmHXMt82GzL3NjM2dzYbMp2nMt8ybzYbMhMyDzITNg8yGzJ7MpM2czJbMq2/MtM2AzIbNmMyKzKDMo82azJhwzLfMic2GzI3Nnc2GzL3NmMySzYPMgMyPzKHNnMytzYlhzLXMms2EzZHMjMyQzZ3MiM2KzZjMmc2czKrMscyzzJ/MrM2TzKxzzLTMhM2QzIzMu2TMt82EzITMhs2CzIDMjcyWzZzMvM2HzKlmzLTNi82YzIfMiM2bzYzMgcyAzJPNmsyqzLPMmMypzYjMs8yuzLnNk2fMt82YzIPMiM2YzITMv8y/zL7NhM2YzYjMusyYzK9ozLTNkcybzL3NgcyazIvMjsyLzJvMisy8zK/Msc2IzKvMosypzLvMmWrMts2gzKrMoMyZzKfMvMywzK3MlmvMts2dzIvMvcymzK/MoMypzKHNk8y5zKvMrWzMuM2AzIXMvc2KzJrNi82Nesy4zJXNlc2UzJbMss2WzLDNiMyhzYd4zLjNm8yEzIHNm82UzLvMos2FzYnMusy8zKrNmWPMtsyAzY52zLXMv8yqzJfNlWLMtsyGzYbMlcyQzYPNnc2XzYjMq8ymzYfMsMy8zJ7Mpsyobsy0zJLNi82YzYrNksy/zIzMrm3MtMyUzZDMlcyRzYzMmc2NUcy1zILMg82BzL7MgM2CzI3MjcyVzZjNncydzKXNh82WzKzMnsyozZXMrsy8V8y2zZ3Mvc2XzYLMgsykzK/MmM2czK7NlUXMts2XzZfMk8yBzYvMncynUsy4zYbMgsytzZzMolTMuMyAzInNm8yXzKHMqsy7zK/Mo1nMtcyPzJvMj8yFzYTMkMynzYfMnc2FzLLNiM2NVcy4zZfNg82MzaDMsMytzZrMqMyYzKDNjs2NzLBJzLTMg8yTzIzNhMyHzYDNjMyazI3NlsyczZzMus2TzJ/Ml82WzY7Mpc2ZT8y3zI7Mjs2FzLHNnM2JzLrMqsypzLPMq1DMuMyOzL3MgcyLzYLMlMyGzIzMmcyszJ3NlcyxzK/NlMyYQcy1zZ3Ml8yZzJbMvMyszJnMrsy7zK/MnVPMtM2QzI7Mg8y8zJ7NmsykzLNEzLfMjcyKzYPNksyKzI/Mnc2IzLHNnMysRsy4zIfMscyhzKjMqM2WzLHNlsyqzKtHzLTMks2DzJvNgMyHzYbMkcyyzK7MmcyWzZnMmUjMtc2MzL7MkcyAzJvNmMy9zaDMkM2BzIzMmcyuSsy2zIHMosyszKDNlsynzZzMpUvMtsyCzI7Mk8yEzZ3MlMyGzIvMpcyzzJzMqMynTMy3zZvMhcyNzITNg82SzIbMmM2JzJzMqlrMtMyGzZ3MmsyrzKPNk8yezKfMn1jMuM2MzYrNgMyTzYLMlc2IzZXMos2WzY3MnMy6Q8y1zI/Nnc2EzZvMm82VzLNWzLjMh82ZzZPNls2TzKbNh8yvzJfMncyzQsy1zIrNhM2KzZXMss2FzZXNhcyvzKTNmsyfzKtOzLXMi8yCzYbMmE3MuM2BzIbNhsybzILMp8yozKtcXMy3zIXNi82BzIXMhM2GzIrNmc2FzJfMl8yeXFxgzLjNjMyEzYDMh8yUzIvMj8yQzYDNl82dzKEtzLbNhMyNzJPMi8yLzJrMk8yMzITMjM2EzLvMpsydzLLMr8yzzJc9zLfMg8y9zI7Mj82QzIPNoMyTzZfMmM2czY7Ms8ypzLnMq82WW8y2zIPMhsyMzZ3NgM2EzITMvsyDzI3Mlsy7Xcy3zIvMlcyDzL/MhMyyzYdcXMy3zI3NhMy/zL3Mk82bzYPNnc2EzYrMpMysXFzMt82KzZLNlMylzZPMscy5zLzMqDvMt82YzYTMgc2DzJHMgsyazJDMhsyXzLLMrsyszKzMpMyozJ4nzLXMh8yKzYzNjMyHzJLMnsy7zK/MmSzMtMyazL3MhsyCzIrMvs2MzZLMvsyvzKsuzLbNkMyVzJfMusyfzYjMri/MtsyUzZLNisyUzYvMgsyDzYrMm82SzIjMoMyWzKHMnMyxzKN+zLbNkMyazJrMh82BzZjNmMyAzZvMmsyKzLDMpsylzJjMscyhzK7MusyczJ/MvF/MtM2LzIbMgc2XzInNmivMuMyTzL3NhsyVzZzMu82WzJl7zLXMhM2NzZbMmM2UzK7MpcyczKLMqsygfcy2zZLMkcyQzZ3NkM2gzJTMgs2SzYTMn8yozKvMrMyszLLMr8yjfMy1zJHMmsyJzITMv8yczKo6zLbMm82dzL3MhMy9zIfMk8yTzJ9cIsy0zIbNgM2EzJrMlcyMzLvMr8yjzJzMsTzMtM2SzZHMlM2MzaDNgM2EzILMv82dzZTMosyWzKfMrsykzYjMn8yxPsy4zIfNhMyJzITNhs2bzIPNmM2KzIDMnsyzzK7Mnj/MuMybzYTMisyUzJrMlM2CzIjMj8y+zZLMr82VzLHMrcykzK7MssynzLEhzLjMlcybzZvNgsymzLvMrkDMt82LzIvNm8yQzYbMpc2czZTNnMygzJfMpMymI8y1zZjMoiTMuM2LzIbMgs2TzLHMocy8zKjMnsygzKDMqsyfzKglzLXNncyCzIDMgcyTzLnMr8yYzZrNlMypzJ3MqV7MtsyMzI3NkcyHzInNgsyDzJHNgcyvzKvMosygzZbNlcyszLkmzLXMi8yTzJLMjc2QzILMiMybzYfMrcyyzK0qzLjMjs2EzJTMhMyEzIPMkcyYzYfMn8y8zLLMqSjMts2CzYTMh82bzL/Mh8yszK/NiSnMuMy/zIPNk2ApO1xuY29uc3QgY3RodWx1NCA9IGNyZWF0ZU1hcChgMMy4zZ3NksyazJDMiMy9zInNgsyOzYXMr82NzLLNlsygzKnMoMyvzJcxzLXMv82MzZLMic2MzZjMjc2gzYXMrsyYzJjNlsynzYgyzLjMis2SzILMiMyKzIXNkcyIzZzMq8yrzKjMocygzJ8zzLfMgsyVzZDMss2HzLM0zLfMhsyFzYzMh82AzIPMkc2bzYnNiM2JNcy0zIXMhcyDzZjMgMy/zI7NisyIzJPMgMypzJ3MmcyWzY02zLTMhMy/zYPMlM2EzYLMoMykzJnNh8ylzZTMo82ZzK/MnzfMt82GzYPMvsyYzJjMpsy6zKI4zLTMhsy+zZ3Mi8yEzYLMk8yQzKfMmDnMuM2BzZHMgcy9zJLMqMymzKLMmM2Zccy2zIbNl8yLzYvMi82dzYvNl82RzYTMp8ynzZbMs8yvzKLMrXfMt8yNzIrMjc2GzZfNm82KzZHMkcyizK7Ml8yuzY5lzLXMgcyazYrNmMyAzYTMvsyBzLDMnnLMtM2KzJLMi82RzYPNisyIzL3MlMyAzYLMucy8zJd0zLbMlc2RzYDNgc2XzIrNm82MzKbNiM2FzLrNlsyhzLPNmnnMtMyOzIfNis2bzIfMvcyFzYPMkcywzJ/MpsyfzLt1zLbNkc2LzZ3MlM2XzL3Mg8yLzIjNl82MzJzMmWnMts2RzIrNnMyszLzMlsy7zKHMl2/MtMyJzaDMisyIzK7NhcyczZzMpc2VzKDMqMykzLrNlXDMtcyCzZfNjMyOzJXMjsyNzKrMnsyfzLrMr8y7zY7Mn82czLJhzLbMiMyGzJfNlM2OzKbMlsyvzY7Mo8y7zKbMoXPMt82dzIHNgMyJzYrNjMyrzZzMr82NzJfMl8ynzLnMrM2OzLNkzLjMvcyoZsy0zYHMjcyDzIbMg8yBzaDMh82azJjNms2TzYfNlc2UzKxnzLjMgsyIzKPMnWjMtMyQzKzMsM2WzK3Mns2WzK7MmcyzzKfMnGrMtsyAzJLNkMySzZDNoMyTzZfMucyhzK3NlM2azLzMq82NzYfMn8yza8y1zIjMm8yBzJLMm82KzYTMi8yUzIvMqMyczK3MnMyYzZXNmsy5zKzMo2zMtc2MzIzMgMy+zYHMgM2XzYLNm8yJzIzMmM2FzYjNmsy8zKrMos2Fesy2zIvNgs2dzYPNksyTzIDMj82BzLzNlsyYzKnNlcywzZnMoc2FzKPNjnjMts2EzZHNhM2LzYvMicyFzZXMn8yxzK3NlcywzKPMu2PMtc2AzIfNhMyYzZbMrc2ZzZXMn8yxzKrNnMy6zY12zLXMjcyHzJLMj8yMzI/MhsyczZnMqs2FzLxizLfNis2BzZjNgM2QzYTMhMy9zZLMicyrzK3Mpm7MuMyHzL7NhsyLzJPMis2CzIPNkMykbcy1zI7MgMyMzI/Mks2AzZjNisykzK/Nk8ytzJnMmMyrUcy0zYLNks2ZzJ3Mls2UzLPMmMyjzLBXzLjMic2EzI3MksyFzIXNoM2FzK/MrsyxzZzMqM2OzZTNhcydRcy3zJrMic2EzJXNncyGzIrNjM2bzZHNg8ylzK7MpM2czZpSzLXMm8yDzJDMgMy+zIzMvc2dzJDMpc2WzKLMp8yyzKnNlVTMuM2SzJ9ZzLfMlMyazZvMlcyTzIXMkcy+zZPNicyhzJzMnsy7zJzNnFXMtcyUzZvNkc2DzIbNisyeScy2zL/NncyPzZXMscy5zKHMuU/Mt8yPzYLMlMyIzIbNl82bzIfMhMy9zKhQzLXMlc2XzJvNkMyVzYTNg82MzJrMvc2UzJnNlsyczJzNhcyxQcy4zIPNi8y8U8y0zZjMgsyMzJPMgc2gzJrMv8yXzKrMs0TMtsyFzZPMnMyizKfMmcydzY3MusyWzYjMpEbMt82RzIfNgsyAzZ3MmsyGzYTMscy6zK3Mp8y6zKvMqcy5zLJHzLfMg8yQzZLNhMyDzYvMi82MzIfNl8yxzY7MukjMtMyLzaDMjMyRzZjNisyRzJjMs8yjzKXMl8ywzLLNlUrMtMy+zJXNg8yLzKbMqsywzLDMpsyhS8y4zILMlM2QzYTNkMyDzKxMzLbNjM2dzJDNis2azLzNh82TzK/Ml1rMts2gzYbMicyTzL3Nh82HzZnMoMyjWMy1zaDMn8yyQ8y2zJrNgsyCzZDMgMyFzYzMh82EzZTNlsyrzZxWzLfNm8yAzJ7MnM2HzZZCzLTMk8yazI/Mm82AzI3NoM2XzIHNlcypzYjNlcyuzZnMpE7Mt82GzIXMv82dzIjMqc2HzK9NzLfMkcyAzZ3NgMyGzYPMjcyrzKvMnMyjzYVcXMy0zZfNkMy+zI7NjM2ZzK3Ms1xcYMy1zZ3NhMyUzZLNgs2XzKctzLjMisyzzZrNlM2WzZU9zLbNkMyKzJrMjcyGzJ3Moc2FzJxbzLjMvcyAzaDNkcyHzJXMpMygzJ/NlcytzKBdzLfMhcySzKjMo8ynzK/Nicy7XFzMuMyOzIHNl82dzYTMi8yZzZRcXMy2zYPMm8yMzI/MhsyIzJHNjMyUzJjMvMyZzJ3Mp8yuO8y0zIXMgsyczJ4nzLfMlMyMzInMucyxzLHMn8yrzYXMncyyzKLMqMyyLMy1zJrNncyNzIDMmsyHzYLMsS7Mts2EzZPMqsyjzY3Mu82aL8y0zJXMgMyCzL7MhcyJzJLMh8yFzKnNls2UzKjMrMyvzZnMocy6zLt+zLbMkc2dzILMvs2EzIDMkM2EzIrMosywX8y4zI7Mh82EzYHMg82MzIbNls2UzK7NmcyczYjMmcymK8y4zYrNjM2WzJzMr8y8zKXMrcyhe8y3zYrMnc2FzLt9zLfNjMyLzYTNg82gzYzMvc2DzIPMqc2HzLDNk82czLzMncycfMy3zJXNhMyVzJbMoMyWzYnMusygOsy4zYzMk8yVzYHNhcyWzJ/Ml8ymzYjNicyzzZPNlc2HXCLMtMyTzYrMjcybzIHNl82EzYLMicyNzZnMns2IzJnNnMyizKvMsTzMt8ySzJXMjsyCzZDMhcy/zIfMh82LzJ/MrsyvzYjMnsyWzYXMqsyezZnMnj7MtcySzYHMms2dzIbMg8yKzKvMmM2TzJ7Nh82WzKQ/zLXNgcyHzJXMhc2DzYbNkcyJzKLNnCHMuMyCzJHNksyIzYTMvsytzJ7Mq0DMtcyOzL/Nl8yPzI/Micy+zYDMv8yJzJrNk8ytzLzMqMyizKzNjsyXzJ/Ms82aI8y3zL7Mi82YzZDNhMyIzZbNjsylJMy2zaDMicyVzYbNjM2KzI/Nm8yNzYDMhc2ZzZQlzLbNg8yKzJXMhMyuzJ7NhcypzJbMqMyjzKbNmV7MtsyCzZ3MusyzzY0mzLXMgcyMzYTMiMyAzIXMmsyVzITNnc2GzJnMoMyjzLLMus2ZzKoqzLbNkM2XzZTMrsyozZrMosydzK/MmcyeKMy1zIzMiMyLzL7NkMyWzK/NlM2HzZzMosyuzLnNk8yqzJYpzLbMmsyFzILMlcyjzZPMumApO1xubW9kdWxlLmV4cG9ydHMgPSB7XG4gIHRpbnksXG4gIGZ1bGx3aWR0aCxcbiAgb2xkX3RpbWV5LFxuICBjbGFwYmFjazogdGV4dCA9PiBg8J+RjyR7dGV4dC5zcGxpdCgnICcpLmpvaW4oJ/CfkY8nKX3wn5GPYCxcbiAgZ29vZnk6IHRleHQgPT4gdGV4dC50b0xvd2VyQ2FzZSgpLnNwbGl0KCcnKS5tYXAoKGNoYXIsIGlkeCkgPT4gaWR4ICUgMiA9PSAwID8gY2hhciA6IGNoYXIudG9VcHBlckNhc2UoKSkuam9pbignJyksXG4gIHNvbmc6IHRleHQgPT4gYPCfjrUke2l0YWxpY3ModGV4dCl98J+OtWAgLy8gY3RodWx1IDogKHRleHQpPT57XG4gIC8vIFx0Y29uc3QgY2h1bmsgPSBNYXRoLmZsb29yKHRleHQubGVuZ3RoLzQpO1xuICAvLyBcdGNvbnNvbGUubG9nKGNodW5rKTtcbiAgLy8gXHRjb25zb2xlLmxvZyh0ZXh0LnN1YnN0cihjaHVuayowLGNodW5rKSlcbiAgLy8gXHRjb25zb2xlLmxvZyh0ZXh0LnN1YnN0cihjaHVuayoxLGNodW5rKSlcbiAgLy8gXHRjb25zb2xlLmxvZyh0ZXh0LnN1YnN0cihjaHVuayoyLGNodW5rKSlcbiAgLy8gXHRjb25zb2xlLmxvZyh0ZXh0LnN1YnN0cihjaHVuayozKSlcbiAgLy8gXHRyZXR1cm4gY3RodWx1MSh0ZXh0KTtcbiAgLy8gXHRyZXR1cm4gW1xuICAvLyBcdFx0Y3RodWx1MSh0ZXh0LnN1YnN0cihjaHVuayowLGNodW5rKSksXG4gIC8vIFx0XHRjdGh1bHUyKHRleHQuc3Vic3RyKGNodW5rKjEsY2h1bmspKSxcbiAgLy8gXHRcdGN0aHVsdTModGV4dC5zdWJzdHIoY2h1bmsqMixjaHVuaykpLFxuICAvLyBcdFx0Y3RodWx1NCh0ZXh0LnN1YnN0cihjaHVuayozKSlcbiAgLy8gXHRdLmpvaW4oJycpO1xuICAvLyB9XG4gIC8vIGFsZXJ0OiArM1xuXG59OyJdfQ==
