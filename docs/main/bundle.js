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
const smallcaps = createMap(`0123456789ǫᴡᴇʀᴛʏᴜɪᴏᴘᴀsᴅғɢʜᴊᴋʟᴢxᴄᴠʙɴᴍQWERTYUIOPASDFGHJKLZXCVBNM\`-=[]\;',./~_ {}|:"<>?!@#$%^&*()`);
const cthulu1 = createMap(`0̶1̶2̸3̶4̴5̷6̷7̸8̵9̵q̷w̵e̶r̴t̶y̸u̴i̶o̸p̵a̵s̷d̶f̵g̶h̸j̵k̵l̸z̵x̵c̵v̷b̴n̸m̶Q̵W̷E̴R̴T̵Y̶U̵I̵O̸P̵A̸S̶D̷F̶G̸H̵J̶K̵L̶Z̴X̶C̷V̸B̷N̸M̴\̶\`̷-̴≠[̸]̴\̵\̵;̶'̸,̵.̵/̵~̷_̸+̷{̵}̴|̷:̴"̵≮>̵?̵!̶@̷#̴$̷%̸^̵&̵*̵(̴)̸`);
const cthulu2 = createMap(`0̴͓̣̪̊̆͑1̸͍̱̊́2̶͈̰̲͉̅̅3̴̡̢̥̹̳́̏4̷̛͉̞̻̾̉͆̚5̵̪̈́͆̕6̴̡̼̮̲̠̾̔̑7̴̧̰͎͈̻̈̈́͋͘͝8̴̨̦̝̱̽̈̏9̶͔̖͎̺̦͊̓q̵̧̜͚̫̈́̎̆̅͠ẃ̷͚̞͖̝͒́ē̴̳̳̙̇̽̆r̷͉͐̕͝t̴̞̥̗̎͊̋ͅy̷̛͚͈̝̫̚͜͠ǘ̶̘͕̹̫̠̀ĩ̸͙̏̍͠o̴͉̞͎̙͔͌̊p̸̩̝̍̈́͊͠à̸͖͖͜s̵̛͚̤͓̫̟̿̀͘d̵̢̓̈́̈͘f̵̹̫̱̽̅̾͜͝ḡ̸̫̥̑͒̇͛ȟ̷̙̜͔̙̇͐̕͝j̴̢̛̙̳̜͋̈́̋͝k̵̨̗̦̦̯̽͘l̸̡̙̭͈͈͒̍̐̚z̷̠̹̗̀͜x̷̹̣̺͖̎̋c̴͙̲̽̈̉̈v̶̙͙̔̊̅b̷̤̖͌͆̽͜n̷̮͈̩̻̱̈́́͘m̸̢̀̑̑͘Q̸̛̯͑̀W̴͈͆E̴̛̹͙͐̋͝͝R̶̯͙͔̝͝T̵̨͚̮͕͗̑Y̷̤̓̄̇̚͝Ū̷̳̗͌̈́̉̀Į̸̹̪̼͗̅͊̾͛Ơ̷̤̹̦̹͛Ṕ̵͔̰̱͑̾̎̄A̴̧͓̺̓̈́S̷͈͓̖͑̑ͅD̵͓̠̰͚͝F̵͍͑̀̚G̵̢̹͓̺̩͂̉Ḣ̶̘̪̝̫͙̋̿J̷̤̗̹̀́K̸̨̥̞̤̗͑L̸̝̥̍̕͠Z̵̡̿͝X̴̤̙̙̯̂̽̑͝ͅC̶͈̖̃́̒V̷͓̹͝B̷̢̠̰̲̂́̊̈́̈́Ņ̶̠͔̩͝M̷̨̺͂̉͛̊͌\̸̨͗\`̴̝̣͉̊-̷̲̭͍̥̉̈́=̶̺͛̓[̷̡̩̖͓̳̌̑̐̕]̸͍̦͒̈́\̵̗͊̈́̿̑\̴̧͇͉͛̍̆;̴̧͙̜̼̖̉̓'̵̧̛̛̤̭̬̑͗ͅ,̸͉̱̥̼̾̿͐̈͠.̸̧͙͑̊͊/̴̢͚̰͉̥͑̆́̀̚~̸̡͇̜̹͂̆̀̆̃_̶̼̗͊͒̀̕+̵̢̖͛̋̀͠{̴̲͍͙̈́͐}̸̧̧͉͉̩͂̆̃|̸̨̯̳̍̊̔̂͘:̸̨̣̫̲̍͜͝"̸̛̰̹̏́̈́≮̯͚̮̒̂̋̉≯̢̻̗͕̈͋̚͜͠?̴̧͔̌̔̊͐̅!̴͉͋̈́̇̉͌@̸̤̃#̴̹̍̓̄͝$̶̤̝̻̑̊̎̈́͑ͅ%̶̢̈́^̶̖̳͉̤͛̾͂&̷̣͙͛̇̀̄*̶̰̠̄̃̄͘͝ͅ(̵̧̼̯̺͂͂̋͒̒)̷̨̙͋̚`);
const cthulu3 = createMap(`0̶̡̧̘̟̳̤͐̾̈́̈́̈͌̂̑͘̕͠1̸̛͖̤͈͗̏̌̚2̵͖̠̳̹͚̻̂́̇͗̽̚3̶̧̨̢̩̯̈́̅̇͗͗̈́̎̈4̶̘͙̜̌̂̎̎̋̐͗͒͝͝5̸̢̛̮̰̳͙̝̠͍̪̈́͑̅̈́̓͑̓͝6̴̨̭͎̝̗̩̘̪̤̜̓̀̂͑̽ͅ7̸͍̣̲̱̅̎̒̑̎̈́̀͘8̷̛̲̪͉̗̆̔̏̈̇̀̓9̵͚͕̩̱͉̅q̵̨̩̹̟̥̖̹̋̋̂͗́̍̿͘͘͝ẁ̴̡͕̗͗̍̊̉̑̕͘é̴͚̱̞͙̜̓͊̐͒̈́r̷̡͔̱͓̲̦̖̯̬͚̓̓͊̊͆ţ̶̛̛̙̻̜́̃̅͆̂̊̕͝y̴̧̗̯̖̭̜̬͎̘͌͝͝u̷̧͆̽͌͆͝i̷̛̞̤̖̫͆̄̃̄̓̆͜ò̴̠̣͚̘̆̊͘p̷̡̭͉̉͆̍͆̽̒̓̀̏͘͜͝ä̵̙̪̱̳̟̬͓̬́͑̌̐̈͊̚͘͜͝s̴̻̄͐̌d̷̖̼͇̩̈́̄̆͂̀̍͜f̴͚̪̳̘̩͈̳̮̹͓͋̇̈͛͌́̀̓͘g̷͈̺̘̯̃̈̄̿̿̾̈́͘͘͘h̴̢̛̛̼̯̱͈̫̩̻̙͑̽́̋̎̋̊̚j̶̧̪̠̙̼̰̭̖͠k̶̡̦̯̠̩͓̹̫̭̋̽͝l̸͍̀̅̽͊͋̚z̸̡͕͔̖̲͖̰͈͇̕x̸̢͔̻͉̺̼̪͙͛̄́͛ͅc̶͎̀v̵̪̗͕̿b̶̨͈̫̦͇̰̼̞̦̆͆̐̓͗̕͝n̴̮̒͋͊͒̿̌͘m̴̙͍̔͐̑͌̕Q̵̨̝̥͇͖̬̞͕̮̼̂̃́̾̀͂̍̍̕͘͝W̶̤̯̘̮͕̽͗͂̂͜͝Ȩ̶̝͗͗̓́͋R̸̢̭͆̂͜T̸̡̗̪̻̯̣̀̉͛Y̵̧̛͇̝̲͈͍̏̏̅̈́̐ͅŲ̸̰̭͚̘̠͎͍̰͗̓͌͠Ĩ̴͖̜̺͓̟̗͖͎̥͙̓̌̈́̇̀͌̍̚͜O̷̱͉̺̪̩̳̫̎̎͜ͅP̸̙̬̝͕̱̯͔̘̎̽́̋͂̔̆̌A̵̗̙̖̼̬̙̮̻̯̝͝S̴̼̞͚̤̳͐̎̃D̷̝͈̱̬̍̊̓͒̊̏͜Ḟ̸̡̨̨̱͖̱͖̪̫G̴̛̲̮̙̖͙̙̒̓̀̇͆̑H̵̛̙̮͌̾̑̀̽̐́̌͘͠J̶̢̧̬̠͖̥́͜K̶̨̧̥̳̜̂̎̓̄̔̆̋͝L̷̘͉̜̪͛̅̍̄̓͒̆Z̴̧̫̣͓̞̟̆̚͝X̸̢͈͕͖͍̜̺͌͊̀̓͂̕C̵̛͕̳̏̈́͛͝V̸͙͓͖͓̦͇̯̗̝̳̇B̵͕̲͕̯̤͚̟̫̊̈́͊ͅͅN̵̘̋̂͆Ḿ̸̧̨̛̫̆͆̂\̷͙̗̗̞̅͋́̅̄͆̊ͅ\`̸̡͌̄̀̇̔̋̏̐̀͗͝-̶̻̦̝̲̯̳̗̈́̍̓̋̋̓̌̄̌̈́̚=̷̘͎̳̩̹̫͖̃̽̎̏͐̃̓͗͜͠[̶̖̻̃̆̌̀̈́̄̾̃̍͝]̷̲͇̋̃̿̄̕\̷̤̬̍̈́̿̽̓͛̓̈́͊͝\̷̨͔̥͓̱̹̼͊͒;̷̨̗̲̮̬̬̤̞̈́́̓̑̂̐̆͘̚'̵̞̻̯̙̇̊͌͌̇̒,̴̯̫̽̆̂̊̾͌͒̾̚.̶̗̺̟͈̮͐̕/̶̡̛̠̖̜̱̣̔͒͊̔͋̂̃͊͒̈~̶̡̰̦̥̘̱̮̺̜̟̼͐̇́̀͛̊̚̚͘͘̚_̴͚͋̆́͗̉+̸̻͖̙̓̽͆̕͜{̵̢͍͖̘͔̮̥̜̪̠̄}̶̨̟̫̬̬̲̯̣͒̑̐͐̔̂͒̈́͝͠|̵̜̪̑̉̄̿̚:̶̛̟̽̄̽̇̓̓͝"̴̻̯̣̜̱̆̀̈́̌̚̕<̴̢̧͔̖̮̤͈̟̱͒͑̔͌̀̈́̂̿͠͝≯̞̳̮̞̇̈́̉̄͆͛̃͊̀͘?̸̧̛̯͕̱̭̤̮̲̱̈́̊̔̔͂̈̏̾͒̚!̸̛̦̻̮͛͂̕@̷̥͔̠̗̤̦͋̋͛̐͆͜͜#̵̢͘$̸̡̨̨͓̱̼̞̠̠̪̟͋̆̂%̵̹̯̘͚͔̩̝̩̂̀́̓͝^̶̢̯̫̠͖͕̬̹̌̍͑̇̉͂̃̑́&̵̛͇̭̲̭̋̓̒̍͐̂̈*̸̘͇̟̼̲̩̎̈́̔̄̄̃̑(̶̬̯͉͂̈́̇͛̿̇)̸͓̿̃`);
const cthulu4 = createMap(`0̸̯͍̲͖̠̩̠̯̗͒̐̈̽̉͂̎̚͝ͅ1̵̧̮̘̘͖͈̿͌͒̉͌̍͘͠ͅ2̸̨̡̫̫̠̟̊͒̂̈̊̅͑̈͜3̷̲͇̳̂͐̕4̷͉͈͉̆̅͌̇̀̃̑͛5̴̩̝̙̖͍̅̅̃̀̿̎͊̈̓̀͘6̴̠̤̙͇̥͔̣͙̯̟̄̿̓̔̈́͂7̷̢̘̘̦̺͆̓̾8̴̧̘̆̾̋̄͂̓̐͝9̸̨̢̦̘͙́͑́̽̒q̶̧̧̢͖̳̯̭̆͗̋͋̋͋͗͑̈́͝w̷̢̮̗̮͎̍̊̍͆͗͛͊͑̑ḛ̵̞́͊̀̈́̾́̚͘r̴̹̼̗͊̒̋͑̓͊̈̽̔̀͂ț̶̡͈̺͖̳͚͑̀́͗̊͛͌̕ͅy̴̰̟̦̟̻̎̇͊͛̇̽̅̓̑u̶̜̙͑͋̔͗̽̃̋̈͗͌͝i̶̡̬̼̖̻̗͑̊͜ǫ̴̮̜̥͕̠̤̺͕̉̊̈͜͠ͅp̵̪̞̟̺̯̻͎̟̲̂͗͌̎̎̍̕͜ä̶̡̗͔͎̦̖̯͎̣̻̦̆ş̷̫̯͍̗̗̹̬͎̳́̀̉͊͌͜͝d̸̨̽f̴͚̘͚͓͇͕͔̬́̍̃̆̃́̇͠ĝ̸̣̝̈ḩ̴̬̰͖̭̞͖̮̙̳̜̐j̶̡̹̭͔͚̼̫͍͇̟̳̀̒͐̒͐̓͗͠k̵̨̛̛̜̭̜̘͕͚̹̬̣̈́̒͊̈́̋̔̋l̵̢̘͈͚̼̪͌̌̀̾́̀͗͂͛̉̌ͅͅz̶̡̼͖̘̩͕̰͙̣͎̋͂̓͒̓̀̏́͝ͅẍ̶͕̟̱̭͕̰̣̻́͑̈́͋͋̉̅c̵̘͖̭͙͕̟̱̪̺͍̀̇̈́͜v̵̜͙̪̼̍̇̒̏̌̏̆ͅb̷̫̭̦͊́̀͐̈́̄̽͒̉͘ṅ̸̤̾͆̋̓̊͂̃͐m̵̤̯͓̭̙̘̫̎̀̌̏̒̀͊͘Q̴͙̝̖͔̳̘̣̰͂͒W̸̨̯̮̱͎͔̝̉̈́̍̒̅̅͜͠ͅͅẺ̷̥̮̤͚̈́̆̊͌͛͑̓̚̕͜͝R̵̢̧̛̥͖̲̩͕̃̐̀̾̌̽̐͝T̸̟͒Y̷̡͓͉̜̞̻̜̔͛̓̅̑̾̚̕͜U̵̞̔͛͑̓̆͊I̶̡͕̱̹̹̿̏͝Ǫ̷̏͂̔̈̆͗͛̇̄̽P̵̛͔̙͖̜̜̱͗͐̈́̓͌̽̕̕̚ͅÃ̸̼͋Ŝ̴̗̪̳̌̓́̿͘̚͠D̶̢̧͓̜̙̝͍̺̖͈̤̅F̷̧̱̺̭̺̫̩̹̲͑̇͂̀̆̈́̚͝G̷̱͎̺̃̐͒̈́̃͋̋͌̇͗H̴̘̳̣̥̗̰̲͕̋̌̑͊̑͘͠J̴̡̦̪̰̰̦̾̓̋̕K̸̬̂̔͐̈́͐̃L̶͚̼͇͓̯̗͌̐͊͝Z̶͇͇͙̠̣͆̉̓̽͠X̵̟̲͠C̶͔͖̫͂̂͐̀̅͌̇̈́̚͜V̷̞̜͇͖͛̀B̴̛͕̩͈͕̮͙̤̓̏̀̍͗́̚͠N̷̩͇̯͆̅̿̈͝M̷̫̫̜̣̑̀̀̆̓̍͝ͅ\̴͙̭̳͗͐̾̎͌\`̵̧̈́̔͒͂͗͝-̸̳͚͔͖͕̊=̶̡̝̜͐̊̍̆̚ͅ[̸̤̠̟͕̭̠̽̀͑̇̕͠]̷̨̧̣̯͉̻̅̒\̸̙͔̎́͗̈́̋͝\̶̧̛̘̼̙̝̮̓̌̏̆̈̑͌̔;̴̜̞̅̂'̷̢̨̹̱̱̟̫̝̲̲̔̌̉ͅ,̵̱̍̀̇͂̚̚͝.̶͓̪̣͍̻͚̈́/̴̨̡̩͖͔̬̯͙̺̻̀̂̾̅̉̒̇̅̕~̶̢̰̑̂̾̈́̀̐̈́̊͝_̸͖͔̮͙̜͈̙̦̎̇̈́́̃͌̆+̸̡͖̜̯̼̥̭͊͌{̷̝̻͊ͅ}̷̩͇̰͓̼̝̜͌̋̈́̓͌̽̓̃͜͠|̷̖̠̖͉̺̠̈́̕̕:̸̖̟̗̦͈͉̳͓͕͇͌̓́̕ͅ"̴̢̛͙̞͈̙̫̱̓͊̍́͗̈́͂̉̍͜<̷̟̮̯͈̞̖̪̞͙̞̒̎̂͐̅̿̇̇͋̕ͅ>̵̫̘͓̞͇͖̤̒́̆̃̊̚͝?̵̢́̇̅̓͆͑̉̕͜!̸̭̞̫̂̑͒̈̈́̾@̵̨̢͓̭̼̬͎̗̟̳͚̎̿͗̏̏̉̾̀̿̉̚#̷͖͎̥̾̋͐̈́̈͘$̶͙͔̉͆͌͊̏͛̍̀̅̕͠%̶̨̮̞̩̖̣̦͙̓̊̄̕ͅ^̶̺̳͍̂͝&̵̙̠̣̲̺͙̪́̌̈́̈̀̅̄͆̚̕͝*̶̨̢͔̮͚̝̯̙̞͐͗(̵̢̖̯͔͇̮̹͓̪̖̌̈̋̾͐͜)̶̣͓̺̅̂̚̕`);
module.exports = {
  tiny,
  fullwidth,
  old_timey,
  fancy,
  smallcaps,
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
