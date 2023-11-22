<script lang="ts">
	export let data;
	import Stylish from '$lib/components/Stylish.svelte';
	import Tech from '$lib/components/ThreeD/Tech/Tech.svelte';
	import { modeCurrent } from '@skeletonlabs/skeleton';
	import { memeBanners, technologyBanners, hiBanners, cannonBanners } from './data';
	import anime from 'animejs';
	import { onMount } from 'svelte';
	import GhSkyLine from '$lib/components/ThreeD/GHSkyLine/GHSkyLine.svelte';
	$: otherStuff = [
		`AlpineJS-${$modeCurrent ? 'Light' : 'Dark'}`,
		`Arduino`,
		`Astro`,
		`AutoCAD-${$modeCurrent ? 'Light' : 'Dark'}`,
		`AWS-${$modeCurrent ? 'Light' : 'Dark'}`,
		`Azure-${$modeCurrent ? 'Light' : 'Dark'}`,
		`Babel`,
		`Bash-${$modeCurrent ? 'Light' : 'Dark'}`,
		`Blender-${$modeCurrent ? 'Light' : 'Dark'}`,
		`Bootstrap`,
		`C`,
		`Cloudflare-${$modeCurrent ? 'Light' : 'Dark'}`,
		`CMake-${$modeCurrent ? 'Light' : 'Dark'}`,
		`CodePen-${$modeCurrent ? 'Light' : 'Dark'}`,
		`CS`,
		`CSS`,
		`D3-${$modeCurrent ? 'Light' : 'Dark'}`,
		`Discord`,
		`DiscordBots`,
		`Django`,
		`Docker`,
		`Electron`,
		`ExpressJS-${$modeCurrent ? 'Light' : 'Dark'}`,
		`FastAPI`,
		`Fediverse-${$modeCurrent ? 'Light' : 'Dark'}`,
		`Figma-${$modeCurrent ? 'Light' : 'Dark'}`,
		`Flask-${$modeCurrent ? 'Light' : 'Dark'}`,
		`Git`,
		`Github-${$modeCurrent ? 'Light' : 'Dark'}`,
		`GithubActions-${$modeCurrent ? 'Light' : 'Dark'}`,
		`GitLab-${$modeCurrent ? 'Light' : 'Dark'}`,
		`Godot-${$modeCurrent ? 'Light' : 'Dark'}`,
		`Grafana-${$modeCurrent ? 'Light' : 'Dark'}`,
		`GraphQL-${$modeCurrent ? 'Light' : 'Dark'}`,
		`Heroku`,
		`HTML`,
		`Illustrator`,
		`JavaScript`,
		`Kafka`,
		`Kubernetes`,
		`LaTeX-${$modeCurrent ? 'Light' : 'Dark'}`,
		`Linux-${$modeCurrent ? 'Light' : 'Dark'}`,
		`Lua-${$modeCurrent ? 'Light' : 'Dark'}`,
		`Markdown-${$modeCurrent ? 'Light' : 'Dark'}`,
		`MaterialUI-${$modeCurrent ? 'Light' : 'Dark'}`,
		`Matlab-${$modeCurrent ? 'Light' : 'Dark'}`,
		`MongoDB`,
		`MySQL-${$modeCurrent ? 'Light' : 'Dark'}`,
		`NeoVim-${$modeCurrent ? 'Light' : 'Dark'}`,
		`Netlify-${$modeCurrent ? 'Light' : 'Dark'}`,
		`NextJS-${$modeCurrent ? 'Light' : 'Dark'}`,
		`Nginx`,
		`NodeJS-${$modeCurrent ? 'Light' : 'Dark'}`,
		`Photoshop`,
		`PostgreSQL-${$modeCurrent ? 'Light' : 'Dark'}`,
		`Postman`,
		`Powershell-${$modeCurrent ? 'Light' : 'Dark'}`,
		`Premiere`,
		`Prisma`,
		`Prometheus`,
		`Python-${$modeCurrent ? 'Light' : 'Dark'}`,
		`RabbitMQ-${$modeCurrent ? 'Light' : 'Dark'}`,
		`RaspberryPi-${$modeCurrent ? 'Light' : 'Dark'}`,
		`React-${$modeCurrent ? 'Light' : 'Dark'}`,
		`Redis-${$modeCurrent ? 'Light' : 'Dark'}`,
		`Redux`,
		`Remix-${$modeCurrent ? 'Light' : 'Dark'}`,
		`Replit-${$modeCurrent ? 'Light' : 'Dark'}`,
		`Sass`,
		`Sequelize-${$modeCurrent ? 'Light' : 'Dark'}`,
		`SQLite`,
		`StyledComponents`,
		`Supabase-${$modeCurrent ? 'Light' : 'Dark'}`,
		`Svelte`,
		`SVG-${$modeCurrent ? 'Light' : 'Dark'}`,
		`TailwindCSS-${$modeCurrent ? 'Light' : 'Dark'}`,
		`ThreeJS-${$modeCurrent ? 'Light' : 'Dark'}`,
		`TypeScript`,
		`Vercel-${$modeCurrent ? 'Light' : 'Dark'}`,
		`VIM-${$modeCurrent ? 'Light' : 'Dark'}`,
		`Vite-${$modeCurrent ? 'Light' : 'Dark'}`,
		`VSCode-${$modeCurrent ? 'Light' : 'Dark'}`,
		`VueJS-${$modeCurrent ? 'Light' : 'Dark'}`,
		`Webpack-${$modeCurrent ? 'Light' : 'Dark'}`
	];
	const randomHi = () => hiBanners[Math.floor(Math.random() * hiBanners.length)];
	const randomBanner = () => cannonBanners[Math.floor(Math.random() * cannonBanners.length)];
	const randomMemeBanner = () => memeBanners[Math.floor(Math.random() * memeBanners.length)];
	const randomTechnologyBanner = () =>
		technologyBanners[Math.floor(Math.random() * technologyBanners.length)];

	let iconsContainer: HTMLDivElement;

	let handleResize = () => {};
	let createGrid = () => {};
	let handleTileClick = (index: number, tile: HTMLDivElement) => {};

	const createTile = (index: number) => {
		const tile = document.createElement('div');
		tile.classList.add('stagger-tile');
		tile.onclick = () => handleTileClick(index, tile);
		const image = `url(/icons/${otherStuff[index]}.svg)`;
		tile.style.setProperty('background-image', image);
		return tile;
	};

	$: $modeCurrent, createGrid();

	const createTiles = (quantity: number) => {
		Array.from(Array(quantity)).map((_, index) => {
			iconsContainer.appendChild(createTile(index));
		});
	};

	onMount(() => {
		let columns = 0;
		let rows = 0;
		let count = -1;
		handleTileClick = (index: number, tile: HTMLDivElement) => {
			const grid = [columns, rows];
			count += 1;
			anime({
				targets: '.stagger-tile',
				keyframes: [
					{
						translateX: anime.stagger('-1px', { grid: grid, from: index, axis: 'x' }),
						translateY: anime.stagger('-1px', { grid: grid, from: index, axis: 'y' }),
						duration: 100
					},
					{
						translateX: anime.stagger('2px', { grid: grid, from: index, axis: 'x' }),
						translateY: anime.stagger('2px', { grid: grid, from: index, axis: 'y' }),
						scale: anime.stagger([1.1, 1], { grid: grid, from: index }),
						duration: 225
					},
					{
						translateX: 0,
						translateY: 0,
						scale: 1,
						duration: 1200
					}
				],
				delay: anime.stagger(80, { grid: grid, from: index })
			});
		};
		createGrid = () => {
			iconsContainer.innerHTML = '';
			const minTiles = otherStuff.length;
			const icoWidth = iconsContainer.offsetWidth;
			columns = Math.floor(icoWidth / 100);
			rows = 0;
			if (columns >= 1) {
				rows = Math.ceil(minTiles / columns);
			} else {
				rows = 0;
			}
			iconsContainer.style.setProperty('--columns', `${columns}`);
			iconsContainer.style.setProperty('--rows', `${rows}`);
			createTiles(columns * rows);
		};
		handleResize = () => {
			createGrid();
		};
		createGrid();
	});
</script>


	<div class="lg:flex snap-start items-center">
			<div class="prose text-inherit mb-20">
				<svelte:component this={data.content} />
			</div>
			</div>
