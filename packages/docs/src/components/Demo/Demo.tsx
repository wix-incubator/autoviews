import React from 'react';
import {Sandpack, SandpackFiles, SandpackProps} from '@codesandbox/sandpack-react';
import {useColorMode} from '@docusaurus/theme-common';

import {CoreFiles, CoreDeps} from '../../utils/core';

export type DemoFiles = SandpackFiles;
export type DemoDependencies = Record<string, string>;
export type DemoOptions = SandpackProps['options'];

export interface DemoProps {
    files: DemoFiles;
    dependencies?: DemoDependencies;
    options?: DemoOptions;
}

export function Demo(props: DemoProps) {
    const {isDarkTheme} = useColorMode();

    return (
        <Sandpack
            theme={isDarkTheme ? 'dark' : 'light'}
            template="react-ts"
            customSetup={{
                files: {
                    ...CoreFiles,
                    ...props.files
                },
                dependencies: {
                    ...CoreDeps,
                    ...props.dependencies
                }
            }}
            options={{
                openPaths: Object.keys(props.files),
                showNavigator: true,
                editorHeight: 500,
                externalResources: [
                    'https://fonts.googleapis.com/css?family=Roboto:300,400,500,700&display=swap'
                ],
                ...props.options
            }}
        />
    );
}
