import React from 'react';
import {Sandpack, SandpackFiles, SandpackProps} from '@codesandbox/sandpack-react';
import useThemeContext from '@theme/hooks/useThemeContext';

import {AutoViewsCore, AutoViewsDeps} from '../../utils/auto-views-core';

export type DemoFiles = SandpackFiles;
export type DemoDependencies = Record<string, string>;
export type DemoOptions = SandpackProps['options'];

export interface DemoProps {
    files: DemoFiles;
    dependencies?: DemoDependencies;
    options?: DemoOptions;
}

export function Demo(props: DemoProps) {
    const {isDarkTheme} = useThemeContext();

    return (
        <Sandpack
            theme={isDarkTheme ? 'dark' : 'light'}
            template="react-ts"
            customSetup={{
                files: {
                    ...AutoViewsCore,
                    ...props.files
                },
                dependencies: {
                    ...AutoViewsDeps,
                    ...props.dependencies
                }
            }}
            options={{
                openPaths: Object.keys(props.files),
                showNavigator: true,
                editorHeight: 500,
                ...props.options
            }}
        />
    );
}
