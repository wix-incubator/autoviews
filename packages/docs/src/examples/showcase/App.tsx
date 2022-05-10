import React, {useCallback, useState} from 'react';
import {applyPatch} from 'fast-json-patch';
import {
    AutoView, ComponentsRepo, CoreSchemaMetaSchema, RepositoryProvider
} from '@autoviews/core';
import {
    Box,
    Button,
    ButtonGroup,
    Card,
    CardContent,
    FormControl,
    InputLabel,
    MenuItem,
    Select,
    SelectChangeEvent
} from '@mui/material';

import {BootstrapFormRepo, MUIFormRepo} from './repos';
import {BootstrapTableRepo, MUITableRepo} from './basicRepo';
import {hintsSchema, tableUISchema} from './uiSchemas';
import './styles.css';
import {dataStore, SchemaNames, schemas} from './Data';

export default function App() {
    const [data, setData] = useState<any[]>(dataStore.user);
    const [[schema, schemaName], setSchema] = useState<
        [CoreSchemaMetaSchema, SchemaNames]
        >([schemas.user, 'user']);

    const [item, setItem] = useState<any>({});

    const onSchemaChange = useCallback((e: SelectChangeEvent<string>) => {
        const name = e.target.value as SchemaNames;
        setSchema([schemas[name], name]);
        setData(dataStore[name]);
    }, []);

    const onFormChange = useCallback(
        (_: any, {patch}) => {
            setItem({...applyPatch(item, patch).newDocument});
        },
        [setItem, item]
    );

    const [tableRepo, setTableRepo] = useState<ComponentsRepo>(MUITableRepo);
    const [formRepo, setFormRepo] = useState<ComponentsRepo>(MUIFormRepo);

    const onSetRepo = useCallback(
        (name: 'mui' | 'bootstrap') => {
            switch (name) {
                case 'mui':
                    setTableRepo(MUITableRepo);
                    setFormRepo(MUIFormRepo);
                    break;
                case 'bootstrap':
                    setTableRepo(BootstrapTableRepo);
                    setFormRepo(BootstrapFormRepo);
                    break;
            }
        },
        [setTableRepo, setFormRepo]
    );

    const onAddItem = useCallback(
        (_, e) => {
            switch (e.data.action) {
                case 'SAVE':
                    setData([...data, item]);
                    setItem({});
                    break;
            }
        },
        [item, data]
    );

    return (
        <div className="App">
            <Card>
                <CardContent>
                    <h1>AutoViews Examples</h1>
                    <>
                        <Box sx={{margin: '20px 0'}}>
                            <ButtonGroup
                                variant="outlined"
                                aria-label="outlined button group"
                            >
                                <Button
                                    onClick={() => onSetRepo('mui')}
                                    disabled={tableRepo === MUITableRepo}
                                >
                                    Mateial UI
                                </Button>
                                <Button
                                    onClick={() => onSetRepo('bootstrap')}
                                    disabled={tableRepo === BootstrapTableRepo}
                                >
                                    Bootstrap
                                </Button>
                                <FormControl sx={{width: '140px', margin: '0 10px'}}>
                                    <InputLabel id="schema-select-label">Schema</InputLabel>
                                    <Select
                                        labelId="schema-select-label"
                                        id="schema-select"
                                        value={schemaName}
                                        label="Schema"
                                        onChange={onSchemaChange}
                                    >
                                        {Object.keys(schemas).map((key) => (
                                            <MenuItem
                                                value={key}
                                                key={key}
                                            >
                                                {key}
                                            </MenuItem>
                                        ))}
                                    </Select>
                                </FormControl>
                            </ButtonGroup>
                        </Box>

                        <RepositoryProvider components={tableRepo}>
                            <AutoView
                                schema={schema}
                                data={data}
                                uiSchema={tableUISchema}
                            />
                        </RepositoryProvider>
                    </>

                    <Box sx={{margin: '20px 0'}}>
                        <RepositoryProvider components={formRepo}>
                            <AutoView
                                data={item}
                                uiSchema={hintsSchema}
                                schema={schema.items!}
                                onChange={onFormChange}
                                onClick={onAddItem}
                            />
                        </RepositoryProvider>
                    </Box>
                </CardContent>
            </Card>
        </div>
    );
}
