(function(f){if(typeof exports==="object"&&typeof module!=="undefined"){module.exports=f()}else if(typeof define==="function"&&define.amd){define([],f)}else{var g;if(typeof window!=="undefined"){g=window}else if(typeof global!=="undefined"){g=global}else if(typeof self!=="undefined"){g=self}else{g=this}g.main = f()}})(function(){var define,module,exports;return (function(){function r(e,n,t){function o(i,f){if(!n[i]){if(!e[i]){var c="function"==typeof require&&require;if(!f&&c)return c(i,!0);if(u)return u(i,!0);var a=new Error("Cannot find module '"+i+"'");throw a.code="MODULE_NOT_FOUND",a}var p=n[i]={exports:{}};e[i][0].call(p.exports,function(r){var n=e[i][1][r];return o(n||r)},p,p.exports,r,e,n,t)}return n[i].exports}for(var u="function"==typeof require&&require,i=0;i<t.length;i++)o(t[i]);return o}return r})()({"C:\\Dropbox\\root\\Programming\\Javascript\\emoji-maker\\client\\main\\main.jsx":[function(require,module,exports){
function _extends() { _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

require('./main.less');

const React = require('react');

const {
  Title,
  Favicon
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

function Main(_ref) {
  let props = _extends({}, _ref);

  const [text, setText] = React.useState('Yes');
  const [size, setSize] = React.useState(150);
  const [lineheight, setLineheight] = React.useState(75);
  const [dataURL, setDataURL] = React.useState('');
  return React.createElement("div", _extends({
    className: `Main`
  }, props), React.createElement(Title, null, "Emoji Maker"), React.createElement(Favicon, {
    href: dataURL
  }), React.createElement("h1", null, "Slack Text Emoji Maker"), React.createElement("div", {
    className: "controls"
  }, React.createElement("div", null, React.createElement("label", null, "Text"), React.createElement("textarea", {
    value: text,
    onChange: evt => setText(evt.target.value),
    rows: 3
  })), React.createElement("div", null, React.createElement("label", null, "Size"), React.createElement("input", {
    type: "range",
    min: 80,
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

;
module.exports = Main;
},{"./main.less":1,"react":undefined,"vitreum/headtags":undefined}],1:[function(require,module,exports){

},{}]},{},[])("C:\\Dropbox\\root\\Programming\\Javascript\\emoji-maker\\client\\main\\main.jsx")
});

//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm5vZGVfbW9kdWxlcy9icm93c2VyLXBhY2svX3ByZWx1ZGUuanMiLCJjbGllbnQvbWFpbi9tYWluLmpzeCIsImNsaWVudC9tYWluL21haW4ubGVzcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQTtBQ0FBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ2xIQSIsImZpbGUiOiJnZW5lcmF0ZWQuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlc0NvbnRlbnQiOlsiKGZ1bmN0aW9uKCl7ZnVuY3Rpb24gcihlLG4sdCl7ZnVuY3Rpb24gbyhpLGYpe2lmKCFuW2ldKXtpZighZVtpXSl7dmFyIGM9XCJmdW5jdGlvblwiPT10eXBlb2YgcmVxdWlyZSYmcmVxdWlyZTtpZighZiYmYylyZXR1cm4gYyhpLCEwKTtpZih1KXJldHVybiB1KGksITApO3ZhciBhPW5ldyBFcnJvcihcIkNhbm5vdCBmaW5kIG1vZHVsZSAnXCIraStcIidcIik7dGhyb3cgYS5jb2RlPVwiTU9EVUxFX05PVF9GT1VORFwiLGF9dmFyIHA9bltpXT17ZXhwb3J0czp7fX07ZVtpXVswXS5jYWxsKHAuZXhwb3J0cyxmdW5jdGlvbihyKXt2YXIgbj1lW2ldWzFdW3JdO3JldHVybiBvKG58fHIpfSxwLHAuZXhwb3J0cyxyLGUsbix0KX1yZXR1cm4gbltpXS5leHBvcnRzfWZvcih2YXIgdT1cImZ1bmN0aW9uXCI9PXR5cGVvZiByZXF1aXJlJiZyZXF1aXJlLGk9MDtpPHQubGVuZ3RoO2krKylvKHRbaV0pO3JldHVybiBvfXJldHVybiByfSkoKSIsImZ1bmN0aW9uIF9leHRlbmRzKCkgeyBfZXh0ZW5kcyA9IE9iamVjdC5hc3NpZ24gfHwgZnVuY3Rpb24gKHRhcmdldCkgeyBmb3IgKHZhciBpID0gMTsgaSA8IGFyZ3VtZW50cy5sZW5ndGg7IGkrKykgeyB2YXIgc291cmNlID0gYXJndW1lbnRzW2ldOyBmb3IgKHZhciBrZXkgaW4gc291cmNlKSB7IGlmIChPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGwoc291cmNlLCBrZXkpKSB7IHRhcmdldFtrZXldID0gc291cmNlW2tleV07IH0gfSB9IHJldHVybiB0YXJnZXQ7IH07IHJldHVybiBfZXh0ZW5kcy5hcHBseSh0aGlzLCBhcmd1bWVudHMpOyB9XG5cbnJlcXVpcmUoJy4vbWFpbi5sZXNzJyk7XG5cbmNvbnN0IFJlYWN0ID0gcmVxdWlyZSgncmVhY3QnKTtcblxuY29uc3Qge1xuICBUaXRsZSxcbiAgRmF2aWNvblxufSA9IHJlcXVpcmUoJ3ZpdHJldW0vaGVhZHRhZ3MnKTtcblxuY29uc3QgSEVJR0hUID0gMjAwLFxuICAgICAgV0lEVEggPSAyMDA7XG5cbmZ1bmN0aW9uIFRleHRDYW52YXMoe1xuICB0ZXh0LFxuICBzaXplLFxuICBsaW5laGVpZ2h0LFxuICBzZXREYXRhVVJMLFxuICBzZXRTaXplXG59KSB7XG4gIGNvbnN0IGdldE1heFNpemUgPSAobGluZXMsIHNpemUgPSA3MCkgPT4ge1xuICAgIGN0eC5mb250ID0gYGJvbGQgJHtzaXplICsgMX1weCBDYWxpYnJpYDtcbiAgICBjb25zdCBiaWdnZXN0ID0gTWF0aC5tYXgoLi4ubGluZXMubWFwKHRleHQgPT4gY3R4Lm1lYXN1cmVUZXh0KHRleHQpLndpZHRoKSk7XG4gICAgaWYgKGJpZ2dlc3QgPj0gV0lEVEgpIHJldHVybiBzaXplO1xuICAgIHJldHVybiBnZXRNYXhTaXplKGxpbmVzLCBzaXplICsgMSk7XG4gIH07XG5cbiAgY29uc3QgY2FudmFzID0gUmVhY3QudXNlUmVmKG51bGwpO1xuICBjb25zdCBbY3R4LCBzZXRDdHhdID0gUmVhY3QudXNlU3RhdGUobnVsbCk7XG4gIFJlYWN0LnVzZUVmZmVjdCgoKSA9PiB7XG4gICAgY2FudmFzLmN1cnJlbnQgJiYgc2V0Q3R4KGNhbnZhcy5jdXJyZW50LmdldENvbnRleHQoJzJkJykpO1xuICB9LCBbY2FudmFzXSk7XG4gIFJlYWN0LnVzZUVmZmVjdCgoKSA9PiB7XG4gICAgY3R4ICYmIHRleHQgJiYgc2V0U2l6ZShnZXRNYXhTaXplKHRleHQuc3BsaXQoJ1xcbicpKSk7XG4gIH0sIFt0ZXh0XSk7XG5cbiAgaWYgKGN0eCkge1xuICAgIGN0eC5jbGVhclJlY3QoMCwgMCwgY2FudmFzLmN1cnJlbnQud2lkdGgsIGNhbnZhcy5jdXJyZW50LmhlaWdodCk7XG4gICAgY3R4LmZvbnQgPSBgYm9sZCAke3NpemV9cHggQ2FsaWJyaWA7XG4gICAgY3R4LmZpbGxTdHlsZSA9ICcjMDAwJztcbiAgICBjdHgudGV4dEJhc2VsaW5lID0gJ21pZGRsZSc7XG4gICAgY29uc3QgbGluZXMgPSB0ZXh0LnNwbGl0KCdcXG4nKTtcbiAgICBsaW5lcy5tYXAoKGxpbmUsIGlkeCkgPT4ge1xuICAgICAgY29uc3Qgd2lkdGggPSAoV0lEVEggLSBjdHgubWVhc3VyZVRleHQobGluZSkud2lkdGgpIC8gMjtcbiAgICAgIGNvbnN0IGhlaWdodCA9IEhFSUdIVCAvIDIgLSAobGluZXMubGVuZ3RoIC0gMSkgKiBsaW5laGVpZ2h0IC8gMiArIGlkeCAqIGxpbmVoZWlnaHQ7XG4gICAgICBjdHguZmlsbFRleHQobGluZSwgd2lkdGgsIGhlaWdodCk7XG4gICAgfSk7XG4gICAgc2V0RGF0YVVSTChjYW52YXMuY3VycmVudC50b0RhdGFVUkwoJ2ltYWdlL3BuZycpKTtcbiAgfVxuXG4gIDtcbiAgcmV0dXJuIFJlYWN0LmNyZWF0ZUVsZW1lbnQoXCJjYW52YXNcIiwge1xuICAgIHJlZjogY2FudmFzLFxuICAgIHdpZHRoOiBXSURUSCxcbiAgICBoZWlnaHQ6IEhFSUdIVFxuICB9KTtcbn1cblxuZnVuY3Rpb24gTWFpbihfcmVmKSB7XG4gIGxldCBwcm9wcyA9IF9leHRlbmRzKHt9LCBfcmVmKTtcblxuICBjb25zdCBbdGV4dCwgc2V0VGV4dF0gPSBSZWFjdC51c2VTdGF0ZSgnWWVzJyk7XG4gIGNvbnN0IFtzaXplLCBzZXRTaXplXSA9IFJlYWN0LnVzZVN0YXRlKDE1MCk7XG4gIGNvbnN0IFtsaW5laGVpZ2h0LCBzZXRMaW5laGVpZ2h0XSA9IFJlYWN0LnVzZVN0YXRlKDc1KTtcbiAgY29uc3QgW2RhdGFVUkwsIHNldERhdGFVUkxdID0gUmVhY3QudXNlU3RhdGUoJycpO1xuICByZXR1cm4gUmVhY3QuY3JlYXRlRWxlbWVudChcImRpdlwiLCBfZXh0ZW5kcyh7XG4gICAgY2xhc3NOYW1lOiBgTWFpbmBcbiAgfSwgcHJvcHMpLCBSZWFjdC5jcmVhdGVFbGVtZW50KFRpdGxlLCBudWxsLCBcIkVtb2ppIE1ha2VyXCIpLCBSZWFjdC5jcmVhdGVFbGVtZW50KEZhdmljb24sIHtcbiAgICBocmVmOiBkYXRhVVJMXG4gIH0pLCBSZWFjdC5jcmVhdGVFbGVtZW50KFwiaDFcIiwgbnVsbCwgXCJTbGFjayBUZXh0IEVtb2ppIE1ha2VyXCIpLCBSZWFjdC5jcmVhdGVFbGVtZW50KFwiZGl2XCIsIHtcbiAgICBjbGFzc05hbWU6IFwiY29udHJvbHNcIlxuICB9LCBSZWFjdC5jcmVhdGVFbGVtZW50KFwiZGl2XCIsIG51bGwsIFJlYWN0LmNyZWF0ZUVsZW1lbnQoXCJsYWJlbFwiLCBudWxsLCBcIlRleHRcIiksIFJlYWN0LmNyZWF0ZUVsZW1lbnQoXCJ0ZXh0YXJlYVwiLCB7XG4gICAgdmFsdWU6IHRleHQsXG4gICAgb25DaGFuZ2U6IGV2dCA9PiBzZXRUZXh0KGV2dC50YXJnZXQudmFsdWUpLFxuICAgIHJvd3M6IDNcbiAgfSkpLCBSZWFjdC5jcmVhdGVFbGVtZW50KFwiZGl2XCIsIG51bGwsIFJlYWN0LmNyZWF0ZUVsZW1lbnQoXCJsYWJlbFwiLCBudWxsLCBcIlNpemVcIiksIFJlYWN0LmNyZWF0ZUVsZW1lbnQoXCJpbnB1dFwiLCB7XG4gICAgdHlwZTogXCJyYW5nZVwiLFxuICAgIG1pbjogODAsXG4gICAgbWF4OiAyMDAsXG4gICAgdmFsdWU6IHNpemUsXG4gICAgb25DaGFuZ2U6IGV2dCA9PiBzZXRTaXplKGV2dC50YXJnZXQudmFsdWUpXG4gIH0pLCBzaXplKSwgUmVhY3QuY3JlYXRlRWxlbWVudChcImRpdlwiLCBudWxsLCBSZWFjdC5jcmVhdGVFbGVtZW50KFwibGFiZWxcIiwgbnVsbCwgXCJTcGFjaW5nXCIpLCBSZWFjdC5jcmVhdGVFbGVtZW50KFwiaW5wdXRcIiwge1xuICAgIHR5cGU6IFwicmFuZ2VcIixcbiAgICBtaW46IDQwLFxuICAgIG1heDogMTIwLFxuICAgIHZhbHVlOiBsaW5laGVpZ2h0LFxuICAgIG9uQ2hhbmdlOiBldnQgPT4gc2V0TGluZWhlaWdodChldnQudGFyZ2V0LnZhbHVlKVxuICB9KSwgbGluZWhlaWdodCkpLCBSZWFjdC5jcmVhdGVFbGVtZW50KFwiZGl2XCIsIHtcbiAgICBjbGFzc05hbWU6IFwicmVuZGVyXCJcbiAgfSwgUmVhY3QuY3JlYXRlRWxlbWVudChUZXh0Q2FudmFzLCB7XG4gICAgdGV4dCxcbiAgICBzaXplLFxuICAgIGxpbmVoZWlnaHQsXG4gICAgc2V0RGF0YVVSTCxcbiAgICBzZXRTaXplXG4gIH0pLCBSZWFjdC5jcmVhdGVFbGVtZW50KFwiZGl2XCIsIHtcbiAgICBjbGFzc05hbWU6IFwiZXhhbXBsZVwiXG4gIH0sIFwiVGhpcyBpcyBpdCB1c2VkIGluIHRleHQuIFwiLCBSZWFjdC5jcmVhdGVFbGVtZW50KFwiaW1nXCIsIHtcbiAgICBjbGFzc05hbWU6IFwic2FtcGxlXCIsXG4gICAgc3JjOiBkYXRhVVJMXG4gIH0pLCBcIiBBbHNvIHRoZSB0YWIgaWNvbiBpcyB1cGRhdGVkLlwiKSksIFJlYWN0LmNyZWF0ZUVsZW1lbnQoXCJkaXZcIiwge1xuICAgIGNsYXNzTmFtZTogXCJpbnN0cnVjdGlvbnNcIlxuICB9LCBSZWFjdC5jcmVhdGVFbGVtZW50KFwiaDNcIiwgbnVsbCwgXCJpbnN0cnVjdGlvbnNcIiksIFJlYWN0LmNyZWF0ZUVsZW1lbnQoXCJvbFwiLCBudWxsLCBSZWFjdC5jcmVhdGVFbGVtZW50KFwibGlcIiwgbnVsbCwgXCJDdXN0b21pemUgeW91ciB0ZXh0IGVtb2ppXCIpLCBSZWFjdC5jcmVhdGVFbGVtZW50KFwibGlcIiwgbnVsbCwgUmVhY3QuY3JlYXRlRWxlbWVudChcImFcIiwge1xuICAgIGhyZWY6IGRhdGFVUkwsXG4gICAgdGFyZ2V0OiBcIl9ibGFua1wiLFxuICAgIGRvd25sb2FkOiBgJHt0ZXh0LnJlcGxhY2UoJ1xcbicsICdfJyl9LnBuZ2BcbiAgfSwgXCJEb3dubG9hZCBJdFwiKSksIFJlYWN0LmNyZWF0ZUVsZW1lbnQoXCJsaVwiLCBudWxsLCBSZWFjdC5jcmVhdGVFbGVtZW50KFwiYVwiLCB7XG4gICAgaHJlZjogXCJodHRwczovL2Nvb2xzdmlsbGUuc2xhY2suY29tL2N1c3RvbWl6ZS9lbW9qaVwiLFxuICAgIHRhcmdldDogXCJfYmxhbmtcIlxuICB9LCBcIkFkZCBFbW9qaSB0byBTbGFja1wiKSkpKSk7XG59XG5cbjtcbm1vZHVsZS5leHBvcnRzID0gTWFpbjsiLCIiXX0=
