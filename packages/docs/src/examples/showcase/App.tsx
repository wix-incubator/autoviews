import React, {useCallback, useState} from 'react';
import {applyPatch} from 'fast-json-patch';
import {
    AutoView,
    ComponentsRepo,
    CoreSchemaMetaSchema,
    RepositoryProvider
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
    SelectChangeEvent,
    Divider,
    CardHeader
} from '@mui/material';

import {hintsSchema, tableUISchema} from './uiSchemas';
import './styles.css';
import {dataStore, SchemaNames, schemas} from './Data';
import {MUIFormRepo, MUITableRepo} from './MUIRepos';
import {BootstrapFormRepo, BootstrapTableRepo} from './BootstrapRepos';

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
            <Box style={{margin: '0 20px'}}>
                <Card sx={{margin: '20px 0'}}>
                    <CardHeader
                        title="Controls"
                        subheader="Change UI Library, Schema or UI Schema"
                    />
                    <Divider />
                    <CardContent>
                        <ButtonGroup aria-label="outlined button group">
                            <Button
                                onClick={() => onSetRepo('mui')}
                                variant={
                                    tableRepo === MUITableRepo
                                        ? 'contained'
                                        : 'outlined'
                                }
                            >
                                Mateial UI
                            </Button>
                            <Button
                                onClick={() => onSetRepo('bootstrap')}
                                variant={
                                    tableRepo === BootstrapTableRepo
                                        ? 'contained'
                                        : 'outlined'
                                }
                            >
                                Bootstrap
                            </Button>
                            <FormControl
                                sx={{width: '140px', margin: '0 10px'}}
                            >
                                <InputLabel id="schema-select-label">
                                    Schema
                                </InputLabel>
                                <Select
                                    labelId="schema-select-label"
                                    id="schema-select"
                                    value={schemaName}
                                    label="Schema"
                                    onChange={onSchemaChange}
                                >
                                    {Object.keys(schemas).map(key => (
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
                    </CardContent>
                </Card>

                <Card variant="outlined">
                    <CardHeader
                        title="Table"
                        subheader="First instance of AutoView"
                    />
                    <Divider />
                    <CardContent>
                        <RepositoryProvider components={tableRepo}>
                            <AutoView
                                schema={schema}
                                data={data}
                                uiSchema={tableUISchema}
                            />
                        </RepositoryProvider>
                    </CardContent>
                </Card>
                <Card
                    variant="outlined"
                    sx={{margin: '20px 0'}}
                >
                    <CardHeader
                        title="Form"
                        subheader="Second instance of AutoView"
                    />
                    <Divider />
                    <CardContent>
                        <RepositoryProvider components={formRepo}>
                            <AutoView
                                data={item}
                                uiSchema={hintsSchema}
                                schema={schema.items!}
                                onChange={onFormChange}
                                onClick={onAddItem}
                            />
                        </RepositoryProvider>
                    </CardContent>
                </Card>
            </Box>
        </div>
    );
}
