/* eslint-disable max-lines */
/* eslint-disable no-unused-vars */
/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable camelcase */
/* eslint-disable no-nested-ternary */
import { join, relative, resolve, sep, dirname } from 'path';

import { DefinePlugin, HotModuleReplacementPlugin } from 'webpack';
import {
    getAppPath,
    getConvertedExternals,
    hasRootLevelScopedModules as _hasRootLevelScopedModules,
    hasRootLevelScopedAngular as _hasRootLevelScopedAngular,
    processTsPathsForScopedModules,
    processTsPathsForScopedAngular,
    getEntryModule,
    getResolver,
    getSourceMapFilename,
    processAppComponents,
    getUserDefinedEntries,
    GenerateNativeScriptEntryPointsPlugin,
    WatchStateLoggerPlugin,
    NativeScriptSnapshotPlugin,
} from 'nativescript-dev-webpack';
import nativescriptTarget from 'nativescript-dev-webpack/nativescript-target';
import { nsReplaceBootstrap } from 'nativescript-dev-webpack/transformers/ns-replace-bootstrap';
import { nsReplaceLazyLoader } from 'nativescript-dev-webpack/transformers/ns-replace-lazy-loader';
import { nsSupportHmrNg } from 'nativescript-dev-webpack/transformers/ns-support-hmr-ng';
import { getMainModulePath } from 'nativescript-dev-webpack/utils/ast-utils';
import {
    getNoEmitOnErrorFromTSConfig,
    getCompilerOptionsFromTSConfig,
} from 'nativescript-dev-webpack/utils/tsconfig-utils';
import CleanWebpackPlugin from 'clean-webpack-plugin';
import CopyWebpackPlugin from 'copy-webpack-plugin';
import { BundleAnalyzerPlugin } from 'webpack-bundle-analyzer';
import { NativeScriptWorkerPlugin } from 'nativescript-worker-loader/NativeScriptWorkerPlugin';
import TerserPlugin from 'terser-webpack-plugin';
import { getAngularCompilerPlugin } from 'nativescript-dev-webpack/plugins/NativeScriptAngularCompilerPlugin';
const hashSalt = Date.now().toString();

export default (env) => {
    // Add your custom Activities, Services and other Android app components here.
    const appComponents = env.appComponents || [];

    appComponents.push(
        ...[
            'tns-core-modules/ui/frame',
            'tns-core-modules/ui/frame/activity'
        ]
    );

    const platform =
        env &&
        ((env.android && 'android') || (env.ios && 'ios') || env.platform);

    if (!platform) {
        throw new Error('You need to provide a target platform!');
    }

    const AngularCompilerPlugin = getAngularCompilerPlugin(platform);
    const projectRoot = __dirname;

    // Default destination inside platforms/<platform>/...
    const dist = resolve(projectRoot, getAppPath(platform, projectRoot));

    const {
        /*
         * The 'appPath' and 'appResourcesPath' values are fetched from
         * the nsconfig.json configuration file.
         */
        appPath = 'src',
        appResourcesPath = 'App_Resources',

        // You can provide the following flags when running 'tns run android|ios'
        aot, // --env.aot
        snapshot, // --env.snapshot,
        production, // --env.production
        uglify, // --env.uglify
        report, // --env.report
        sourceMap, // --env.sourceMap
        hiddenSourceMap, // --env.hiddenSourceMap
        hmr, // --env.hmr,
        unitTesting, // --env.unitTesting
        verbose, // --env.verbose
        snapshotInDocker, // --env.snapshotInDocker
        skipSnapshotTools, // --env.skipSnapshotTools
        compileSnapshot, // --env.compileSnapshot
    } = env;

    const useLibs = compileSnapshot;
    const isAnySourceMapEnabled =
        Boolean(sourceMap) || Boolean(hiddenSourceMap);
    const externals = getConvertedExternals(env.externals);
    const appFullPath = resolve(projectRoot, appPath);
    const tsConfigName = 'tsconfig.tns.json';
    const tsConfigPath = join(__dirname, tsConfigName);
    const hasRootLevelScopedModules = _hasRootLevelScopedModules({
        projectDir: projectRoot,
    });
    const hasRootLevelScopedAngular = _hasRootLevelScopedAngular({
        projectDir: projectRoot,
    });
    let coreModulesPackageName = 'tns-core-modules';
    const alias = env.alias || {};

    alias['~'] = appFullPath;

    const compilerOptions = getCompilerOptionsFromTSConfig(tsConfigPath);

    if (hasRootLevelScopedModules) {
        coreModulesPackageName = '@nativescript/core';
        alias['tns-core-modules'] = coreModulesPackageName;
        processTsPathsForScopedModules({ compilerOptions });
    }

    if (hasRootLevelScopedAngular) {
        alias['nativescript-angular'] = '@nativescript/angular';
        processTsPathsForScopedAngular({ compilerOptions });
    }

    const appResourcesFullPath = resolve(projectRoot, appResourcesPath);
    const entryModule = `${getEntryModule(appFullPath, platform)}.ts`;
    const entryPath = `.${sep}${entryModule}`;
    const entries = env.entries || {};

    entries.bundle = entryPath;

    const areCoreModulesExternal =
        Array.isArray(env.externals) &&
        env.externals.some((e) => e.indexOf('tns-core-modules') > -1);

    if (platform === 'ios' && !areCoreModulesExternal) {
        entries['tns_modules/tns-core-modules/inspector_modules'] =
            'inspector_modules';
    }

    const ngCompilerTransformers = [];
    const additionalLazyModuleResources = [];

    if (aot) {
        ngCompilerTransformers.push(nsReplaceBootstrap);
    }

    if (hmr) {
        ngCompilerTransformers.push(nsSupportHmrNg);
    }

    /*
     * When "@angular/core" is external, it's not included in the bundles. In this way, it will be used
     * directly from node_modules and the Angular modules loader won't be able to resolve the lazy routes
     * fixes https://github.com/NativeScript/nativescript-cli/issues/4024
     */
    if (env.externals && env.externals.indexOf('@angular/core') > -1) {
        const appModuleRelativePath = getMainModulePath(
            resolve(appFullPath, entryModule),
            tsConfigName
        );

        if (appModuleRelativePath) {
            const appModuleFolderPath = dirname(
                resolve(appFullPath, appModuleRelativePath)
            );
            // Include the lazy loader inside app module

            ngCompilerTransformers.push(nsReplaceLazyLoader);
            // Include the new lazy loader path in the allowed ones
            additionalLazyModuleResources.push(appModuleFolderPath);
        }
    }

    const ngCompilerPlugin = new AngularCompilerPlugin({
        additionalLazyModuleResources,
        compilerOptions: { paths: compilerOptions.paths },
        hostReplacementPaths: getResolver([
            platform,
            'tns'
        ]),
        mainPath: join(appFullPath, entryModule),
        platformTransformers: ngCompilerTransformers.map((t) => t(
                () => ngCompilerPlugin,
                resolve(appFullPath, entryModule),
                projectRoot
            )
        ),
        skipCodeGeneration: !aot,
        sourceMap: Boolean(isAnySourceMapEnabled),
        tsConfigPath,
    });

    const sourceMapFilename = getSourceMapFilename(
        hiddenSourceMap,
        __dirname,
        dist
    );

    const itemsToClean = [`${dist}/**/*`];

    if (platform === 'android') {
        itemsToClean.push(
            `${join(
                projectRoot,
                'platforms',
                'android',
                'app',
                'src',
                'main',
                'assets',
                'snapshots'
            )}`
        );
        itemsToClean.push(
            `${join(
                projectRoot,
                'platforms',
                'android',
                'app',
                'build',
                'configurations',
                'nativescript-android-snapshot'
            )}`
        );
    }

    const noEmitOnErrorFromTSConfig = getNoEmitOnErrorFromTSConfig(
        join(projectRoot, tsConfigName)
    );

    processAppComponents(appComponents, platform);
    const config = {
        context: appFullPath,
        devtool: hiddenSourceMap
            ? 'hidden-source-map'
            : sourceMap
            ? 'inline-source-map'
            : 'none',
        entry: entries,
        externals,
        mode: production ? 'production' : 'development',
        module: {
            rules: [
                {
                    include: join(appFullPath, entryPath),
                    use: [
                        // Require all Android app components
                        platform === 'android' && {
                            loader:
                                'nativescript-dev-webpack/android-app-components-loader',
                            options: { modules: appComponents },
                        },

                        {
                            loader:
                                'nativescript-dev-webpack/bundle-config-loader',
                            options: {
                                angular: true,
                                appFullPath,
                                ignoredFiles: getUserDefinedEntries(
                                    entries,
                                    platform
                                ),
                                loadCss: !snapshot, // Load the application css if in debug mode
                                projectRoot,
                                unitTesting,
                            },
                        },
                    ].filter((loader) => Boolean(loader)),
                },
                {
                    test: /\.html$|\.xml$/,
                    use: 'raw-loader',
                },
                {
                    test: /[\/|\\]app\.css$/,
                    use: [
                        'nativescript-dev-webpack/style-hot-loader',
                        {
                            loader: 'nativescript-dev-webpack/css2json-loader',
                            options: { useForImports: true },
                        },
                    ],
                },
                {
                    test: /[\/|\\]app\.scss$/,
                    use: [
                        'nativescript-dev-webpack/style-hot-loader',
                        {
                            loader: 'nativescript-dev-webpack/css2json-loader',
                            options: { useForImports: true },
                        },
                        'sass-loader',
                    ],
                },

                // Angular components reference css files and their imports using raw-loader
                {
                    exclude: /[\/|\\]app\.css$/,
                    test: /\.css$/,
                    use: 'raw-loader',
                },
                {
                    exclude: /[\/|\\]app\.scss$/,
                    test: /\.scss$/,
                    use: [
                       'raw-loader',
                       'resolve-url-loader',
                       'sass-loader'
                    ],
                },

                {
                    test: /(?:\.ngfactory\.js|\.ngstyle\.js|\.ts)$/,
                    use: [
                        'nativescript-dev-webpack/moduleid-compat-loader',
                        'nativescript-dev-webpack/lazy-ngmodule-hot-loader',
                        '@ngtools/webpack',
                    ],
                },

                /*
                 * Mark files inside `@angular/core` as using SystemJS style dynamic imports.
                 * Removing this will cause deprecation warnings to appear.
                 */
                {
                    parser: { system: true },
                    test: /[\/\\]@angular[\/\\]core[\/\\].+\.js$/,
                },
            ],
        },
        node: {
            // Disable node shims that conflict with NativeScript
            __dirname: false,
            child_process: 'empty',
            fs: 'empty',
            http: false,
            setImmediate: false,
            timers: false,
        },
        optimization: {
            minimize: Boolean(uglify),
            minimizer: [
                new TerserPlugin({
                    cache: true,
                    parallel: true,
                    sourceMap: isAnySourceMapEnabled,
                    terserOptions: {
                        compress: {
                            /*
                             * The Android SBG has problems parsing the output
                             * when these options are enabled
                             */
                            collapse_vars: platform !== 'android',
                            sequences: platform !== 'android',
                        },
                        output: {
                            comments: false,
                            semicolons: !isAnySourceMapEnabled,
                        },
                    },
                }),
            ],
            noEmitOnErrors: noEmitOnErrorFromTSConfig,
            runtimeChunk: 'single',
            splitChunks: {
                cacheGroups: {
                    vendor: {
                        chunks: 'all',
                        enforce: true,
                        name: 'vendor',
                        test: (module, chunks) => {
                            const moduleName = module.nameForCondition
                                ? module.nameForCondition()
                                : '';

                            return (
                                (/[\\/]node_modules[\\/]/).test(moduleName) ||
                                appComponents.some(
                                    (comp) => comp === moduleName
                                )
                            );
                        },
                    },
                },
            },
        },
        output: {
            filename: '[name].js',
            globalObject: 'global',
            hashSalt,
            libraryTarget: 'commonjs2',
            path: dist,
            pathinfo: false,
            sourceMapFilename,
        },
        plugins: [
            // Define useful constants like TNS_WEBPACK
            new DefinePlugin({
                'global.TNS_WEBPACK': 'true',
                process: 'global.process',
                'process.env': {
                    environment:
                        env &&
                        Object.prototype.hasOwnProperty.call(env, 'environment')
                            ? JSON.stringify(env.environment)
                            : undefined,
                },
            }),
            // Remove all files from the out dir.
            new CleanWebpackPlugin(itemsToClean, { verbose: Boolean(verbose) }),
            // Copy assets to out dir. Add your own globs as needed.
            new CopyWebpackPlugin(
                [
                    { from: { glob: 'fonts/**' } },
                    { from: { glob: '**/*.jpg' } },
                    { from: { glob: '**/*.png' } },
                ],
                { ignore: [`${relative(appPath, appResourcesFullPath)}/**`] }
            ),
            new GenerateNativeScriptEntryPointsPlugin('bundle'),

            /*
             * For instructions on how to set up workers with webpack
             * check out https://github.com/nativescript/worker-loader
             */
            new NativeScriptWorkerPlugin(),
            ngCompilerPlugin,
            // Does IPC communication with the {N} CLI to notify events when running in watch mode.
            new WatchStateLoggerPlugin(),
        ],
        resolve: {
            alias,
            extensions: [
                '.ts',
                '.js',
                '.scss',
                '.css'
            ],
            modules: [
                // Resolve {N} system modules from tns-core-modules
                resolve(__dirname, `node_modules/${coreModulesPackageName}`),
                resolve(__dirname, 'node_modules'),
                `node_modules/${coreModulesPackageName}`,
                'node_modules',
            ],
            symlinks: true,
        },
        resolveLoader: {
            symlinks: false,
        },
        target: nativescriptTarget,
        watchOptions: {
            ignored: [
                appResourcesFullPath,
                // Don't watch hidden files
                '**/.*',
            ],
        },
    };

    if (report) {
        // Generate report files for bundles content
        config.plugins.push(
            new BundleAnalyzerPlugin({
                analyzerMode: 'static',
                generateStatsFile: true,
                openAnalyzer: false,
                reportFilename: resolve(projectRoot, 'report', 'report.html'),
                statsFilename: resolve(projectRoot, 'report', 'stats.json'),
            })
        );
    }

    if (snapshot) {
        config.plugins.push(
            new NativeScriptSnapshotPlugin({
                angular: true,
                chunk: 'vendor',
                projectRoot,
                requireModules: [
                    'reflect-metadata',
                    '@angular/platform-browser',
                    '@angular/core',
                    '@angular/common',
                    '@angular/router',
                    'nativescript-angular/platform-static',
                    'nativescript-angular/router',
                ],
                skipSnapshotTools,
                snapshotInDocker,
                useLibs,
                webpackConfig: config,
            })
        );
    }

    if (hmr) {
        config.plugins.push(new HotModuleReplacementPlugin());
    }

    return config;
};
