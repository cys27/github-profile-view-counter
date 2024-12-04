const fs = require('fs');
const express = require('express');
const app = express();
const port = process.env.PORT || 3000;

const cors = require('cors');
app.use(cors());

const axios = require('axios');

const dbPath = './userDatabase.json';

// Check is database file exists !?
if (!fs.existsSync(dbPath)) {
	fs.writeFileSync(dbPath, JSON.stringify({}));
}

/**
 * @param {string} username
 * @return {string}
 */
function incrementFunc(username) {
	const raw = fs.readFileSync(dbPath, 'utf-8');
	const data = JSON.parse(raw);

	if (!data.hasOwnProperty(username)) {
		data[username] = 0;
	}

	data[username] += 1;

	fs.writeFileSync(dbPath, JSON.stringify(data));

	let views = data[username];

	if (views.toString().length >= 3) {
		let rem = parseInt(views % 1000).toString()[0];
		let quotient = parseInt(views / 1000);

		views = [quotient, rem].join('.') + 'k';
	}

	return views;
}

/**
 *	@param {string} username
 *	@return {boolean}
 */
async function isUserExists(username) {
	if (typeof username != 'string') return;

	let url = 'https://api.github.com/users/' + username;

	try {
		const { status } = await axios.get(url);

		return status == 200;
	}
	catch (error) {
		if (error.response && error.response.status == 404) {
			return false;
		}

		console.error(error);
		// return null;
	}
}

/**
 * @param {string} username
 * @param {string} viewCount
 * @return {string}
 */
function generateSvgBadge(viewCount, color) {
	return `
		<svg xmlns='http://www.w3.org/2000/svg' width='120.7' height='20'>
 		   <linearGradient id='b' x2='0' y2='100%'>
        		<stop offset='0' stop-color='#bbb' stop-opacity='.1'/>
        		<stop offset='1' stop-opacity='.1'/>
    		</linearGradient>
    		<mask id='a'>
        		<rect width='120' height='20' rx='3' fill='#fff'/>
    		</mask>
    		<g mask='url(#a)'>
        		<rect width='80' height='20' fill='#555'/>
        		<rect x='80' width='40' height='20' fill='#${color}'/>
        		<rect width='120' height='20' fill='url(#b)'/>
    		</g>
    		<g fill='#fff' text-anchor='middle' font-family='DejaVu Sans,Verdana,Geneva,sans-serif' font-size='10'>
        		<text x='40.6' y='15' fill='#010101' fill-opacity='.3'>Profile views</text>
        		<text x='40.6' y='14'>Profile views</text>
        		<text x='99' y='15' fill='#010101' fill-opacity='.3'>${viewCount}</text>
        		<text x='99' y='14'>${viewCount}</text>
    		</g>
		</svg>
	`;
}

app.get('/:username', async (req, res) => {
	const { username } = req.params;
	let { color } = req.query;

	if (!(await isUserExists(username))) return res.sendStatus(404);
	else {
		const regex = /^([0-9A-Fa-f]{6}|[09A-Fa-f]{3})$/;

		if (!regex.test(color)) color = '386de3';

		const views = incrementFunc(username);
		const svg = generateSvgBadge(views, color);

		res.send(svg);
	}
});

app.listen(port, () => console.log('Server is running!'));
