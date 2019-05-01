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
  }, React.createElement("h2", null, "Text Transform"), React.createElement("textarea", {
    onChange: evt => setText(evt.target.value),
    value: text
  }), React.createElement("textarea", {
    readOnly: true,
    value: Object.values(transforms).map(fn => fn(text)).join('\n\n')
  }), React.createElement("div", {
    className: "transforms"
  }, Object.values(transforms).map(fn => fn(text)).map((text, idx) => React.createElement("div", {
    key: idx
  }, text))));
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
const core = `0123456789qwertyuiopasdfghjklzxcvbnmQWERTYUIOPASDFGHJKLZXCVBNM\`-=[]\;',./~_+{}|:"<>?!@#$%^&*()`;

const createMap = string => {
  let map = {};
  string.split('').map((char, idx) => map[core[idx]] = char);
  return text => {
    return text.split('').map(char => {
      return map[char] || char;
    }).join('');
  };
}; // add singing
// add cthulu
// Add alarm


const tiny = createMap(`⁰¹²³⁴⁵⁶⁷⁸⁹ᵠʷᵉʳᵗʸᵘᶦᵒᵖᵃˢᵈᶠᵍʰʲᵏˡᶻˣᶜᵛᵇⁿᵐᵠᵂᴱᴿᵀʸᵁᴵᴼᴾᴬˢᴰᶠᴳᴴᴶᴷᴸᶻˣᶜⱽᴮᴺᴹ\`⁻⁼[]\;',./~_⁺{}|:"<>ˀᵎ@#$%^&*⁽⁾`);
const fullwidth = createMap(`０１２３４５６７８９ｑｗｅｒｔｙｕｉｏｐａｓｄｆｇｈｊｋｌｚｘｃｖｂｎｍＱＷＥＲＴＹＵＩＯＰＡＳＤＦＧＨＪＫＬＺＸＣＶＢＮＭ\`－＝[]＼；＇,.／~＿ ｛｝|："＜＞？！＠＃＄％＾＆＊（）`);
const old_timey = createMap(`0123456789𝖖𝖜𝖊𝖗𝖙𝖞𝖚𝖎𝖔𝖕𝖆𝖘𝖉𝖋𝖌𝖍𝖏𝖐𝖑𝖟𝖝𝖈𝖛𝖇𝖓𝖒𝕼𝖂𝕰𝕽𝕿𝖄𝖀𝕴𝕺𝕻𝕬𝕾𝕯𝕱𝕲𝕳𝕵𝕶𝕷𝖅𝖃𝕮𝖁𝕭𝕹𝕸\`-=[]\;',./~_+{}|:"<>?!@#$%^&*()`);
const italics = createMap(`0123456789𝘲𝘸𝘦𝘳𝘵𝘺𝘶𝘪𝘰𝘱𝘢𝘴𝘥𝘧𝘨𝘩𝘫𝘬𝘭𝘻𝘹𝘤𝘷𝘣𝘯𝘮𝘘𝘞𝘌𝘙𝘛𝘠𝘜𝘐𝘖𝘗𝘈𝘚𝘋𝘍𝘎𝘏𝘑𝘒𝘓𝘡𝘟𝘊𝘝𝘉𝘕𝘔\`-=[]\;',./~_+{}|:"<>?!@#$%^&*()`);
module.exports = {
  tiny,
  fullwidth,
  clapback: text => `👏${text.split(' ').join('👏')}👏`,
  goofy: text => text.toLowerCase().split('').map((char, idx) => idx % 2 == 0 ? char : char.toUpperCase()).join(''),
  old_timey,
  song: text => `🎵_${italics(text)}_🎵` // alert: +3

};
},{}]},{},[])("C:\\Dropbox\\root\\Programming\\Javascript\\slack-tools\\client\\main\\main.jsx")
});

//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm5vZGVfbW9kdWxlcy9icm93c2VyLXBhY2svX3ByZWx1ZGUuanMiLCJjbGllbnQvbWFpbi9tYWluLmpzeCIsImNsaWVudC9tYWluL21haW4ubGVzcyIsImNsaWVudC9tYWluL3RleHQudHJhbnNmb3Jtcy5qcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQTtBQ0FBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ25KQTs7QUNBQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSIsImZpbGUiOiJnZW5lcmF0ZWQuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlc0NvbnRlbnQiOlsiKGZ1bmN0aW9uKCl7ZnVuY3Rpb24gcihlLG4sdCl7ZnVuY3Rpb24gbyhpLGYpe2lmKCFuW2ldKXtpZighZVtpXSl7dmFyIGM9XCJmdW5jdGlvblwiPT10eXBlb2YgcmVxdWlyZSYmcmVxdWlyZTtpZighZiYmYylyZXR1cm4gYyhpLCEwKTtpZih1KXJldHVybiB1KGksITApO3ZhciBhPW5ldyBFcnJvcihcIkNhbm5vdCBmaW5kIG1vZHVsZSAnXCIraStcIidcIik7dGhyb3cgYS5jb2RlPVwiTU9EVUxFX05PVF9GT1VORFwiLGF9dmFyIHA9bltpXT17ZXhwb3J0czp7fX07ZVtpXVswXS5jYWxsKHAuZXhwb3J0cyxmdW5jdGlvbihyKXt2YXIgbj1lW2ldWzFdW3JdO3JldHVybiBvKG58fHIpfSxwLHAuZXhwb3J0cyxyLGUsbix0KX1yZXR1cm4gbltpXS5leHBvcnRzfWZvcih2YXIgdT1cImZ1bmN0aW9uXCI9PXR5cGVvZiByZXF1aXJlJiZyZXF1aXJlLGk9MDtpPHQubGVuZ3RoO2krKylvKHRbaV0pO3JldHVybiBvfXJldHVybiByfSkoKSIsImZ1bmN0aW9uIF9leHRlbmRzKCkgeyBfZXh0ZW5kcyA9IE9iamVjdC5hc3NpZ24gfHwgZnVuY3Rpb24gKHRhcmdldCkgeyBmb3IgKHZhciBpID0gMTsgaSA8IGFyZ3VtZW50cy5sZW5ndGg7IGkrKykgeyB2YXIgc291cmNlID0gYXJndW1lbnRzW2ldOyBmb3IgKHZhciBrZXkgaW4gc291cmNlKSB7IGlmIChPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGwoc291cmNlLCBrZXkpKSB7IHRhcmdldFtrZXldID0gc291cmNlW2tleV07IH0gfSB9IHJldHVybiB0YXJnZXQ7IH07IHJldHVybiBfZXh0ZW5kcy5hcHBseSh0aGlzLCBhcmd1bWVudHMpOyB9XG5cbnJlcXVpcmUoJy4vbWFpbi5sZXNzJyk7XG5cbmNvbnN0IFJlYWN0ID0gcmVxdWlyZSgncmVhY3QnKTtcblxuY29uc3Qge1xuICBUaXRsZVxufSA9IHJlcXVpcmUoJ3ZpdHJldW0vaGVhZHRhZ3MnKTtcblxuY29uc3QgSEVJR0hUID0gMjAwLFxuICAgICAgV0lEVEggPSAyMDA7XG5cbmZ1bmN0aW9uIFRleHRDYW52YXMoe1xuICB0ZXh0LFxuICBzaXplLFxuICBsaW5laGVpZ2h0LFxuICBzZXREYXRhVVJMLFxuICBzZXRTaXplXG59KSB7XG4gIGNvbnN0IGdldE1heFNpemUgPSAobGluZXMsIHNpemUgPSA3MCkgPT4ge1xuICAgIGN0eC5mb250ID0gYGJvbGQgJHtzaXplICsgMX1weCBDYWxpYnJpYDtcbiAgICBjb25zdCBiaWdnZXN0ID0gTWF0aC5tYXgoLi4ubGluZXMubWFwKHRleHQgPT4gY3R4Lm1lYXN1cmVUZXh0KHRleHQpLndpZHRoKSk7XG4gICAgaWYgKGJpZ2dlc3QgPj0gV0lEVEgpIHJldHVybiBzaXplO1xuICAgIHJldHVybiBnZXRNYXhTaXplKGxpbmVzLCBzaXplICsgMSk7XG4gIH07XG5cbiAgY29uc3QgY2FudmFzID0gUmVhY3QudXNlUmVmKG51bGwpO1xuICBjb25zdCBbY3R4LCBzZXRDdHhdID0gUmVhY3QudXNlU3RhdGUobnVsbCk7XG4gIFJlYWN0LnVzZUVmZmVjdCgoKSA9PiB7XG4gICAgY2FudmFzLmN1cnJlbnQgJiYgc2V0Q3R4KGNhbnZhcy5jdXJyZW50LmdldENvbnRleHQoJzJkJykpO1xuICB9LCBbY2FudmFzXSk7XG4gIFJlYWN0LnVzZUVmZmVjdCgoKSA9PiB7XG4gICAgY3R4ICYmIHRleHQgJiYgc2V0U2l6ZShnZXRNYXhTaXplKHRleHQuc3BsaXQoJ1xcbicpKSk7XG4gIH0sIFt0ZXh0XSk7XG5cbiAgaWYgKGN0eCkge1xuICAgIGN0eC5jbGVhclJlY3QoMCwgMCwgY2FudmFzLmN1cnJlbnQud2lkdGgsIGNhbnZhcy5jdXJyZW50LmhlaWdodCk7XG4gICAgY3R4LmZvbnQgPSBgYm9sZCAke3NpemV9cHggQ2FsaWJyaWA7XG4gICAgY3R4LmZpbGxTdHlsZSA9ICcjMDAwJztcbiAgICBjdHgudGV4dEJhc2VsaW5lID0gJ21pZGRsZSc7XG4gICAgY29uc3QgbGluZXMgPSB0ZXh0LnNwbGl0KCdcXG4nKTtcbiAgICBsaW5lcy5tYXAoKGxpbmUsIGlkeCkgPT4ge1xuICAgICAgY29uc3Qgd2lkdGggPSAoV0lEVEggLSBjdHgubWVhc3VyZVRleHQobGluZSkud2lkdGgpIC8gMjtcbiAgICAgIGNvbnN0IGhlaWdodCA9IEhFSUdIVCAvIDIgLSAobGluZXMubGVuZ3RoIC0gMSkgKiBsaW5laGVpZ2h0IC8gMiArIGlkeCAqIGxpbmVoZWlnaHQ7XG4gICAgICBjdHguZmlsbFRleHQobGluZSwgd2lkdGgsIGhlaWdodCk7XG4gICAgfSk7XG4gICAgc2V0RGF0YVVSTChjYW52YXMuY3VycmVudC50b0RhdGFVUkwoJ2ltYWdlL3BuZycpKTtcbiAgfVxuXG4gIDtcbiAgcmV0dXJuIFJlYWN0LmNyZWF0ZUVsZW1lbnQoXCJjYW52YXNcIiwge1xuICAgIHJlZjogY2FudmFzLFxuICAgIHdpZHRoOiBXSURUSCxcbiAgICBoZWlnaHQ6IEhFSUdIVFxuICB9KTtcbn1cblxuY29uc3Qge1xuICBGYXZpY29uXG59ID0gcmVxdWlyZSgndml0cmV1bS9oZWFkdGFncycpO1xuXG5mdW5jdGlvbiBFbW9qaU1ha2VyKHByb3BzKSB7XG4gIGNvbnN0IFt0ZXh0LCBzZXRUZXh0XSA9IFJlYWN0LnVzZVN0YXRlKCdZZXMnKTtcbiAgY29uc3QgW3NpemUsIHNldFNpemVdID0gUmVhY3QudXNlU3RhdGUoMTUwKTtcbiAgY29uc3QgW2xpbmVoZWlnaHQsIHNldExpbmVoZWlnaHRdID0gUmVhY3QudXNlU3RhdGUoNzUpO1xuICBjb25zdCBbZGF0YVVSTCwgc2V0RGF0YVVSTF0gPSBSZWFjdC51c2VTdGF0ZSgnJyk7XG4gIHJldHVybiBSZWFjdC5jcmVhdGVFbGVtZW50KFwiZGl2XCIsIHtcbiAgICBjbGFzc05hbWU6IFwiRW1vamlNYWtlclwiXG4gIH0sIFJlYWN0LmNyZWF0ZUVsZW1lbnQoRmF2aWNvbiwge1xuICAgIGhyZWY6IGRhdGFVUkxcbiAgfSksIFJlYWN0LmNyZWF0ZUVsZW1lbnQoXCJoMlwiLCBudWxsLCBcIlNsYWNrIFRleHQgRW1vamkgTWFrZXJcIiksIFJlYWN0LmNyZWF0ZUVsZW1lbnQoXCJkaXZcIiwge1xuICAgIGNsYXNzTmFtZTogXCJjb250cm9sc1wiXG4gIH0sIFJlYWN0LmNyZWF0ZUVsZW1lbnQoXCJkaXZcIiwgbnVsbCwgUmVhY3QuY3JlYXRlRWxlbWVudChcImxhYmVsXCIsIG51bGwsIFwiVGV4dFwiKSwgUmVhY3QuY3JlYXRlRWxlbWVudChcInRleHRhcmVhXCIsIHtcbiAgICB2YWx1ZTogdGV4dCxcbiAgICBvbkNoYW5nZTogZXZ0ID0+IHNldFRleHQoZXZ0LnRhcmdldC52YWx1ZSksXG4gICAgcm93czogM1xuICB9KSksIFJlYWN0LmNyZWF0ZUVsZW1lbnQoXCJkaXZcIiwgbnVsbCwgUmVhY3QuY3JlYXRlRWxlbWVudChcImxhYmVsXCIsIG51bGwsIFwiU2l6ZVwiKSwgUmVhY3QuY3JlYXRlRWxlbWVudChcImlucHV0XCIsIHtcbiAgICB0eXBlOiBcInJhbmdlXCIsXG4gICAgbWluOiA4MCxcbiAgICBtYXg6IDI1MCxcbiAgICB2YWx1ZTogc2l6ZSxcbiAgICBvbkNoYW5nZTogZXZ0ID0+IHNldFNpemUoZXZ0LnRhcmdldC52YWx1ZSlcbiAgfSksIHNpemUsIFJlYWN0LmNyZWF0ZUVsZW1lbnQoXCJidXR0b25cIiwge1xuICAgIG9uQ2xpY2s6ICgpID0+IHNldFNpemUoMTUwKVxuICB9LCBcIlN0YW5kYXJkIFNpemVcIikpLCBSZWFjdC5jcmVhdGVFbGVtZW50KFwiZGl2XCIsIG51bGwsIFJlYWN0LmNyZWF0ZUVsZW1lbnQoXCJsYWJlbFwiLCBudWxsLCBcIlNwYWNpbmdcIiksIFJlYWN0LmNyZWF0ZUVsZW1lbnQoXCJpbnB1dFwiLCB7XG4gICAgdHlwZTogXCJyYW5nZVwiLFxuICAgIG1pbjogNDAsXG4gICAgbWF4OiAxMjAsXG4gICAgdmFsdWU6IGxpbmVoZWlnaHQsXG4gICAgb25DaGFuZ2U6IGV2dCA9PiBzZXRMaW5laGVpZ2h0KGV2dC50YXJnZXQudmFsdWUpXG4gIH0pLCBsaW5laGVpZ2h0KSksIFJlYWN0LmNyZWF0ZUVsZW1lbnQoXCJkaXZcIiwge1xuICAgIGNsYXNzTmFtZTogXCJyZW5kZXJcIlxuICB9LCBSZWFjdC5jcmVhdGVFbGVtZW50KFRleHRDYW52YXMsIHtcbiAgICB0ZXh0LFxuICAgIHNpemUsXG4gICAgbGluZWhlaWdodCxcbiAgICBzZXREYXRhVVJMLFxuICAgIHNldFNpemVcbiAgfSksIFJlYWN0LmNyZWF0ZUVsZW1lbnQoXCJkaXZcIiwge1xuICAgIGNsYXNzTmFtZTogXCJleGFtcGxlXCJcbiAgfSwgXCJUaGlzIGlzIGl0IHVzZWQgaW4gdGV4dC4gXCIsIFJlYWN0LmNyZWF0ZUVsZW1lbnQoXCJpbWdcIiwge1xuICAgIGNsYXNzTmFtZTogXCJzYW1wbGVcIixcbiAgICBzcmM6IGRhdGFVUkxcbiAgfSksIFwiIEFsc28gdGhlIHRhYiBpY29uIGlzIHVwZGF0ZWQuXCIpKSwgUmVhY3QuY3JlYXRlRWxlbWVudChcImRpdlwiLCB7XG4gICAgY2xhc3NOYW1lOiBcImluc3RydWN0aW9uc1wiXG4gIH0sIFJlYWN0LmNyZWF0ZUVsZW1lbnQoXCJoM1wiLCBudWxsLCBcImluc3RydWN0aW9uc1wiKSwgUmVhY3QuY3JlYXRlRWxlbWVudChcIm9sXCIsIG51bGwsIFJlYWN0LmNyZWF0ZUVsZW1lbnQoXCJsaVwiLCBudWxsLCBcIkN1c3RvbWl6ZSB5b3VyIHRleHQgZW1vamlcIiksIFJlYWN0LmNyZWF0ZUVsZW1lbnQoXCJsaVwiLCBudWxsLCBSZWFjdC5jcmVhdGVFbGVtZW50KFwiYVwiLCB7XG4gICAgaHJlZjogZGF0YVVSTCxcbiAgICB0YXJnZXQ6IFwiX2JsYW5rXCIsXG4gICAgZG93bmxvYWQ6IGAke3RleHQucmVwbGFjZSgnXFxuJywgJ18nKX0ucG5nYFxuICB9LCBcIkRvd25sb2FkIEl0XCIpKSwgUmVhY3QuY3JlYXRlRWxlbWVudChcImxpXCIsIG51bGwsIFJlYWN0LmNyZWF0ZUVsZW1lbnQoXCJhXCIsIHtcbiAgICBocmVmOiBcImh0dHBzOi8vY29vbHN2aWxsZS5zbGFjay5jb20vY3VzdG9taXplL2Vtb2ppXCIsXG4gICAgdGFyZ2V0OiBcIl9ibGFua1wiXG4gIH0sIFwiQWRkIEVtb2ppIHRvIFNsYWNrXCIpKSkpKTtcbn0gLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vXG5cblxuY29uc3QgdHJhbnNmb3JtcyA9IHJlcXVpcmUoJy4vdGV4dC50cmFuc2Zvcm1zLmpzJyk7XG5cbmZ1bmN0aW9uIFRleHRUcmFuc2Zvcm0ocHJvcHMpIHtcbiAgY29uc3QgW3RleHQsIHNldFRleHRdID0gUmVhY3QudXNlU3RhdGUoJ29oIGhlbGxvLicpO1xuICBjb25zdCBkaXZpZGVyID0gUmVhY3QuY3JlYXRlRWxlbWVudChcImJyXCIsIG51bGwpO1xuICByZXR1cm4gUmVhY3QuY3JlYXRlRWxlbWVudChcImRpdlwiLCB7XG4gICAgY2xhc3NOYW1lOiBcIlRleHRUcmFuc2Zvcm1cIlxuICB9LCBSZWFjdC5jcmVhdGVFbGVtZW50KFwiaDJcIiwgbnVsbCwgXCJUZXh0IFRyYW5zZm9ybVwiKSwgUmVhY3QuY3JlYXRlRWxlbWVudChcInRleHRhcmVhXCIsIHtcbiAgICBvbkNoYW5nZTogZXZ0ID0+IHNldFRleHQoZXZ0LnRhcmdldC52YWx1ZSksXG4gICAgdmFsdWU6IHRleHRcbiAgfSksIFJlYWN0LmNyZWF0ZUVsZW1lbnQoXCJ0ZXh0YXJlYVwiLCB7XG4gICAgcmVhZE9ubHk6IHRydWUsXG4gICAgdmFsdWU6IE9iamVjdC52YWx1ZXModHJhbnNmb3JtcykubWFwKGZuID0+IGZuKHRleHQpKS5qb2luKCdcXG5cXG4nKVxuICB9KSwgUmVhY3QuY3JlYXRlRWxlbWVudChcImRpdlwiLCB7XG4gICAgY2xhc3NOYW1lOiBcInRyYW5zZm9ybXNcIlxuICB9LCBPYmplY3QudmFsdWVzKHRyYW5zZm9ybXMpLm1hcChmbiA9PiBmbih0ZXh0KSkubWFwKCh0ZXh0LCBpZHgpID0+IFJlYWN0LmNyZWF0ZUVsZW1lbnQoXCJkaXZcIiwge1xuICAgIGtleTogaWR4XG4gIH0sIHRleHQpKSkpO1xufSAvLy8vLy8vLy8vLy8vLy8vLy9cblxuXG5mdW5jdGlvbiBNYWluKF9yZWYpIHtcbiAgbGV0IHByb3BzID0gX2V4dGVuZHMoe30sIF9yZWYpO1xuXG4gIHJldHVybiBSZWFjdC5jcmVhdGVFbGVtZW50KFwiZGl2XCIsIF9leHRlbmRzKHtcbiAgICBjbGFzc05hbWU6IGBNYWluYFxuICB9LCBwcm9wcyksIFJlYWN0LmNyZWF0ZUVsZW1lbnQoVGl0bGUsIG51bGwsIFwiU2xhY2sgVG9vbHNcIiksIFJlYWN0LmNyZWF0ZUVsZW1lbnQoXCJoMVwiLCBudWxsLCBcIlNsYWNrIFRvb2xzXCIpLCBSZWFjdC5jcmVhdGVFbGVtZW50KFwiaHJcIiwgbnVsbCksIFJlYWN0LmNyZWF0ZUVsZW1lbnQoVGV4dFRyYW5zZm9ybSwgbnVsbCksIFJlYWN0LmNyZWF0ZUVsZW1lbnQoXCJoclwiLCBudWxsKSwgUmVhY3QuY3JlYXRlRWxlbWVudChFbW9qaU1ha2VyLCBudWxsKSk7XG59XG5cbjtcbm1vZHVsZS5leHBvcnRzID0gTWFpbjsiLCIiLCJjb25zdCBjb3JlID0gYDAxMjM0NTY3ODlxd2VydHl1aW9wYXNkZmdoamtsenhjdmJubVFXRVJUWVVJT1BBU0RGR0hKS0xaWENWQk5NXFxgLT1bXVxcOycsLi9+Xyt7fXw6XCI8Pj8hQCMkJV4mKigpYDtcblxuY29uc3QgY3JlYXRlTWFwID0gc3RyaW5nID0+IHtcbiAgbGV0IG1hcCA9IHt9O1xuICBzdHJpbmcuc3BsaXQoJycpLm1hcCgoY2hhciwgaWR4KSA9PiBtYXBbY29yZVtpZHhdXSA9IGNoYXIpO1xuICByZXR1cm4gdGV4dCA9PiB7XG4gICAgcmV0dXJuIHRleHQuc3BsaXQoJycpLm1hcChjaGFyID0+IHtcbiAgICAgIHJldHVybiBtYXBbY2hhcl0gfHwgY2hhcjtcbiAgICB9KS5qb2luKCcnKTtcbiAgfTtcbn07IC8vIGFkZCBzaW5naW5nXG4vLyBhZGQgY3RodWx1XG4vLyBBZGQgYWxhcm1cblxuXG5jb25zdCB0aW55ID0gY3JlYXRlTWFwKGDigbDCucKywrPigbTigbXigbbigbfigbjigbnhtaDKt+G1icqz4bWXyrjhtZjhtqbhtZLhtZbhtYPLouG1iOG2oOG1jcqwyrLhtY/LoeG2u8uj4bac4bWb4bWH4oG/4bWQ4bWg4bWC4bSx4bS/4bWAyrjhtYHhtLXhtLzhtL7htKzLouG0sOG2oOG0s+G0tOG0tuG0t+G0uOG2u8uj4bac4rG94bSu4bS64bS5XFxg4oG74oG8W11cXDsnLC4vfl/igbp7fXw6XCI8PsuA4bWOQCMkJV4mKuKBveKBvmApO1xuY29uc3QgZnVsbHdpZHRoID0gY3JlYXRlTWFwKGDvvJDvvJHvvJLvvJPvvJTvvJXvvJbvvJfvvJjvvJnvvZHvvZfvvYXvvZLvvZTvvZnvvZXvvYnvvY/vvZDvvYHvvZPvvYTvvYbvvYfvvYjvvYrvvYvvvYzvvZrvvZjvvYPvvZbvvYLvvY7vvY3vvLHvvLfvvKXvvLLvvLTvvLnvvLXvvKnvvK/vvLDvvKHvvLPvvKTvvKbvvKfvvKjvvKrvvKvvvKzvvLrvvLjvvKPvvLbvvKLvvK7vvK1cXGDvvI3vvJ1bXe+8vO+8m++8hywu77yPfu+8vyDvvZvvvZ1877yaXCLvvJzvvJ7vvJ/vvIHvvKDvvIPvvITvvIXvvL7vvIbvvIrvvIjvvIlgKTtcbmNvbnN0IG9sZF90aW1leSA9IGNyZWF0ZU1hcChgMDEyMzQ1Njc4OfCdlpbwnZac8J2WivCdlpfwnZaZ8J2WnvCdlprwnZaO8J2WlPCdlpXwnZaG8J2WmPCdlonwnZaL8J2WjPCdlo3wnZaP8J2WkPCdlpHwnZaf8J2WnfCdlojwnZab8J2Wh/CdlpPwnZaS8J2VvPCdloLwnZWw8J2VvfCdlb/wnZaE8J2WgPCdlbTwnZW68J2Vu/CdlazwnZW+8J2Vr/CdlbHwnZWy8J2Vs/CdlbXwnZW28J2Vt/CdloXwnZaD8J2VrvCdloHwnZWt8J2VufCdlbhcXGAtPVtdXFw7JywuL35fK3t9fDpcIjw+PyFAIyQlXiYqKClgKTtcbmNvbnN0IGl0YWxpY3MgPSBjcmVhdGVNYXAoYDAxMjM0NTY3ODnwnZiy8J2YuPCdmKbwnZiz8J2YtfCdmLrwnZi28J2YqvCdmLDwnZix8J2YovCdmLTwnZil8J2Yp/CdmKjwnZip8J2Yq/CdmKzwnZit8J2Yu/CdmLnwnZik8J2Yt/CdmKPwnZiv8J2YrvCdmJjwnZie8J2YjPCdmJnwnZib8J2YoPCdmJzwnZiQ8J2YlvCdmJfwnZiI8J2YmvCdmIvwnZiN8J2YjvCdmI/wnZiR8J2YkvCdmJPwnZih8J2Yn/CdmIrwnZid8J2YifCdmJXwnZiUXFxgLT1bXVxcOycsLi9+Xyt7fXw6XCI8Pj8hQCMkJV4mKigpYCk7XG5tb2R1bGUuZXhwb3J0cyA9IHtcbiAgdGlueSxcbiAgZnVsbHdpZHRoLFxuICBjbGFwYmFjazogdGV4dCA9PiBg8J+RjyR7dGV4dC5zcGxpdCgnICcpLmpvaW4oJ/CfkY8nKX3wn5GPYCxcbiAgZ29vZnk6IHRleHQgPT4gdGV4dC50b0xvd2VyQ2FzZSgpLnNwbGl0KCcnKS5tYXAoKGNoYXIsIGlkeCkgPT4gaWR4ICUgMiA9PSAwID8gY2hhciA6IGNoYXIudG9VcHBlckNhc2UoKSkuam9pbignJyksXG4gIG9sZF90aW1leSxcbiAgc29uZzogdGV4dCA9PiBg8J+OtV8ke2l0YWxpY3ModGV4dCl9X/CfjrVgIC8vIGFsZXJ0OiArM1xuXG59OyJdfQ==
