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

;
module.exports = Main;
},{"./main.less":1,"react":undefined,"vitreum/headtags":undefined}],1:[function(require,module,exports){

},{}]},{},[])("C:\\Dropbox\\root\\Programming\\Javascript\\emoji-maker\\client\\main\\main.jsx")
});

//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm5vZGVfbW9kdWxlcy9icm93c2VyLXBhY2svX3ByZWx1ZGUuanMiLCJjbGllbnQvbWFpbi9tYWluLmpzeCIsImNsaWVudC9tYWluL21haW4ubGVzcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQTtBQ0FBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUNwSEEiLCJmaWxlIjoiZ2VuZXJhdGVkLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXNDb250ZW50IjpbIihmdW5jdGlvbigpe2Z1bmN0aW9uIHIoZSxuLHQpe2Z1bmN0aW9uIG8oaSxmKXtpZighbltpXSl7aWYoIWVbaV0pe3ZhciBjPVwiZnVuY3Rpb25cIj09dHlwZW9mIHJlcXVpcmUmJnJlcXVpcmU7aWYoIWYmJmMpcmV0dXJuIGMoaSwhMCk7aWYodSlyZXR1cm4gdShpLCEwKTt2YXIgYT1uZXcgRXJyb3IoXCJDYW5ub3QgZmluZCBtb2R1bGUgJ1wiK2krXCInXCIpO3Rocm93IGEuY29kZT1cIk1PRFVMRV9OT1RfRk9VTkRcIixhfXZhciBwPW5baV09e2V4cG9ydHM6e319O2VbaV1bMF0uY2FsbChwLmV4cG9ydHMsZnVuY3Rpb24ocil7dmFyIG49ZVtpXVsxXVtyXTtyZXR1cm4gbyhufHxyKX0scCxwLmV4cG9ydHMscixlLG4sdCl9cmV0dXJuIG5baV0uZXhwb3J0c31mb3IodmFyIHU9XCJmdW5jdGlvblwiPT10eXBlb2YgcmVxdWlyZSYmcmVxdWlyZSxpPTA7aTx0Lmxlbmd0aDtpKyspbyh0W2ldKTtyZXR1cm4gb31yZXR1cm4gcn0pKCkiLCJmdW5jdGlvbiBfZXh0ZW5kcygpIHsgX2V4dGVuZHMgPSBPYmplY3QuYXNzaWduIHx8IGZ1bmN0aW9uICh0YXJnZXQpIHsgZm9yICh2YXIgaSA9IDE7IGkgPCBhcmd1bWVudHMubGVuZ3RoOyBpKyspIHsgdmFyIHNvdXJjZSA9IGFyZ3VtZW50c1tpXTsgZm9yICh2YXIga2V5IGluIHNvdXJjZSkgeyBpZiAoT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsKHNvdXJjZSwga2V5KSkgeyB0YXJnZXRba2V5XSA9IHNvdXJjZVtrZXldOyB9IH0gfSByZXR1cm4gdGFyZ2V0OyB9OyByZXR1cm4gX2V4dGVuZHMuYXBwbHkodGhpcywgYXJndW1lbnRzKTsgfVxuXG5yZXF1aXJlKCcuL21haW4ubGVzcycpO1xuXG5jb25zdCBSZWFjdCA9IHJlcXVpcmUoJ3JlYWN0Jyk7XG5cbmNvbnN0IHtcbiAgVGl0bGUsXG4gIEZhdmljb25cbn0gPSByZXF1aXJlKCd2aXRyZXVtL2hlYWR0YWdzJyk7XG5cbmNvbnN0IEhFSUdIVCA9IDIwMCxcbiAgICAgIFdJRFRIID0gMjAwO1xuXG5mdW5jdGlvbiBUZXh0Q2FudmFzKHtcbiAgdGV4dCxcbiAgc2l6ZSxcbiAgbGluZWhlaWdodCxcbiAgc2V0RGF0YVVSTCxcbiAgc2V0U2l6ZVxufSkge1xuICBjb25zdCBnZXRNYXhTaXplID0gKGxpbmVzLCBzaXplID0gNzApID0+IHtcbiAgICBjdHguZm9udCA9IGBib2xkICR7c2l6ZSArIDF9cHggQ2FsaWJyaWA7XG4gICAgY29uc3QgYmlnZ2VzdCA9IE1hdGgubWF4KC4uLmxpbmVzLm1hcCh0ZXh0ID0+IGN0eC5tZWFzdXJlVGV4dCh0ZXh0KS53aWR0aCkpO1xuICAgIGlmIChiaWdnZXN0ID49IFdJRFRIKSByZXR1cm4gc2l6ZTtcbiAgICByZXR1cm4gZ2V0TWF4U2l6ZShsaW5lcywgc2l6ZSArIDEpO1xuICB9O1xuXG4gIGNvbnN0IGNhbnZhcyA9IFJlYWN0LnVzZVJlZihudWxsKTtcbiAgY29uc3QgW2N0eCwgc2V0Q3R4XSA9IFJlYWN0LnVzZVN0YXRlKG51bGwpO1xuICBSZWFjdC51c2VFZmZlY3QoKCkgPT4ge1xuICAgIGNhbnZhcy5jdXJyZW50ICYmIHNldEN0eChjYW52YXMuY3VycmVudC5nZXRDb250ZXh0KCcyZCcpKTtcbiAgfSwgW2NhbnZhc10pO1xuICBSZWFjdC51c2VFZmZlY3QoKCkgPT4ge1xuICAgIGN0eCAmJiB0ZXh0ICYmIHNldFNpemUoZ2V0TWF4U2l6ZSh0ZXh0LnNwbGl0KCdcXG4nKSkpO1xuICB9LCBbdGV4dF0pO1xuXG4gIGlmIChjdHgpIHtcbiAgICBjdHguY2xlYXJSZWN0KDAsIDAsIGNhbnZhcy5jdXJyZW50LndpZHRoLCBjYW52YXMuY3VycmVudC5oZWlnaHQpO1xuICAgIGN0eC5mb250ID0gYGJvbGQgJHtzaXplfXB4IENhbGlicmlgO1xuICAgIGN0eC5maWxsU3R5bGUgPSAnIzAwMCc7XG4gICAgY3R4LnRleHRCYXNlbGluZSA9ICdtaWRkbGUnO1xuICAgIGNvbnN0IGxpbmVzID0gdGV4dC5zcGxpdCgnXFxuJyk7XG4gICAgbGluZXMubWFwKChsaW5lLCBpZHgpID0+IHtcbiAgICAgIGNvbnN0IHdpZHRoID0gKFdJRFRIIC0gY3R4Lm1lYXN1cmVUZXh0KGxpbmUpLndpZHRoKSAvIDI7XG4gICAgICBjb25zdCBoZWlnaHQgPSBIRUlHSFQgLyAyIC0gKGxpbmVzLmxlbmd0aCAtIDEpICogbGluZWhlaWdodCAvIDIgKyBpZHggKiBsaW5laGVpZ2h0O1xuICAgICAgY3R4LmZpbGxUZXh0KGxpbmUsIHdpZHRoLCBoZWlnaHQpO1xuICAgIH0pO1xuICAgIHNldERhdGFVUkwoY2FudmFzLmN1cnJlbnQudG9EYXRhVVJMKCdpbWFnZS9wbmcnKSk7XG4gIH1cblxuICA7XG4gIHJldHVybiBSZWFjdC5jcmVhdGVFbGVtZW50KFwiY2FudmFzXCIsIHtcbiAgICByZWY6IGNhbnZhcyxcbiAgICB3aWR0aDogV0lEVEgsXG4gICAgaGVpZ2h0OiBIRUlHSFRcbiAgfSk7XG59XG5cbmZ1bmN0aW9uIE1haW4oX3JlZikge1xuICBsZXQgcHJvcHMgPSBfZXh0ZW5kcyh7fSwgX3JlZik7XG5cbiAgY29uc3QgW3RleHQsIHNldFRleHRdID0gUmVhY3QudXNlU3RhdGUoJ1llcycpO1xuICBjb25zdCBbc2l6ZSwgc2V0U2l6ZV0gPSBSZWFjdC51c2VTdGF0ZSgxNTApO1xuICBjb25zdCBbbGluZWhlaWdodCwgc2V0TGluZWhlaWdodF0gPSBSZWFjdC51c2VTdGF0ZSg3NSk7XG4gIGNvbnN0IFtkYXRhVVJMLCBzZXREYXRhVVJMXSA9IFJlYWN0LnVzZVN0YXRlKCcnKTtcbiAgcmV0dXJuIFJlYWN0LmNyZWF0ZUVsZW1lbnQoXCJkaXZcIiwgX2V4dGVuZHMoe1xuICAgIGNsYXNzTmFtZTogYE1haW5gXG4gIH0sIHByb3BzKSwgUmVhY3QuY3JlYXRlRWxlbWVudChUaXRsZSwgbnVsbCwgXCJFbW9qaSBNYWtlclwiKSwgUmVhY3QuY3JlYXRlRWxlbWVudChGYXZpY29uLCB7XG4gICAgaHJlZjogZGF0YVVSTFxuICB9KSwgUmVhY3QuY3JlYXRlRWxlbWVudChcImgxXCIsIG51bGwsIFwiU2xhY2sgVGV4dCBFbW9qaSBNYWtlclwiKSwgUmVhY3QuY3JlYXRlRWxlbWVudChcImRpdlwiLCB7XG4gICAgY2xhc3NOYW1lOiBcImNvbnRyb2xzXCJcbiAgfSwgUmVhY3QuY3JlYXRlRWxlbWVudChcImRpdlwiLCBudWxsLCBSZWFjdC5jcmVhdGVFbGVtZW50KFwibGFiZWxcIiwgbnVsbCwgXCJUZXh0XCIpLCBSZWFjdC5jcmVhdGVFbGVtZW50KFwidGV4dGFyZWFcIiwge1xuICAgIHZhbHVlOiB0ZXh0LFxuICAgIG9uQ2hhbmdlOiBldnQgPT4gc2V0VGV4dChldnQudGFyZ2V0LnZhbHVlKSxcbiAgICByb3dzOiAzXG4gIH0pKSwgUmVhY3QuY3JlYXRlRWxlbWVudChcImRpdlwiLCBudWxsLCBSZWFjdC5jcmVhdGVFbGVtZW50KFwibGFiZWxcIiwgbnVsbCwgXCJTaXplXCIpLCBSZWFjdC5jcmVhdGVFbGVtZW50KFwiaW5wdXRcIiwge1xuICAgIHR5cGU6IFwicmFuZ2VcIixcbiAgICBtaW46IDgwLFxuICAgIG1heDogMjUwLFxuICAgIHZhbHVlOiBzaXplLFxuICAgIG9uQ2hhbmdlOiBldnQgPT4gc2V0U2l6ZShldnQudGFyZ2V0LnZhbHVlKVxuICB9KSwgc2l6ZSwgUmVhY3QuY3JlYXRlRWxlbWVudChcImJ1dHRvblwiLCB7XG4gICAgb25DbGljazogKCkgPT4gc2V0U2l6ZSgxNTApXG4gIH0sIFwiU3RhbmRhcmQgU2l6ZVwiKSksIFJlYWN0LmNyZWF0ZUVsZW1lbnQoXCJkaXZcIiwgbnVsbCwgUmVhY3QuY3JlYXRlRWxlbWVudChcImxhYmVsXCIsIG51bGwsIFwiU3BhY2luZ1wiKSwgUmVhY3QuY3JlYXRlRWxlbWVudChcImlucHV0XCIsIHtcbiAgICB0eXBlOiBcInJhbmdlXCIsXG4gICAgbWluOiA0MCxcbiAgICBtYXg6IDEyMCxcbiAgICB2YWx1ZTogbGluZWhlaWdodCxcbiAgICBvbkNoYW5nZTogZXZ0ID0+IHNldExpbmVoZWlnaHQoZXZ0LnRhcmdldC52YWx1ZSlcbiAgfSksIGxpbmVoZWlnaHQpKSwgUmVhY3QuY3JlYXRlRWxlbWVudChcImRpdlwiLCB7XG4gICAgY2xhc3NOYW1lOiBcInJlbmRlclwiXG4gIH0sIFJlYWN0LmNyZWF0ZUVsZW1lbnQoVGV4dENhbnZhcywge1xuICAgIHRleHQsXG4gICAgc2l6ZSxcbiAgICBsaW5laGVpZ2h0LFxuICAgIHNldERhdGFVUkwsXG4gICAgc2V0U2l6ZVxuICB9KSwgUmVhY3QuY3JlYXRlRWxlbWVudChcImRpdlwiLCB7XG4gICAgY2xhc3NOYW1lOiBcImV4YW1wbGVcIlxuICB9LCBcIlRoaXMgaXMgaXQgdXNlZCBpbiB0ZXh0LiBcIiwgUmVhY3QuY3JlYXRlRWxlbWVudChcImltZ1wiLCB7XG4gICAgY2xhc3NOYW1lOiBcInNhbXBsZVwiLFxuICAgIHNyYzogZGF0YVVSTFxuICB9KSwgXCIgQWxzbyB0aGUgdGFiIGljb24gaXMgdXBkYXRlZC5cIikpLCBSZWFjdC5jcmVhdGVFbGVtZW50KFwiZGl2XCIsIHtcbiAgICBjbGFzc05hbWU6IFwiaW5zdHJ1Y3Rpb25zXCJcbiAgfSwgUmVhY3QuY3JlYXRlRWxlbWVudChcImgzXCIsIG51bGwsIFwiaW5zdHJ1Y3Rpb25zXCIpLCBSZWFjdC5jcmVhdGVFbGVtZW50KFwib2xcIiwgbnVsbCwgUmVhY3QuY3JlYXRlRWxlbWVudChcImxpXCIsIG51bGwsIFwiQ3VzdG9taXplIHlvdXIgdGV4dCBlbW9qaVwiKSwgUmVhY3QuY3JlYXRlRWxlbWVudChcImxpXCIsIG51bGwsIFJlYWN0LmNyZWF0ZUVsZW1lbnQoXCJhXCIsIHtcbiAgICBocmVmOiBkYXRhVVJMLFxuICAgIHRhcmdldDogXCJfYmxhbmtcIixcbiAgICBkb3dubG9hZDogYCR7dGV4dC5yZXBsYWNlKCdcXG4nLCAnXycpfS5wbmdgXG4gIH0sIFwiRG93bmxvYWQgSXRcIikpLCBSZWFjdC5jcmVhdGVFbGVtZW50KFwibGlcIiwgbnVsbCwgUmVhY3QuY3JlYXRlRWxlbWVudChcImFcIiwge1xuICAgIGhyZWY6IFwiaHR0cHM6Ly9jb29sc3ZpbGxlLnNsYWNrLmNvbS9jdXN0b21pemUvZW1vamlcIixcbiAgICB0YXJnZXQ6IFwiX2JsYW5rXCJcbiAgfSwgXCJBZGQgRW1vamkgdG8gU2xhY2tcIikpKSkpO1xufVxuXG47XG5tb2R1bGUuZXhwb3J0cyA9IE1haW47IiwiIl19
