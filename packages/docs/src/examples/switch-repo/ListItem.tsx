import React, {useState} from 'react';
import {Operation} from 'fast-json-patch';
import {
    AutoViewProps,
    AutoFields,
    RepositoryProvider,
    AutoEventHandler,
    AutoChangeEvent,
    clickEventHandler
} from '@autoviews/core';
import {
    ListItem as MUIListItem, Divider, Button, Stack
} from '@mui/material';

import {repo} from './item-repo';

export const ListItem: React.ComponentType<AutoViewProps> = props => {
    const [view, setView] = useState<'item' | 'listItem'>('listItem');
    const [patches, setPatches] = useState<Operation[]>([]);

    const changeHandler = React.useCallback<AutoEventHandler<AutoChangeEvent>>(
        (_, {patch}) => {
            setPatches(patches.concat(patch));
        },
        [patches, setPatches]
    );

    const saveHandler = clickEventHandler({
        ...props,
        data: {type: 'SAVE_ITEM', value: patches}
    });

    switch (view) {
        case 'listItem': {
            return (
                <>
                    <MUIListItem>
                        <AutoFields
                            {...props}
                            pick={['login', 'active']}
                        />
                        <Button
                            variant="text"
                            onClick={() => {
                                setView('item');
                            }}
                            sx={{margin: '0 10px'}}
                        >
                            Edit
                        </Button>
                    </MUIListItem>
                    <Divider component="li"/>
                </>
            );
        }
        case 'item': {
            return (
                <RepositoryProvider components={repo}>
                    <AutoFields
                        {...props}
                        onChange={changeHandler}
                    />
                    <Stack
                        direction="row"
                        spacing={2}
                        sx={{margin: '20px 0'}}
                    >
                        <Button
                            variant="contained"
                            color="success"
                            onClick={e => {
                                setView('listItem');
                                saveHandler(e);
                            }}
                        >
                            Save
                        </Button>
                        <Button
                            color="secondary"
                            onClick={() => {
                                setView('listItem');
                                setPatches([]);
                            }}
                        >
                            Discard
                        </Button>
                    </Stack>
                    <Divider />
                </RepositoryProvider>
            );
        }
    }
};

