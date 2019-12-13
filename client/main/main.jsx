require('./main.less');
const React = require('react');

const {Title} = require('vitreum/headtags');



const HEIGHT = 200, WIDTH = 200;

function TextCanvas({text, size, lineheight, setDataURL, setSize}){
	const getMaxSize = (lines, size=70)=>{
		ctx.font = `bold ${size + 1}px Calibri,Roboto,Verdana,Arial`;
		const biggest = Math.max(...lines.map((text)=>ctx.measureText(text).width))
		if(biggest >= WIDTH) return size;
		return getMaxSize(lines, size+1);
	};

	const canvas = React.useRef(null);
	const [ctx, setCtx] = React.useState(null);
	React.useEffect(()=>{canvas.current && setCtx(canvas.current.getContext('2d'))}, [canvas]);

	React.useEffect(()=>{ctx && text && setSize(getMaxSize(text.split('\n')))}, [text]);

	if(ctx){
		ctx.clearRect(0, 0, canvas.current.width, canvas.current.height);

		ctx.font = `bold ${size}px Calibri,Roboto,Verdana,Arial`;
		ctx.fillStyle = '#000';
		ctx.textBaseline='middle';

		const lines = text.split('\n');

		lines.map((line, idx)=>{
			const width = (WIDTH - ctx.measureText(line).width)/2;
			const height = HEIGHT/2 - ((lines.length-1)*lineheight/2) + idx*lineheight;
			ctx.fillText(line,width, height);
		})

		setDataURL(canvas.current.toDataURL('image/png'));
	};

	return <canvas ref={canvas} width={WIDTH} height={HEIGHT} />

}

const {Favicon} = require('vitreum/headtags');

function EmojiMaker(props){

	const [text, setText] = React.useState('Yes');
	const [size, setSize] = React.useState(150);
	const [lineheight, setLineheight] = React.useState(75);

	const [dataURL, setDataURL] = React.useState('');


	return <div className='EmojiMaker'>
		<Favicon href={dataURL} />

		<h2>Slack Text Emoji Maker</h2>

		<div className='controls'>
			<div>
				<label>Text</label>
				<textarea value={text} onChange={(evt)=>setText(evt.target.value)} rows={3}/>
			</div>
			<div>
				<label>Size</label>
				<input type='range' min={80} max={250} value={size} onChange={(evt)=>setSize(evt.target.value)} />
				{size}
				<button onClick={()=>setSize(150)}>Standard Size</button>
			</div>
			<div>
				<label>Spacing</label>
				<input type='range' min={40} max={120} value={lineheight} onChange={(evt)=>setLineheight(evt.target.value)} />
				{lineheight}
			</div>

		</div>

		<div className='render'>
			<TextCanvas {...{text, size, lineheight, setDataURL, setSize}} />
			<div className='example'>
				This is it used in text. <img className='sample' src={dataURL} /> Also the tab icon is updated.
			</div>
		</div>

		<div className='instructions'>
			<h3>instructions</h3>
			<ol>
				<li>Customize your text emoji</li>
				<li><a href={dataURL} target='_blank' download={`${text.replace('\n', '_')}.png`}>Download It</a></li>
				<li><a href='https://coolsville.slack.com/customize/emoji' target='_blank'>Add Emoji to Slack</a></li>
			</ol>
		</div>
	</div>
}


/*****************/

const transforms = require('./text.transforms.js');
function TextTransform(props){
	const [text, setText] = React.useState('');
	const divider = <br />;

	return <div className='TextTransform'>
		<h2>Text Transform</h2>
		<div className='transforms'>
			<textarea onChange={(evt)=>setText(evt.target.value)} value={text} autoFocus />

			<textarea readOnly value={Object
					.values(transforms)
					.map((fn)=>fn(text))
					.join('\n\n')
			} />
		</div>
	</div>
}



//////////////////


function Main({ ...props }){

	return <div className={`Main`} {...props}>
		<Title>Slack Tools</Title>
		<h1>Slack Tools</h1>
		<hr />
		<TextTransform />
		<hr />
		<EmojiMaker />
	</div>;
};

module.exports = Main;