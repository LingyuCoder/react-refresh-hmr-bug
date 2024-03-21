import { resolve } from 'path'

import { defineConfig } from '@rspack/cli'
import { HtmlRspackPlugin } from '@rspack/core'
import ReactRefreshPlugin from '@rspack/plugin-react-refresh'

const is_dev = process.env.NODE_ENV === 'development'
const is_prod = process.env.NODE_ENV === 'production'
const is_module = false

const plugins_dev = [
	new ReactRefreshPlugin({
		exclude: [/node_modules/]
	})
]
const plugins_prod = []

module.exports = defineConfig({
	devtool: is_dev ? 'source-map' : false,
	entry: {
		main: './index.tsx'
	},
	output: {
		clean: is_prod,
		publicPath: ''
	},
	watchOptions: {
		ignored: /node_modules/
	},
	resolve: {
		extensions: ['.tsx', '.ts', '.js'],
		tsConfigPath: resolve(__dirname, 'tsconfig.json')
	},
	devServer: {
		compress: false
	},
	node: {
		global: false
	},
	experiments: {
		outputModule: is_module,
		rspackFuture: {
			// newTreeshaking: true,
		}
	},
	plugins: [
		new HtmlRspackPlugin({
			title: 'rspack_reproduce',
			template: './public/index.html',
			scriptLoading: is_module ? 'module' : 'defer'
		}),
		...(is_dev ? plugins_dev : plugins_prod)
	],
	module: {
		rules: [
			{
				test: /\.ts$/,
				use: {
					loader: 'builtin:swc-loader',
					options: {
						jsc: {
							parser: {
								syntax: 'typescript',
								dynamicImport: true,
								exportDefaultFrom: true,
								exportNamespaceFrom: true,
								decorators: true
							},
							transform: {
								legacyDecorator: true,
								decoratorMetadata: true
							},
							minify: {
								compress: {
									drop_console: is_prod
								}
							},
							externalHelpers: true
						},
						env: {
							targets: 'chrome >= 120'
						}
					}
				}
			},
			{
				test: /\.tsx$/,
				exclude: [/[\\/]node_modules[\\/]/],
				use: {
					loader: 'builtin:swc-loader',
					options: {
						jsc: {
							parser: {
								syntax: 'typescript',
								tsx: true,
								dynamicImport: true,
								exportDefaultFrom: true,
								exportNamespaceFrom: true,
								decorators: true
							},
							transform: {
								legacyDecorator: true,
								decoratorMetadata: true,
								react: {
									development: !is_prod,
									refresh: !is_prod,
									runtime: 'automatic',
									useBuiltins: true
								}
							},
							minify: {
								compress: {
									drop_console: is_prod
								}
							},
							externalHelpers: true
						},
						env: {
							targets: 'chrome >= 120'
						}
					}
				}
			},
			{
				test: /\.(png|svg|jpg)$/,
				type: 'asset/source'
			}
		]
	}
})
