(function(f){if(typeof exports==="object"&&typeof module!=="undefined"){module.exports=f()}else if(typeof define==="function"&&define.amd){define([],f)}else{var g;if(typeof window!=="undefined"){g=window}else if(typeof global!=="undefined"){g=global}else if(typeof self!=="undefined"){g=self}else{g=this}g.main = f()}})(function(){var define,module,exports;return (function(){function r(e,n,t){function o(i,f){if(!n[i]){if(!e[i]){var c="function"==typeof require&&require;if(!f&&c)return c(i,!0);if(u)return u(i,!0);var a=new Error("Cannot find module '"+i+"'");throw a.code="MODULE_NOT_FOUND",a}var p=n[i]={exports:{}};e[i][0].call(p.exports,function(r){var n=e[i][1][r];return o(n||r)},p,p.exports,r,e,n,t)}return n[i].exports}for(var u="function"==typeof require&&require,i=0;i<t.length;i++)o(t[i]);return o}return r})()({"C:\\root\\Programming\\Javascript\\slack-tools\\client\\main\\main.jsx":[function(require,module,exports){
function _extends() { _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

require('./main.less');

const React = require('react');

const {
  Title
} = require('vitreum/headtags');

const pckg = require('../../package.json');

const HEIGHT = 200,
      WIDTH = 200; //const test = require('./calibri.ttf');
//console.log(test)

function TextCanvas({
  text,
  size,
  lineheight,
  setDataURL,
  setSize
}) {
  //const Font = `bold ${size}px Ubuntu, 'Roboto Condensed',Roboto,Verdana,Arial, sans serif`;
  //const Font = `bold ${size}px Roboto, Comic sans`;
  //const Font = `bold ${size}px Calibri`;
  //const Font = `bold ${size}px Open Sans`;
  //const Font = `800 ${size}px Montserrat`;
  const Font = size => `bold ${size}px calibri2`;

  const getMaxSize = (lines, size = 70) => {
    ctx.font = Font(size);
    const biggest = Math.max(...lines.map(text => ctx.measureText(text).width));
    if (biggest >= WIDTH - 5) return size;
    return getMaxSize(lines, size + 2);
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
    ctx.font = Font(size);
    ctx.fillStyle = '#000';
    ctx.textBaseline = 'middle';
    const lines = text.split('\n'); //draw large shadow

    lines.map((line, idx) => {
      const width = (WIDTH - ctx.measureText(line).width) / 2;
      const height = HEIGHT / 2 - (lines.length - 1) * lineheight / 2 + idx * lineheight;
      ctx.shadowColor = "rgba(255,255,255)";
      ctx.shadowBlur = 80;
      ctx.fillText(line, width, height);
    }); //draw smol shadow
    // lines.map((line, idx)=>{
    // 	const width = (WIDTH - ctx.measureText(line).width)/2;
    // 	const height = HEIGHT/2 - ((lines.length-1)*lineheight/2) + idx*lineheight;
    // 	ctx.shadowColor = "rgba(255,255,255)"
    // 	ctx.shadowBlur = 20;
    // 	ctx.fillText(line,width, height);
    // });

    lines.map((line, idx) => {
      const width = (WIDTH - ctx.measureText(line).width) / 2;
      const height = HEIGHT / 2 - (lines.length - 1) * lineheight / 2 + idx * lineheight;
      ctx.shadowColor = "rgba(255,255,255)";
      ctx.shadowBlur = 10;
      ctx.shadowOffsetX = 3;
      ctx.shadowOffsetY = 3;
      ctx.fillText(line, width, height);
    });
    lines.map((line, idx) => {
      const width = (WIDTH - ctx.measureText(line).width) / 2;
      const height = HEIGHT / 2 - (lines.length - 1) * lineheight / 2 + idx * lineheight;
      ctx.shadowColor = "rgba(255,255,255)";
      ctx.shadowBlur = 10;
      ctx.shadowOffsetX = -3;
      ctx.shadowOffsetY = 3;
      ctx.fillText(line, width, height);
    });
    lines.map((line, idx) => {
      const width = (WIDTH - ctx.measureText(line).width) / 2;
      const height = HEIGHT / 2 - (lines.length - 1) * lineheight / 2 + idx * lineheight;
      ctx.shadowColor = "rgba(255,255,255)";
      ctx.shadowBlur = 10;
      ctx.shadowOffsetX = 3;
      ctx.shadowOffsetY = -3;
      ctx.fillText(line, width, height);
    });
    lines.map((line, idx) => {
      const width = (WIDTH - ctx.measureText(line).width) / 2;
      const height = HEIGHT / 2 - (lines.length - 1) * lineheight / 2 + idx * lineheight;
      ctx.shadowColor = "rgba(255,255,255)";
      ctx.shadowBlur = 10;
      ctx.shadowOffsetX = -3;
      ctx.shadowOffsetY = -3;
      ctx.fillText(line, width, height);
    }); //draw text

    lines.map((line, idx) => {
      const width = (WIDTH - ctx.measureText(line).width) / 2;
      const height = HEIGHT / 2 - (lines.length - 1) * lineheight / 2 + idx * lineheight;
      ctx.shadowBlur = 0;
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
  const [size, setSize] = React.useState(110);
  const [lineheight, setLineheight] = React.useState(60);
  const [dataURL, setDataURL] = React.useState('');
  return React.createElement("div", {
    className: "EmojiMaker"
  }, React.createElement(Favicon, {
    href: dataURL
  }), React.createElement("h2", null, "Slack Text Emoji Maker"), React.createElement("div", {
    className: "controls"
  }, React.createElement("div", null, React.createElement("textarea", {
    value: text,
    onChange: evt => setText(evt.target.value),
    rows: 3
  })), React.createElement("div", null, React.createElement("label", null, "Size"), React.createElement("input", {
    type: "range",
    min: 50,
    max: 200,
    value: size,
    onChange: evt => setSize(evt.target.value)
  }), size), React.createElement("div", null, React.createElement("label", null, "Spacing"), React.createElement("input", {
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
  }), " Also the tab icon is updated."), React.createElement("div", {
    className: "example dark"
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
  const [text, setText] = React.useState('oh Hello');
  return React.createElement("div", {
    className: "TextTransform"
  }, React.createElement("h2", null, "Text Transform"), React.createElement("textarea", {
    className: "textEntry",
    onChange: evt => setText(evt.target.value),
    value: text,
    autoFocus: true
  }), React.createElement("div", {
    className: "transforms"
  }, Object.entries(transforms).map(([name, func], idx) => {
    const res = func(text);
    return React.createElement("div", {
      key: idx
    }, React.createElement("button", {
      onClick: () => navigator.clipboard.writeText(res)
    }, "copy"), React.createElement("input", {
      readOnly: true,
      value: res
    }), React.createElement("span", null, name));
  })));
} //////////////////


function Main(_ref) {
  let props = _extends({}, _ref);

  return React.createElement("div", _extends({
    className: `Main`
  }, props), React.createElement(Title, null, "Slack Tools v", pckg.version), React.createElement("h1", null, "Slack Tools v", pckg.version), React.createElement("hr", null), React.createElement("div", {
    className: "group"
  }, React.createElement(EmojiMaker, null), React.createElement(TextTransform, null)));
}

;
module.exports = Main;
},{"../../package.json":3,"./main.less":1,"./text.transforms.js":2,"react":undefined,"vitreum/headtags":undefined}],1:[function(require,module,exports){

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

const pluck = arr => arr[Math.floor(Math.random() * arr.length)];

const tiny = createMap(`⁰¹²³⁴⁵⁶⁷⁸⁹ᵠʷᵉʳᵗʸᵘᶦᵒᵖᵃˢᵈᶠᵍʰʲᵏˡᶻˣᶜᵛᵇⁿᵐᵠᵂᴱᴿᵀʸᵁᴵᴼᴾᴬˢᴰᶠᴳᴴᴶᴷᴸᶻˣᶜⱽᴮᴺᴹ\`⁻⁼[]\\;',./~_⁺{}|:"<>ˀᵎ@#$%^&*⁽⁾`);
const fullwidth = createMap(`０１２３４５６７８９ｑｗｅｒｔｙｕｉｏｐａｓｄｆｇｈｊｋｌｚｘｃｖｂｎｍＱＷＥＲＴＹＵＩＯＰＡＳＤＦＧＨＪＫＬＺＸＣＶＢＮＭ\`－＝[]＼；＇,.／~＿ ｛｝|："＜＞？！＠＃＄％＾＆＊（）`);
const old_timey = createMap(`0123456789𝖖𝖜𝖊𝖗𝖙𝖞𝖚𝖎𝖔𝖕𝖆𝖘𝖉𝖋𝖌𝖍𝖏𝖐𝖑𝖟𝖝𝖈𝖛𝖇𝖓𝖒𝕼𝖂𝕰𝕽𝕿𝖄𝖀𝕴𝕺𝕻𝕬𝕾𝕯𝕱𝕲𝕳𝕵𝕶𝕷𝖅𝖃𝕮𝖁𝕭𝕹𝕸\`-=[]\\;',./~_+{}|:"<>?!@#$%^&*()`);
const italics = createMap(`0123456789𝘲𝘸𝘦𝘳𝘵𝘺𝘶𝘪𝘰𝘱𝘢𝘴𝘥𝘧𝘨𝘩𝘫𝘬𝘭𝘻𝘹𝘤𝘷𝘣𝘯𝘮𝘘𝘞𝘌𝘙𝘛𝘠𝘜𝘐𝘖𝘗𝘈𝘚𝘋𝘍𝘎𝘏𝘑𝘒𝘓𝘡𝘟𝘊𝘝𝘉𝘕𝘔\`-=[]\\;',./~_+{}|:"<>?!@#$%^&*()`);
const fancy = createMap(`0123456789𝓺𝔀𝓮𝓻𝓽𝔂𝓾𝓲𝓸𝓹𝓪𝓼𝓭𝓯𝓰𝓱𝓳𝓴𝓵𝔃𝔁𝓬𝓿𝓫𝓷𝓶𝓠𝓦𝓔𝓡𝓣𝓨𝓤𝓘𝓞𝓟𝓐𝓢𝓓𝓕𝓖𝓗𝓙𝓚𝓛𝓩𝓧𝓒𝓥𝓑𝓝𝓜\`-=[]\\;',./~_+{}|:"<>?!@#$%^&*()`);
const smallcaps = createMap(`0123456789ǫᴡᴇʀᴛʏᴜɪᴏᴘᴀsᴅғɢʜᴊᴋʟᴢxᴄᴠʙɴᴍQWERTYUIOPASDFGHJKLZXCVBNM\`-=[]\\;',./~_+{}|:"<>?!@#$%^&*()`);
const genji = createMap(`0123456789Ɋ山乇尺ㄒㄚㄩ丨ㄖ卩卂丂ᗪ千Ꮆ卄ﾌҜㄥ乙乂匚ᐯ乃几爪Ɋ山乇尺ㄒㄚㄩ丨ㄖ卩卂丂ᗪ千Ꮆ卄ﾌҜㄥ乙乂匚ᐯ乃几爪\`-=[]\\;',./~_+{}|:"<>?!@#$%^&*()`);
const greek = createMap(`0123456789QЩΣЯƬYЦIӨPΛƧDFGΉJKᄂZXᄃVBПMQЩΣЯƬYЦIӨPΛƧDFGΉJKᄂZXᄃVBПM\`-=[]\\;',./~_+{}|:"<>?!@#$%^&*()`);
const cthulu1 = createMap(`0̶1̶2̸3̶4̴5̷6̷7̸8̵9̵q̷w̵e̶r̴t̶y̸u̴i̶o̸p̵a̵s̷d̶f̵g̶h̸j̵k̵l̸z̵x̵c̵v̷b̴n̸m̶Q̵W̷E̴R̴T̵Y̶U̵I̵O̸P̵A̸S̶D̷F̶G̸H̵J̶K̵L̶Z̴X̶C̷V̸B̷N̸M̴\̶\`̷-̴≠[̸]̴\̵\̵;̶'̸,̵.̵/̵~̷_̸+̷{̵}̴|̷:̴"̵≮>̵?̵!̶@̷#̴$̷%̸^̵&̵*̵(̴)̸`);
const cthulu2 = createMap(`0̴͓̣̪̊̆͑1̸͍̱̊́2̶͈̰̲͉̅̅3̴̡̢̥̹̳́̏4̷̛͉̞̻̾̉͆̚5̵̪̈́͆̕6̴̡̼̮̲̠̾̔̑7̴̧̰͎͈̻̈̈́͋͘͝8̴̨̦̝̱̽̈̏9̶͔̖͎̺̦͊̓q̵̧̜͚̫̈́̎̆̅͠ẃ̷͚̞͖̝͒́ē̴̳̳̙̇̽̆r̷͉͐̕͝t̴̞̥̗̎͊̋ͅy̷̛͚͈̝̫̚͜͠ǘ̶̘͕̹̫̠̀ĩ̸͙̏̍͠o̴͉̞͎̙͔͌̊p̸̩̝̍̈́͊͠à̸͖͖͜s̵̛͚̤͓̫̟̿̀͘d̵̢̓̈́̈͘f̵̹̫̱̽̅̾͜͝ḡ̸̫̥̑͒̇͛ȟ̷̙̜͔̙̇͐̕͝j̴̢̛̙̳̜͋̈́̋͝k̵̨̗̦̦̯̽͘l̸̡̙̭͈͈͒̍̐̚z̷̠̹̗̀͜x̷̹̣̺͖̎̋c̴͙̲̽̈̉̈v̶̙͙̔̊̅b̷̤̖͌͆̽͜n̷̮͈̩̻̱̈́́͘m̸̢̀̑̑͘Q̸̛̯͑̀W̴͈͆E̴̛̹͙͐̋͝͝R̶̯͙͔̝͝T̵̨͚̮͕͗̑Y̷̤̓̄̇̚͝Ū̷̳̗͌̈́̉̀Į̸̹̪̼͗̅͊̾͛Ơ̷̤̹̦̹͛Ṕ̵͔̰̱͑̾̎̄A̴̧͓̺̓̈́S̷͈͓̖͑̑ͅD̵͓̠̰͚͝F̵͍͑̀̚G̵̢̹͓̺̩͂̉Ḣ̶̘̪̝̫͙̋̿J̷̤̗̹̀́K̸̨̥̞̤̗͑L̸̝̥̍̕͠Z̵̡̿͝X̴̤̙̙̯̂̽̑͝ͅC̶͈̖̃́̒V̷͓̹͝B̷̢̠̰̲̂́̊̈́̈́Ņ̶̠͔̩͝M̷̨̺͂̉͛̊͌\̸̨͗\`̴̝̣͉̊-̷̲̭͍̥̉̈́=̶̺͛̓[̷̡̩̖͓̳̌̑̐̕]̸͍̦͒̈́\̵̗͊̈́̿̑\̴̧͇͉͛̍̆;̴̧͙̜̼̖̉̓'̵̧̛̛̤̭̬̑͗ͅ,̸͉̱̥̼̾̿͐̈͠.̸̧͙͑̊͊/̴̢͚̰͉̥͑̆́̀̚~̸̡͇̜̹͂̆̀̆̃_̶̼̗͊͒̀̕+̵̢̖͛̋̀͠{̴̲͍͙̈́͐}̸̧̧͉͉̩͂̆̃|̸̨̯̳̍̊̔̂͘:̸̨̣̫̲̍͜͝"̸̛̰̹̏́̈́≮̯͚̮̒̂̋̉≯̢̻̗͕̈͋̚͜͠?̴̧͔̌̔̊͐̅!̴͉͋̈́̇̉͌@̸̤̃#̴̹̍̓̄͝$̶̤̝̻̑̊̎̈́͑ͅ%̶̢̈́^̶̖̳͉̤͛̾͂&̷̣͙͛̇̀̄*̶̰̠̄̃̄͘͝ͅ(̵̧̼̯̺͂͂̋͒̒)̷̨̙͋̚`);
const cthulu3 = createMap(`0̶̡̧̘̟̳̤͐̾̈́̈́̈͌̂̑͘̕͠1̸̛͖̤͈͗̏̌̚2̵͖̠̳̹͚̻̂́̇͗̽̚3̶̧̨̢̩̯̈́̅̇͗͗̈́̎̈4̶̘͙̜̌̂̎̎̋̐͗͒͝͝5̸̢̛̮̰̳͙̝̠͍̪̈́͑̅̈́̓͑̓͝6̴̨̭͎̝̗̩̘̪̤̜̓̀̂͑̽ͅ7̸͍̣̲̱̅̎̒̑̎̈́̀͘8̷̛̲̪͉̗̆̔̏̈̇̀̓9̵͚͕̩̱͉̅q̵̨̩̹̟̥̖̹̋̋̂͗́̍̿͘͘͝ẁ̴̡͕̗͗̍̊̉̑̕͘é̴͚̱̞͙̜̓͊̐͒̈́r̷̡͔̱͓̲̦̖̯̬͚̓̓͊̊͆ţ̶̛̛̙̻̜́̃̅͆̂̊̕͝y̴̧̗̯̖̭̜̬͎̘͌͝͝u̷̧͆̽͌͆͝i̷̛̞̤̖̫͆̄̃̄̓̆͜ò̴̠̣͚̘̆̊͘p̷̡̭͉̉͆̍͆̽̒̓̀̏͘͜͝ä̵̙̪̱̳̟̬͓̬́͑̌̐̈͊̚͘͜͝s̴̻̄͐̌d̷̖̼͇̩̈́̄̆͂̀̍͜f̴͚̪̳̘̩͈̳̮̹͓͋̇̈͛͌́̀̓͘g̷͈̺̘̯̃̈̄̿̿̾̈́͘͘͘h̴̢̛̛̼̯̱͈̫̩̻̙͑̽́̋̎̋̊̚j̶̧̪̠̙̼̰̭̖͠k̶̡̦̯̠̩͓̹̫̭̋̽͝l̸͍̀̅̽͊͋̚z̸̡͕͔̖̲͖̰͈͇̕x̸̢͔̻͉̺̼̪͙͛̄́͛ͅc̶͎̀v̵̪̗͕̿b̶̨͈̫̦͇̰̼̞̦̆͆̐̓͗̕͝n̴̮̒͋͊͒̿̌͘m̴̙͍̔͐̑͌̕Q̵̨̝̥͇͖̬̞͕̮̼̂̃́̾̀͂̍̍̕͘͝W̶̤̯̘̮͕̽͗͂̂͜͝Ȩ̶̝͗͗̓́͋R̸̢̭͆̂͜T̸̡̗̪̻̯̣̀̉͛Y̵̧̛͇̝̲͈͍̏̏̅̈́̐ͅŲ̸̰̭͚̘̠͎͍̰͗̓͌͠Ĩ̴͖̜̺͓̟̗͖͎̥͙̓̌̈́̇̀͌̍̚͜O̷̱͉̺̪̩̳̫̎̎͜ͅP̸̙̬̝͕̱̯͔̘̎̽́̋͂̔̆̌A̵̗̙̖̼̬̙̮̻̯̝͝S̴̼̞͚̤̳͐̎̃D̷̝͈̱̬̍̊̓͒̊̏͜Ḟ̸̡̨̨̱͖̱͖̪̫G̴̛̲̮̙̖͙̙̒̓̀̇͆̑H̵̛̙̮͌̾̑̀̽̐́̌͘͠J̶̢̧̬̠͖̥́͜K̶̨̧̥̳̜̂̎̓̄̔̆̋͝L̷̘͉̜̪͛̅̍̄̓͒̆Z̴̧̫̣͓̞̟̆̚͝X̸̢͈͕͖͍̜̺͌͊̀̓͂̕C̵̛͕̳̏̈́͛͝V̸͙͓͖͓̦͇̯̗̝̳̇B̵͕̲͕̯̤͚̟̫̊̈́͊ͅͅN̵̘̋̂͆Ḿ̸̧̨̛̫̆͆̂\̷͙̗̗̞̅͋́̅̄͆̊ͅ\`̸̡͌̄̀̇̔̋̏̐̀͗͝-̶̻̦̝̲̯̳̗̈́̍̓̋̋̓̌̄̌̈́̚=̷̘͎̳̩̹̫͖̃̽̎̏͐̃̓͗͜͠[̶̖̻̃̆̌̀̈́̄̾̃̍͝]̷̲͇̋̃̿̄̕\̷̤̬̍̈́̿̽̓͛̓̈́͊͝\̷̨͔̥͓̱̹̼͊͒;̷̨̗̲̮̬̬̤̞̈́́̓̑̂̐̆͘̚'̵̞̻̯̙̇̊͌͌̇̒,̴̯̫̽̆̂̊̾͌͒̾̚.̶̗̺̟͈̮͐̕/̶̡̛̠̖̜̱̣̔͒͊̔͋̂̃͊͒̈~̶̡̰̦̥̘̱̮̺̜̟̼͐̇́̀͛̊̚̚͘͘̚_̴͚͋̆́͗̉+̸̻͖̙̓̽͆̕͜{̵̢͍͖̘͔̮̥̜̪̠̄}̶̨̟̫̬̬̲̯̣͒̑̐͐̔̂͒̈́͝͠|̵̜̪̑̉̄̿̚:̶̛̟̽̄̽̇̓̓͝"̴̻̯̣̜̱̆̀̈́̌̚̕<̴̢̧͔̖̮̤͈̟̱͒͑̔͌̀̈́̂̿͠͝≯̞̳̮̞̇̈́̉̄͆͛̃͊̀͘?̸̧̛̯͕̱̭̤̮̲̱̈́̊̔̔͂̈̏̾͒̚!̸̛̦̻̮͛͂̕@̷̥͔̠̗̤̦͋̋͛̐͆͜͜#̵̢͘$̸̡̨̨͓̱̼̞̠̠̪̟͋̆̂%̵̹̯̘͚͔̩̝̩̂̀́̓͝^̶̢̯̫̠͖͕̬̹̌̍͑̇̉͂̃̑́&̵̛͇̭̲̭̋̓̒̍͐̂̈*̸̘͇̟̼̲̩̎̈́̔̄̄̃̑(̶̬̯͉͂̈́̇͛̿̇)̸͓̿̃`);
const cthulu4 = createMap(`0̸̯͍̲͖̠̩̠̯̗͒̐̈̽̉͂̎̚͝ͅ1̵̧̮̘̘͖͈̿͌͒̉͌̍͘͠ͅ2̸̨̡̫̫̠̟̊͒̂̈̊̅͑̈͜3̷̲͇̳̂͐̕4̷͉͈͉̆̅͌̇̀̃̑͛5̴̩̝̙̖͍̅̅̃̀̿̎͊̈̓̀͘6̴̠̤̙͇̥͔̣͙̯̟̄̿̓̔̈́͂7̷̢̘̘̦̺͆̓̾8̴̧̘̆̾̋̄͂̓̐͝9̸̨̢̦̘͙́͑́̽̒q̶̧̧̢͖̳̯̭̆͗̋͋̋͋͗͑̈́͝w̷̢̮̗̮͎̍̊̍͆͗͛͊͑̑ḛ̵̞́͊̀̈́̾́̚͘r̴̹̼̗͊̒̋͑̓͊̈̽̔̀͂ț̶̡͈̺͖̳͚͑̀́͗̊͛͌̕ͅy̴̰̟̦̟̻̎̇͊͛̇̽̅̓̑u̶̜̙͑͋̔͗̽̃̋̈͗͌͝i̶̡̬̼̖̻̗͑̊͜ǫ̴̮̜̥͕̠̤̺͕̉̊̈͜͠ͅp̵̪̞̟̺̯̻͎̟̲̂͗͌̎̎̍̕͜ä̶̡̗͔͎̦̖̯͎̣̻̦̆ş̷̫̯͍̗̗̹̬͎̳́̀̉͊͌͜͝d̸̨̽f̴͚̘͚͓͇͕͔̬́̍̃̆̃́̇͠ĝ̸̣̝̈ḩ̴̬̰͖̭̞͖̮̙̳̜̐j̶̡̹̭͔͚̼̫͍͇̟̳̀̒͐̒͐̓͗͠k̵̨̛̛̜̭̜̘͕͚̹̬̣̈́̒͊̈́̋̔̋l̵̢̘͈͚̼̪͌̌̀̾́̀͗͂͛̉̌ͅͅz̶̡̼͖̘̩͕̰͙̣͎̋͂̓͒̓̀̏́͝ͅẍ̶͕̟̱̭͕̰̣̻́͑̈́͋͋̉̅c̵̘͖̭͙͕̟̱̪̺͍̀̇̈́͜v̵̜͙̪̼̍̇̒̏̌̏̆ͅb̷̫̭̦͊́̀͐̈́̄̽͒̉͘ṅ̸̤̾͆̋̓̊͂̃͐m̵̤̯͓̭̙̘̫̎̀̌̏̒̀͊͘Q̴͙̝̖͔̳̘̣̰͂͒W̸̨̯̮̱͎͔̝̉̈́̍̒̅̅͜͠ͅͅẺ̷̥̮̤͚̈́̆̊͌͛͑̓̚̕͜͝R̵̢̧̛̥͖̲̩͕̃̐̀̾̌̽̐͝T̸̟͒Y̷̡͓͉̜̞̻̜̔͛̓̅̑̾̚̕͜U̵̞̔͛͑̓̆͊I̶̡͕̱̹̹̿̏͝Ǫ̷̏͂̔̈̆͗͛̇̄̽P̵̛͔̙͖̜̜̱͗͐̈́̓͌̽̕̕̚ͅÃ̸̼͋Ŝ̴̗̪̳̌̓́̿͘̚͠D̶̢̧͓̜̙̝͍̺̖͈̤̅F̷̧̱̺̭̺̫̩̹̲͑̇͂̀̆̈́̚͝G̷̱͎̺̃̐͒̈́̃͋̋͌̇͗H̴̘̳̣̥̗̰̲͕̋̌̑͊̑͘͠J̴̡̦̪̰̰̦̾̓̋̕K̸̬̂̔͐̈́͐̃L̶͚̼͇͓̯̗͌̐͊͝Z̶͇͇͙̠̣͆̉̓̽͠X̵̟̲͠C̶͔͖̫͂̂͐̀̅͌̇̈́̚͜V̷̞̜͇͖͛̀B̴̛͕̩͈͕̮͙̤̓̏̀̍͗́̚͠N̷̩͇̯͆̅̿̈͝M̷̫̫̜̣̑̀̀̆̓̍͝ͅ\̴͙̭̳͗͐̾̎͌\`̵̧̈́̔͒͂͗͝-̸̳͚͔͖͕̊=̶̡̝̜͐̊̍̆̚ͅ[̸̤̠̟͕̭̠̽̀͑̇̕͠]̷̨̧̣̯͉̻̅̒\̸̙͔̎́͗̈́̋͝\̶̧̛̘̼̙̝̮̓̌̏̆̈̑͌̔;̴̜̞̅̂'̷̢̨̹̱̱̟̫̝̲̲̔̌̉ͅ,̵̱̍̀̇͂̚̚͝.̶͓̪̣͍̻͚̈́/̴̨̡̩͖͔̬̯͙̺̻̀̂̾̅̉̒̇̅̕~̶̢̰̑̂̾̈́̀̐̈́̊͝_̸͖͔̮͙̜͈̙̦̎̇̈́́̃͌̆+̸̡͖̜̯̼̥̭͊͌{̷̝̻͊ͅ}̷̩͇̰͓̼̝̜͌̋̈́̓͌̽̓̃͜͠|̷̖̠̖͉̺̠̈́̕̕:̸̖̟̗̦͈͉̳͓͕͇͌̓́̕ͅ"̴̢̛͙̞͈̙̫̱̓͊̍́͗̈́͂̉̍͜<̷̟̮̯͈̞̖̪̞͙̞̒̎̂͐̅̿̇̇͋̕ͅ>̵̫̘͓̞͇͖̤̒́̆̃̊̚͝?̵̢́̇̅̓͆͑̉̕͜!̸̭̞̫̂̑͒̈̈́̾@̵̨̢͓̭̼̬͎̗̟̳͚̎̿͗̏̏̉̾̀̿̉̚#̷͖͎̥̾̋͐̈́̈͘$̶͙͔̉͆͌͊̏͛̍̀̅̕͠%̶̨̮̞̩̖̣̦͙̓̊̄̕ͅ^̶̺̳͍̂͝&̵̙̠̣̲̺͙̪́̌̈́̈̀̅̄͆̚̕͝*̶̨̢͔̮͚̝̯̙̞͐͗(̵̢̖̯͔͇̮̹͓̪̖̌̈̋̾͐͜)̶̣͓̺̅̂̚̕`);
const Ligatures = {
  oe: 'œ',
  hu: 'ƕ',
  Hu: 'Ƕ',
  ue: 'ᵫ',
  st: 'ﬆ',
  ts: 'ʦ',
  aa: 'ꜳ',
  ao: 'ꜵ',
  au: 'ꜷ',
  av: 'ꜹ',
  oo: 'ꝏ',
  vy: 'ꝡ',
  et: '🙰',
  ay: 'ꜽ',
  ls: 'ʪ',
  ae: 'æ',
  Ae: 'Æ'
};
const Accents = {
  A: ['A', 'À', 'Á', 'Â', 'Ã', 'Ä'],
  a: ['a', 'à', 'á', 'â', 'ã', 'ä'],
  E: ['E', 'È', 'É', 'Ê', 'Ë'],
  e: ['e', 'è', 'é', 'ê', 'ë'],
  i: ['i', 'ì', 'í', 'î', 'ï'],
  I: ['I', 'Ì', 'Í', 'Î', 'Ï'],
  O: ['O', 'Ò', 'Ó', 'Ô', 'Õ', 'Ö'],
  o: ['o', 'ò', 'ó', 'ô', 'õ', 'ö'],
  U: ['U', 'Ù', 'Ú', 'Û', 'Ü'],
  u: ['u', 'ù', 'ú', 'û', 'ü']
};
module.exports = {
  tiny,
  fullwidth,
  old_timey,
  fancy,
  smallcaps,
  clapback: text => `👏 ${text.split(' ').join(' 👏 ')} 👏`,
  goofy: text => text.toLowerCase().split('').map((char, idx) => idx % 2 == 0 ? char : char.toUpperCase()).join(''),
  song: text => `🎵${italics(text)}🎵`,
  kellen_spæk: text => {
    let res = [];
    res = text.split('').reduce((acc, letter) => {
      const lastTwoLetters = acc.slice(-1) + letter;

      if (Ligatures[lastTwoLetters]) {
        acc.pop();
        letter = Ligatures[lastTwoLetters];
      }

      return acc.concat(letter);
    }, []);
    res = res.reduce((acc, letter) => {
      if (Accents[letter]) letter = pluck(Accents[letter]);
      return acc.concat(letter);
    }, []);
    return res.join('');
  },
  genji,
  greek
};
},{"runes":undefined}],3:[function(require,module,exports){
module.exports=module.exports={
  "name": "slack-tools",
  "version": "1.1.0",
  "description": "git@github.com:stolksdorf/slack-tools.git",
  "main": "app.js",
  "scripts": {
    "test": "echo \"Error: no test specified\" && exit 1",
    "build": "vitreum --static",
    "dev": "vitreum --dev --static",
    "postinstall": "npm run build",
    "start": "node app.js"
  },
  "repository": {
    "type": "git",
    "url": "git+https://github.com/stolksdorf/slack-tools.git"
  },
  "keywords": [
    "slack",
    "emoji"
  ],
  "author": "stolksdorf",
  "license": "MIT",
  "bugs": {
    "url": "https://github.com/stolksdorf/slack-tools/issues"
  },
  "homepage": "https://github.com/stolksdorf/slack-tools#readme",
  "vitreum": {
    "targets": [
      "client/main/main.jsx"
    ],
    "template": "client/html.template.js",
    "rootPath": "/slack-tools",
    "paths": {
      "build": "./docs"
    }
  },
  "babel": {
    "presets": [
      "@babel/preset-react"
    ],
    "plugins": [
      "@babel/plugin-proposal-object-rest-spread"
    ]
  },
  "dependencies": {
    "@babel/core": "^7.4.3",
    "@babel/plugin-proposal-object-rest-spread": "^7.4.3",
    "@babel/preset-react": "^7.0.0",
    "react": "^16.8.6",
    "react-dom": "^16.8.6",
    "runes": "^0.4.3",
    "vitreum": "^5.6.2"
  }
}

},{}]},{},[])("C:\\root\\Programming\\Javascript\\slack-tools\\client\\main\\main.jsx")
});

//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm5vZGVfbW9kdWxlcy9icm93c2VyLXBhY2svX3ByZWx1ZGUuanMiLCJjbGllbnQvbWFpbi9tYWluLmpzeCIsImNsaWVudC9tYWluL21haW4ubGVzcyIsImNsaWVudC9tYWluL3RleHQudHJhbnNmb3Jtcy5qcyIsInBhY2thZ2UuanNvbiJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQTtBQ0FBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDL05BOztBQ0FBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDeEZBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBIiwiZmlsZSI6ImdlbmVyYXRlZC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzQ29udGVudCI6WyIoZnVuY3Rpb24oKXtmdW5jdGlvbiByKGUsbix0KXtmdW5jdGlvbiBvKGksZil7aWYoIW5baV0pe2lmKCFlW2ldKXt2YXIgYz1cImZ1bmN0aW9uXCI9PXR5cGVvZiByZXF1aXJlJiZyZXF1aXJlO2lmKCFmJiZjKXJldHVybiBjKGksITApO2lmKHUpcmV0dXJuIHUoaSwhMCk7dmFyIGE9bmV3IEVycm9yKFwiQ2Fubm90IGZpbmQgbW9kdWxlICdcIitpK1wiJ1wiKTt0aHJvdyBhLmNvZGU9XCJNT0RVTEVfTk9UX0ZPVU5EXCIsYX12YXIgcD1uW2ldPXtleHBvcnRzOnt9fTtlW2ldWzBdLmNhbGwocC5leHBvcnRzLGZ1bmN0aW9uKHIpe3ZhciBuPWVbaV1bMV1bcl07cmV0dXJuIG8obnx8cil9LHAscC5leHBvcnRzLHIsZSxuLHQpfXJldHVybiBuW2ldLmV4cG9ydHN9Zm9yKHZhciB1PVwiZnVuY3Rpb25cIj09dHlwZW9mIHJlcXVpcmUmJnJlcXVpcmUsaT0wO2k8dC5sZW5ndGg7aSsrKW8odFtpXSk7cmV0dXJuIG99cmV0dXJuIHJ9KSgpIiwiZnVuY3Rpb24gX2V4dGVuZHMoKSB7IF9leHRlbmRzID0gT2JqZWN0LmFzc2lnbiB8fCBmdW5jdGlvbiAodGFyZ2V0KSB7IGZvciAodmFyIGkgPSAxOyBpIDwgYXJndW1lbnRzLmxlbmd0aDsgaSsrKSB7IHZhciBzb3VyY2UgPSBhcmd1bWVudHNbaV07IGZvciAodmFyIGtleSBpbiBzb3VyY2UpIHsgaWYgKE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbChzb3VyY2UsIGtleSkpIHsgdGFyZ2V0W2tleV0gPSBzb3VyY2Vba2V5XTsgfSB9IH0gcmV0dXJuIHRhcmdldDsgfTsgcmV0dXJuIF9leHRlbmRzLmFwcGx5KHRoaXMsIGFyZ3VtZW50cyk7IH1cblxucmVxdWlyZSgnLi9tYWluLmxlc3MnKTtcblxuY29uc3QgUmVhY3QgPSByZXF1aXJlKCdyZWFjdCcpO1xuXG5jb25zdCB7XG4gIFRpdGxlXG59ID0gcmVxdWlyZSgndml0cmV1bS9oZWFkdGFncycpO1xuXG5jb25zdCBwY2tnID0gcmVxdWlyZSgnLi4vLi4vcGFja2FnZS5qc29uJyk7XG5cbmNvbnN0IEhFSUdIVCA9IDIwMCxcbiAgICAgIFdJRFRIID0gMjAwOyAvL2NvbnN0IHRlc3QgPSByZXF1aXJlKCcuL2NhbGlicmkudHRmJyk7XG4vL2NvbnNvbGUubG9nKHRlc3QpXG5cbmZ1bmN0aW9uIFRleHRDYW52YXMoe1xuICB0ZXh0LFxuICBzaXplLFxuICBsaW5laGVpZ2h0LFxuICBzZXREYXRhVVJMLFxuICBzZXRTaXplXG59KSB7XG4gIC8vY29uc3QgRm9udCA9IGBib2xkICR7c2l6ZX1weCBVYnVudHUsICdSb2JvdG8gQ29uZGVuc2VkJyxSb2JvdG8sVmVyZGFuYSxBcmlhbCwgc2FucyBzZXJpZmA7XG4gIC8vY29uc3QgRm9udCA9IGBib2xkICR7c2l6ZX1weCBSb2JvdG8sIENvbWljIHNhbnNgO1xuICAvL2NvbnN0IEZvbnQgPSBgYm9sZCAke3NpemV9cHggQ2FsaWJyaWA7XG4gIC8vY29uc3QgRm9udCA9IGBib2xkICR7c2l6ZX1weCBPcGVuIFNhbnNgO1xuICAvL2NvbnN0IEZvbnQgPSBgODAwICR7c2l6ZX1weCBNb250c2VycmF0YDtcbiAgY29uc3QgRm9udCA9IHNpemUgPT4gYGJvbGQgJHtzaXplfXB4IGNhbGlicmkyYDtcblxuICBjb25zdCBnZXRNYXhTaXplID0gKGxpbmVzLCBzaXplID0gNzApID0+IHtcbiAgICBjdHguZm9udCA9IEZvbnQoc2l6ZSk7XG4gICAgY29uc3QgYmlnZ2VzdCA9IE1hdGgubWF4KC4uLmxpbmVzLm1hcCh0ZXh0ID0+IGN0eC5tZWFzdXJlVGV4dCh0ZXh0KS53aWR0aCkpO1xuICAgIGlmIChiaWdnZXN0ID49IFdJRFRIIC0gNSkgcmV0dXJuIHNpemU7XG4gICAgcmV0dXJuIGdldE1heFNpemUobGluZXMsIHNpemUgKyAyKTtcbiAgfTtcblxuICBjb25zdCBjYW52YXMgPSBSZWFjdC51c2VSZWYobnVsbCk7XG4gIGNvbnN0IFtjdHgsIHNldEN0eF0gPSBSZWFjdC51c2VTdGF0ZShudWxsKTtcbiAgUmVhY3QudXNlRWZmZWN0KCgpID0+IHtcbiAgICBjYW52YXMuY3VycmVudCAmJiBzZXRDdHgoY2FudmFzLmN1cnJlbnQuZ2V0Q29udGV4dCgnMmQnKSk7XG4gIH0sIFtjYW52YXNdKTtcbiAgUmVhY3QudXNlRWZmZWN0KCgpID0+IHtcbiAgICBjdHggJiYgdGV4dCAmJiBzZXRTaXplKGdldE1heFNpemUodGV4dC5zcGxpdCgnXFxuJykpKTtcbiAgfSwgW3RleHRdKTtcblxuICBpZiAoY3R4KSB7XG4gICAgY3R4LmNsZWFyUmVjdCgwLCAwLCBjYW52YXMuY3VycmVudC53aWR0aCwgY2FudmFzLmN1cnJlbnQuaGVpZ2h0KTtcbiAgICBjdHguZm9udCA9IEZvbnQoc2l6ZSk7XG4gICAgY3R4LmZpbGxTdHlsZSA9ICcjMDAwJztcbiAgICBjdHgudGV4dEJhc2VsaW5lID0gJ21pZGRsZSc7XG4gICAgY29uc3QgbGluZXMgPSB0ZXh0LnNwbGl0KCdcXG4nKTsgLy9kcmF3IGxhcmdlIHNoYWRvd1xuXG4gICAgbGluZXMubWFwKChsaW5lLCBpZHgpID0+IHtcbiAgICAgIGNvbnN0IHdpZHRoID0gKFdJRFRIIC0gY3R4Lm1lYXN1cmVUZXh0KGxpbmUpLndpZHRoKSAvIDI7XG4gICAgICBjb25zdCBoZWlnaHQgPSBIRUlHSFQgLyAyIC0gKGxpbmVzLmxlbmd0aCAtIDEpICogbGluZWhlaWdodCAvIDIgKyBpZHggKiBsaW5laGVpZ2h0O1xuICAgICAgY3R4LnNoYWRvd0NvbG9yID0gXCJyZ2JhKDI1NSwyNTUsMjU1KVwiO1xuICAgICAgY3R4LnNoYWRvd0JsdXIgPSA4MDtcbiAgICAgIGN0eC5maWxsVGV4dChsaW5lLCB3aWR0aCwgaGVpZ2h0KTtcbiAgICB9KTsgLy9kcmF3IHNtb2wgc2hhZG93XG4gICAgLy8gbGluZXMubWFwKChsaW5lLCBpZHgpPT57XG4gICAgLy8gXHRjb25zdCB3aWR0aCA9IChXSURUSCAtIGN0eC5tZWFzdXJlVGV4dChsaW5lKS53aWR0aCkvMjtcbiAgICAvLyBcdGNvbnN0IGhlaWdodCA9IEhFSUdIVC8yIC0gKChsaW5lcy5sZW5ndGgtMSkqbGluZWhlaWdodC8yKSArIGlkeCpsaW5laGVpZ2h0O1xuICAgIC8vIFx0Y3R4LnNoYWRvd0NvbG9yID0gXCJyZ2JhKDI1NSwyNTUsMjU1KVwiXG4gICAgLy8gXHRjdHguc2hhZG93Qmx1ciA9IDIwO1xuICAgIC8vIFx0Y3R4LmZpbGxUZXh0KGxpbmUsd2lkdGgsIGhlaWdodCk7XG4gICAgLy8gfSk7XG5cbiAgICBsaW5lcy5tYXAoKGxpbmUsIGlkeCkgPT4ge1xuICAgICAgY29uc3Qgd2lkdGggPSAoV0lEVEggLSBjdHgubWVhc3VyZVRleHQobGluZSkud2lkdGgpIC8gMjtcbiAgICAgIGNvbnN0IGhlaWdodCA9IEhFSUdIVCAvIDIgLSAobGluZXMubGVuZ3RoIC0gMSkgKiBsaW5laGVpZ2h0IC8gMiArIGlkeCAqIGxpbmVoZWlnaHQ7XG4gICAgICBjdHguc2hhZG93Q29sb3IgPSBcInJnYmEoMjU1LDI1NSwyNTUpXCI7XG4gICAgICBjdHguc2hhZG93Qmx1ciA9IDEwO1xuICAgICAgY3R4LnNoYWRvd09mZnNldFggPSAzO1xuICAgICAgY3R4LnNoYWRvd09mZnNldFkgPSAzO1xuICAgICAgY3R4LmZpbGxUZXh0KGxpbmUsIHdpZHRoLCBoZWlnaHQpO1xuICAgIH0pO1xuICAgIGxpbmVzLm1hcCgobGluZSwgaWR4KSA9PiB7XG4gICAgICBjb25zdCB3aWR0aCA9IChXSURUSCAtIGN0eC5tZWFzdXJlVGV4dChsaW5lKS53aWR0aCkgLyAyO1xuICAgICAgY29uc3QgaGVpZ2h0ID0gSEVJR0hUIC8gMiAtIChsaW5lcy5sZW5ndGggLSAxKSAqIGxpbmVoZWlnaHQgLyAyICsgaWR4ICogbGluZWhlaWdodDtcbiAgICAgIGN0eC5zaGFkb3dDb2xvciA9IFwicmdiYSgyNTUsMjU1LDI1NSlcIjtcbiAgICAgIGN0eC5zaGFkb3dCbHVyID0gMTA7XG4gICAgICBjdHguc2hhZG93T2Zmc2V0WCA9IC0zO1xuICAgICAgY3R4LnNoYWRvd09mZnNldFkgPSAzO1xuICAgICAgY3R4LmZpbGxUZXh0KGxpbmUsIHdpZHRoLCBoZWlnaHQpO1xuICAgIH0pO1xuICAgIGxpbmVzLm1hcCgobGluZSwgaWR4KSA9PiB7XG4gICAgICBjb25zdCB3aWR0aCA9IChXSURUSCAtIGN0eC5tZWFzdXJlVGV4dChsaW5lKS53aWR0aCkgLyAyO1xuICAgICAgY29uc3QgaGVpZ2h0ID0gSEVJR0hUIC8gMiAtIChsaW5lcy5sZW5ndGggLSAxKSAqIGxpbmVoZWlnaHQgLyAyICsgaWR4ICogbGluZWhlaWdodDtcbiAgICAgIGN0eC5zaGFkb3dDb2xvciA9IFwicmdiYSgyNTUsMjU1LDI1NSlcIjtcbiAgICAgIGN0eC5zaGFkb3dCbHVyID0gMTA7XG4gICAgICBjdHguc2hhZG93T2Zmc2V0WCA9IDM7XG4gICAgICBjdHguc2hhZG93T2Zmc2V0WSA9IC0zO1xuICAgICAgY3R4LmZpbGxUZXh0KGxpbmUsIHdpZHRoLCBoZWlnaHQpO1xuICAgIH0pO1xuICAgIGxpbmVzLm1hcCgobGluZSwgaWR4KSA9PiB7XG4gICAgICBjb25zdCB3aWR0aCA9IChXSURUSCAtIGN0eC5tZWFzdXJlVGV4dChsaW5lKS53aWR0aCkgLyAyO1xuICAgICAgY29uc3QgaGVpZ2h0ID0gSEVJR0hUIC8gMiAtIChsaW5lcy5sZW5ndGggLSAxKSAqIGxpbmVoZWlnaHQgLyAyICsgaWR4ICogbGluZWhlaWdodDtcbiAgICAgIGN0eC5zaGFkb3dDb2xvciA9IFwicmdiYSgyNTUsMjU1LDI1NSlcIjtcbiAgICAgIGN0eC5zaGFkb3dCbHVyID0gMTA7XG4gICAgICBjdHguc2hhZG93T2Zmc2V0WCA9IC0zO1xuICAgICAgY3R4LnNoYWRvd09mZnNldFkgPSAtMztcbiAgICAgIGN0eC5maWxsVGV4dChsaW5lLCB3aWR0aCwgaGVpZ2h0KTtcbiAgICB9KTsgLy9kcmF3IHRleHRcblxuICAgIGxpbmVzLm1hcCgobGluZSwgaWR4KSA9PiB7XG4gICAgICBjb25zdCB3aWR0aCA9IChXSURUSCAtIGN0eC5tZWFzdXJlVGV4dChsaW5lKS53aWR0aCkgLyAyO1xuICAgICAgY29uc3QgaGVpZ2h0ID0gSEVJR0hUIC8gMiAtIChsaW5lcy5sZW5ndGggLSAxKSAqIGxpbmVoZWlnaHQgLyAyICsgaWR4ICogbGluZWhlaWdodDtcbiAgICAgIGN0eC5zaGFkb3dCbHVyID0gMDtcbiAgICAgIGN0eC5maWxsVGV4dChsaW5lLCB3aWR0aCwgaGVpZ2h0KTtcbiAgICB9KTtcbiAgICBzZXREYXRhVVJMKGNhbnZhcy5jdXJyZW50LnRvRGF0YVVSTCgnaW1hZ2UvcG5nJykpO1xuICB9XG5cbiAgO1xuICByZXR1cm4gUmVhY3QuY3JlYXRlRWxlbWVudChcImNhbnZhc1wiLCB7XG4gICAgcmVmOiBjYW52YXMsXG4gICAgd2lkdGg6IFdJRFRILFxuICAgIGhlaWdodDogSEVJR0hUXG4gIH0pO1xufVxuXG5jb25zdCB7XG4gIEZhdmljb25cbn0gPSByZXF1aXJlKCd2aXRyZXVtL2hlYWR0YWdzJyk7XG5cbmZ1bmN0aW9uIEVtb2ppTWFrZXIocHJvcHMpIHtcbiAgY29uc3QgW3RleHQsIHNldFRleHRdID0gUmVhY3QudXNlU3RhdGUoJ1llcycpO1xuICBjb25zdCBbc2l6ZSwgc2V0U2l6ZV0gPSBSZWFjdC51c2VTdGF0ZSgxMTApO1xuICBjb25zdCBbbGluZWhlaWdodCwgc2V0TGluZWhlaWdodF0gPSBSZWFjdC51c2VTdGF0ZSg2MCk7XG4gIGNvbnN0IFtkYXRhVVJMLCBzZXREYXRhVVJMXSA9IFJlYWN0LnVzZVN0YXRlKCcnKTtcbiAgcmV0dXJuIFJlYWN0LmNyZWF0ZUVsZW1lbnQoXCJkaXZcIiwge1xuICAgIGNsYXNzTmFtZTogXCJFbW9qaU1ha2VyXCJcbiAgfSwgUmVhY3QuY3JlYXRlRWxlbWVudChGYXZpY29uLCB7XG4gICAgaHJlZjogZGF0YVVSTFxuICB9KSwgUmVhY3QuY3JlYXRlRWxlbWVudChcImgyXCIsIG51bGwsIFwiU2xhY2sgVGV4dCBFbW9qaSBNYWtlclwiKSwgUmVhY3QuY3JlYXRlRWxlbWVudChcImRpdlwiLCB7XG4gICAgY2xhc3NOYW1lOiBcImNvbnRyb2xzXCJcbiAgfSwgUmVhY3QuY3JlYXRlRWxlbWVudChcImRpdlwiLCBudWxsLCBSZWFjdC5jcmVhdGVFbGVtZW50KFwidGV4dGFyZWFcIiwge1xuICAgIHZhbHVlOiB0ZXh0LFxuICAgIG9uQ2hhbmdlOiBldnQgPT4gc2V0VGV4dChldnQudGFyZ2V0LnZhbHVlKSxcbiAgICByb3dzOiAzXG4gIH0pKSwgUmVhY3QuY3JlYXRlRWxlbWVudChcImRpdlwiLCBudWxsLCBSZWFjdC5jcmVhdGVFbGVtZW50KFwibGFiZWxcIiwgbnVsbCwgXCJTaXplXCIpLCBSZWFjdC5jcmVhdGVFbGVtZW50KFwiaW5wdXRcIiwge1xuICAgIHR5cGU6IFwicmFuZ2VcIixcbiAgICBtaW46IDUwLFxuICAgIG1heDogMjAwLFxuICAgIHZhbHVlOiBzaXplLFxuICAgIG9uQ2hhbmdlOiBldnQgPT4gc2V0U2l6ZShldnQudGFyZ2V0LnZhbHVlKVxuICB9KSwgc2l6ZSksIFJlYWN0LmNyZWF0ZUVsZW1lbnQoXCJkaXZcIiwgbnVsbCwgUmVhY3QuY3JlYXRlRWxlbWVudChcImxhYmVsXCIsIG51bGwsIFwiU3BhY2luZ1wiKSwgUmVhY3QuY3JlYXRlRWxlbWVudChcImlucHV0XCIsIHtcbiAgICB0eXBlOiBcInJhbmdlXCIsXG4gICAgbWluOiA0MCxcbiAgICBtYXg6IDEyMCxcbiAgICB2YWx1ZTogbGluZWhlaWdodCxcbiAgICBvbkNoYW5nZTogZXZ0ID0+IHNldExpbmVoZWlnaHQoZXZ0LnRhcmdldC52YWx1ZSlcbiAgfSksIGxpbmVoZWlnaHQpKSwgUmVhY3QuY3JlYXRlRWxlbWVudChcImRpdlwiLCB7XG4gICAgY2xhc3NOYW1lOiBcInJlbmRlclwiXG4gIH0sIFJlYWN0LmNyZWF0ZUVsZW1lbnQoVGV4dENhbnZhcywge1xuICAgIHRleHQsXG4gICAgc2l6ZSxcbiAgICBsaW5laGVpZ2h0LFxuICAgIHNldERhdGFVUkwsXG4gICAgc2V0U2l6ZVxuICB9KSwgUmVhY3QuY3JlYXRlRWxlbWVudChcImRpdlwiLCB7XG4gICAgY2xhc3NOYW1lOiBcImV4YW1wbGVcIlxuICB9LCBcIlRoaXMgaXMgaXQgdXNlZCBpbiB0ZXh0LiBcIiwgUmVhY3QuY3JlYXRlRWxlbWVudChcImltZ1wiLCB7XG4gICAgY2xhc3NOYW1lOiBcInNhbXBsZVwiLFxuICAgIHNyYzogZGF0YVVSTFxuICB9KSwgXCIgQWxzbyB0aGUgdGFiIGljb24gaXMgdXBkYXRlZC5cIiksIFJlYWN0LmNyZWF0ZUVsZW1lbnQoXCJkaXZcIiwge1xuICAgIGNsYXNzTmFtZTogXCJleGFtcGxlIGRhcmtcIlxuICB9LCBcIlRoaXMgaXMgaXQgdXNlZCBpbiB0ZXh0LiBcIiwgUmVhY3QuY3JlYXRlRWxlbWVudChcImltZ1wiLCB7XG4gICAgY2xhc3NOYW1lOiBcInNhbXBsZVwiLFxuICAgIHNyYzogZGF0YVVSTFxuICB9KSwgXCIgQWxzbyB0aGUgdGFiIGljb24gaXMgdXBkYXRlZC5cIikpLCBSZWFjdC5jcmVhdGVFbGVtZW50KFwiZGl2XCIsIHtcbiAgICBjbGFzc05hbWU6IFwiaW5zdHJ1Y3Rpb25zXCJcbiAgfSwgUmVhY3QuY3JlYXRlRWxlbWVudChcImgzXCIsIG51bGwsIFwiaW5zdHJ1Y3Rpb25zXCIpLCBSZWFjdC5jcmVhdGVFbGVtZW50KFwib2xcIiwgbnVsbCwgUmVhY3QuY3JlYXRlRWxlbWVudChcImxpXCIsIG51bGwsIFwiQ3VzdG9taXplIHlvdXIgdGV4dCBlbW9qaVwiKSwgUmVhY3QuY3JlYXRlRWxlbWVudChcImxpXCIsIG51bGwsIFJlYWN0LmNyZWF0ZUVsZW1lbnQoXCJhXCIsIHtcbiAgICBocmVmOiBkYXRhVVJMLFxuICAgIHRhcmdldDogXCJfYmxhbmtcIixcbiAgICBkb3dubG9hZDogYCR7dGV4dC5yZXBsYWNlKCdcXG4nLCAnXycpfS5wbmdgXG4gIH0sIFwiRG93bmxvYWQgSXRcIikpLCBSZWFjdC5jcmVhdGVFbGVtZW50KFwibGlcIiwgbnVsbCwgUmVhY3QuY3JlYXRlRWxlbWVudChcImFcIiwge1xuICAgIGhyZWY6IFwiaHR0cHM6Ly9jb29sc3ZpbGxlLnNsYWNrLmNvbS9jdXN0b21pemUvZW1vamlcIixcbiAgICB0YXJnZXQ6IFwiX2JsYW5rXCJcbiAgfSwgXCJBZGQgRW1vamkgdG8gU2xhY2tcIikpKSkpO1xufVxuLyoqKioqKioqKioqKioqKioqL1xuXG5cbmNvbnN0IHRyYW5zZm9ybXMgPSByZXF1aXJlKCcuL3RleHQudHJhbnNmb3Jtcy5qcycpO1xuXG5mdW5jdGlvbiBUZXh0VHJhbnNmb3JtKHByb3BzKSB7XG4gIGNvbnN0IFt0ZXh0LCBzZXRUZXh0XSA9IFJlYWN0LnVzZVN0YXRlKCdvaCBIZWxsbycpO1xuICByZXR1cm4gUmVhY3QuY3JlYXRlRWxlbWVudChcImRpdlwiLCB7XG4gICAgY2xhc3NOYW1lOiBcIlRleHRUcmFuc2Zvcm1cIlxuICB9LCBSZWFjdC5jcmVhdGVFbGVtZW50KFwiaDJcIiwgbnVsbCwgXCJUZXh0IFRyYW5zZm9ybVwiKSwgUmVhY3QuY3JlYXRlRWxlbWVudChcInRleHRhcmVhXCIsIHtcbiAgICBjbGFzc05hbWU6IFwidGV4dEVudHJ5XCIsXG4gICAgb25DaGFuZ2U6IGV2dCA9PiBzZXRUZXh0KGV2dC50YXJnZXQudmFsdWUpLFxuICAgIHZhbHVlOiB0ZXh0LFxuICAgIGF1dG9Gb2N1czogdHJ1ZVxuICB9KSwgUmVhY3QuY3JlYXRlRWxlbWVudChcImRpdlwiLCB7XG4gICAgY2xhc3NOYW1lOiBcInRyYW5zZm9ybXNcIlxuICB9LCBPYmplY3QuZW50cmllcyh0cmFuc2Zvcm1zKS5tYXAoKFtuYW1lLCBmdW5jXSwgaWR4KSA9PiB7XG4gICAgY29uc3QgcmVzID0gZnVuYyh0ZXh0KTtcbiAgICByZXR1cm4gUmVhY3QuY3JlYXRlRWxlbWVudChcImRpdlwiLCB7XG4gICAgICBrZXk6IGlkeFxuICAgIH0sIFJlYWN0LmNyZWF0ZUVsZW1lbnQoXCJidXR0b25cIiwge1xuICAgICAgb25DbGljazogKCkgPT4gbmF2aWdhdG9yLmNsaXBib2FyZC53cml0ZVRleHQocmVzKVxuICAgIH0sIFwiY29weVwiKSwgUmVhY3QuY3JlYXRlRWxlbWVudChcImlucHV0XCIsIHtcbiAgICAgIHJlYWRPbmx5OiB0cnVlLFxuICAgICAgdmFsdWU6IHJlc1xuICAgIH0pLCBSZWFjdC5jcmVhdGVFbGVtZW50KFwic3BhblwiLCBudWxsLCBuYW1lKSk7XG4gIH0pKSk7XG59IC8vLy8vLy8vLy8vLy8vLy8vL1xuXG5cbmZ1bmN0aW9uIE1haW4oX3JlZikge1xuICBsZXQgcHJvcHMgPSBfZXh0ZW5kcyh7fSwgX3JlZik7XG5cbiAgcmV0dXJuIFJlYWN0LmNyZWF0ZUVsZW1lbnQoXCJkaXZcIiwgX2V4dGVuZHMoe1xuICAgIGNsYXNzTmFtZTogYE1haW5gXG4gIH0sIHByb3BzKSwgUmVhY3QuY3JlYXRlRWxlbWVudChUaXRsZSwgbnVsbCwgXCJTbGFjayBUb29scyB2XCIsIHBja2cudmVyc2lvbiksIFJlYWN0LmNyZWF0ZUVsZW1lbnQoXCJoMVwiLCBudWxsLCBcIlNsYWNrIFRvb2xzIHZcIiwgcGNrZy52ZXJzaW9uKSwgUmVhY3QuY3JlYXRlRWxlbWVudChcImhyXCIsIG51bGwpLCBSZWFjdC5jcmVhdGVFbGVtZW50KFwiZGl2XCIsIHtcbiAgICBjbGFzc05hbWU6IFwiZ3JvdXBcIlxuICB9LCBSZWFjdC5jcmVhdGVFbGVtZW50KEVtb2ppTWFrZXIsIG51bGwpLCBSZWFjdC5jcmVhdGVFbGVtZW50KFRleHRUcmFuc2Zvcm0sIG51bGwpKSk7XG59XG5cbjtcbm1vZHVsZS5leHBvcnRzID0gTWFpbjsiLCIiLCJjb25zdCBydW5lcyA9IHJlcXVpcmUoJ3J1bmVzJyk7XG5cbmNvbnN0IGNvcmUgPSBgMDEyMzQ1Njc4OXF3ZXJ0eXVpb3Bhc2RmZ2hqa2x6eGN2Ym5tUVdFUlRZVUlPUEFTREZHSEpLTFpYQ1ZCTk1cXGAtPVtdXFxcXDsnLC4vfl8re318OlwiPD4/IUAjJCVeJiooKWA7XG5cbmNvbnN0IGNyZWF0ZU1hcCA9IHN0cmluZyA9PiB7XG4gIGxldCBtYXAgPSB7fTtcbiAgcnVuZXMoc3RyaW5nKS5tYXAoKGNoYXIsIGlkeCkgPT4gbWFwW2NvcmVbaWR4XV0gPSBjaGFyKTtcbiAgcmV0dXJuIHRleHQgPT4ge1xuICAgIHJldHVybiB0ZXh0LnNwbGl0KCcnKS5tYXAoY2hhciA9PiB7XG4gICAgICByZXR1cm4gbWFwW2NoYXJdIHx8IGNoYXI7XG4gICAgfSkuam9pbignJyk7XG4gIH07XG59O1xuXG5jb25zdCBwbHVjayA9IGFyciA9PiBhcnJbTWF0aC5mbG9vcihNYXRoLnJhbmRvbSgpICogYXJyLmxlbmd0aCldO1xuXG5jb25zdCB0aW55ID0gY3JlYXRlTWFwKGDigbDCucKywrPigbTigbXigbbigbfigbjigbnhtaDKt+G1icqz4bWXyrjhtZjhtqbhtZLhtZbhtYPLouG1iOG2oOG1jcqwyrLhtY/LoeG2u8uj4bac4bWb4bWH4oG/4bWQ4bWg4bWC4bSx4bS/4bWAyrjhtYHhtLXhtLzhtL7htKzLouG0sOG2oOG0s+G0tOG0tuG0t+G0uOG2u8uj4bac4rG94bSu4bS64bS5XFxg4oG74oG8W11cXFxcOycsLi9+X+KBunt9fDpcIjw+y4DhtY5AIyQlXiYq4oG94oG+YCk7XG5jb25zdCBmdWxsd2lkdGggPSBjcmVhdGVNYXAoYO+8kO+8ke+8ku+8k++8lO+8le+8lu+8l++8mO+8me+9ke+9l++9he+9ku+9lO+9me+9le+9ie+9j++9kO+9ge+9k++9hO+9hu+9h++9iO+9iu+9i++9jO+9mu+9mO+9g++9lu+9gu+9ju+9je+8se+8t++8pe+8su+8tO+8ue+8te+8qe+8r++8sO+8oe+8s++8pO+8pu+8p++8qO+8qu+8q++8rO+8uu+8uO+8o++8tu+8ou+8ru+8rVxcYO+8je+8nVtd77y877yb77yHLC7vvI9+77y/IO+9m++9nXzvvJpcIu+8nO+8nu+8n++8ge+8oO+8g++8hO+8he+8vu+8hu+8iu+8iO+8iWApO1xuY29uc3Qgb2xkX3RpbWV5ID0gY3JlYXRlTWFwKGAwMTIzNDU2Nzg58J2WlvCdlpzwnZaK8J2Wl/CdlpnwnZae8J2WmvCdlo7wnZaU8J2WlfCdlobwnZaY8J2WifCdlovwnZaM8J2WjfCdlo/wnZaQ8J2WkfCdlp/wnZad8J2WiPCdlpvwnZaH8J2Wk/CdlpLwnZW88J2WgvCdlbDwnZW98J2Vv/CdloTwnZaA8J2VtPCdlbrwnZW78J2VrPCdlb7wnZWv8J2VsfCdlbLwnZWz8J2VtfCdlbbwnZW38J2WhfCdloPwnZWu8J2WgfCdla3wnZW58J2VuFxcYC09W11cXFxcOycsLi9+Xyt7fXw6XCI8Pj8hQCMkJV4mKigpYCk7XG5jb25zdCBpdGFsaWNzID0gY3JlYXRlTWFwKGAwMTIzNDU2Nzg58J2YsvCdmLjwnZim8J2Ys/CdmLXwnZi68J2YtvCdmKrwnZiw8J2YsfCdmKLwnZi08J2YpfCdmKfwnZio8J2YqfCdmKvwnZis8J2YrfCdmLvwnZi58J2YpPCdmLfwnZij8J2Yr/CdmK7wnZiY8J2YnvCdmIzwnZiZ8J2Ym/CdmKDwnZic8J2YkPCdmJbwnZiX8J2YiPCdmJrwnZiL8J2YjfCdmI7wnZiP8J2YkfCdmJLwnZiT8J2YofCdmJ/wnZiK8J2YnfCdmInwnZiV8J2YlFxcYC09W11cXFxcOycsLi9+Xyt7fXw6XCI8Pj8hQCMkJV4mKigpYCk7XG5jb25zdCBmYW5jeSA9IGNyZWF0ZU1hcChgMDEyMzQ1Njc4OfCdk7rwnZSA8J2TrvCdk7vwnZO98J2UgvCdk77wnZOy8J2TuPCdk7nwnZOq8J2TvPCdk63wnZOv8J2TsPCdk7HwnZOz8J2TtPCdk7XwnZSD8J2UgfCdk6zwnZO/8J2Tq/Cdk7fwnZO28J2ToPCdk6bwnZOU8J2TofCdk6PwnZOo8J2TpPCdk5jwnZOe8J2Tn/Cdk5DwnZOi8J2Tk/Cdk5XwnZOW8J2Tl/Cdk5nwnZOa8J2Tm/Cdk6nwnZOn8J2TkvCdk6XwnZOR8J2TnfCdk5xcXGAtPVtdXFxcXDsnLC4vfl8re318OlwiPD4/IUAjJCVeJiooKWApO1xuY29uc3Qgc21hbGxjYXBzID0gY3JlYXRlTWFwKGAwMTIzNDU2Nzg5x6vhtKHhtIfKgOG0m8qP4bScyarhtI/htJjhtIBz4bSF0pPJosqc4bSK4bSLyp/htKJ44bSE4bSgypnJtOG0jVFXRVJUWVVJT1BBU0RGR0hKS0xaWENWQk5NXFxgLT1bXVxcXFw7JywuL35fK3t9fDpcIjw+PyFAIyQlXiYqKClgKTtcbmNvbnN0IGdlbmppID0gY3JlYXRlTWFwKGAwMTIzNDU2Nzg5yYrlsbHkuYflsLrjhJLjhJrjhKnkuKjjhJbljanljYLkuILhl6rljYPhjrbljYTvvozSnOOEpeS5meS5guWMmuGQr+S5g+WHoOeIqsmK5bGx5LmH5bC644SS44Sa44Sp5Lio44SW5Y2p5Y2C5LiC4Zeq5Y2D4Y625Y2E776M0pzjhKXkuZnkuYLljJrhkK/kuYPlh6DniKpcXGAtPVtdXFxcXDsnLC4vfl8re318OlwiPD4/IUAjJCVeJiooKWApO1xuY29uc3QgZ3JlZWsgPSBjcmVhdGVNYXAoYDAxMjM0NTY3ODlR0KnOo9CvxqxZ0KZJ06hQzpvGp0RGR86JSkvhhIJaWOGEg1ZC0J9NUdCpzqPQr8asWdCmSdOoUM6bxqdERkfOiUpL4YSCWljhhINWQtCfTVxcYC09W11cXFxcOycsLi9+Xyt7fXw6XCI8Pj8hQCMkJV4mKigpYCk7XG5jb25zdCBjdGh1bHUxID0gY3JlYXRlTWFwKGAwzLYxzLYyzLgzzLY0zLQ1zLc2zLc3zLg4zLU5zLVxzLd3zLVlzLZyzLR0zLZ5zLh1zLRpzLZvzLhwzLVhzLVzzLdkzLZmzLVnzLZozLhqzLVrzLVszLh6zLV4zLVjzLV2zLdizLRuzLhtzLZRzLVXzLdFzLRSzLRUzLVZzLZVzLVJzLVPzLhQzLVBzLhTzLZEzLdGzLZHzLhIzLVKzLZLzLVMzLZazLRYzLZDzLdWzLhCzLdOzLhNzLRcXMy2XFxgzLctzLQ9zLhbzLhdzLRcXMy1XFzMtTvMtifMuCzMtS7MtS/MtX7Mt1/MuCvMt3vMtX3MtHzMtzrMtFwizLU8zLg+zLU/zLUhzLZAzLcjzLQkzLclzLhezLUmzLUqzLUozLQpzLhgKTtcbmNvbnN0IGN0aHVsdTIgPSBjcmVhdGVNYXAoYDDMtMyKzIbNkc2TzKPMqjHMuMyKzYHNjcyxMsy2zIXMhc2IzLDMss2JM8y0zYHMj8yhzKXMosy5zLM0zLfMvsyJzJrMm82GzYnMnsy7Ncy1zYTNhsyVzKo2zLTMvsyUzJHMvMyuzLLMocygN8y0zZjMiM2dzYTNi8ywzY7NiMynzLs4zLTMvcyIzI/MqMymzJ3MsTnMts2KzYPNlMyWzY7Musymccy1zYTNoMyOzIbMhcynzJzNmsyrd8y3zIHNksyBzZrMns2WzJ1lzLTMhMyHzL3MhsyzzLPMmXLMt82dzZDMlc2JdMy0zI7NisyLzJ7Mpc2FzJd5zLfNoMyazJvNnM2azYjMncyrdcy2zYTNgMyYzZXMucyrzKBpzLjMg8yPzaDMjc2Zb8y0zYzMis2JzJ7NjsyZzZRwzLjMjc2gzYTNisypzJ1hzLjNgM2WzZbNnHPMtcy/zYDNmMybzZrMpM2TzKvMn2TMtc2YzYPNhMyIzKJmzLXMvc2dzIXMvsy5zKvNnMyxZ8y4zITMkc2SzIfNm8yrzKVozLfNncyMzJXMh82QzJnMnM2UzJlqzLTMm82LzYTMi82dzJnMosyzzJxrzLXMvc2YzJfMpsymzKjMr2zMuM2SzI3MmsyQzJnMrc2IzYjMoXrMt8yAzKDMucyXzZx4zLfMjsyLzLnMo8y6zZZjzLTMvcyIzInMiM2ZzLJ2zLbMlMyKzIXMmc2ZYsy3zYzNhsy9zZzMpMyWbsy3zYTMgc2YzK7NiMypzLvMsW3MuM2AzJHMkc2YzKJRzLjNkc2AzJvMr1fMtM2GzYhFzLTMm82QzZ3Mi82dzLnNmVLMts2dzK/Nmc2UzJ1UzLXNl8yRzZrMqMyuzZVZzLfNg82dzJrMhMyHzKRVzLfMhM2MzYTMicyAzLPMl0nMuM2XzIXNisy+zZvMucyqzLzMqE/Mt8ybzZvMpMy5zKbMuVDMtc2BzZHMvsyOzITNlMywzLFBzLTMk82EzZPMp8y6U8y3zZHMkc2IzYXNk8yWRMy1zZ3Nk8ygzLDNmkbMtc2RzYDMms2NR8y1zYLMicy5zZPMusypzKJIzLbMh8yLzL/MmMyqzJ3Mq82ZSsy3zIDNgcykzJfMuUvMuM2RzKXMnsykzKjMl0zMuMyVzaDMjcydzKVazLXMv82dzKFYzLTMgs2dzL3MkcykzYXMmcyZzK9DzLbMg8yBzJLNiMyWVsy3zZ3Nk8y5Qsy3zILNgcyKzYTNhMygzLDMssyiTsy2zZ3Mp8ygzZTMqU3Mt82CzInNm8yKzYzMqMy6XFzMuM2XzKhcXGDMtMyKzJ3Mo82JLcy3zInNhMyyzK3NjcylPcy2zZvNg8y6W8y3zIzMkcyQzJXMqcyWzZPMs8yhXcy4zZLNhM2NzKZcXMy1zYrNhMy/zJHMl1xczLTNm8yNzIbNh82JzKc7zLTMicyTzZnMnMy8zJbMpyfMtcyRzJvNl8ybzKTNhcytzKzMpyzMuMy+zL/NkM2gzIjNicyxzKXMvC7MuM2RzIrNisynzZkvzLTMms2RzIbNgc2AzZrMsM2JzKXMon7MuM2CzIbNgMyGzIPNh8yczKHMuV/Mts2KzZLMlcyAzLzMlyvMtc2bzIvNoM2AzKLMlnvMtM2EzZDMss2NzZl9zLjNgsyGzIPNic2JzKfMqcynfMy4zZjMjcyKzJTMgsyvzLPMqDrMuM2dzI3MqMyjzKvMss2cXCLMuMyPzYHNhMybzLDMuTzMuMySzILMi8yJzK/NmsyuPsy4zaDMiMyazYvMu8yizJfNnM2VP8y0zIzMlMyKzZDMhc2UzKchzLTNi82EzIfMic2MzYlAzLjMg8ykI8y0zI3Nnc2DzITMuSTMtsyRzIrMjs2EzZHMpMydzLvNhSXMts2EzKJezLbNm8y+zYLMlsyzzYnMpCbMt82bzIfMgMyEzKPNmSrMtsyEzIPMhM2YzZ3NhcywzKAozLXNgs2CzIvNksySzLzMp8yvzLopzLfMms2LzJnMqGApO1xuY29uc3QgY3RodWx1MyA9IGNyZWF0ZU1hcChgMMy2zZDMvs2YzYTNhMyIzYzMlcyCzJHNoMyYzJ/MocyzzKfMpDHMuM2XzI/MmsyMzJvNlsykzYgyzLXMgs2BzIfMms2XzL3NlsygzLPMuc2azLszzLbNhMyFzIfNl82XzYTMjsyIzKfMqMypzKLMrzTMtsyMzILMjsyOzIvMkM2XzZLNnc2dzJjNmcycNcy4zZ3Mm82EzZHMhc2EzYPNkcyTzK7MsMyzzZnMosydzKDNjcyqNsy0zJPNgMyCzZHMvcytzY7MncyozJfMqc2FzJjMqsykzJw3zLjMhc2YzI7MksyRzI7NhM2AzY3Mo8yyzLE4zLfMm8yGzJTMj8yIzIfMgM2DzLLMqs2JzJc5zLXMhc2azZXMqcyxzYlxzLXMi8yLzILNl82YzIHNnc2YzI3Mv8ypzLnMqMyfzKXMlsy5d8y0zIDNl8yNzIrMicyVzJHNmM2VzKHMl2XMtMyBzYPNisyQzZLNhM2azLHMns2ZzJxyzLfMk8yTzYrMis2GzZTMsc2TzLLMocymzJbMr8yszZp0zLbMgc2dzIPMhcybzYbMgsybzIrMlcyZzLvMnMynecy0zZ3NjM2dzJfMr8yWzK3MnMynzKzNjsyYdcy3zYbMvc2MzZ3Nhsynacy3zJvNhsyEzIPMhM2DzIbMnsykzZzMlsyrb8y0zYDMhs2YzIrMoMyjzZrMmHDMt8yJzYbMjc2dzYbMvc2YzJLNg8yAzI/Moc2czK3NiWHMtcyazYTNkcyMzJDNncyIzYrNmMyZzZzMqsyxzLPMn8yszZPMrHPMtMyEzZDMjMy7ZMy3zYTMhMyGzYLMgMyNzJbNnMy8zYfMqWbMtM2LzZjMh8yIzZvNjMyBzIDMk82azKrMs8yYzKnNiMyzzK7Muc2TZ8y3zZjMg8yIzZjMhMy/zL/Mvs2EzZjNiMy6zJjMr2jMtM2RzJvMvc2BzJrMi8yOzIvMm8yKzLzMr8yxzYjMq8yizKnMu8yZasy2zaDMqsygzJnMp8y8zLDMrcyWa8y2zZ3Mi8y9zKbMr8ygzKnMoc2TzLnMq8ytbMy4zYDMhcy9zYrMms2LzY16zLjMlc2VzZTMlsyyzZbMsM2IzKHNh3jMuM2bzITMgc2bzZTMu8yizYXNicy6zLzMqs2ZY8y2zIDNjnbMtcy/zKrMl82VYsy2zIbNhsyVzJDNg82dzZfNiMyrzKbNh8ywzLzMnsymzKhuzLTMks2LzZjNis2SzL/MjMyubcy0zJTNkMyVzJHNjMyZzY1RzLXMgsyDzYHMvsyAzYLMjcyNzJXNmM2dzJ3Mpc2HzZbMrMyezKjNlcyuzLxXzLbNncy9zZfNgsyCzKTMr8yYzZzMrs2VRcy2zZfNl8yTzIHNi8ydzKdSzLjNhsyCzK3NnMyiVMy4zIDMic2bzJfMocyqzLvMr8yjWcy1zI/Mm8yPzIXNhMyQzKfNh8ydzYXMss2IzY1VzLjNl82DzYzNoMywzK3NmsyozJjMoM2OzY3MsEnMtMyDzJPMjM2EzIfNgM2MzJrMjc2WzJzNnMy6zZPMn8yXzZbNjsylzZlPzLfMjsyOzYXMsc2czYnMusyqzKnMs8yrUMy4zI7MvcyBzIvNgsyUzIbMjMyZzKzMnc2VzLHMr82UzJhBzLXNncyXzJnMlsy8zKzMmcyuzLvMr8ydU8y0zZDMjsyDzLzMns2azKTMs0TMt8yNzIrNg82SzIrMj8ydzYjMsc2czKxGzLjMh8yxzKHMqMyozZbMsc2WzKrMq0fMtMySzYPMm82AzIfNhsyRzLLMrsyZzJbNmcyZSMy1zYzMvsyRzIDMm82YzL3NoMyQzYHMjMyZzK5KzLbMgcyizKzMoM2WzKfNnMylS8y2zILMjsyTzITNncyUzIbMi8ylzLPMnMyozKdMzLfNm8yFzI3MhM2DzZLMhsyYzYnMnMyqWsy0zIbNncyazKvMo82TzJ7Mp8yfWMy4zYzNis2AzJPNgsyVzYjNlcyizZbNjcyczLpDzLXMj82dzYTNm8ybzZXMs1bMuMyHzZnNk82WzZPMps2HzK/Ml8ydzLNCzLXMis2EzYrNlcyyzYXNlc2FzK/MpM2azJ/Mq07MtcyLzILNhsyYTcy4zYHMhs2GzJvMgsynzKjMq1xczLfMhc2LzYHMhcyEzYbMis2ZzYXMl8yXzJ5cXGDMuM2MzITNgMyHzJTMi8yPzJDNgM2XzZ3MoS3Mts2EzI3Mk8yLzIvMmsyTzIzMhMyMzYTMu8ymzJ3MssyvzLPMlz3Mt8yDzL3MjsyPzZDMg82gzJPNl8yYzZzNjsyzzKnMucyrzZZbzLbMg8yGzIzNnc2AzYTMhMy+zIPMjcyWzLtdzLfMi8yVzIPMv8yEzLLNh1xczLfMjc2EzL/MvcyTzZvNg82dzYTNisykzKxcXMy3zYrNks2UzKXNk8yxzLnMvMyoO8y3zZjNhMyBzYPMkcyCzJrMkMyGzJfMssyuzKzMrMykzKjMnifMtcyHzIrNjM2MzIfMksyezLvMr8yZLMy0zJrMvcyGzILMisy+zYzNksy+zK/Mqy7Mts2QzJXMl8y6zJ/NiMyuL8y2zJTNks2KzJTNi8yCzIPNisybzZLMiMygzJbMocyczLHMo37Mts2QzJrMmsyHzYHNmM2YzIDNm8yazIrMsMymzKXMmMyxzKHMrsy6zJzMn8y8X8y0zYvMhsyBzZfMic2aK8y4zJPMvc2GzJXNnMy7zZbMmXvMtcyEzY3NlsyYzZTMrsylzJzMosyqzKB9zLbNksyRzJDNnc2QzaDMlMyCzZLNhMyfzKjMq8yszKzMssyvzKN8zLXMkcyazInMhMy/zJzMqjrMtsybzZ3MvcyEzL3Mh8yTzJPMn1wizLTMhs2AzYTMmsyVzIzMu8yvzKPMnMyxPMy0zZLNkcyUzYzNoM2AzYTMgsy/zZ3NlMyizJbMp8yuzKTNiMyfzLE+zLjMh82EzInMhM2GzZvMg82YzYrMgMyezLPMrsyeP8y4zJvNhMyKzJTMmsyUzYLMiMyPzL7NksyvzZXMscytzKTMrsyyzKfMsSHMuMyVzJvNm82CzKbMu8yuQMy3zYvMi82bzJDNhsylzZzNlM2czKDMl8ykzKYjzLXNmMyiJMy4zYvMhsyCzZPMscyhzLzMqMyezKDMoMyqzJ/MqCXMtc2dzILMgMyBzJPMucyvzJjNms2UzKnMncypXsy2zIzMjc2RzIfMic2CzIPMkc2BzK/Mq8yizKDNls2VzKzMuSbMtcyLzJPMksyNzZDMgsyIzJvNh8ytzLLMrSrMuMyOzYTMlMyEzITMg8yRzJjNh8yfzLzMssypKMy2zYLNhMyHzZvMv8yHzKzMr82JKcy4zL/Mg82TYCk7XG5jb25zdCBjdGh1bHU0ID0gY3JlYXRlTWFwKGAwzLjNnc2SzJrMkMyIzL3Mic2CzI7NhcyvzY3Mss2WzKDMqcygzK/MlzHMtcy/zYzNksyJzYzNmMyNzaDNhcyuzJjMmM2WzKfNiDLMuMyKzZLMgsyIzIrMhc2RzIjNnMyrzKvMqMyhzKDMnzPMt8yCzJXNkMyyzYfMszTMt8yGzIXNjMyHzYDMg8yRzZvNic2IzYk1zLTMhcyFzIPNmMyAzL/Mjs2KzIjMk8yAzKnMncyZzJbNjTbMtMyEzL/Ng8yUzYTNgsygzKTMmc2HzKXNlMyjzZnMr8yfN8y3zYbNg8y+zJjMmMymzLrMojjMtMyGzL7NncyLzITNgsyTzJDMp8yYOcy4zYHNkcyBzL3MksyozKbMosyYzZlxzLbMhs2XzIvNi8yLzZ3Ni82XzZHNhMynzKfNlsyzzK/Mosytd8y3zI3MisyNzYbNl82bzYrNkcyRzKLMrsyXzK7NjmXMtcyBzJrNis2YzIDNhMy+zIHMsMyecsy0zYrMksyLzZHNg82KzIjMvcyUzIDNgsy5zLzMl3TMtsyVzZHNgM2BzZfMis2bzYzMps2IzYXMus2WzKHMs82aecy0zI7Mh82KzZvMh8y9zIXNg8yRzLDMn8ymzJ/Mu3XMts2RzYvNncyUzZfMvcyDzIvMiM2XzYzMnMyZacy2zZHMis2czKzMvMyWzLvMocyXb8y0zInNoMyKzIjMrs2FzJzNnMylzZXMoMyozKTMus2VcMy1zILNl82MzI7MlcyOzI3MqsyezJ/MusyvzLvNjsyfzZzMsmHMtsyIzIbMl82UzY7MpsyWzK/NjsyjzLvMpsyhc8y3zZ3Mgc2AzInNis2MzKvNnMyvzY3Ml8yXzKfMucyszY7Ms2TMuMy9zKhmzLTNgcyNzIPMhsyDzIHNoMyHzZrMmM2azZPNh82VzZTMrGfMuMyCzIjMo8ydaMy0zJDMrMywzZbMrcyezZbMrsyZzLPMp8ycasy2zIDMks2QzJLNkM2gzJPNl8y5zKHMrc2UzZrMvMyrzY3Nh8yfzLNrzLXMiMybzIHMksybzYrNhMyLzJTMi8yozJzMrcyczJjNlc2azLnMrMyjbMy1zYzMjMyAzL7NgcyAzZfNgs2bzInMjMyYzYXNiM2azLzMqsyizYV6zLbMi82CzZ3Ng82SzJPMgMyPzYHMvM2WzJjMqc2VzLDNmcyhzYXMo82OeMy2zYTNkc2EzYvNi8yJzIXNlcyfzLHMrc2VzLDMo8y7Y8y1zYDMh82EzJjNlsytzZnNlcyfzLHMqs2czLrNjXbMtcyNzIfMksyPzIzMj8yGzJzNmcyqzYXMvGLMt82KzYHNmM2AzZDNhMyEzL3NksyJzKvMrcymbsy4zIfMvs2GzIvMk8yKzYLMg82QzKRtzLXMjsyAzIzMj8ySzYDNmM2KzKTMr82TzK3MmcyYzKtRzLTNgs2SzZnMncyWzZTMs8yYzKPMsFfMuMyJzYTMjcySzIXMhc2gzYXMr8yuzLHNnMyozY7NlM2FzJ1FzLfMmsyJzYTMlc2dzIbMis2MzZvNkc2DzKXMrsykzZzNmlLMtcybzIPMkMyAzL7MjMy9zZ3MkMylzZbMosynzLLMqc2VVMy4zZLMn1nMt8yUzJrNm8yVzJPMhcyRzL7Nk82JzKHMnMyezLvMnM2cVcy1zJTNm82RzYPMhs2KzJ5JzLbMv82dzI/NlcyxzLnMocy5T8y3zI/NgsyUzIjMhs2XzZvMh8yEzL3MqFDMtcyVzZfMm82QzJXNhM2DzYzMmsy9zZTMmc2WzJzMnM2FzLFBzLjMg82LzLxTzLTNmMyCzIzMk8yBzaDMmsy/zJfMqsyzRMy2zIXNk8yczKLMp8yZzJ3Njcy6zJbNiMykRsy3zZHMh82CzIDNncyazIbNhMyxzLrMrcynzLrMq8ypzLnMskfMt8yDzJDNks2EzIPNi8yLzYzMh82XzLHNjsy6SMy0zIvNoMyMzJHNmM2KzJHMmMyzzKPMpcyXzLDMss2VSsy0zL7Mlc2DzIvMpsyqzLDMsMymzKFLzLjMgsyUzZDNhM2QzIPMrEzMts2MzZ3MkM2KzZrMvM2HzZPMr8yXWsy2zaDNhsyJzJPMvc2HzYfNmcygzKNYzLXNoMyfzLJDzLbMms2CzILNkMyAzIXNjMyHzYTNlM2WzKvNnFbMt82bzIDMnsyczYfNlkLMtMyTzJrMj8ybzYDMjc2gzZfMgc2VzKnNiM2VzK7NmcykTsy3zYbMhcy/zZ3MiMypzYfMr03Mt8yRzIDNnc2AzIbNg8yNzKvMq8yczKPNhVxczLTNl82QzL7Mjs2MzZnMrcyzXFxgzLXNnc2EzJTNks2CzZfMpy3MuMyKzLPNms2UzZbNlT3Mts2QzIrMmsyNzIbMncyhzYXMnFvMuMy9zIDNoM2RzIfMlcykzKDMn82VzK3MoF3Mt8yFzJLMqMyjzKfMr82JzLtcXMy4zI7Mgc2XzZ3NhMyLzJnNlFxczLbNg8ybzIzMj8yGzIjMkc2MzJTMmMy8zJnMncynzK47zLTMhcyCzJzMnifMt8yUzIzMicy5zLHMscyfzKvNhcydzLLMosyozLIszLXMms2dzI3MgMyazIfNgsyxLsy2zYTNk8yqzKPNjcy7zZovzLTMlcyAzILMvsyFzInMksyHzIXMqc2WzZTMqMyszK/NmcyhzLrMu37MtsyRzZ3Mgsy+zYTMgMyQzYTMisyizLBfzLjMjsyHzYTNgcyDzYzMhs2WzZTMrs2ZzJzNiMyZzKYrzLjNis2MzZbMnMyvzLzMpcytzKF7zLfNisydzYXMu33Mt82MzIvNhM2DzaDNjMy9zYPMg8ypzYfMsM2TzZzMvMydzJx8zLfMlc2EzJXMlsygzJbNicy6zKA6zLjNjMyTzJXNgc2FzJbMn8yXzKbNiM2JzLPNk82VzYdcIsy0zJPNisyNzJvMgc2XzYTNgsyJzI3NmcyezYjMmc2czKLMq8yxPMy3zJLMlcyOzILNkMyFzL/Mh8yHzYvMn8yuzK/NiMyezJbNhcyqzJ7NmcyePsy1zJLNgcyazZ3MhsyDzIrMq8yYzZPMns2HzZbMpD/Mtc2BzIfMlcyFzYPNhs2RzInMos2cIcy4zILMkc2SzIjNhMy+zK3MnsyrQMy1zI7Mv82XzI/Mj8yJzL7NgMy/zInMms2TzK3MvMyozKLMrM2OzJfMn8yzzZojzLfMvsyLzZjNkM2EzIjNls2OzKUkzLbNoMyJzJXNhs2MzYrMj82bzI3NgMyFzZnNlCXMts2DzIrMlcyEzK7Mns2FzKnMlsyozKPMps2ZXsy2zILNncy6zLPNjSbMtcyBzIzNhMyIzIDMhcyazJXMhM2dzYbMmcygzKPMssy6zZnMqirMts2QzZfNlMyuzKjNmsyizJ3Mr8yZzJ4ozLXMjMyIzIvMvs2QzJbMr82UzYfNnMyizK7Muc2TzKrMlinMtsyazIXMgsyVzKPNk8y6YCk7XG5jb25zdCBMaWdhdHVyZXMgPSB7XG4gIG9lOiAnxZMnLFxuICBodTogJ8aVJyxcbiAgSHU6ICfHticsXG4gIHVlOiAn4bWrJyxcbiAgc3Q6ICfvrIYnLFxuICB0czogJ8qmJyxcbiAgYWE6ICfqnLMnLFxuICBhbzogJ+qctScsXG4gIGF1OiAn6py3JyxcbiAgYXY6ICfqnLknLFxuICBvbzogJ+qdjycsXG4gIHZ5OiAn6p2hJyxcbiAgZXQ6ICfwn5mwJyxcbiAgYXk6ICfqnL0nLFxuICBsczogJ8qqJyxcbiAgYWU6ICfDpicsXG4gIEFlOiAnw4YnXG59O1xuY29uc3QgQWNjZW50cyA9IHtcbiAgQTogWydBJywgJ8OAJywgJ8OBJywgJ8OCJywgJ8ODJywgJ8OEJ10sXG4gIGE6IFsnYScsICfDoCcsICfDoScsICfDoicsICfDoycsICfDpCddLFxuICBFOiBbJ0UnLCAnw4gnLCAnw4knLCAnw4onLCAnw4snXSxcbiAgZTogWydlJywgJ8OoJywgJ8OpJywgJ8OqJywgJ8OrJ10sXG4gIGk6IFsnaScsICfDrCcsICfDrScsICfDricsICfDryddLFxuICBJOiBbJ0knLCAnw4wnLCAnw40nLCAnw44nLCAnw48nXSxcbiAgTzogWydPJywgJ8OSJywgJ8OTJywgJ8OUJywgJ8OVJywgJ8OWJ10sXG4gIG86IFsnbycsICfDsicsICfDsycsICfDtCcsICfDtScsICfDtiddLFxuICBVOiBbJ1UnLCAnw5knLCAnw5onLCAnw5snLCAnw5wnXSxcbiAgdTogWyd1JywgJ8O5JywgJ8O6JywgJ8O7JywgJ8O8J11cbn07XG5tb2R1bGUuZXhwb3J0cyA9IHtcbiAgdGlueSxcbiAgZnVsbHdpZHRoLFxuICBvbGRfdGltZXksXG4gIGZhbmN5LFxuICBzbWFsbGNhcHMsXG4gIGNsYXBiYWNrOiB0ZXh0ID0+IGDwn5GPICR7dGV4dC5zcGxpdCgnICcpLmpvaW4oJyDwn5GPICcpfSDwn5GPYCxcbiAgZ29vZnk6IHRleHQgPT4gdGV4dC50b0xvd2VyQ2FzZSgpLnNwbGl0KCcnKS5tYXAoKGNoYXIsIGlkeCkgPT4gaWR4ICUgMiA9PSAwID8gY2hhciA6IGNoYXIudG9VcHBlckNhc2UoKSkuam9pbignJyksXG4gIHNvbmc6IHRleHQgPT4gYPCfjrUke2l0YWxpY3ModGV4dCl98J+OtWAsXG4gIGtlbGxlbl9zcMOmazogdGV4dCA9PiB7XG4gICAgbGV0IHJlcyA9IFtdO1xuICAgIHJlcyA9IHRleHQuc3BsaXQoJycpLnJlZHVjZSgoYWNjLCBsZXR0ZXIpID0+IHtcbiAgICAgIGNvbnN0IGxhc3RUd29MZXR0ZXJzID0gYWNjLnNsaWNlKC0xKSArIGxldHRlcjtcblxuICAgICAgaWYgKExpZ2F0dXJlc1tsYXN0VHdvTGV0dGVyc10pIHtcbiAgICAgICAgYWNjLnBvcCgpO1xuICAgICAgICBsZXR0ZXIgPSBMaWdhdHVyZXNbbGFzdFR3b0xldHRlcnNdO1xuICAgICAgfVxuXG4gICAgICByZXR1cm4gYWNjLmNvbmNhdChsZXR0ZXIpO1xuICAgIH0sIFtdKTtcbiAgICByZXMgPSByZXMucmVkdWNlKChhY2MsIGxldHRlcikgPT4ge1xuICAgICAgaWYgKEFjY2VudHNbbGV0dGVyXSkgbGV0dGVyID0gcGx1Y2soQWNjZW50c1tsZXR0ZXJdKTtcbiAgICAgIHJldHVybiBhY2MuY29uY2F0KGxldHRlcik7XG4gICAgfSwgW10pO1xuICAgIHJldHVybiByZXMuam9pbignJyk7XG4gIH0sXG4gIGdlbmppLFxuICBncmVla1xufTsiLCJtb2R1bGUuZXhwb3J0cz1tb2R1bGUuZXhwb3J0cz17XG4gIFwibmFtZVwiOiBcInNsYWNrLXRvb2xzXCIsXG4gIFwidmVyc2lvblwiOiBcIjEuMS4wXCIsXG4gIFwiZGVzY3JpcHRpb25cIjogXCJnaXRAZ2l0aHViLmNvbTpzdG9sa3Nkb3JmL3NsYWNrLXRvb2xzLmdpdFwiLFxuICBcIm1haW5cIjogXCJhcHAuanNcIixcbiAgXCJzY3JpcHRzXCI6IHtcbiAgICBcInRlc3RcIjogXCJlY2hvIFxcXCJFcnJvcjogbm8gdGVzdCBzcGVjaWZpZWRcXFwiICYmIGV4aXQgMVwiLFxuICAgIFwiYnVpbGRcIjogXCJ2aXRyZXVtIC0tc3RhdGljXCIsXG4gICAgXCJkZXZcIjogXCJ2aXRyZXVtIC0tZGV2IC0tc3RhdGljXCIsXG4gICAgXCJwb3N0aW5zdGFsbFwiOiBcIm5wbSBydW4gYnVpbGRcIixcbiAgICBcInN0YXJ0XCI6IFwibm9kZSBhcHAuanNcIlxuICB9LFxuICBcInJlcG9zaXRvcnlcIjoge1xuICAgIFwidHlwZVwiOiBcImdpdFwiLFxuICAgIFwidXJsXCI6IFwiZ2l0K2h0dHBzOi8vZ2l0aHViLmNvbS9zdG9sa3Nkb3JmL3NsYWNrLXRvb2xzLmdpdFwiXG4gIH0sXG4gIFwia2V5d29yZHNcIjogW1xuICAgIFwic2xhY2tcIixcbiAgICBcImVtb2ppXCJcbiAgXSxcbiAgXCJhdXRob3JcIjogXCJzdG9sa3Nkb3JmXCIsXG4gIFwibGljZW5zZVwiOiBcIk1JVFwiLFxuICBcImJ1Z3NcIjoge1xuICAgIFwidXJsXCI6IFwiaHR0cHM6Ly9naXRodWIuY29tL3N0b2xrc2RvcmYvc2xhY2stdG9vbHMvaXNzdWVzXCJcbiAgfSxcbiAgXCJob21lcGFnZVwiOiBcImh0dHBzOi8vZ2l0aHViLmNvbS9zdG9sa3Nkb3JmL3NsYWNrLXRvb2xzI3JlYWRtZVwiLFxuICBcInZpdHJldW1cIjoge1xuICAgIFwidGFyZ2V0c1wiOiBbXG4gICAgICBcImNsaWVudC9tYWluL21haW4uanN4XCJcbiAgICBdLFxuICAgIFwidGVtcGxhdGVcIjogXCJjbGllbnQvaHRtbC50ZW1wbGF0ZS5qc1wiLFxuICAgIFwicm9vdFBhdGhcIjogXCIvc2xhY2stdG9vbHNcIixcbiAgICBcInBhdGhzXCI6IHtcbiAgICAgIFwiYnVpbGRcIjogXCIuL2RvY3NcIlxuICAgIH1cbiAgfSxcbiAgXCJiYWJlbFwiOiB7XG4gICAgXCJwcmVzZXRzXCI6IFtcbiAgICAgIFwiQGJhYmVsL3ByZXNldC1yZWFjdFwiXG4gICAgXSxcbiAgICBcInBsdWdpbnNcIjogW1xuICAgICAgXCJAYmFiZWwvcGx1Z2luLXByb3Bvc2FsLW9iamVjdC1yZXN0LXNwcmVhZFwiXG4gICAgXVxuICB9LFxuICBcImRlcGVuZGVuY2llc1wiOiB7XG4gICAgXCJAYmFiZWwvY29yZVwiOiBcIl43LjQuM1wiLFxuICAgIFwiQGJhYmVsL3BsdWdpbi1wcm9wb3NhbC1vYmplY3QtcmVzdC1zcHJlYWRcIjogXCJeNy40LjNcIixcbiAgICBcIkBiYWJlbC9wcmVzZXQtcmVhY3RcIjogXCJeNy4wLjBcIixcbiAgICBcInJlYWN0XCI6IFwiXjE2LjguNlwiLFxuICAgIFwicmVhY3QtZG9tXCI6IFwiXjE2LjguNlwiLFxuICAgIFwicnVuZXNcIjogXCJeMC40LjNcIixcbiAgICBcInZpdHJldW1cIjogXCJeNS42LjJcIlxuICB9XG59XG4iXX0=
