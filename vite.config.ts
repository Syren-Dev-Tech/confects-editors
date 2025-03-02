import { defineConfig, loadEnv, UserConfig } from 'vite';
import { resolve } from 'path';
import { viteConfigAliases } from '@chrisofnormandy/confetti/config';
import react from '@vitejs/plugin-react';
import tsconfigPaths from 'vite-tsconfig-paths';

export default ({ mode }: UserConfig) => {
    process.env = mode && {
        ...process.env,
        ...loadEnv(mode, process.cwd())
    } || process.env;

    const { DEV } = process.env;

    return defineConfig({
        build: {
            copyPublicDir: false,
            emptyOutDir: false,
            lib: {
                entry: ['editors'].map((exp) => resolve(`./lib/${exp}.ts`)),
                formats: ['es'],
                name: 'confects'
            },
            rollupOptions: {
                external: ['react', 'react-dom'],
                output: {
                    globals: {
                        react: 'React'
                    }
                }
            }
        },
        esbuild: {
            drop: !DEV && ['console', 'debugger'] || undefined,
            legalComments: 'none'
        },
        plugins: [react(), tsconfigPaths()],
        resolve: {
            alias: {
                ...viteConfigAliases()
            }
        },
        server: {
            port: 3000
        }
    });
};