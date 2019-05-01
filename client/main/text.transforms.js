const core = `0123456789qwertyuiopasdfghjklzxcvbnmQWERTYUIOPASDFGHJKLZXCVBNM\`-=[]\;',./~_+{}|:"<>?!@#$%^&*()`


const createMap = (string)=>{
	let map= {};
	string.split('').map((char, idx)=>map[core[idx]]=char);
	return (text)=>{
		return text.split('').map((char)=>{
			return map[char] || char;
		}).join('');
	}
}


// add singing
// add cthulu
// Add alarm


const tiny = createMap(`⁰¹²³⁴⁵⁶⁷⁸⁹ᵠʷᵉʳᵗʸᵘᶦᵒᵖᵃˢᵈᶠᵍʰʲᵏˡᶻˣᶜᵛᵇⁿᵐᵠᵂᴱᴿᵀʸᵁᴵᴼᴾᴬˢᴰᶠᴳᴴᴶᴷᴸᶻˣᶜⱽᴮᴺᴹ\`⁻⁼[]\;',./~_⁺{}|:"<>ˀᵎ@#$%^&*⁽⁾`);
const fullwidth = createMap(`０１２３４５６７８９ｑｗｅｒｔｙｕｉｏｐａｓｄｆｇｈｊｋｌｚｘｃｖｂｎｍＱＷＥＲＴＹＵＩＯＰＡＳＤＦＧＨＪＫＬＺＸＣＶＢＮＭ\`－＝[]＼；＇,.／~＿ ｛｝|："＜＞？！＠＃＄％＾＆＊（）`);
const old_timey = createMap(`0123456789𝖖𝖜𝖊𝖗𝖙𝖞𝖚𝖎𝖔𝖕𝖆𝖘𝖉𝖋𝖌𝖍𝖏𝖐𝖑𝖟𝖝𝖈𝖛𝖇𝖓𝖒𝕼𝖂𝕰𝕽𝕿𝖄𝖀𝕴𝕺𝕻𝕬𝕾𝕯𝕱𝕲𝕳𝕵𝕶𝕷𝖅𝖃𝕮𝖁𝕭𝕹𝕸\`-=[]\;',./~_+{}|:"<>?!@#$%^&*()`);
const italics = createMap(`0123456789𝘲𝘸𝘦𝘳𝘵𝘺𝘶𝘪𝘰𝘱𝘢𝘴𝘥𝘧𝘨𝘩𝘫𝘬𝘭𝘻𝘹𝘤𝘷𝘣𝘯𝘮𝘘𝘞𝘌𝘙𝘛𝘠𝘜𝘐𝘖𝘗𝘈𝘚𝘋𝘍𝘎𝘏𝘑𝘒𝘓𝘡𝘟𝘊𝘝𝘉𝘕𝘔\`-=[]\;',./~_+{}|:"<>?!@#$%^&*()`);



module.exports = {
	tiny,
	fullwidth,
	clapback : (text)=>`👏${text.split(' ').join('👏')}👏`,
	goofy : (text)=>text.toLowerCase().split('').map((char, idx)=>idx%2==0?char:char.toUpperCase()).join(''),
	old_timey,


	song: (text)=>`🎵_${italics(text)}_🎵`,

	// alert: +3
}