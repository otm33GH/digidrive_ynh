import { fileURLToPath, URL } from 'node:url'
import { defineConfig } from 'vite'
import { viteStaticCopy } from 'vite-plugin-static-copy'
import path from 'path'
import vue from '@vitejs/plugin-vue'

export default defineConfig({
	base: './',
  	plugins: [
		vue(),
		viteStaticCopy({
			targets: [
				{
					src: path.resolve(__dirname, 'README.md'),
					dest: './',
				},
				{
					src: path.resolve(__dirname, 'LICENSE'),
					dest: './',
				},
				{
					src: path.resolve(__dirname, 'inc') + '/!(*.db)',
					dest: './inc',
				},
				{
					src: path.resolve(__dirname, 'vendor'),
					dest: './',
				},
				{
					src: path.resolve(__dirname, '.env.production'),
					dest: './',
					rename: '.env'
				}
			]
		})
	],
 	resolve: {
    	alias: {
      		'@': fileURLToPath(new URL('./src', import.meta.url))
   		}
  	},
	define: {
		'app_version': JSON.stringify(process.env.npm_package_version)
	},
	server: {
		port: 8081,
		proxy: {
			'^/inc': {
				target: 'http://127.0.0.1:8001',
				changeOrigin: true
			}
		}
	},
	build: {
		target: ['es2019'],
		assetsDir: 'static/assets'
	}
})
