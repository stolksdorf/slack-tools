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
}
/*****************/


const transforms = require('./text.transforms.js');

function TextTransform(props) {
  const [text, setText] = React.useState('');
  const divider = React.createElement("br", null);
  return React.createElement("div", {
    className: "TextTransform"
  }, React.createElement("h2", null, "Text Transform"), React.createElement("div", {
    className: "transforms"
  }, React.createElement("textarea", {
    onChange: evt => setText(evt.target.value),
    value: text,
    autoFocus: true,
    onFocus: "this.select();"
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
const fancy = createMap(`0123456789𝓺𝔀𝓮𝓻𝓽𝔂𝓾𝓲𝓸𝓹𝓪𝓼𝓭𝓯𝓰𝓱𝓳𝓴𝓵𝔃𝔁𝓬𝓿𝓫𝓷𝓶𝓠𝓦𝓔𝓡𝓣𝓨𝓤𝓘𝓞𝓟𝓐𝓢𝓓𝓕𝓖𝓗𝓙𝓚𝓛𝓩𝓧𝓒𝓥𝓑𝓝𝓜\`-=[]\\;',./~_+{}|:"<>?!@#$%^&*()`);
const cthulu1 = createMap(`0̶1̶2̸3̶4̴5̷6̷7̸8̵9̵q̷w̵e̶r̴t̶y̸u̴i̶o̸p̵a̵s̷d̶f̵g̶h̸j̵k̵l̸z̵x̵c̵v̷b̴n̸m̶Q̵W̷E̴R̴T̵Y̶U̵I̵O̸P̵A̸S̶D̷F̶G̸H̵J̶K̵L̶Z̴X̶C̷V̸B̷N̸M̴\̶\`̷-̴≠[̸]̴\̵\̵;̶'̸,̵.̵/̵~̷_̸+̷{̵}̴|̷:̴"̵≮>̵?̵!̶@̷#̴$̷%̸^̵&̵*̵(̴)̸`);
const cthulu2 = createMap(`0̴͓̣̪̊̆͑1̸͍̱̊́2̶͈̰̲͉̅̅3̴̡̢̥̹̳́̏4̷̛͉̞̻̾̉͆̚5̵̪̈́͆̕6̴̡̼̮̲̠̾̔̑7̴̧̰͎͈̻̈̈́͋͘͝8̴̨̦̝̱̽̈̏9̶͔̖͎̺̦͊̓q̵̧̜͚̫̈́̎̆̅͠ẃ̷͚̞͖̝͒́ē̴̳̳̙̇̽̆r̷͉͐̕͝t̴̞̥̗̎͊̋ͅy̷̛͚͈̝̫̚͜͠ǘ̶̘͕̹̫̠̀ĩ̸͙̏̍͠o̴͉̞͎̙͔͌̊p̸̩̝̍̈́͊͠à̸͖͖͜s̵̛͚̤͓̫̟̿̀͘d̵̢̓̈́̈͘f̵̹̫̱̽̅̾͜͝ḡ̸̫̥̑͒̇͛ȟ̷̙̜͔̙̇͐̕͝j̴̢̛̙̳̜͋̈́̋͝k̵̨̗̦̦̯̽͘l̸̡̙̭͈͈͒̍̐̚z̷̠̹̗̀͜x̷̹̣̺͖̎̋c̴͙̲̽̈̉̈v̶̙͙̔̊̅b̷̤̖͌͆̽͜n̷̮͈̩̻̱̈́́͘m̸̢̀̑̑͘Q̸̛̯͑̀W̴͈͆E̴̛̹͙͐̋͝͝R̶̯͙͔̝͝T̵̨͚̮͕͗̑Y̷̤̓̄̇̚͝Ū̷̳̗͌̈́̉̀Į̸̹̪̼͗̅͊̾͛Ơ̷̤̹̦̹͛Ṕ̵͔̰̱͑̾̎̄A̴̧͓̺̓̈́S̷͈͓̖͑̑ͅD̵͓̠̰͚͝F̵͍͑̀̚G̵̢̹͓̺̩͂̉Ḣ̶̘̪̝̫͙̋̿J̷̤̗̹̀́K̸̨̥̞̤̗͑L̸̝̥̍̕͠Z̵̡̿͝X̴̤̙̙̯̂̽̑͝ͅC̶͈̖̃́̒V̷͓̹͝B̷̢̠̰̲̂́̊̈́̈́Ņ̶̠͔̩͝M̷̨̺͂̉͛̊͌\̸̨͗\`̴̝̣͉̊-̷̲̭͍̥̉̈́=̶̺͛̓[̷̡̩̖͓̳̌̑̐̕]̸͍̦͒̈́\̵̗͊̈́̿̑\̴̧͇͉͛̍̆;̴̧͙̜̼̖̉̓'̵̧̛̛̤̭̬̑͗ͅ,̸͉̱̥̼̾̿͐̈͠.̸̧͙͑̊͊/̴̢͚̰͉̥͑̆́̀̚~̸̡͇̜̹͂̆̀̆̃_̶̼̗͊͒̀̕+̵̢̖͛̋̀͠{̴̲͍͙̈́͐}̸̧̧͉͉̩͂̆̃|̸̨̯̳̍̊̔̂͘:̸̨̣̫̲̍͜͝"̸̛̰̹̏́̈́≮̯͚̮̒̂̋̉≯̢̻̗͕̈͋̚͜͠?̴̧͔̌̔̊͐̅!̴͉͋̈́̇̉͌@̸̤̃#̴̹̍̓̄͝$̶̤̝̻̑̊̎̈́͑ͅ%̶̢̈́^̶̖̳͉̤͛̾͂&̷̣͙͛̇̀̄*̶̰̠̄̃̄͘͝ͅ(̵̧̼̯̺͂͂̋͒̒)̷̨̙͋̚`);
const cthulu3 = createMap(`0̶̡̧̘̟̳̤͐̾̈́̈́̈͌̂̑͘̕͠1̸̛͖̤͈͗̏̌̚2̵͖̠̳̹͚̻̂́̇͗̽̚3̶̧̨̢̩̯̈́̅̇͗͗̈́̎̈4̶̘͙̜̌̂̎̎̋̐͗͒͝͝5̸̢̛̮̰̳͙̝̠͍̪̈́͑̅̈́̓͑̓͝6̴̨̭͎̝̗̩̘̪̤̜̓̀̂͑̽ͅ7̸͍̣̲̱̅̎̒̑̎̈́̀͘8̷̛̲̪͉̗̆̔̏̈̇̀̓9̵͚͕̩̱͉̅q̵̨̩̹̟̥̖̹̋̋̂͗́̍̿͘͘͝ẁ̴̡͕̗͗̍̊̉̑̕͘é̴͚̱̞͙̜̓͊̐͒̈́r̷̡͔̱͓̲̦̖̯̬͚̓̓͊̊͆ţ̶̛̛̙̻̜́̃̅͆̂̊̕͝y̴̧̗̯̖̭̜̬͎̘͌͝͝u̷̧͆̽͌͆͝i̷̛̞̤̖̫͆̄̃̄̓̆͜ò̴̠̣͚̘̆̊͘p̷̡̭͉̉͆̍͆̽̒̓̀̏͘͜͝ä̵̙̪̱̳̟̬͓̬́͑̌̐̈͊̚͘͜͝s̴̻̄͐̌d̷̖̼͇̩̈́̄̆͂̀̍͜f̴͚̪̳̘̩͈̳̮̹͓͋̇̈͛͌́̀̓͘g̷͈̺̘̯̃̈̄̿̿̾̈́͘͘͘h̴̢̛̛̼̯̱͈̫̩̻̙͑̽́̋̎̋̊̚j̶̧̪̠̙̼̰̭̖͠k̶̡̦̯̠̩͓̹̫̭̋̽͝l̸͍̀̅̽͊͋̚z̸̡͕͔̖̲͖̰͈͇̕x̸̢͔̻͉̺̼̪͙͛̄́͛ͅc̶͎̀v̵̪̗͕̿b̶̨͈̫̦͇̰̼̞̦̆͆̐̓͗̕͝n̴̮̒͋͊͒̿̌͘m̴̙͍̔͐̑͌̕Q̵̨̝̥͇͖̬̞͕̮̼̂̃́̾̀͂̍̍̕͘͝W̶̤̯̘̮͕̽͗͂̂͜͝Ȩ̶̝͗͗̓́͋R̸̢̭͆̂͜T̸̡̗̪̻̯̣̀̉͛Y̵̧̛͇̝̲͈͍̏̏̅̈́̐ͅŲ̸̰̭͚̘̠͎͍̰͗̓͌͠Ĩ̴͖̜̺͓̟̗͖͎̥͙̓̌̈́̇̀͌̍̚͜O̷̱͉̺̪̩̳̫̎̎͜ͅP̸̙̬̝͕̱̯͔̘̎̽́̋͂̔̆̌A̵̗̙̖̼̬̙̮̻̯̝͝S̴̼̞͚̤̳͐̎̃D̷̝͈̱̬̍̊̓͒̊̏͜Ḟ̸̡̨̨̱͖̱͖̪̫G̴̛̲̮̙̖͙̙̒̓̀̇͆̑H̵̛̙̮͌̾̑̀̽̐́̌͘͠J̶̢̧̬̠͖̥́͜K̶̨̧̥̳̜̂̎̓̄̔̆̋͝L̷̘͉̜̪͛̅̍̄̓͒̆Z̴̧̫̣͓̞̟̆̚͝X̸̢͈͕͖͍̜̺͌͊̀̓͂̕C̵̛͕̳̏̈́͛͝V̸͙͓͖͓̦͇̯̗̝̳̇B̵͕̲͕̯̤͚̟̫̊̈́͊ͅͅN̵̘̋̂͆Ḿ̸̧̨̛̫̆͆̂\̷͙̗̗̞̅͋́̅̄͆̊ͅ\`̸̡͌̄̀̇̔̋̏̐̀͗͝-̶̻̦̝̲̯̳̗̈́̍̓̋̋̓̌̄̌̈́̚=̷̘͎̳̩̹̫͖̃̽̎̏͐̃̓͗͜͠[̶̖̻̃̆̌̀̈́̄̾̃̍͝]̷̲͇̋̃̿̄̕\̷̤̬̍̈́̿̽̓͛̓̈́͊͝\̷̨͔̥͓̱̹̼͊͒;̷̨̗̲̮̬̬̤̞̈́́̓̑̂̐̆͘̚'̵̞̻̯̙̇̊͌͌̇̒,̴̯̫̽̆̂̊̾͌͒̾̚.̶̗̺̟͈̮͐̕/̶̡̛̠̖̜̱̣̔͒͊̔͋̂̃͊͒̈~̶̡̰̦̥̘̱̮̺̜̟̼͐̇́̀͛̊̚̚͘͘̚_̴͚͋̆́͗̉+̸̻͖̙̓̽͆̕͜{̵̢͍͖̘͔̮̥̜̪̠̄}̶̨̟̫̬̬̲̯̣͒̑̐͐̔̂͒̈́͝͠|̵̜̪̑̉̄̿̚:̶̛̟̽̄̽̇̓̓͝"̴̻̯̣̜̱̆̀̈́̌̚̕<̴̢̧͔̖̮̤͈̟̱͒͑̔͌̀̈́̂̿͠͝≯̞̳̮̞̇̈́̉̄͆͛̃͊̀͘?̸̧̛̯͕̱̭̤̮̲̱̈́̊̔̔͂̈̏̾͒̚!̸̛̦̻̮͛͂̕@̷̥͔̠̗̤̦͋̋͛̐͆͜͜#̵̢͘$̸̡̨̨͓̱̼̞̠̠̪̟͋̆̂%̵̹̯̘͚͔̩̝̩̂̀́̓͝^̶̢̯̫̠͖͕̬̹̌̍͑̇̉͂̃̑́&̵̛͇̭̲̭̋̓̒̍͐̂̈*̸̘͇̟̼̲̩̎̈́̔̄̄̃̑(̶̬̯͉͂̈́̇͛̿̇)̸͓̿̃`);
const cthulu4 = createMap(`0̸̯͍̲͖̠̩̠̯̗͒̐̈̽̉͂̎̚͝ͅ1̵̧̮̘̘͖͈̿͌͒̉͌̍͘͠ͅ2̸̨̡̫̫̠̟̊͒̂̈̊̅͑̈͜3̷̲͇̳̂͐̕4̷͉͈͉̆̅͌̇̀̃̑͛5̴̩̝̙̖͍̅̅̃̀̿̎͊̈̓̀͘6̴̠̤̙͇̥͔̣͙̯̟̄̿̓̔̈́͂7̷̢̘̘̦̺͆̓̾8̴̧̘̆̾̋̄͂̓̐͝9̸̨̢̦̘͙́͑́̽̒q̶̧̧̢͖̳̯̭̆͗̋͋̋͋͗͑̈́͝w̷̢̮̗̮͎̍̊̍͆͗͛͊͑̑ḛ̵̞́͊̀̈́̾́̚͘r̴̹̼̗͊̒̋͑̓͊̈̽̔̀͂ț̶̡͈̺͖̳͚͑̀́͗̊͛͌̕ͅy̴̰̟̦̟̻̎̇͊͛̇̽̅̓̑u̶̜̙͑͋̔͗̽̃̋̈͗͌͝i̶̡̬̼̖̻̗͑̊͜ǫ̴̮̜̥͕̠̤̺͕̉̊̈͜͠ͅp̵̪̞̟̺̯̻͎̟̲̂͗͌̎̎̍̕͜ä̶̡̗͔͎̦̖̯͎̣̻̦̆ş̷̫̯͍̗̗̹̬͎̳́̀̉͊͌͜͝d̸̨̽f̴͚̘͚͓͇͕͔̬́̍̃̆̃́̇͠ĝ̸̣̝̈ḩ̴̬̰͖̭̞͖̮̙̳̜̐j̶̡̹̭͔͚̼̫͍͇̟̳̀̒͐̒͐̓͗͠k̵̨̛̛̜̭̜̘͕͚̹̬̣̈́̒͊̈́̋̔̋l̵̢̘͈͚̼̪͌̌̀̾́̀͗͂͛̉̌ͅͅz̶̡̼͖̘̩͕̰͙̣͎̋͂̓͒̓̀̏́͝ͅẍ̶͕̟̱̭͕̰̣̻́͑̈́͋͋̉̅c̵̘͖̭͙͕̟̱̪̺͍̀̇̈́͜v̵̜͙̪̼̍̇̒̏̌̏̆ͅb̷̫̭̦͊́̀͐̈́̄̽͒̉͘ṅ̸̤̾͆̋̓̊͂̃͐m̵̤̯͓̭̙̘̫̎̀̌̏̒̀͊͘Q̴͙̝̖͔̳̘̣̰͂͒W̸̨̯̮̱͎͔̝̉̈́̍̒̅̅͜͠ͅͅẺ̷̥̮̤͚̈́̆̊͌͛͑̓̚̕͜͝R̵̢̧̛̥͖̲̩͕̃̐̀̾̌̽̐͝T̸̟͒Y̷̡͓͉̜̞̻̜̔͛̓̅̑̾̚̕͜U̵̞̔͛͑̓̆͊I̶̡͕̱̹̹̿̏͝Ǫ̷̏͂̔̈̆͗͛̇̄̽P̵̛͔̙͖̜̜̱͗͐̈́̓͌̽̕̕̚ͅÃ̸̼͋Ŝ̴̗̪̳̌̓́̿͘̚͠D̶̢̧͓̜̙̝͍̺̖͈̤̅F̷̧̱̺̭̺̫̩̹̲͑̇͂̀̆̈́̚͝G̷̱͎̺̃̐͒̈́̃͋̋͌̇͗H̴̘̳̣̥̗̰̲͕̋̌̑͊̑͘͠J̴̡̦̪̰̰̦̾̓̋̕K̸̬̂̔͐̈́͐̃L̶͚̼͇͓̯̗͌̐͊͝Z̶͇͇͙̠̣͆̉̓̽͠X̵̟̲͠C̶͔͖̫͂̂͐̀̅͌̇̈́̚͜V̷̞̜͇͖͛̀B̴̛͕̩͈͕̮͙̤̓̏̀̍͗́̚͠N̷̩͇̯͆̅̿̈͝M̷̫̫̜̣̑̀̀̆̓̍͝ͅ\̴͙̭̳͗͐̾̎͌\`̵̧̈́̔͒͂͗͝-̸̳͚͔͖͕̊=̶̡̝̜͐̊̍̆̚ͅ[̸̤̠̟͕̭̠̽̀͑̇̕͠]̷̨̧̣̯͉̻̅̒\̸̙͔̎́͗̈́̋͝\̶̧̛̘̼̙̝̮̓̌̏̆̈̑͌̔;̴̜̞̅̂'̷̢̨̹̱̱̟̫̝̲̲̔̌̉ͅ,̵̱̍̀̇͂̚̚͝.̶͓̪̣͍̻͚̈́/̴̨̡̩͖͔̬̯͙̺̻̀̂̾̅̉̒̇̅̕~̶̢̰̑̂̾̈́̀̐̈́̊͝_̸͖͔̮͙̜͈̙̦̎̇̈́́̃͌̆+̸̡͖̜̯̼̥̭͊͌{̷̝̻͊ͅ}̷̩͇̰͓̼̝̜͌̋̈́̓͌̽̓̃͜͠|̷̖̠̖͉̺̠̈́̕̕:̸̖̟̗̦͈͉̳͓͕͇͌̓́̕ͅ"̴̢̛͙̞͈̙̫̱̓͊̍́͗̈́͂̉̍͜<̷̟̮̯͈̞̖̪̞͙̞̒̎̂͐̅̿̇̇͋̕ͅ>̵̫̘͓̞͇͖̤̒́̆̃̊̚͝?̵̢́̇̅̓͆͑̉̕͜!̸̭̞̫̂̑͒̈̈́̾@̵̨̢͓̭̼̬͎̗̟̳͚̎̿͗̏̏̉̾̀̿̉̚#̷͖͎̥̾̋͐̈́̈͘$̶͙͔̉͆͌͊̏͛̍̀̅̕͠%̶̨̮̞̩̖̣̦͙̓̊̄̕ͅ^̶̺̳͍̂͝&̵̙̠̣̲̺͙̪́̌̈́̈̀̅̄͆̚̕͝*̶̨̢͔̮͚̝̯̙̞͐͗(̵̢̖̯͔͇̮̹͓̪̖̌̈̋̾͐͜)̶̣͓̺̅̂̚̕`);
module.exports = {
  tiny,
  fullwidth,
  old_timey,
  fancy,
  clapback: text => `👏 ${text.split(' ').join(' 👏 ')} 👏`,
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

//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm5vZGVfbW9kdWxlcy9icm93c2VyLXBhY2svX3ByZWx1ZGUuanMiLCJjbGllbnQvbWFpbi9tYWluLmpzeCIsImNsaWVudC9tYWluL21haW4ubGVzcyIsImNsaWVudC9tYWluL3RleHQudHJhbnNmb3Jtcy5qcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQTtBQ0FBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDcEpBOztBQ0FBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSIsImZpbGUiOiJnZW5lcmF0ZWQuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlc0NvbnRlbnQiOlsiKGZ1bmN0aW9uKCl7ZnVuY3Rpb24gcihlLG4sdCl7ZnVuY3Rpb24gbyhpLGYpe2lmKCFuW2ldKXtpZighZVtpXSl7dmFyIGM9XCJmdW5jdGlvblwiPT10eXBlb2YgcmVxdWlyZSYmcmVxdWlyZTtpZighZiYmYylyZXR1cm4gYyhpLCEwKTtpZih1KXJldHVybiB1KGksITApO3ZhciBhPW5ldyBFcnJvcihcIkNhbm5vdCBmaW5kIG1vZHVsZSAnXCIraStcIidcIik7dGhyb3cgYS5jb2RlPVwiTU9EVUxFX05PVF9GT1VORFwiLGF9dmFyIHA9bltpXT17ZXhwb3J0czp7fX07ZVtpXVswXS5jYWxsKHAuZXhwb3J0cyxmdW5jdGlvbihyKXt2YXIgbj1lW2ldWzFdW3JdO3JldHVybiBvKG58fHIpfSxwLHAuZXhwb3J0cyxyLGUsbix0KX1yZXR1cm4gbltpXS5leHBvcnRzfWZvcih2YXIgdT1cImZ1bmN0aW9uXCI9PXR5cGVvZiByZXF1aXJlJiZyZXF1aXJlLGk9MDtpPHQubGVuZ3RoO2krKylvKHRbaV0pO3JldHVybiBvfXJldHVybiByfSkoKSIsImZ1bmN0aW9uIF9leHRlbmRzKCkgeyBfZXh0ZW5kcyA9IE9iamVjdC5hc3NpZ24gfHwgZnVuY3Rpb24gKHRhcmdldCkgeyBmb3IgKHZhciBpID0gMTsgaSA8IGFyZ3VtZW50cy5sZW5ndGg7IGkrKykgeyB2YXIgc291cmNlID0gYXJndW1lbnRzW2ldOyBmb3IgKHZhciBrZXkgaW4gc291cmNlKSB7IGlmIChPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGwoc291cmNlLCBrZXkpKSB7IHRhcmdldFtrZXldID0gc291cmNlW2tleV07IH0gfSB9IHJldHVybiB0YXJnZXQ7IH07IHJldHVybiBfZXh0ZW5kcy5hcHBseSh0aGlzLCBhcmd1bWVudHMpOyB9XG5cbnJlcXVpcmUoJy4vbWFpbi5sZXNzJyk7XG5cbmNvbnN0IFJlYWN0ID0gcmVxdWlyZSgncmVhY3QnKTtcblxuY29uc3Qge1xuICBUaXRsZVxufSA9IHJlcXVpcmUoJ3ZpdHJldW0vaGVhZHRhZ3MnKTtcblxuY29uc3QgSEVJR0hUID0gMjAwLFxuICAgICAgV0lEVEggPSAyMDA7XG5cbmZ1bmN0aW9uIFRleHRDYW52YXMoe1xuICB0ZXh0LFxuICBzaXplLFxuICBsaW5laGVpZ2h0LFxuICBzZXREYXRhVVJMLFxuICBzZXRTaXplXG59KSB7XG4gIGNvbnN0IGdldE1heFNpemUgPSAobGluZXMsIHNpemUgPSA3MCkgPT4ge1xuICAgIGN0eC5mb250ID0gYGJvbGQgJHtzaXplICsgMX1weCBDYWxpYnJpYDtcbiAgICBjb25zdCBiaWdnZXN0ID0gTWF0aC5tYXgoLi4ubGluZXMubWFwKHRleHQgPT4gY3R4Lm1lYXN1cmVUZXh0KHRleHQpLndpZHRoKSk7XG4gICAgaWYgKGJpZ2dlc3QgPj0gV0lEVEgpIHJldHVybiBzaXplO1xuICAgIHJldHVybiBnZXRNYXhTaXplKGxpbmVzLCBzaXplICsgMSk7XG4gIH07XG5cbiAgY29uc3QgY2FudmFzID0gUmVhY3QudXNlUmVmKG51bGwpO1xuICBjb25zdCBbY3R4LCBzZXRDdHhdID0gUmVhY3QudXNlU3RhdGUobnVsbCk7XG4gIFJlYWN0LnVzZUVmZmVjdCgoKSA9PiB7XG4gICAgY2FudmFzLmN1cnJlbnQgJiYgc2V0Q3R4KGNhbnZhcy5jdXJyZW50LmdldENvbnRleHQoJzJkJykpO1xuICB9LCBbY2FudmFzXSk7XG4gIFJlYWN0LnVzZUVmZmVjdCgoKSA9PiB7XG4gICAgY3R4ICYmIHRleHQgJiYgc2V0U2l6ZShnZXRNYXhTaXplKHRleHQuc3BsaXQoJ1xcbicpKSk7XG4gIH0sIFt0ZXh0XSk7XG5cbiAgaWYgKGN0eCkge1xuICAgIGN0eC5jbGVhclJlY3QoMCwgMCwgY2FudmFzLmN1cnJlbnQud2lkdGgsIGNhbnZhcy5jdXJyZW50LmhlaWdodCk7XG4gICAgY3R4LmZvbnQgPSBgYm9sZCAke3NpemV9cHggQ2FsaWJyaWA7XG4gICAgY3R4LmZpbGxTdHlsZSA9ICcjMDAwJztcbiAgICBjdHgudGV4dEJhc2VsaW5lID0gJ21pZGRsZSc7XG4gICAgY29uc3QgbGluZXMgPSB0ZXh0LnNwbGl0KCdcXG4nKTtcbiAgICBsaW5lcy5tYXAoKGxpbmUsIGlkeCkgPT4ge1xuICAgICAgY29uc3Qgd2lkdGggPSAoV0lEVEggLSBjdHgubWVhc3VyZVRleHQobGluZSkud2lkdGgpIC8gMjtcbiAgICAgIGNvbnN0IGhlaWdodCA9IEhFSUdIVCAvIDIgLSAobGluZXMubGVuZ3RoIC0gMSkgKiBsaW5laGVpZ2h0IC8gMiArIGlkeCAqIGxpbmVoZWlnaHQ7XG4gICAgICBjdHguZmlsbFRleHQobGluZSwgd2lkdGgsIGhlaWdodCk7XG4gICAgfSk7XG4gICAgc2V0RGF0YVVSTChjYW52YXMuY3VycmVudC50b0RhdGFVUkwoJ2ltYWdlL3BuZycpKTtcbiAgfVxuXG4gIDtcbiAgcmV0dXJuIFJlYWN0LmNyZWF0ZUVsZW1lbnQoXCJjYW52YXNcIiwge1xuICAgIHJlZjogY2FudmFzLFxuICAgIHdpZHRoOiBXSURUSCxcbiAgICBoZWlnaHQ6IEhFSUdIVFxuICB9KTtcbn1cblxuY29uc3Qge1xuICBGYXZpY29uXG59ID0gcmVxdWlyZSgndml0cmV1bS9oZWFkdGFncycpO1xuXG5mdW5jdGlvbiBFbW9qaU1ha2VyKHByb3BzKSB7XG4gIGNvbnN0IFt0ZXh0LCBzZXRUZXh0XSA9IFJlYWN0LnVzZVN0YXRlKCdZZXMnKTtcbiAgY29uc3QgW3NpemUsIHNldFNpemVdID0gUmVhY3QudXNlU3RhdGUoMTUwKTtcbiAgY29uc3QgW2xpbmVoZWlnaHQsIHNldExpbmVoZWlnaHRdID0gUmVhY3QudXNlU3RhdGUoNzUpO1xuICBjb25zdCBbZGF0YVVSTCwgc2V0RGF0YVVSTF0gPSBSZWFjdC51c2VTdGF0ZSgnJyk7XG4gIHJldHVybiBSZWFjdC5jcmVhdGVFbGVtZW50KFwiZGl2XCIsIHtcbiAgICBjbGFzc05hbWU6IFwiRW1vamlNYWtlclwiXG4gIH0sIFJlYWN0LmNyZWF0ZUVsZW1lbnQoRmF2aWNvbiwge1xuICAgIGhyZWY6IGRhdGFVUkxcbiAgfSksIFJlYWN0LmNyZWF0ZUVsZW1lbnQoXCJoMlwiLCBudWxsLCBcIlNsYWNrIFRleHQgRW1vamkgTWFrZXJcIiksIFJlYWN0LmNyZWF0ZUVsZW1lbnQoXCJkaXZcIiwge1xuICAgIGNsYXNzTmFtZTogXCJjb250cm9sc1wiXG4gIH0sIFJlYWN0LmNyZWF0ZUVsZW1lbnQoXCJkaXZcIiwgbnVsbCwgUmVhY3QuY3JlYXRlRWxlbWVudChcImxhYmVsXCIsIG51bGwsIFwiVGV4dFwiKSwgUmVhY3QuY3JlYXRlRWxlbWVudChcInRleHRhcmVhXCIsIHtcbiAgICB2YWx1ZTogdGV4dCxcbiAgICBvbkNoYW5nZTogZXZ0ID0+IHNldFRleHQoZXZ0LnRhcmdldC52YWx1ZSksXG4gICAgcm93czogM1xuICB9KSksIFJlYWN0LmNyZWF0ZUVsZW1lbnQoXCJkaXZcIiwgbnVsbCwgUmVhY3QuY3JlYXRlRWxlbWVudChcImxhYmVsXCIsIG51bGwsIFwiU2l6ZVwiKSwgUmVhY3QuY3JlYXRlRWxlbWVudChcImlucHV0XCIsIHtcbiAgICB0eXBlOiBcInJhbmdlXCIsXG4gICAgbWluOiA4MCxcbiAgICBtYXg6IDI1MCxcbiAgICB2YWx1ZTogc2l6ZSxcbiAgICBvbkNoYW5nZTogZXZ0ID0+IHNldFNpemUoZXZ0LnRhcmdldC52YWx1ZSlcbiAgfSksIHNpemUsIFJlYWN0LmNyZWF0ZUVsZW1lbnQoXCJidXR0b25cIiwge1xuICAgIG9uQ2xpY2s6ICgpID0+IHNldFNpemUoMTUwKVxuICB9LCBcIlN0YW5kYXJkIFNpemVcIikpLCBSZWFjdC5jcmVhdGVFbGVtZW50KFwiZGl2XCIsIG51bGwsIFJlYWN0LmNyZWF0ZUVsZW1lbnQoXCJsYWJlbFwiLCBudWxsLCBcIlNwYWNpbmdcIiksIFJlYWN0LmNyZWF0ZUVsZW1lbnQoXCJpbnB1dFwiLCB7XG4gICAgdHlwZTogXCJyYW5nZVwiLFxuICAgIG1pbjogNDAsXG4gICAgbWF4OiAxMjAsXG4gICAgdmFsdWU6IGxpbmVoZWlnaHQsXG4gICAgb25DaGFuZ2U6IGV2dCA9PiBzZXRMaW5laGVpZ2h0KGV2dC50YXJnZXQudmFsdWUpXG4gIH0pLCBsaW5laGVpZ2h0KSksIFJlYWN0LmNyZWF0ZUVsZW1lbnQoXCJkaXZcIiwge1xuICAgIGNsYXNzTmFtZTogXCJyZW5kZXJcIlxuICB9LCBSZWFjdC5jcmVhdGVFbGVtZW50KFRleHRDYW52YXMsIHtcbiAgICB0ZXh0LFxuICAgIHNpemUsXG4gICAgbGluZWhlaWdodCxcbiAgICBzZXREYXRhVVJMLFxuICAgIHNldFNpemVcbiAgfSksIFJlYWN0LmNyZWF0ZUVsZW1lbnQoXCJkaXZcIiwge1xuICAgIGNsYXNzTmFtZTogXCJleGFtcGxlXCJcbiAgfSwgXCJUaGlzIGlzIGl0IHVzZWQgaW4gdGV4dC4gXCIsIFJlYWN0LmNyZWF0ZUVsZW1lbnQoXCJpbWdcIiwge1xuICAgIGNsYXNzTmFtZTogXCJzYW1wbGVcIixcbiAgICBzcmM6IGRhdGFVUkxcbiAgfSksIFwiIEFsc28gdGhlIHRhYiBpY29uIGlzIHVwZGF0ZWQuXCIpKSwgUmVhY3QuY3JlYXRlRWxlbWVudChcImRpdlwiLCB7XG4gICAgY2xhc3NOYW1lOiBcImluc3RydWN0aW9uc1wiXG4gIH0sIFJlYWN0LmNyZWF0ZUVsZW1lbnQoXCJoM1wiLCBudWxsLCBcImluc3RydWN0aW9uc1wiKSwgUmVhY3QuY3JlYXRlRWxlbWVudChcIm9sXCIsIG51bGwsIFJlYWN0LmNyZWF0ZUVsZW1lbnQoXCJsaVwiLCBudWxsLCBcIkN1c3RvbWl6ZSB5b3VyIHRleHQgZW1vamlcIiksIFJlYWN0LmNyZWF0ZUVsZW1lbnQoXCJsaVwiLCBudWxsLCBSZWFjdC5jcmVhdGVFbGVtZW50KFwiYVwiLCB7XG4gICAgaHJlZjogZGF0YVVSTCxcbiAgICB0YXJnZXQ6IFwiX2JsYW5rXCIsXG4gICAgZG93bmxvYWQ6IGAke3RleHQucmVwbGFjZSgnXFxuJywgJ18nKX0ucG5nYFxuICB9LCBcIkRvd25sb2FkIEl0XCIpKSwgUmVhY3QuY3JlYXRlRWxlbWVudChcImxpXCIsIG51bGwsIFJlYWN0LmNyZWF0ZUVsZW1lbnQoXCJhXCIsIHtcbiAgICBocmVmOiBcImh0dHBzOi8vY29vbHN2aWxsZS5zbGFjay5jb20vY3VzdG9taXplL2Vtb2ppXCIsXG4gICAgdGFyZ2V0OiBcIl9ibGFua1wiXG4gIH0sIFwiQWRkIEVtb2ppIHRvIFNsYWNrXCIpKSkpKTtcbn1cbi8qKioqKioqKioqKioqKioqKi9cblxuXG5jb25zdCB0cmFuc2Zvcm1zID0gcmVxdWlyZSgnLi90ZXh0LnRyYW5zZm9ybXMuanMnKTtcblxuZnVuY3Rpb24gVGV4dFRyYW5zZm9ybShwcm9wcykge1xuICBjb25zdCBbdGV4dCwgc2V0VGV4dF0gPSBSZWFjdC51c2VTdGF0ZSgnJyk7XG4gIGNvbnN0IGRpdmlkZXIgPSBSZWFjdC5jcmVhdGVFbGVtZW50KFwiYnJcIiwgbnVsbCk7XG4gIHJldHVybiBSZWFjdC5jcmVhdGVFbGVtZW50KFwiZGl2XCIsIHtcbiAgICBjbGFzc05hbWU6IFwiVGV4dFRyYW5zZm9ybVwiXG4gIH0sIFJlYWN0LmNyZWF0ZUVsZW1lbnQoXCJoMlwiLCBudWxsLCBcIlRleHQgVHJhbnNmb3JtXCIpLCBSZWFjdC5jcmVhdGVFbGVtZW50KFwiZGl2XCIsIHtcbiAgICBjbGFzc05hbWU6IFwidHJhbnNmb3Jtc1wiXG4gIH0sIFJlYWN0LmNyZWF0ZUVsZW1lbnQoXCJ0ZXh0YXJlYVwiLCB7XG4gICAgb25DaGFuZ2U6IGV2dCA9PiBzZXRUZXh0KGV2dC50YXJnZXQudmFsdWUpLFxuICAgIHZhbHVlOiB0ZXh0LFxuICAgIGF1dG9Gb2N1czogdHJ1ZSxcbiAgICBvbkZvY3VzOiBcInRoaXMuc2VsZWN0KCk7XCJcbiAgfSksIFJlYWN0LmNyZWF0ZUVsZW1lbnQoXCJ0ZXh0YXJlYVwiLCB7XG4gICAgcmVhZE9ubHk6IHRydWUsXG4gICAgdmFsdWU6IE9iamVjdC52YWx1ZXModHJhbnNmb3JtcykubWFwKGZuID0+IGZuKHRleHQpKS5qb2luKCdcXG5cXG4nKVxuICB9KSkpO1xufSAvLy8vLy8vLy8vLy8vLy8vLy9cblxuXG5mdW5jdGlvbiBNYWluKF9yZWYpIHtcbiAgbGV0IHByb3BzID0gX2V4dGVuZHMoe30sIF9yZWYpO1xuXG4gIHJldHVybiBSZWFjdC5jcmVhdGVFbGVtZW50KFwiZGl2XCIsIF9leHRlbmRzKHtcbiAgICBjbGFzc05hbWU6IGBNYWluYFxuICB9LCBwcm9wcyksIFJlYWN0LmNyZWF0ZUVsZW1lbnQoVGl0bGUsIG51bGwsIFwiU2xhY2sgVG9vbHNcIiksIFJlYWN0LmNyZWF0ZUVsZW1lbnQoXCJoMVwiLCBudWxsLCBcIlNsYWNrIFRvb2xzXCIpLCBSZWFjdC5jcmVhdGVFbGVtZW50KFwiaHJcIiwgbnVsbCksIFJlYWN0LmNyZWF0ZUVsZW1lbnQoVGV4dFRyYW5zZm9ybSwgbnVsbCksIFJlYWN0LmNyZWF0ZUVsZW1lbnQoXCJoclwiLCBudWxsKSwgUmVhY3QuY3JlYXRlRWxlbWVudChFbW9qaU1ha2VyLCBudWxsKSk7XG59XG5cbjtcbm1vZHVsZS5leHBvcnRzID0gTWFpbjsiLCIiLCJjb25zdCBydW5lcyA9IHJlcXVpcmUoJ3J1bmVzJyk7XG5cbmNvbnN0IGNvcmUgPSBgMDEyMzQ1Njc4OXF3ZXJ0eXVpb3Bhc2RmZ2hqa2x6eGN2Ym5tUVdFUlRZVUlPUEFTREZHSEpLTFpYQ1ZCTk1cXGAtPVtdXFxcXDsnLC4vfl8re318OlwiPD4/IUAjJCVeJiooKWA7XG5cbmNvbnN0IGNyZWF0ZU1hcCA9IHN0cmluZyA9PiB7XG4gIGxldCBtYXAgPSB7fTtcbiAgcnVuZXMoc3RyaW5nKS5tYXAoKGNoYXIsIGlkeCkgPT4gbWFwW2NvcmVbaWR4XV0gPSBjaGFyKTtcbiAgcmV0dXJuIHRleHQgPT4ge1xuICAgIHJldHVybiB0ZXh0LnNwbGl0KCcnKS5tYXAoY2hhciA9PiB7XG4gICAgICByZXR1cm4gbWFwW2NoYXJdIHx8IGNoYXI7XG4gICAgfSkuam9pbignJyk7XG4gIH07XG59O1xuXG5jb25zdCB0aW55ID0gY3JlYXRlTWFwKGDigbDCucKywrPigbTigbXigbbigbfigbjigbnhtaDKt+G1icqz4bWXyrjhtZjhtqbhtZLhtZbhtYPLouG1iOG2oOG1jcqwyrLhtY/LoeG2u8uj4bac4bWb4bWH4oG/4bWQ4bWg4bWC4bSx4bS/4bWAyrjhtYHhtLXhtLzhtL7htKzLouG0sOG2oOG0s+G0tOG0tuG0t+G0uOG2u8uj4bac4rG94bSu4bS64bS5XFxg4oG74oG8W11cXFxcOycsLi9+X+KBunt9fDpcIjw+y4DhtY5AIyQlXiYq4oG94oG+YCk7XG5jb25zdCBmdWxsd2lkdGggPSBjcmVhdGVNYXAoYO+8kO+8ke+8ku+8k++8lO+8le+8lu+8l++8mO+8me+9ke+9l++9he+9ku+9lO+9me+9le+9ie+9j++9kO+9ge+9k++9hO+9hu+9h++9iO+9iu+9i++9jO+9mu+9mO+9g++9lu+9gu+9ju+9je+8se+8t++8pe+8su+8tO+8ue+8te+8qe+8r++8sO+8oe+8s++8pO+8pu+8p++8qO+8qu+8q++8rO+8uu+8uO+8o++8tu+8ou+8ru+8rVxcYO+8je+8nVtd77y877yb77yHLC7vvI9+77y/IO+9m++9nXzvvJpcIu+8nO+8nu+8n++8ge+8oO+8g++8hO+8he+8vu+8hu+8iu+8iO+8iWApO1xuY29uc3Qgb2xkX3RpbWV5ID0gY3JlYXRlTWFwKGAwMTIzNDU2Nzg58J2WlvCdlpzwnZaK8J2Wl/CdlpnwnZae8J2WmvCdlo7wnZaU8J2WlfCdlobwnZaY8J2WifCdlovwnZaM8J2WjfCdlo/wnZaQ8J2WkfCdlp/wnZad8J2WiPCdlpvwnZaH8J2Wk/CdlpLwnZW88J2WgvCdlbDwnZW98J2Vv/CdloTwnZaA8J2VtPCdlbrwnZW78J2VrPCdlb7wnZWv8J2VsfCdlbLwnZWz8J2VtfCdlbbwnZW38J2WhfCdloPwnZWu8J2WgfCdla3wnZW58J2VuFxcYC09W11cXFxcOycsLi9+Xyt7fXw6XCI8Pj8hQCMkJV4mKigpYCk7XG5jb25zdCBpdGFsaWNzID0gY3JlYXRlTWFwKGAwMTIzNDU2Nzg58J2YsvCdmLjwnZim8J2Ys/CdmLXwnZi68J2YtvCdmKrwnZiw8J2YsfCdmKLwnZi08J2YpfCdmKfwnZio8J2YqfCdmKvwnZis8J2YrfCdmLvwnZi58J2YpPCdmLfwnZij8J2Yr/CdmK7wnZiY8J2YnvCdmIzwnZiZ8J2Ym/CdmKDwnZic8J2YkPCdmJbwnZiX8J2YiPCdmJrwnZiL8J2YjfCdmI7wnZiP8J2YkfCdmJLwnZiT8J2YofCdmJ/wnZiK8J2YnfCdmInwnZiV8J2YlFxcYC09W11cXFxcOycsLi9+Xyt7fXw6XCI8Pj8hQCMkJV4mKigpYCk7XG5jb25zdCBmYW5jeSA9IGNyZWF0ZU1hcChgMDEyMzQ1Njc4OfCdk7rwnZSA8J2TrvCdk7vwnZO98J2UgvCdk77wnZOy8J2TuPCdk7nwnZOq8J2TvPCdk63wnZOv8J2TsPCdk7HwnZOz8J2TtPCdk7XwnZSD8J2UgfCdk6zwnZO/8J2Tq/Cdk7fwnZO28J2ToPCdk6bwnZOU8J2TofCdk6PwnZOo8J2TpPCdk5jwnZOe8J2Tn/Cdk5DwnZOi8J2Tk/Cdk5XwnZOW8J2Tl/Cdk5nwnZOa8J2Tm/Cdk6nwnZOn8J2TkvCdk6XwnZOR8J2TnfCdk5xcXGAtPVtdXFxcXDsnLC4vfl8re318OlwiPD4/IUAjJCVeJiooKWApO1xuY29uc3QgY3RodWx1MSA9IGNyZWF0ZU1hcChgMMy2Mcy2Msy4M8y2NMy0Ncy3Nsy3N8y4OMy1Ocy1ccy3d8y1Zcy2csy0dMy2ecy4dcy0acy2b8y4cMy1Ycy1c8y3ZMy2Zsy1Z8y2aMy4asy1a8y1bMy4esy1eMy1Y8y1dsy3Ysy0bsy4bcy2Ucy1V8y3Rcy0Usy0VMy1Wcy2Vcy1Scy1T8y4UMy1Qcy4U8y2RMy3Rsy2R8y4SMy1Ssy2S8y1TMy2Wsy0WMy2Q8y3Vsy4Qsy3Tsy4Tcy0XFzMtlxcYMy3Lcy0Pcy4W8y4Xcy0XFzMtVxczLU7zLYnzLgszLUuzLUvzLV+zLdfzLgrzLd7zLV9zLR8zLc6zLRcIsy1PMy4Psy1P8y1Icy2QMy3I8y0JMy3Jcy4Xsy1Jsy1Ksy1KMy0Kcy4YCk7XG5jb25zdCBjdGh1bHUyID0gY3JlYXRlTWFwKGAwzLTMisyGzZHNk8yjzKoxzLjMis2BzY3MsTLMtsyFzIXNiMywzLLNiTPMtM2BzI/MocylzKLMucyzNMy3zL7MicyazJvNhs2JzJ7MuzXMtc2EzYbMlcyqNsy0zL7MlMyRzLzMrsyyzKHMoDfMtM2YzIjNnc2EzYvMsM2OzYjMp8y7OMy0zL3MiMyPzKjMpsydzLE5zLbNis2DzZTMls2OzLrMpnHMtc2EzaDMjsyGzIXMp8yczZrMq3fMt8yBzZLMgc2azJ7NlsydZcy0zITMh8y9zIbMs8yzzJlyzLfNnc2QzJXNiXTMtMyOzYrMi8yezKXNhcyXecy3zaDMmsybzZzNms2IzJ3Mq3XMts2EzYDMmM2VzLnMq8ygacy4zIPMj82gzI3NmW/MtM2MzIrNicyezY7Mmc2UcMy4zI3NoM2EzYrMqcydYcy4zYDNls2WzZxzzLXMv82AzZjMm82azKTNk8yrzJ9kzLXNmM2DzYTMiMyiZsy1zL3NncyFzL7MucyrzZzMsWfMuMyEzJHNksyHzZvMq8ylaMy3zZ3MjMyVzIfNkMyZzJzNlMyZasy0zJvNi82EzIvNncyZzKLMs8yca8y1zL3NmMyXzKbMpsyozK9szLjNksyNzJrMkMyZzK3NiM2IzKF6zLfMgMygzLnMl82ceMy3zI7Mi8y5zKPMus2WY8y0zL3MiMyJzIjNmcyydsy2zJTMisyFzJnNmWLMt82MzYbMvc2czKTMlm7Mt82EzIHNmMyuzYjMqcy7zLFtzLjNgMyRzJHNmMyiUcy4zZHNgMybzK9XzLTNhs2IRcy0zJvNkM2dzIvNncy5zZlSzLbNncyvzZnNlMydVMy1zZfMkc2azKjMrs2VWcy3zYPNncyazITMh8ykVcy3zITNjM2EzInMgMyzzJdJzLjNl8yFzYrMvs2bzLnMqsy8zKhPzLfMm82bzKTMucymzLlQzLXNgc2RzL7MjsyEzZTMsMyxQcy0zJPNhM2TzKfMulPMt82RzJHNiM2FzZPMlkTMtc2dzZPMoMywzZpGzLXNkc2AzJrNjUfMtc2CzInMuc2TzLrMqcyiSMy2zIfMi8y/zJjMqsydzKvNmUrMt8yAzYHMpMyXzLlLzLjNkcylzJ7MpMyozJdMzLjMlc2gzI3MncylWsy1zL/NncyhWMy0zILNncy9zJHMpM2FzJnMmcyvQ8y2zIPMgcySzYjMllbMt82dzZPMuULMt8yCzYHMis2EzYTMoMywzLLMok7Mts2dzKfMoM2UzKlNzLfNgsyJzZvMis2MzKjMulxczLjNl8yoXFxgzLTMisydzKPNiS3Mt8yJzYTMssytzY3MpT3Mts2bzYPMulvMt8yMzJHMkMyVzKnMls2TzLPMoV3MuM2SzYTNjcymXFzMtc2KzYTMv8yRzJdcXMy0zZvMjcyGzYfNicynO8y0zInMk82ZzJzMvMyWzKcnzLXMkcybzZfMm8ykzYXMrcyszKcszLjMvsy/zZDNoMyIzYnMscylzLwuzLjNkcyKzYrMp82ZL8y0zJrNkcyGzYHNgM2azLDNicylzKJ+zLjNgsyGzYDMhsyDzYfMnMyhzLlfzLbNis2SzJXMgMy8zJcrzLXNm8yLzaDNgMyizJZ7zLTNhM2QzLLNjc2Zfcy4zYLMhsyDzYnNicynzKnMp3zMuM2YzI3MisyUzILMr8yzzKg6zLjNncyNzKjMo8yrzLLNnFwizLjMj82BzYTMm8ywzLk8zLjMksyCzIvMicyvzZrMrj7MuM2gzIjMms2LzLvMosyXzZzNlT/MtMyMzJTMis2QzIXNlMynIcy0zYvNhMyHzInNjM2JQMy4zIPMpCPMtMyNzZ3Ng8yEzLkkzLbMkcyKzI7NhM2RzKTMncy7zYUlzLbNhMyiXsy2zZvMvs2CzJbMs82JzKQmzLfNm8yHzIDMhMyjzZkqzLbMhMyDzITNmM2dzYXMsMygKMy1zYLNgsyLzZLMksy8zKfMr8y6Kcy3zJrNi8yZzKhgKTtcbmNvbnN0IGN0aHVsdTMgPSBjcmVhdGVNYXAoYDDMts2QzL7NmM2EzYTMiM2MzJXMgsyRzaDMmMyfzKHMs8ynzKQxzLjNl8yPzJrMjMybzZbMpM2IMsy1zILNgcyHzJrNl8y9zZbMoMyzzLnNmsy7M8y2zYTMhcyHzZfNl82EzI7MiMynzKjMqcyizK80zLbMjMyCzI7MjsyLzJDNl82SzZ3NncyYzZnMnDXMuM2dzJvNhM2RzIXNhM2DzZHMk8yuzLDMs82ZzKLMncygzY3MqjbMtMyTzYDMgs2RzL3Mrc2OzJ3MqMyXzKnNhcyYzKrMpMycN8y4zIXNmMyOzJLMkcyOzYTNgM2NzKPMssyxOMy3zJvMhsyUzI/MiMyHzIDNg8yyzKrNicyXOcy1zIXNms2VzKnMsc2Jccy1zIvMi8yCzZfNmMyBzZ3NmMyNzL/Mqcy5zKjMn8ylzJbMuXfMtMyAzZfMjcyKzInMlcyRzZjNlcyhzJdlzLTMgc2DzYrMkM2SzYTNmsyxzJ7Nmcyccsy3zJPMk82KzIrNhs2UzLHNk8yyzKHMpsyWzK/MrM2adMy2zIHNncyDzIXMm82GzILMm8yKzJXMmcy7zJzMp3nMtM2dzYzNncyXzK/MlsytzJzMp8yszY7MmHXMt82GzL3NjM2dzYbMp2nMt8ybzYbMhMyDzITNg8yGzJ7MpM2czJbMq2/MtM2AzIbNmMyKzKDMo82azJhwzLfMic2GzI3Nnc2GzL3NmMySzYPMgMyPzKHNnMytzYlhzLXMms2EzZHMjMyQzZ3MiM2KzZjMmc2czKrMscyzzJ/MrM2TzKxzzLTMhM2QzIzMu2TMt82EzITMhs2CzIDMjcyWzZzMvM2HzKlmzLTNi82YzIfMiM2bzYzMgcyAzJPNmsyqzLPMmMypzYjMs8yuzLnNk2fMt82YzIPMiM2YzITMv8y/zL7NhM2YzYjMusyYzK9ozLTNkcybzL3NgcyazIvMjsyLzJvMisy8zK/Msc2IzKvMosypzLvMmWrMts2gzKrMoMyZzKfMvMywzK3MlmvMts2dzIvMvcymzK/MoMypzKHNk8y5zKvMrWzMuM2AzIXMvc2KzJrNi82Nesy4zJXNlc2UzJbMss2WzLDNiMyhzYd4zLjNm8yEzIHNm82UzLvMos2FzYnMusy8zKrNmWPMtsyAzY52zLXMv8yqzJfNlWLMtsyGzYbMlcyQzYPNnc2XzYjMq8ymzYfMsMy8zJ7Mpsyobsy0zJLNi82YzYrNksy/zIzMrm3MtMyUzZDMlcyRzYzMmc2NUcy1zILMg82BzL7MgM2CzI3MjcyVzZjNncydzKXNh82WzKzMnsyozZXMrsy8V8y2zZ3Mvc2XzYLMgsykzK/MmM2czK7NlUXMts2XzZfMk8yBzYvMncynUsy4zYbMgsytzZzMolTMuMyAzInNm8yXzKHMqsy7zK/Mo1nMtcyPzJvMj8yFzYTMkMynzYfMnc2FzLLNiM2NVcy4zZfNg82MzaDMsMytzZrMqMyYzKDNjs2NzLBJzLTMg8yTzIzNhMyHzYDNjMyazI3NlsyczZzMus2TzJ/Ml82WzY7Mpc2ZT8y3zI7Mjs2FzLHNnM2JzLrMqsypzLPMq1DMuMyOzL3MgcyLzYLMlMyGzIzMmcyszJ3NlcyxzK/NlMyYQcy1zZ3Ml8yZzJbMvMyszJnMrsy7zK/MnVPMtM2QzI7Mg8y8zJ7NmsykzLNEzLfMjcyKzYPNksyKzI/Mnc2IzLHNnMysRsy4zIfMscyhzKjMqM2WzLHNlsyqzKtHzLTMks2DzJvNgMyHzYbMkcyyzK7MmcyWzZnMmUjMtc2MzL7MkcyAzJvNmMy9zaDMkM2BzIzMmcyuSsy2zIHMosyszKDNlsynzZzMpUvMtsyCzI7Mk8yEzZ3MlMyGzIvMpcyzzJzMqMynTMy3zZvMhcyNzITNg82SzIbMmM2JzJzMqlrMtMyGzZ3MmsyrzKPNk8yezKfMn1jMuM2MzYrNgMyTzYLMlc2IzZXMos2WzY3MnMy6Q8y1zI/Nnc2EzZvMm82VzLNWzLjMh82ZzZPNls2TzKbNh8yvzJfMncyzQsy1zIrNhM2KzZXMss2FzZXNhcyvzKTNmsyfzKtOzLXMi8yCzYbMmE3MuM2BzIbNhsybzILMp8yozKtcXMy3zIXNi82BzIXMhM2GzIrNmc2FzJfMl8yeXFxgzLjNjMyEzYDMh8yUzIvMj8yQzYDNl82dzKEtzLbNhMyNzJPMi8yLzJrMk8yMzITMjM2EzLvMpsydzLLMr8yzzJc9zLfMg8y9zI7Mj82QzIPNoMyTzZfMmM2czY7Ms8ypzLnMq82WW8y2zIPMhsyMzZ3NgM2EzITMvsyDzI3Mlsy7Xcy3zIvMlcyDzL/MhMyyzYdcXMy3zI3NhMy/zL3Mk82bzYPNnc2EzYrMpMysXFzMt82KzZLNlMylzZPMscy5zLzMqDvMt82YzYTMgc2DzJHMgsyazJDMhsyXzLLMrsyszKzMpMyozJ4nzLXMh8yKzYzNjMyHzJLMnsy7zK/MmSzMtMyazL3MhsyCzIrMvs2MzZLMvsyvzKsuzLbNkMyVzJfMusyfzYjMri/MtsyUzZLNisyUzYvMgsyDzYrMm82SzIjMoMyWzKHMnMyxzKN+zLbNkMyazJrMh82BzZjNmMyAzZvMmsyKzLDMpsylzJjMscyhzK7MusyczJ/MvF/MtM2LzIbMgc2XzInNmivMuMyTzL3NhsyVzZzMu82WzJl7zLXMhM2NzZbMmM2UzK7MpcyczKLMqsygfcy2zZLMkcyQzZ3NkM2gzJTMgs2SzYTMn8yozKvMrMyszLLMr8yjfMy1zJHMmsyJzITMv8yczKo6zLbMm82dzL3MhMy9zIfMk8yTzJ9cIsy0zIbNgM2EzJrMlcyMzLvMr8yjzJzMsTzMtM2SzZHMlM2MzaDNgM2EzILMv82dzZTMosyWzKfMrsykzYjMn8yxPsy4zIfNhMyJzITNhs2bzIPNmM2KzIDMnsyzzK7Mnj/MuMybzYTMisyUzJrMlM2CzIjMj8y+zZLMr82VzLHMrcykzK7MssynzLEhzLjMlcybzZvNgsymzLvMrkDMt82LzIvNm8yQzYbMpc2czZTNnMygzJfMpMymI8y1zZjMoiTMuM2LzIbMgs2TzLHMocy8zKjMnsygzKDMqsyfzKglzLXNncyCzIDMgcyTzLnMr8yYzZrNlMypzJ3MqV7MtsyMzI3NkcyHzInNgsyDzJHNgcyvzKvMosygzZbNlcyszLkmzLXMi8yTzJLMjc2QzILMiMybzYfMrcyyzK0qzLjMjs2EzJTMhMyEzIPMkcyYzYfMn8y8zLLMqSjMts2CzYTMh82bzL/Mh8yszK/NiSnMuMy/zIPNk2ApO1xuY29uc3QgY3RodWx1NCA9IGNyZWF0ZU1hcChgMMy4zZ3NksyazJDMiMy9zInNgsyOzYXMr82NzLLNlsygzKnMoMyvzJcxzLXMv82MzZLMic2MzZjMjc2gzYXMrsyYzJjNlsynzYgyzLjMis2SzILMiMyKzIXNkcyIzZzMq8yrzKjMocygzJ8zzLfMgsyVzZDMss2HzLM0zLfMhsyFzYzMh82AzIPMkc2bzYnNiM2JNcy0zIXMhcyDzZjMgMy/zI7NisyIzJPMgMypzJ3MmcyWzY02zLTMhMy/zYPMlM2EzYLMoMykzJnNh8ylzZTMo82ZzK/MnzfMt82GzYPMvsyYzJjMpsy6zKI4zLTMhsy+zZ3Mi8yEzYLMk8yQzKfMmDnMuM2BzZHMgcy9zJLMqMymzKLMmM2Zccy2zIbNl8yLzYvMi82dzYvNl82RzYTMp8ynzZbMs8yvzKLMrXfMt8yNzIrMjc2GzZfNm82KzZHMkcyizK7Ml8yuzY5lzLXMgcyazYrNmMyAzYTMvsyBzLDMnnLMtM2KzJLMi82RzYPNisyIzL3MlMyAzYLMucy8zJd0zLbMlc2RzYDNgc2XzIrNm82MzKbNiM2FzLrNlsyhzLPNmnnMtMyOzIfNis2bzIfMvcyFzYPMkcywzJ/MpsyfzLt1zLbNkc2LzZ3MlM2XzL3Mg8yLzIjNl82MzJzMmWnMts2RzIrNnMyszLzMlsy7zKHMl2/MtMyJzaDMisyIzK7NhcyczZzMpc2VzKDMqMykzLrNlXDMtcyCzZfNjMyOzJXMjsyNzKrMnsyfzLrMr8y7zY7Mn82czLJhzLbMiMyGzJfNlM2OzKbMlsyvzY7Mo8y7zKbMoXPMt82dzIHNgMyJzYrNjMyrzZzMr82NzJfMl8ynzLnMrM2OzLNkzLjMvcyoZsy0zYHMjcyDzIbMg8yBzaDMh82azJjNms2TzYfNlc2UzKxnzLjMgsyIzKPMnWjMtMyQzKzMsM2WzK3Mns2WzK7MmcyzzKfMnGrMtsyAzJLNkMySzZDNoMyTzZfMucyhzK3NlM2azLzMq82NzYfMn8yza8y1zIjMm8yBzJLMm82KzYTMi8yUzIvMqMyczK3MnMyYzZXNmsy5zKzMo2zMtc2MzIzMgMy+zYHMgM2XzYLNm8yJzIzMmM2FzYjNmsy8zKrMos2Fesy2zIvNgs2dzYPNksyTzIDMj82BzLzNlsyYzKnNlcywzZnMoc2FzKPNjnjMts2EzZHNhM2LzYvMicyFzZXMn8yxzK3NlcywzKPMu2PMtc2AzIfNhMyYzZbMrc2ZzZXMn8yxzKrNnMy6zY12zLXMjcyHzJLMj8yMzI/MhsyczZnMqs2FzLxizLfNis2BzZjNgM2QzYTMhMy9zZLMicyrzK3Mpm7MuMyHzL7NhsyLzJPMis2CzIPNkMykbcy1zI7MgMyMzI/Mks2AzZjNisykzK/Nk8ytzJnMmMyrUcy0zYLNks2ZzJ3Mls2UzLPMmMyjzLBXzLjMic2EzI3MksyFzIXNoM2FzK/MrsyxzZzMqM2OzZTNhcydRcy3zJrMic2EzJXNncyGzIrNjM2bzZHNg8ylzK7MpM2czZpSzLXMm8yDzJDMgMy+zIzMvc2dzJDMpc2WzKLMp8yyzKnNlVTMuM2SzJ9ZzLfMlMyazZvMlcyTzIXMkcy+zZPNicyhzJzMnsy7zJzNnFXMtcyUzZvNkc2DzIbNisyeScy2zL/NncyPzZXMscy5zKHMuU/Mt8yPzYLMlMyIzIbNl82bzIfMhMy9zKhQzLXMlc2XzJvNkMyVzYTNg82MzJrMvc2UzJnNlsyczJzNhcyxQcy4zIPNi8y8U8y0zZjMgsyMzJPMgc2gzJrMv8yXzKrMs0TMtsyFzZPMnMyizKfMmcydzY3MusyWzYjMpEbMt82RzIfNgsyAzZ3MmsyGzYTMscy6zK3Mp8y6zKvMqcy5zLJHzLfMg8yQzZLNhMyDzYvMi82MzIfNl8yxzY7MukjMtMyLzaDMjMyRzZjNisyRzJjMs8yjzKXMl8ywzLLNlUrMtMy+zJXNg8yLzKbMqsywzLDMpsyhS8y4zILMlM2QzYTNkMyDzKxMzLbNjM2dzJDNis2azLzNh82TzK/Ml1rMts2gzYbMicyTzL3Nh82HzZnMoMyjWMy1zaDMn8yyQ8y2zJrNgsyCzZDMgMyFzYzMh82EzZTNlsyrzZxWzLfNm8yAzJ7MnM2HzZZCzLTMk8yazI/Mm82AzI3NoM2XzIHNlcypzYjNlcyuzZnMpE7Mt82GzIXMv82dzIjMqc2HzK9NzLfMkcyAzZ3NgMyGzYPMjcyrzKvMnMyjzYVcXMy0zZfNkMy+zI7NjM2ZzK3Ms1xcYMy1zZ3NhMyUzZLNgs2XzKctzLjMisyzzZrNlM2WzZU9zLbNkMyKzJrMjcyGzJ3Moc2FzJxbzLjMvcyAzaDNkcyHzJXMpMygzJ/NlcytzKBdzLfMhcySzKjMo8ynzK/Nicy7XFzMuMyOzIHNl82dzYTMi8yZzZRcXMy2zYPMm8yMzI/MhsyIzJHNjMyUzJjMvMyZzJ3Mp8yuO8y0zIXMgsyczJ4nzLfMlMyMzInMucyxzLHMn8yrzYXMncyyzKLMqMyyLMy1zJrNncyNzIDMmsyHzYLMsS7Mts2EzZPMqsyjzY3Mu82aL8y0zJXMgMyCzL7MhcyJzJLMh8yFzKnNls2UzKjMrMyvzZnMocy6zLt+zLbMkc2dzILMvs2EzIDMkM2EzIrMosywX8y4zI7Mh82EzYHMg82MzIbNls2UzK7NmcyczYjMmcymK8y4zYrNjM2WzJzMr8y8zKXMrcyhe8y3zYrMnc2FzLt9zLfNjMyLzYTNg82gzYzMvc2DzIPMqc2HzLDNk82czLzMncycfMy3zJXNhMyVzJbMoMyWzYnMusygOsy4zYzMk8yVzYHNhcyWzJ/Ml8ymzYjNicyzzZPNlc2HXCLMtMyTzYrMjcybzIHNl82EzYLMicyNzZnMns2IzJnNnMyizKvMsTzMt8ySzJXMjsyCzZDMhcy/zIfMh82LzJ/MrsyvzYjMnsyWzYXMqsyezZnMnj7MtcySzYHMms2dzIbMg8yKzKvMmM2TzJ7Nh82WzKQ/zLXNgcyHzJXMhc2DzYbNkcyJzKLNnCHMuMyCzJHNksyIzYTMvsytzJ7Mq0DMtcyOzL/Nl8yPzI/Micy+zYDMv8yJzJrNk8ytzLzMqMyizKzNjsyXzJ/Ms82aI8y3zL7Mi82YzZDNhMyIzZbNjsylJMy2zaDMicyVzYbNjM2KzI/Nm8yNzYDMhc2ZzZQlzLbNg8yKzJXMhMyuzJ7NhcypzJbMqMyjzKbNmV7MtsyCzZ3MusyzzY0mzLXMgcyMzYTMiMyAzIXMmsyVzITNnc2GzJnMoMyjzLLMus2ZzKoqzLbNkM2XzZTMrsyozZrMosydzK/MmcyeKMy1zIzMiMyLzL7NkMyWzK/NlM2HzZzMosyuzLnNk8yqzJYpzLbMmsyFzILMlcyjzZPMumApO1xubW9kdWxlLmV4cG9ydHMgPSB7XG4gIHRpbnksXG4gIGZ1bGx3aWR0aCxcbiAgb2xkX3RpbWV5LFxuICBmYW5jeSxcbiAgY2xhcGJhY2s6IHRleHQgPT4gYPCfkY8gJHt0ZXh0LnNwbGl0KCcgJykuam9pbignIPCfkY8gJyl9IPCfkY9gLFxuICBnb29meTogdGV4dCA9PiB0ZXh0LnRvTG93ZXJDYXNlKCkuc3BsaXQoJycpLm1hcCgoY2hhciwgaWR4KSA9PiBpZHggJSAyID09IDAgPyBjaGFyIDogY2hhci50b1VwcGVyQ2FzZSgpKS5qb2luKCcnKSxcbiAgc29uZzogdGV4dCA9PiBg8J+OtSR7aXRhbGljcyh0ZXh0KX3wn461YCAvLyBjdGh1bHUgOiAodGV4dCk9PntcbiAgLy8gXHRjb25zdCBjaHVuayA9IE1hdGguZmxvb3IodGV4dC5sZW5ndGgvNCk7XG4gIC8vIFx0Y29uc29sZS5sb2coY2h1bmspO1xuICAvLyBcdGNvbnNvbGUubG9nKHRleHQuc3Vic3RyKGNodW5rKjAsY2h1bmspKVxuICAvLyBcdGNvbnNvbGUubG9nKHRleHQuc3Vic3RyKGNodW5rKjEsY2h1bmspKVxuICAvLyBcdGNvbnNvbGUubG9nKHRleHQuc3Vic3RyKGNodW5rKjIsY2h1bmspKVxuICAvLyBcdGNvbnNvbGUubG9nKHRleHQuc3Vic3RyKGNodW5rKjMpKVxuICAvLyBcdHJldHVybiBjdGh1bHUxKHRleHQpO1xuICAvLyBcdHJldHVybiBbXG4gIC8vIFx0XHRjdGh1bHUxKHRleHQuc3Vic3RyKGNodW5rKjAsY2h1bmspKSxcbiAgLy8gXHRcdGN0aHVsdTIodGV4dC5zdWJzdHIoY2h1bmsqMSxjaHVuaykpLFxuICAvLyBcdFx0Y3RodWx1Myh0ZXh0LnN1YnN0cihjaHVuayoyLGNodW5rKSksXG4gIC8vIFx0XHRjdGh1bHU0KHRleHQuc3Vic3RyKGNodW5rKjMpKVxuICAvLyBcdF0uam9pbignJyk7XG4gIC8vIH1cbiAgLy8gYWxlcnQ6ICszXG5cbn07Il19
