// vite.config.js
import { sveltekit } from 'file:///Users/orefalo/GitRepositories/wip/svelte-treeviews/node_modules/.pnpm/@sveltejs+kit@2.5.18_@sveltejs+vite-plugin-svelte@4.0.0-next.3_svelte@5.0.0-next.200_vite@5.3_ve6w2opwez5e5iepgmir3ykiay/node_modules/@sveltejs/kit/src/exports/vite/index.js';
import { defineConfig } from 'file:///Users/orefalo/GitRepositories/wip/svelte-treeviews/node_modules/.pnpm/vite@5.3.5_@types+node@20.14.13_sass@1.77.8_terser@5.31.1/node_modules/vite/dist/node/index.js';

// scripts/vite/example-import.js
import fs from 'node:fs/promises';
import * as sass from 'file:///Users/orefalo/GitRepositories/wip/svelte-treeviews/node_modules/.pnpm/sass@1.77.8/node_modules/sass/sass.node.mjs';
import hljs from 'file:///Users/orefalo/GitRepositories/wip/svelte-treeviews/node_modules/.pnpm/highlight.js@11.10.0/node_modules/highlight.js/es/core.js';
import xml from 'file:///Users/orefalo/GitRepositories/wip/svelte-treeviews/node_modules/.pnpm/highlight.js@11.10.0/node_modules/highlight.js/es/languages/xml.js';
import javascript from 'file:///Users/orefalo/GitRepositories/wip/svelte-treeviews/node_modules/.pnpm/highlight.js@11.10.0/node_modules/highlight.js/es/languages/javascript.js';
import css from 'file:///Users/orefalo/GitRepositories/wip/svelte-treeviews/node_modules/.pnpm/highlight.js@11.10.0/node_modules/highlight.js/es/languages/css.js';
hljs.registerLanguage('xml', xml);
hljs.registerLanguage('javascript', javascript);
hljs.registerLanguage('css', css);
var apiQuery = 'example';
var apiQueryOptional = 'used';
var apiProxySuffix = '.example-safeguard-proxy';
var idPrefix = '\0example-import-proxy"';
var encodeId = id => idPrefix + id + apiProxySuffix;
var decodeId = id => id.slice(idPrefix.length, -apiProxySuffix.length);
var fixTrailingEnds = code => code.replaceAll(/\n>/gm, '>');
var exampleImportPlugin = () => ({
  name: 'vite-plugin-example',
  enforce: 'pre',
  async resolveId(source, importer) {
    const [originalSource, sourceUrlSearchParamsStr] = source.split('?', 2);
    const sourceUrlSearchParams = new URLSearchParams(sourceUrlSearchParamsStr);
    if (!sourceUrlSearchParams.has(apiQuery) && !sourceUrlSearchParams.has(apiQueryOptional)) {
      return;
    }
    const resolved = (await this.resolve(originalSource, importer))?.id;
    return resolved ? encodeId(resolved) : null;
  },
  async load(id) {
    if (!id.startsWith(idPrefix)) {
      return;
    }
    const originalId = decodeId(id);
    const isSvelte = originalId.endsWith('.svelte');
    const isSass = ['scss', 'sass'].some(suffix => originalId.endsWith(`.${suffix}`));
    const isCSS = isSass || originalId.endsWith(`.css`);
    let code = await fs.readFile(originalId, { encoding: 'utf8' });
    if (isSvelte) {
      code = fixTrailingEnds(code);
    }
    const highlightedHTML = hljs.highlightAuto(code).value;
    const css2 = isCSS ? (isSass ? (await sass.compileAsync(originalId)).css : code) : void 0;
    const cssHighlightedHTML = css2 ? hljs.highlight(css2, { language: 'css' }).value : void 0;
    const output = [
      isSvelte ? `import component from ${JSON.stringify(originalId)};` : '',
      `export const code = ${JSON.stringify(code)};`,
      `export const highlightedHTML = ${JSON.stringify(highlightedHTML)};`,
      isSvelte ? `export { component };` : '',
      isCSS ? `export const css = ${JSON.stringify(css2)};` : '',
      isCSS ? `export const cssHighlightedHTML = ${JSON.stringify(cssHighlightedHTML)};` : '',
      `export default { code, highlightedHTML${isSvelte ? ', component' : ''}${isCSS ? ', css, cssHighlightedHTML' : ''} };`
    ].join('\n');
    return output;
  }
});

// scripts/vite/minified-size-analyzing.js
import fs2 from 'fs';
import path from 'path';

// package.json
var package_default = {
  name: 'svelte-treeviews',
  version: '0.1.0',
  description: 'A full featured treeview component',
  keywords: ['svelte', 'tree', 'treeview', 'hierarchy'],
  homepage: 'https://orefalo.github.io/svelte-treeviews/',
  bugs: 'https://github.com/orefalo/svelte-treeviews/issues',
  repository: {
    type: 'git',
    url: 'https://github.com/orefalo/svelte-treeviews.git'
  },
  license: 'MIT',
  author: {
    name: 'Olivier Refalo',
    url: 'https://github.com/orefalo'
  },
  type: 'module',
  exports: {
    './package.json': './package.json',
    '.': {
      types: './dist/index.d.ts',
      svelte: './dist/index.js'
    }
  },
  svelte: './dist/index.js',
  types: './dist/index.d.ts',
  files: ['dist'],
  scripts: {
    build: 'vite build && node ./scripts/create-minified-size-badges.js',
    check: 'svelte-check --tsconfig ./tsconfig.json',
    'check:watch': 'svelte-check --tsconfig ./tsconfig.json --watch',
    commit: 'cross-env node ./node_modules/cz-customizable/standalone.js',
    dev: 'cross-env DEV=1 vite dev --port 3000',
    'fetch-and-publish': 'node scripts/fetch-and-publish.js',
    format: 'prettier --write --cache .',
    lint: 'pnpm run lint-es',
    'lint-es': 'eslint --cache .',
    package: 'pnpm run package:build && pnpm run package:pack',
    'package:build':
      'rimraf -g ./package/* && svelte-package -o ./package/dist && copyfiles ./README.md ./LICENSE ./package/ && node scripts/package-clean-copy.js',
    'package:pack': 'node ./scripts/minify-package.js && cd package && pnpm pack',
    prepare: 'husky',
    preview: 'vite preview --port 3000',
    'static-serv': 'pnpm build && serve -l 3000 --no-clipboard docs',
    test: 'playwright test'
  },
  config: {
    'cz-customizable': {
      config: '.cz-config.cjs'
    }
  },
  dependencies: {},
  devDependencies: {
    '@commitlint/cli': '^19.3.0',
    '@commitlint/config-conventional': '^19.2.2',
    '@playwright/test': '^1.45.3',
    '@sveltejs/adapter-static': '^3.0.2',
    '@sveltejs/kit': '^2.5.18',
    '@sveltejs/package': '2.3.0',
    '@sveltejs/vite-plugin-svelte': '^4.0.0-next.3',
    '@types/eslint': '^9.6.0',
    '@types/node': '^20.14.13',
    '@typescript-eslint/eslint-plugin': '^7.17.0',
    '@typescript-eslint/parser': '^7.17.0',
    'badge-maker': '^4.0.0',
    clsx: '^2.1.1',
    copyfiles: '^2.4.1',
    'cross-env': '^7.0.3',
    'cz-customizable': '^7.2.1',
    eslint: '^9.8.0',
    'eslint-config-prettier': '^9.1.0',
    'eslint-gitignore': '^0.1.0',
    'eslint-plugin-svelte': '^2.43.0',
    globals: '^15.8.0',
    'highlight.js': '^11.10.0',
    husky: '^9.1.3',
    minify: '^11.4.0',
    prettier: '^3.3.3',
    'prettier-plugin-svelte': '^3.2.6',
    rimraf: '^6.0.1',
    sass: '^1.77.8',
    serve: '^14.2.3',
    'svelte-check': '^3.8.4',
    'svelte-highlight': '^7.7.0',
    'svelte-preprocess': '^6.0.2',
    tslib: '^2.6.3',
    typescript: '^5.5.4',
    'typescript-eslint': '^8.0.0-alpha.34',
    vite: '^5.3.5'
  },
  peerDependencies: {
    svelte: '5.0.0-next.201'
  }
};

// scripts/vite/minified-size-analyzing.js
var libPath = path.resolve('.', 'src/lib/');
var ssr;
var minifiedSizeAnalyzingPlugin = () => ({
  name: 'vite-plugin-minified-size-analyzing',
  enforce: 'pre',
  configResolved(config) {
    ssr = config.build?.ssr ?? false;
  },
  generateBundle(_options, bundle) {
    let found = false;
    for (const chunkName in bundle) {
      const chunk = bundle[chunkName];
      if (
        chunk.type === 'chunk' &&
        Object.keys(chunk.modules).find(fileSource => path.resolve(fileSource).startsWith(libPath))
      ) {
        if (found) {
          throw 'Error: the library dependency was already found for minified size computation, so it is separated!';
        }
        found = true;
        const size = chunk.code.length;
        if (!ssr) {
          console.log('\nClient minified library size (bytes): ' + size);
          fs2.writeFileSync('./.svelte-kit/output/minified-size-client.txt', size.toString());
        } else {
          console.log('\nServer minified library size (bytes): ' + size);
          fs2.writeFileSync('./.svelte-kit/output/minified-size-server.txt', size.toString());
        }
      }
    }
    if (!found) {
      throw "Error: the library dependency wasn't found for minified size computation!";
    }
  }
});
var manualChunksForAnalyzing = id => {
  const resolvedPath = path.resolve(id);
  if (resolvedPath.search('node_modules') > 0) {
    return 'external';
  } else if (resolvedPath.startsWith(libPath)) {
    return package_default.name;
  } else {
    return void 0;
  }
};

// vite.config.js
var vite_config_default = defineConfig({
  plugins: [sveltekit(), exampleImportPlugin(), minifiedSizeAnalyzingPlugin()],
  optimizeDeps: {
    include: ['highlight.js', 'highlight.js/lib/core']
  },
  build: {
    // minify: true, // We specify this explicitly, since we need the server code to be minified for size computation.
    rollupOptions: {
      // Explicitely ignore warnings
      // onwarn: (warning, handler) => {
      //   const { message, code } = warning;
      //   // @ts-ignore
      //   const patterns = warnIgnores[code];
      //   console.log('HEEEERRREE ' + code);
      //   if (patterns != undefined) {
      //     /* Find the meat. */
      //     const meat = message.match(patterns.capture);
      //     console.log(meat);
      //     if (meat != null) {
      //       for (var i = 0; i < patterns.ignore.length; i++) {
      //         if (meat[1].match(patterns.ignore[i]) != null) {
      //           return;
      //         }
      //       }
      //     }
      //   }
      //   handler(warning);
      // },
      output: {
        manualChunks: manualChunksForAnalyzing
      }
    }
  }
});
export { vite_config_default as default };
//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAic291cmNlcyI6IFsidml0ZS5jb25maWcuanMiLCAic2NyaXB0cy92aXRlL2V4YW1wbGUtaW1wb3J0LmpzIiwgInNjcmlwdHMvdml0ZS9taW5pZmllZC1zaXplLWFuYWx5emluZy5qcyIsICJwYWNrYWdlLmpzb24iXSwKICAic291cmNlc0NvbnRlbnQiOiBbImNvbnN0IF9fdml0ZV9pbmplY3RlZF9vcmlnaW5hbF9kaXJuYW1lID0gXCIvVXNlcnMvb3JlZmFsby9HaXRSZXBvc2l0b3JpZXMvd2lwL3N2ZWx0ZS10cmVldmlld3NcIjtjb25zdCBfX3ZpdGVfaW5qZWN0ZWRfb3JpZ2luYWxfZmlsZW5hbWUgPSBcIi9Vc2Vycy9vcmVmYWxvL0dpdFJlcG9zaXRvcmllcy93aXAvc3ZlbHRlLXRyZWV2aWV3cy92aXRlLmNvbmZpZy5qc1wiO2NvbnN0IF9fdml0ZV9pbmplY3RlZF9vcmlnaW5hbF9pbXBvcnRfbWV0YV91cmwgPSBcImZpbGU6Ly8vVXNlcnMvb3JlZmFsby9HaXRSZXBvc2l0b3JpZXMvd2lwL3N2ZWx0ZS10cmVldmlld3Mvdml0ZS5jb25maWcuanNcIjtpbXBvcnQgeyBzdmVsdGVraXQgfSBmcm9tICdAc3ZlbHRlanMva2l0L3ZpdGUnO1xuaW1wb3J0IHsgZGVmaW5lQ29uZmlnIH0gZnJvbSAndml0ZSc7XG5pbXBvcnQgeyBleGFtcGxlSW1wb3J0UGx1Z2luIH0gZnJvbSAnLi9zY3JpcHRzL3ZpdGUvZXhhbXBsZS1pbXBvcnQuanMnO1xuaW1wb3J0IHtcbiAgbWluaWZpZWRTaXplQW5hbHl6aW5nUGx1Z2luLFxuICBtYW51YWxDaHVua3NGb3JBbmFseXppbmdcbn0gZnJvbSAnLi9zY3JpcHRzL3ZpdGUvbWluaWZpZWQtc2l6ZS1hbmFseXppbmcuanMnO1xuXG4vLyBjb25zdCB3YXJuSWdub3JlcyA9IHtcbi8vICAgJ2Nzcy11bnVzZWQtc2VsZWN0b3InOiB7XG4vLyAgICAgY2FwdHVyZTogLy4qXCIoLiopXCIkLyxcbi8vICAgICBpZ25vcmU6IFtcbi8vICAgICAgIC9eXFwuaGUtdHJlZS0tcnRsL1xuLy8gICAgICAgLy8gL15cXC5wXFxkKy8sXG4vLyAgICAgICAvLyAvXlxcLnNtXFxkKy8sXG4vLyAgICAgICAvLyAvXlxcLm1kXFxkKy8sXG4vLyAgICAgICAvLyAvXlxcLmxnXFxkKy8sXG4vLyAgICAgICAvLyAvXlxcLnhnXFxkKy8sXG4vLyAgICAgICAvLyAvXlxcLmFsbFxcZCsvLFxuLy8gICAgICAgLy8gL15cXC5yb3coOjphZnRlcik/L1xuLy8gICAgIF1cbi8vICAgfVxuLy8gfTtcblxuLyoqIEB0eXBlIHtpbXBvcnQoJ3ZpdGUnKS5Vc2VyQ29uZmlnfSAqL1xuZXhwb3J0IGRlZmF1bHQgZGVmaW5lQ29uZmlnKHtcbiAgcGx1Z2luczogW3N2ZWx0ZWtpdCgpLCBleGFtcGxlSW1wb3J0UGx1Z2luKCksIG1pbmlmaWVkU2l6ZUFuYWx5emluZ1BsdWdpbigpXSxcbiAgb3B0aW1pemVEZXBzOiB7XG4gICAgaW5jbHVkZTogWydoaWdobGlnaHQuanMnLCAnaGlnaGxpZ2h0LmpzL2xpYi9jb3JlJ11cbiAgfSxcbiAgYnVpbGQ6IHtcbiAgICAvLyBtaW5pZnk6IHRydWUsIC8vIFdlIHNwZWNpZnkgdGhpcyBleHBsaWNpdGx5LCBzaW5jZSB3ZSBuZWVkIHRoZSBzZXJ2ZXIgY29kZSB0byBiZSBtaW5pZmllZCBmb3Igc2l6ZSBjb21wdXRhdGlvbi5cbiAgICByb2xsdXBPcHRpb25zOiB7XG4gICAgICAvLyBFeHBsaWNpdGVseSBpZ25vcmUgd2FybmluZ3NcbiAgICAgIC8vIG9ud2FybjogKHdhcm5pbmcsIGhhbmRsZXIpID0+IHtcbiAgICAgIC8vICAgY29uc3QgeyBtZXNzYWdlLCBjb2RlIH0gPSB3YXJuaW5nO1xuICAgICAgLy8gICAvLyBAdHMtaWdub3JlXG4gICAgICAvLyAgIGNvbnN0IHBhdHRlcm5zID0gd2Fybklnbm9yZXNbY29kZV07XG5cbiAgICAgIC8vICAgY29uc29sZS5sb2coJ0hFRUVFUlJSRUUgJyArIGNvZGUpO1xuICAgICAgLy8gICBpZiAocGF0dGVybnMgIT0gdW5kZWZpbmVkKSB7XG4gICAgICAvLyAgICAgLyogRmluZCB0aGUgbWVhdC4gKi9cbiAgICAgIC8vICAgICBjb25zdCBtZWF0ID0gbWVzc2FnZS5tYXRjaChwYXR0ZXJucy5jYXB0dXJlKTtcbiAgICAgIC8vICAgICBjb25zb2xlLmxvZyhtZWF0KTtcbiAgICAgIC8vICAgICBpZiAobWVhdCAhPSBudWxsKSB7XG4gICAgICAvLyAgICAgICBmb3IgKHZhciBpID0gMDsgaSA8IHBhdHRlcm5zLmlnbm9yZS5sZW5ndGg7IGkrKykge1xuICAgICAgLy8gICAgICAgICBpZiAobWVhdFsxXS5tYXRjaChwYXR0ZXJucy5pZ25vcmVbaV0pICE9IG51bGwpIHtcbiAgICAgIC8vICAgICAgICAgICByZXR1cm47XG4gICAgICAvLyAgICAgICAgIH1cbiAgICAgIC8vICAgICAgIH1cbiAgICAgIC8vICAgICB9XG4gICAgICAvLyAgIH1cbiAgICAgIC8vICAgaGFuZGxlcih3YXJuaW5nKTtcbiAgICAgIC8vIH0sXG5cbiAgICAgIG91dHB1dDoge1xuICAgICAgICBtYW51YWxDaHVua3M6IG1hbnVhbENodW5rc0ZvckFuYWx5emluZ1xuICAgICAgfVxuICAgIH1cbiAgfVxufSk7XG4iLCAiY29uc3QgX192aXRlX2luamVjdGVkX29yaWdpbmFsX2Rpcm5hbWUgPSBcIi9Vc2Vycy9vcmVmYWxvL0dpdFJlcG9zaXRvcmllcy93aXAvc3ZlbHRlLXRyZWV2aWV3cy9zY3JpcHRzL3ZpdGVcIjtjb25zdCBfX3ZpdGVfaW5qZWN0ZWRfb3JpZ2luYWxfZmlsZW5hbWUgPSBcIi9Vc2Vycy9vcmVmYWxvL0dpdFJlcG9zaXRvcmllcy93aXAvc3ZlbHRlLXRyZWV2aWV3cy9zY3JpcHRzL3ZpdGUvZXhhbXBsZS1pbXBvcnQuanNcIjtjb25zdCBfX3ZpdGVfaW5qZWN0ZWRfb3JpZ2luYWxfaW1wb3J0X21ldGFfdXJsID0gXCJmaWxlOi8vL1VzZXJzL29yZWZhbG8vR2l0UmVwb3NpdG9yaWVzL3dpcC9zdmVsdGUtdHJlZXZpZXdzL3NjcmlwdHMvdml0ZS9leGFtcGxlLWltcG9ydC5qc1wiO2ltcG9ydCBmcyBmcm9tICdub2RlOmZzL3Byb21pc2VzJztcbmltcG9ydCAqIGFzIHNhc3MgZnJvbSAnc2Fzcyc7XG5cbi8vIFRoaXMgSGlnaGxpZ2h0LmpzIGxvYWRpbmcgaXMgYmFzZWQgb24gdGhlIGNvZGUgaW46XG4vLyAgaHR0cHM6Ly9naXRodWIuY29tL21ldG9ueW0vc3ZlbHRlLWhpZ2hsaWdodC9ibG9iL21hc3Rlci9zcmMvSGlnaGxpZ2h0LnN2ZWx0ZVxuaW1wb3J0IGhsanMgZnJvbSAnaGlnaGxpZ2h0LmpzL2xpYi9jb3JlJztcbmltcG9ydCB4bWwgZnJvbSAnaGlnaGxpZ2h0LmpzL2xpYi9sYW5ndWFnZXMveG1sJztcbmltcG9ydCBqYXZhc2NyaXB0IGZyb20gJ2hpZ2hsaWdodC5qcy9saWIvbGFuZ3VhZ2VzL2phdmFzY3JpcHQnO1xuaW1wb3J0IGNzcyBmcm9tICdoaWdobGlnaHQuanMvbGliL2xhbmd1YWdlcy9jc3MnO1xuXG5obGpzLnJlZ2lzdGVyTGFuZ3VhZ2UoJ3htbCcsIHhtbCk7XG5obGpzLnJlZ2lzdGVyTGFuZ3VhZ2UoJ2phdmFzY3JpcHQnLCBqYXZhc2NyaXB0KTtcbmhsanMucmVnaXN0ZXJMYW5ndWFnZSgnY3NzJywgY3NzKTtcblxuLy8gVE9ETzogRXhwb3J0IHRoaXMgVml0ZSgmUm9sbHVwISkgcGx1Z2luIHRvIGJlIHVuaXZlcnNhbCBpbiBhIGRpZmZlcmVudCBwYWNrYWdlLlxuXG5jb25zdCBhcGlRdWVyeSA9ICdleGFtcGxlJztcbi8vIFZpdGUgaW50ZXJuYWxseSBhZGRzIHRoaXMgcGFyYW1ldGVyIGluIGJ1aWxkLCBzbyB3ZSBtdXN0IGFjY2VwdCBpdCBpZiBwcmVzZW50LiBTZWUgdGhpcyBjb21tZW50IGZvciBpbmZvOlxuLy8gIGh0dHBzOi8vZ2l0aHViLmNvbS92aXRlanMvdml0ZS9pc3N1ZXMvMTIyMzkjaXNzdWVjb21tZW50LTE0NjY0OTQ3MDRcbmNvbnN0IGFwaVF1ZXJ5T3B0aW9uYWwgPSAndXNlZCc7XG5cbmNvbnN0IGFwaVByb3h5U3VmZml4ID0gJy5leGFtcGxlLXNhZmVndWFyZC1wcm94eSc7IC8vIFRoaXMgaXMgbmVlZGVkIHNvIG90aGVyIHBsdWdpbnMgd291bGRuJ3QgdHJhbnNmb3JtIHRoZSBmaWxlXG5jb25zdCBpZFByZWZpeCA9ICdcXDBleGFtcGxlLWltcG9ydC1wcm94eVwiJztcbmNvbnN0IGVuY29kZUlkID0gKC8qKiBAdHlwZSB7c3RyaW5nfSAqLyBpZCkgPT4gaWRQcmVmaXggKyBpZCArIGFwaVByb3h5U3VmZml4O1xuY29uc3QgZGVjb2RlSWQgPSAoLyoqIEB0eXBlIHtzdHJpbmd9ICovIGlkKSA9PiBpZC5zbGljZShpZFByZWZpeC5sZW5ndGgsIC1hcGlQcm94eVN1ZmZpeC5sZW5ndGgpO1xuXG4vLyBUT0RPOiBDYW4gd2UganVzdCBtb2RpZnkgc29tZSBQcmV0dGllciBjb25maWcgdG8gZ2V0IHRoaXMgcmVzdWx0IGluIHRoZSBzdHJhaWdodCB3YXk/XG4vKipcbiAqIENoYW5nZSB0aGUgXCI+XCIgc3RhcnRpbmcgbGluZXMgdG8ganVzdCBnbyB0byB0aGUgbGluZSBiZWZvcmUuXG4gKiBUaGlzIGJvdGggbG9va3MgbmljZXIgZm9yIGV4YW1wbGVzLCBhbmQgYWRkaXRpb25hbGx5IGZpeCBoaWdobGlnaHRpbmcgaXNzdWVzLlxuICpcbiAqIEBwYXJhbSB7c3RyaW5nfSBjb2RlXG4gKiBAcmV0dXJucyB7c3RyaW5nfVxuICovXG5jb25zdCBmaXhUcmFpbGluZ0VuZHMgPSBjb2RlID0+IGNvZGUucmVwbGFjZUFsbCgvXFxuPi9nbSwgJz4nKTtcblxuLyoqXG4gKiBBIFZpdGUgcGx1Z2luIHRoYXQgY29tcHV0ZXMgdGhlIGFjdHVhbCBtaW5pZmllZCBzaXplIG9mIHRoZSBsaWJyYXJ5LlxuICpcbiAqIEByZXR1cm5zIHtpbXBvcnQoJ3ZpdGUnKS5QbHVnaW5PcHRpb259XG4gKi9cbmV4cG9ydCBjb25zdCBleGFtcGxlSW1wb3J0UGx1Z2luID0gKCkgPT4gKHtcbiAgbmFtZTogJ3ZpdGUtcGx1Z2luLWV4YW1wbGUnLFxuICBlbmZvcmNlOiAncHJlJyxcblxuICBhc3luYyByZXNvbHZlSWQoc291cmNlLCBpbXBvcnRlcikge1xuICAgIGNvbnN0IFtvcmlnaW5hbFNvdXJjZSwgc291cmNlVXJsU2VhcmNoUGFyYW1zU3RyXSA9IHNvdXJjZS5zcGxpdCgnPycsIDIpO1xuICAgIGNvbnN0IHNvdXJjZVVybFNlYXJjaFBhcmFtcyA9IG5ldyBVUkxTZWFyY2hQYXJhbXMoc291cmNlVXJsU2VhcmNoUGFyYW1zU3RyKTtcblxuICAgIGlmICghc291cmNlVXJsU2VhcmNoUGFyYW1zLmhhcyhhcGlRdWVyeSkgJiYgIXNvdXJjZVVybFNlYXJjaFBhcmFtcy5oYXMoYXBpUXVlcnlPcHRpb25hbCkpIHtcbiAgICAgIHJldHVybjtcbiAgICB9XG5cbiAgICAvLyBvdGhlcndpc2VcbiAgICBjb25zdCByZXNvbHZlZCA9IChhd2FpdCB0aGlzLnJlc29sdmUob3JpZ2luYWxTb3VyY2UsIGltcG9ydGVyKSk/LmlkO1xuICAgIHJldHVybiByZXNvbHZlZCA/IGVuY29kZUlkKHJlc29sdmVkKSA6IG51bGw7XG4gIH0sXG5cbiAgYXN5bmMgbG9hZChpZCkge1xuICAgIGlmICghaWQuc3RhcnRzV2l0aChpZFByZWZpeCkpIHtcbiAgICAgIHJldHVybjtcbiAgICB9XG4gICAgLy8gb3RoZXJ3aXNlXG5cbiAgICBjb25zdCBvcmlnaW5hbElkID0gZGVjb2RlSWQoaWQpO1xuICAgIGNvbnN0IGlzU3ZlbHRlID0gb3JpZ2luYWxJZC5lbmRzV2l0aCgnLnN2ZWx0ZScpO1xuICAgIGNvbnN0IGlzU2FzcyA9IFsnc2NzcycsICdzYXNzJ10uc29tZShzdWZmaXggPT4gb3JpZ2luYWxJZC5lbmRzV2l0aChgLiR7c3VmZml4fWApKTtcbiAgICBjb25zdCBpc0NTUyA9IGlzU2FzcyB8fCBvcmlnaW5hbElkLmVuZHNXaXRoKGAuY3NzYCk7XG5cbiAgICBsZXQgY29kZSA9IGF3YWl0IGZzLnJlYWRGaWxlKG9yaWdpbmFsSWQsIHsgZW5jb2Rpbmc6ICd1dGY4JyB9KTtcbiAgICBpZiAoaXNTdmVsdGUpIHtcbiAgICAgIGNvZGUgPSBmaXhUcmFpbGluZ0VuZHMoY29kZSk7XG4gICAgfVxuICAgIGNvbnN0IGhpZ2hsaWdodGVkSFRNTCA9IGhsanMuaGlnaGxpZ2h0QXV0byhjb2RlKS52YWx1ZTtcblxuICAgIGNvbnN0IGNzcyA9IGlzQ1NTID8gKGlzU2FzcyA/IChhd2FpdCBzYXNzLmNvbXBpbGVBc3luYyhvcmlnaW5hbElkKSkuY3NzIDogY29kZSkgOiB1bmRlZmluZWQ7XG4gICAgY29uc3QgY3NzSGlnaGxpZ2h0ZWRIVE1MID0gY3NzID8gaGxqcy5oaWdobGlnaHQoY3NzLCB7IGxhbmd1YWdlOiAnY3NzJyB9KS52YWx1ZSA6IHVuZGVmaW5lZDtcblxuICAgIGNvbnN0IG91dHB1dCA9IFtcbiAgICAgIGlzU3ZlbHRlID8gYGltcG9ydCBjb21wb25lbnQgZnJvbSAke0pTT04uc3RyaW5naWZ5KG9yaWdpbmFsSWQpfTtgIDogJycsXG4gICAgICBgZXhwb3J0IGNvbnN0IGNvZGUgPSAke0pTT04uc3RyaW5naWZ5KGNvZGUpfTtgLFxuICAgICAgYGV4cG9ydCBjb25zdCBoaWdobGlnaHRlZEhUTUwgPSAke0pTT04uc3RyaW5naWZ5KGhpZ2hsaWdodGVkSFRNTCl9O2AsXG4gICAgICBpc1N2ZWx0ZSA/IGBleHBvcnQgeyBjb21wb25lbnQgfTtgIDogJycsXG4gICAgICBpc0NTUyA/IGBleHBvcnQgY29uc3QgY3NzID0gJHtKU09OLnN0cmluZ2lmeShjc3MpfTtgIDogJycsXG4gICAgICBpc0NTUyA/IGBleHBvcnQgY29uc3QgY3NzSGlnaGxpZ2h0ZWRIVE1MID0gJHtKU09OLnN0cmluZ2lmeShjc3NIaWdobGlnaHRlZEhUTUwpfTtgIDogJycsXG4gICAgICBgZXhwb3J0IGRlZmF1bHQgeyBjb2RlLCBoaWdobGlnaHRlZEhUTUwke2lzU3ZlbHRlID8gJywgY29tcG9uZW50JyA6ICcnfSR7XG4gICAgICAgIGlzQ1NTID8gJywgY3NzLCBjc3NIaWdobGlnaHRlZEhUTUwnIDogJydcbiAgICAgIH0gfTtgXG4gICAgXS5qb2luKCdcXG4nKTtcblxuICAgIHJldHVybiBvdXRwdXQ7XG4gIH1cbn0pO1xuIiwgImNvbnN0IF9fdml0ZV9pbmplY3RlZF9vcmlnaW5hbF9kaXJuYW1lID0gXCIvVXNlcnMvb3JlZmFsby9HaXRSZXBvc2l0b3JpZXMvd2lwL3N2ZWx0ZS10cmVldmlld3Mvc2NyaXB0cy92aXRlXCI7Y29uc3QgX192aXRlX2luamVjdGVkX29yaWdpbmFsX2ZpbGVuYW1lID0gXCIvVXNlcnMvb3JlZmFsby9HaXRSZXBvc2l0b3JpZXMvd2lwL3N2ZWx0ZS10cmVldmlld3Mvc2NyaXB0cy92aXRlL21pbmlmaWVkLXNpemUtYW5hbHl6aW5nLmpzXCI7Y29uc3QgX192aXRlX2luamVjdGVkX29yaWdpbmFsX2ltcG9ydF9tZXRhX3VybCA9IFwiZmlsZTovLy9Vc2Vycy9vcmVmYWxvL0dpdFJlcG9zaXRvcmllcy93aXAvc3ZlbHRlLXRyZWV2aWV3cy9zY3JpcHRzL3ZpdGUvbWluaWZpZWQtc2l6ZS1hbmFseXppbmcuanNcIjtpbXBvcnQgZnMgZnJvbSAnZnMnO1xuaW1wb3J0IHBhdGggZnJvbSAncGF0aCc7XG5cbmNvbnN0IGxpYlBhdGggPSBwYXRoLnJlc29sdmUoJy4nLCAnc3JjL2xpYi8nKTtcbmltcG9ydCBwYWNrYWdlSnNvbiBmcm9tICcuLi8uLi9wYWNrYWdlLmpzb24nIGFzc2VydCB7IHR5cGU6ICdqc29uJyB9O1xuXG4vKiogQHR5cGUge3Vua25vd259ICovXG5sZXQgc3NyO1xuXG4vKipcbiAqIEEgVml0ZSBwbHVnaW4gdGhhdCBjb21wdXRlcyB0aGUgYWN0dWFsIG1pbmlmaWVkIHNpemUgb2YgdGhlIGxpYnJhcnkuXG4gKlxuICogQHJldHVybnMge2ltcG9ydCgndml0ZScpLlBsdWdpbk9wdGlvbn1cbiAqL1xuZXhwb3J0IGNvbnN0IG1pbmlmaWVkU2l6ZUFuYWx5emluZ1BsdWdpbiA9ICgpID0+ICh7XG4gIG5hbWU6ICd2aXRlLXBsdWdpbi1taW5pZmllZC1zaXplLWFuYWx5emluZycsXG4gIGVuZm9yY2U6ICdwcmUnLFxuXG4gIGNvbmZpZ1Jlc29sdmVkKGNvbmZpZykge1xuICAgIHNzciA9IGNvbmZpZy5idWlsZD8uc3NyID8/IGZhbHNlO1xuICB9LFxuXG4gIGdlbmVyYXRlQnVuZGxlKF9vcHRpb25zLCBidW5kbGUpIHtcbiAgICAvLyBOb3RpY2UgdGhhdCB0aGlzIHN0YWdlIGhhcHBlbiBvbmx5IG9uIGJ1aWxkLCBhbmQgbm90IG9uIGRldi5cblxuICAgIGxldCBmb3VuZCA9IGZhbHNlO1xuXG4gICAgZm9yIChjb25zdCBjaHVua05hbWUgaW4gYnVuZGxlKSB7XG4gICAgICBjb25zdCBjaHVuayA9IGJ1bmRsZVtjaHVua05hbWVdO1xuXG4gICAgICBpZiAoXG4gICAgICAgIGNodW5rLnR5cGUgPT09ICdjaHVuaycgJiZcbiAgICAgICAgT2JqZWN0LmtleXMoY2h1bmsubW9kdWxlcykuZmluZChmaWxlU291cmNlID0+IHBhdGgucmVzb2x2ZShmaWxlU291cmNlKS5zdGFydHNXaXRoKGxpYlBhdGgpKVxuICAgICAgKSB7XG4gICAgICAgIGlmIChmb3VuZCkge1xuICAgICAgICAgIHRocm93ICdFcnJvcjogdGhlIGxpYnJhcnkgZGVwZW5kZW5jeSB3YXMgYWxyZWFkeSBmb3VuZCBmb3IgbWluaWZpZWQgc2l6ZSBjb21wdXRhdGlvbiwgc28gaXQgaXMgc2VwYXJhdGVkISc7XG4gICAgICAgIH1cbiAgICAgICAgZm91bmQgPSB0cnVlO1xuXG4gICAgICAgIGNvbnN0IHNpemUgPSBjaHVuay5jb2RlLmxlbmd0aDtcblxuICAgICAgICBpZiAoIXNzcikge1xuICAgICAgICAgIGNvbnNvbGUubG9nKCdcXG5DbGllbnQgbWluaWZpZWQgbGlicmFyeSBzaXplIChieXRlcyk6ICcgKyBzaXplKTtcbiAgICAgICAgICBmcy53cml0ZUZpbGVTeW5jKCcuLy5zdmVsdGUta2l0L291dHB1dC9taW5pZmllZC1zaXplLWNsaWVudC50eHQnLCBzaXplLnRvU3RyaW5nKCkpO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgIGNvbnNvbGUubG9nKCdcXG5TZXJ2ZXIgbWluaWZpZWQgbGlicmFyeSBzaXplIChieXRlcyk6ICcgKyBzaXplKTtcbiAgICAgICAgICBmcy53cml0ZUZpbGVTeW5jKCcuLy5zdmVsdGUta2l0L291dHB1dC9taW5pZmllZC1zaXplLXNlcnZlci50eHQnLCBzaXplLnRvU3RyaW5nKCkpO1xuICAgICAgICB9XG4gICAgICB9XG4gICAgfVxuXG4gICAgaWYgKCFmb3VuZCkge1xuICAgICAgdGhyb3cgXCJFcnJvcjogdGhlIGxpYnJhcnkgZGVwZW5kZW5jeSB3YXNuJ3QgZm91bmQgZm9yIG1pbmlmaWVkIHNpemUgY29tcHV0YXRpb24hXCI7XG4gICAgfVxuICB9XG59KTtcblxuLyoqXG4gKiBUaGUgbmVlZGVkIFJvbGx1cCBgbWFudWFsQ2h1bmtzKClgIGNvbmZpZ3VyYXRpb24gZnVuY3Rpb24gc28gdGhlIHNpemUgYW5hbHl6aW5nIHdvdWxkIHdvcmsuXG4gKlxuICogQHBhcmFtIHtzdHJpbmd9IGlkXG4gKiBAcmV0dXJuc1xuICovXG5leHBvcnQgY29uc3QgbWFudWFsQ2h1bmtzRm9yQW5hbHl6aW5nID0gaWQgPT4ge1xuICBjb25zdCByZXNvbHZlZFBhdGggPSBwYXRoLnJlc29sdmUoaWQpO1xuXG4gIGlmIChyZXNvbHZlZFBhdGguc2VhcmNoKCdub2RlX21vZHVsZXMnKSA+IDApIHtcbiAgICAvLyBXZSBuZWVkIHRvIHNlcGFyYXRlIHRoZSBleHRlcm5hbCBkZXBzIHNvIHRoZXkgd29uJ3QgYmUgaW4gdGhlIGRlZmF1bHQgcGFja2FnZSBjaHVuay5cbiAgICByZXR1cm4gJ2V4dGVybmFsJztcbiAgfSBlbHNlIGlmIChyZXNvbHZlZFBhdGguc3RhcnRzV2l0aChsaWJQYXRoKSkge1xuICAgIHJldHVybiBwYWNrYWdlSnNvbi5uYW1lO1xuICB9IGVsc2Uge1xuICAgIHJldHVybiB1bmRlZmluZWQ7XG4gIH1cbn07XG4iLCAie1xuICBcIm5hbWVcIjogXCJzdmVsdGUtdHJlZXZpZXdzXCIsXG4gIFwidmVyc2lvblwiOiBcIjAuMS4wXCIsXG4gIFwiZGVzY3JpcHRpb25cIjogXCJBIGZ1bGwgZmVhdHVyZWQgdHJlZXZpZXcgY29tcG9uZW50XCIsXG4gIFwia2V5d29yZHNcIjogW1xuICAgIFwic3ZlbHRlXCIsXG4gICAgXCJ0cmVlXCIsXG4gICAgXCJ0cmVldmlld1wiLFxuICAgIFwiaGllcmFyY2h5XCJcbiAgXSxcbiAgXCJob21lcGFnZVwiOiBcImh0dHBzOi8vb3JlZmFsby5naXRodWIuaW8vc3ZlbHRlLXRyZWV2aWV3cy9cIixcbiAgXCJidWdzXCI6IFwiaHR0cHM6Ly9naXRodWIuY29tL29yZWZhbG8vc3ZlbHRlLXRyZWV2aWV3cy9pc3N1ZXNcIixcbiAgXCJyZXBvc2l0b3J5XCI6IHtcbiAgICBcInR5cGVcIjogXCJnaXRcIixcbiAgICBcInVybFwiOiBcImh0dHBzOi8vZ2l0aHViLmNvbS9vcmVmYWxvL3N2ZWx0ZS10cmVldmlld3MuZ2l0XCJcbiAgfSxcbiAgXCJsaWNlbnNlXCI6IFwiTUlUXCIsXG4gIFwiYXV0aG9yXCI6IHtcbiAgICBcIm5hbWVcIjogXCJPbGl2aWVyIFJlZmFsb1wiLFxuICAgIFwidXJsXCI6IFwiaHR0cHM6Ly9naXRodWIuY29tL29yZWZhbG9cIlxuICB9LFxuICBcInR5cGVcIjogXCJtb2R1bGVcIixcbiAgXCJleHBvcnRzXCI6IHtcbiAgICBcIi4vcGFja2FnZS5qc29uXCI6IFwiLi9wYWNrYWdlLmpzb25cIixcbiAgICBcIi5cIjoge1xuICAgICAgXCJ0eXBlc1wiOiBcIi4vZGlzdC9pbmRleC5kLnRzXCIsXG4gICAgICBcInN2ZWx0ZVwiOiBcIi4vZGlzdC9pbmRleC5qc1wiXG4gICAgfVxuICB9LFxuICBcInN2ZWx0ZVwiOiBcIi4vZGlzdC9pbmRleC5qc1wiLFxuICBcInR5cGVzXCI6IFwiLi9kaXN0L2luZGV4LmQudHNcIixcbiAgXCJmaWxlc1wiOiBbXG4gICAgXCJkaXN0XCJcbiAgXSxcbiAgXCJzY3JpcHRzXCI6IHtcbiAgICBcImJ1aWxkXCI6IFwidml0ZSBidWlsZCAmJiBub2RlIC4vc2NyaXB0cy9jcmVhdGUtbWluaWZpZWQtc2l6ZS1iYWRnZXMuanNcIixcbiAgICBcImNoZWNrXCI6IFwic3ZlbHRlLWNoZWNrIC0tdHNjb25maWcgLi90c2NvbmZpZy5qc29uXCIsXG4gICAgXCJjaGVjazp3YXRjaFwiOiBcInN2ZWx0ZS1jaGVjayAtLXRzY29uZmlnIC4vdHNjb25maWcuanNvbiAtLXdhdGNoXCIsXG4gICAgXCJjb21taXRcIjogXCJjcm9zcy1lbnYgbm9kZSAuL25vZGVfbW9kdWxlcy9jei1jdXN0b21pemFibGUvc3RhbmRhbG9uZS5qc1wiLFxuICAgIFwiZGV2XCI6IFwiY3Jvc3MtZW52IERFVj0xIHZpdGUgZGV2IC0tcG9ydCAzMDAwXCIsXG4gICAgXCJmZXRjaC1hbmQtcHVibGlzaFwiOiBcIm5vZGUgc2NyaXB0cy9mZXRjaC1hbmQtcHVibGlzaC5qc1wiLFxuICAgIFwiZm9ybWF0XCI6IFwicHJldHRpZXIgLS13cml0ZSAtLWNhY2hlIC5cIixcbiAgICBcImxpbnRcIjogXCJwbnBtIHJ1biBsaW50LWVzXCIsXG4gICAgXCJsaW50LWVzXCI6IFwiZXNsaW50IC0tY2FjaGUgLlwiLFxuICAgIFwicGFja2FnZVwiOiBcInBucG0gcnVuIHBhY2thZ2U6YnVpbGQgJiYgcG5wbSBydW4gcGFja2FnZTpwYWNrXCIsXG4gICAgXCJwYWNrYWdlOmJ1aWxkXCI6IFwicmltcmFmIC1nIC4vcGFja2FnZS8qICYmIHN2ZWx0ZS1wYWNrYWdlIC1vIC4vcGFja2FnZS9kaXN0ICYmIGNvcHlmaWxlcyAuL1JFQURNRS5tZCAuL0xJQ0VOU0UgLi9wYWNrYWdlLyAmJiBub2RlIHNjcmlwdHMvcGFja2FnZS1jbGVhbi1jb3B5LmpzXCIsXG4gICAgXCJwYWNrYWdlOnBhY2tcIjogXCJub2RlIC4vc2NyaXB0cy9taW5pZnktcGFja2FnZS5qcyAmJiBjZCBwYWNrYWdlICYmIHBucG0gcGFja1wiLFxuICAgIFwicHJlcGFyZVwiOiBcImh1c2t5XCIsXG4gICAgXCJwcmV2aWV3XCI6IFwidml0ZSBwcmV2aWV3IC0tcG9ydCAzMDAwXCIsXG4gICAgXCJzdGF0aWMtc2VydlwiOiBcInBucG0gYnVpbGQgJiYgc2VydmUgLWwgMzAwMCAtLW5vLWNsaXBib2FyZCBkb2NzXCIsXG4gICAgXCJ0ZXN0XCI6IFwicGxheXdyaWdodCB0ZXN0XCJcbiAgfSxcbiAgXCJjb25maWdcIjoge1xuICAgIFwiY3otY3VzdG9taXphYmxlXCI6IHtcbiAgICAgIFwiY29uZmlnXCI6IFwiLmN6LWNvbmZpZy5janNcIlxuICAgIH1cbiAgfSxcbiAgXCJkZXBlbmRlbmNpZXNcIjoge30sXG4gIFwiZGV2RGVwZW5kZW5jaWVzXCI6IHtcbiAgICBcIkBjb21taXRsaW50L2NsaVwiOiBcIl4xOS4zLjBcIixcbiAgICBcIkBjb21taXRsaW50L2NvbmZpZy1jb252ZW50aW9uYWxcIjogXCJeMTkuMi4yXCIsXG4gICAgXCJAcGxheXdyaWdodC90ZXN0XCI6IFwiXjEuNDUuM1wiLFxuICAgIFwiQHN2ZWx0ZWpzL2FkYXB0ZXItc3RhdGljXCI6IFwiXjMuMC4yXCIsXG4gICAgXCJAc3ZlbHRlanMva2l0XCI6IFwiXjIuNS4xOFwiLFxuICAgIFwiQHN2ZWx0ZWpzL3BhY2thZ2VcIjogXCIyLjMuMFwiLFxuICAgIFwiQHN2ZWx0ZWpzL3ZpdGUtcGx1Z2luLXN2ZWx0ZVwiOiBcIl40LjAuMC1uZXh0LjNcIixcbiAgICBcIkB0eXBlcy9lc2xpbnRcIjogXCJeOS42LjBcIixcbiAgICBcIkB0eXBlcy9ub2RlXCI6IFwiXjIwLjE0LjEzXCIsXG4gICAgXCJAdHlwZXNjcmlwdC1lc2xpbnQvZXNsaW50LXBsdWdpblwiOiBcIl43LjE3LjBcIixcbiAgICBcIkB0eXBlc2NyaXB0LWVzbGludC9wYXJzZXJcIjogXCJeNy4xNy4wXCIsXG4gICAgXCJiYWRnZS1tYWtlclwiOiBcIl40LjAuMFwiLFxuICAgIFwiY2xzeFwiOiBcIl4yLjEuMVwiLFxuICAgIFwiY29weWZpbGVzXCI6IFwiXjIuNC4xXCIsXG4gICAgXCJjcm9zcy1lbnZcIjogXCJeNy4wLjNcIixcbiAgICBcImN6LWN1c3RvbWl6YWJsZVwiOiBcIl43LjIuMVwiLFxuICAgIFwiZXNsaW50XCI6IFwiXjkuOC4wXCIsXG4gICAgXCJlc2xpbnQtY29uZmlnLXByZXR0aWVyXCI6IFwiXjkuMS4wXCIsXG4gICAgXCJlc2xpbnQtZ2l0aWdub3JlXCI6IFwiXjAuMS4wXCIsXG4gICAgXCJlc2xpbnQtcGx1Z2luLXN2ZWx0ZVwiOiBcIl4yLjQzLjBcIixcbiAgICBcImdsb2JhbHNcIjogXCJeMTUuOC4wXCIsXG4gICAgXCJoaWdobGlnaHQuanNcIjogXCJeMTEuMTAuMFwiLFxuICAgIFwiaHVza3lcIjogXCJeOS4xLjNcIixcbiAgICBcIm1pbmlmeVwiOiBcIl4xMS40LjBcIixcbiAgICBcInByZXR0aWVyXCI6IFwiXjMuMy4zXCIsXG4gICAgXCJwcmV0dGllci1wbHVnaW4tc3ZlbHRlXCI6IFwiXjMuMi42XCIsXG4gICAgXCJyaW1yYWZcIjogXCJeNi4wLjFcIixcbiAgICBcInNhc3NcIjogXCJeMS43Ny44XCIsXG4gICAgXCJzZXJ2ZVwiOiBcIl4xNC4yLjNcIixcbiAgICBcInN2ZWx0ZS1jaGVja1wiOiBcIl4zLjguNFwiLFxuICAgIFwic3ZlbHRlLWhpZ2hsaWdodFwiOiBcIl43LjcuMFwiLFxuICAgIFwic3ZlbHRlLXByZXByb2Nlc3NcIjogXCJeNi4wLjJcIixcbiAgICBcInRzbGliXCI6IFwiXjIuNi4zXCIsXG4gICAgXCJ0eXBlc2NyaXB0XCI6IFwiXjUuNS40XCIsXG4gICAgXCJ0eXBlc2NyaXB0LWVzbGludFwiOiBcIl44LjAuMC1hbHBoYS4zNFwiLFxuICAgIFwidml0ZVwiOiBcIl41LjMuNVwiXG4gIH0sXG4gIFwicGVlckRlcGVuZGVuY2llc1wiOiB7XG4gICAgXCJzdmVsdGVcIjogXCI1LjAuMC1uZXh0LjIwMVwiXG4gIH1cbn1cbiJdLAogICJtYXBwaW5ncyI6ICI7QUFBMlUs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
