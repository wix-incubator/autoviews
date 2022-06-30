import React from 'react';
import {
    Sandpack,
    SandpackFiles,
    SandpackProps
} from '@codesandbox/sandpack-react';
import {useColorMode} from '@docusaurus/theme-common';

export type DemoFiles = SandpackFiles;
export type DemoDependencies = Record<string, string>;
export type DemoOptions = SandpackProps['options'];

export interface DemoProps {
    files: DemoFiles;
    dependencies?: DemoDependencies;
    options?: DemoOptions;
}

const initialDeps = {
    '@autoviews/core': 'latest'
};

export function Demo(props: DemoProps) {
    const {isDarkTheme} = useColorMode();
    return (
        <Sandpack
            theme={isDarkTheme ? 'dark' : 'light'}
            template="react-ts"
            customSetup={{
                files: props.files,
                dependencies: {
                    ...initialDeps,
                    ...props.dependencies
                }
            }}
            options={{
                showNavigator: true,
                editorHeight: 500,
                externalResources: [
                    'https://fonts.googleapis.com/css?family=Roboto:300,400,500,700&display=swap',
                    'https://cdn.jsdelivr.net/npm/bootstrap@5.1.3/dist/css/bootstrap.min.css'
                ],
                ...props.options
            }}
        />
    );
}
