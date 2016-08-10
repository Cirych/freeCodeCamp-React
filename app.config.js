import path from 'path';

const ROOT_PATH = path.resolve(__dirname);
const APP = 'app/';
const TEMPLATES = 'templates/';

const resolve = pathTo => path.resolve(ROOT_PATH, pathTo);

export default {
	appTitle: 'React Project',
	app: resolve(APP),
	build: resolve(`${APP}build`),
	entry: resolve(`${APP}src/index`),
	dist: resolve(`${APP}dist`),
	template: resolve(`${TEMPLATES}html/index.html`),
	favicon: resolve(`${TEMPLATES}favicon.ico`)
}
