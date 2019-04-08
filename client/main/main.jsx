require('./main.less');
const React = require('react');


const HEIGHT = 200, WIDTH = 200;


function TextCanvas({text, size, lineheight, setDataURL}){

	const canvas = React.useRef(null);
	const [ctx, setCtx] = React.useState(null);
	React.useEffect(()=>canvas.current && setCtx(canvas.current.getContext('2d')), [canvas]);

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
	const [text, updateText] = React.useState('Why\nTho');
	const [size, updateSize] = React.useState(100);
	const [lineheight, updateLineheight] = React.useState(75);

	const [dataURL, setDataURL] = React.useState('');



	return <div className={`Main`} {...props}>
		<h1>Slack Text Emoji Maker</h1>

		<div className='controls'>
			<div>
				<label>Text</label>
				<textarea value={text} onChange={(evt)=>updateText(evt.target.value)} rows={3}/>
			</div>
			<div>
				<label>Size</label>
				<input type='range' min={80} max={150} value={size} onChange={(evt)=>updateSize(evt.target.value)} />
			</div>
			<div>
				<label>Spacing</label>
				<input type='range' min={60} max={100} value={lineheight} onChange={(evt)=>updateLineheight(evt.target.value)} />
			</div>
		</div>

		<div className='render'>
			<TextCanvas {...{text, size, lineheight, setDataURL}} />
			<div className='example'>
				This is it used in text. <img className='sample' src={dataURL} /> How cool is that?
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