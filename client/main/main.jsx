require('./main.less');
const React = require('react');

const {Title, Favicon} = require('vitreum/headtags');


const HEIGHT = 200, WIDTH = 200;




function TextCanvas({text, size, lineheight, setDataURL, setSize}){
	const getMaxSize = (lines, size=70)=>{
		ctx.font = `bold ${size + 1}px Calibri`;
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

		ctx.font = `bold ${size}px Calibri`;
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


function Main({ ...props }){
	const [text, setText] = React.useState('Yes');
	const [size, setSize] = React.useState(150);
	const [lineheight, setLineheight] = React.useState(75);

	const [dataURL, setDataURL] = React.useState('');



	return <div className={`Main`} {...props}>
		<Title>Emoji Maker</Title>
		<Favicon href={dataURL} />


		<h1>Slack Text Emoji Maker</h1>

		<div className='controls'>
			<div>
				<label>Text</label>
				<textarea value={text} onChange={(evt)=>setText(evt.target.value)} rows={3}/>
			</div>
			<div>
				<label>Size</label>
				<input type='range' min={80} max={200} value={size} onChange={(evt)=>setSize(evt.target.value)} />
				{size}
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

	</div>;
};

module.exports = Main;