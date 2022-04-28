import React from 'react';

export interface RenderErrorInfo {
    message: string;
    stack?: string;
    componentStack: string;
    props: any;
}

export interface ErrorBoundaryProps {
    children: React.ReactNode;
    onRenderError?: (info: RenderErrorInfo) => void;
}

export interface ErrorBoundaryState {
    error: Error | null;
}

type CollectedProps = {
    [key: string]: any;
};

function isChildrenAnElement(
    children: React.ReactNode
): children is React.ReactElement<any> {
    return typeof children === 'object';
}

function filterProps(props: CollectedProps): CollectedProps {
    return Object.entries(props).reduce<CollectedProps>((acc, [key, value]) => {
        if (
            typeof value !== 'function' &&
            (typeof value !== 'object' ||
                value.constructor === Object ||
                value === null)
        ) {
            acc[key] = value;
        }
        return acc;
    }, {});
}

export class ErrorBoundary extends React.Component<
    ErrorBoundaryProps,
    ErrorBoundaryState
> {
    public static getDerivedStateFromError(error: Error) {
        return {error};
    }

    public state: ErrorBoundaryState = {
        error: null
    };

    public componentDidCatch(error: Error, errorInfo: React.ErrorInfo) {
        if (!this.props.onRenderError) {
            return;
        }
        const children = React.Children.only(this.props.children);
        this.props.onRenderError({
            message: error.message,
            stack: error.stack,
            componentStack: errorInfo.componentStack,
            props: isChildrenAnElement(children)
                ? filterProps(children.props)
                : null
        });
    }

    public render() {
        return this.state.error ? null : this.props.children;
    }
}
