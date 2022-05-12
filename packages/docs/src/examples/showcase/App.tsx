import React, {useCallback, useMemo, useState} from 'react';
import {applyPatch} from 'fast-json-patch';
import {
    AutoView,
    ComponentsRepo,
    RepositoryProvider,
    UISchema
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

import {availableUISchemas} from './uiSchemas';
import './styles.css';
import {dataStore, SchemaNames, schemas} from './Data';
import {MUIFormRepo, MUITableRepo} from './MUIRepos';
import {BootstrapFormRepo, BootstrapTableRepo} from './BootstrapRepos';

export default function App() {
    // data
    const [data, setData] = useState<any[]>(dataStore.user);

    // JSON Schema
    const [schemaName, setSchemaName] = useState('user');
    const schema = useMemo(() => schemas[schemaName], [schemaName]);

    // UI Schema
    const [tableUISchemaIndex, setTableUISchemaIndex] = useState(0);
    const [formUISchemaIndex, setFormUISchemaIndex] = useState(0);
    const [[formUISchema, tableUISchema], setUISchemas] = useState<
        [UISchema, UISchema]
    >([
        availableUISchemas['user'].form[formUISchemaIndex].uiSchema,
        availableUISchemas['user'].table[tableUISchemaIndex].uiSchema
    ]);

    // Item to be edited in the form
    const [item, setItem] = useState<any>({});

    const onSchemaChange = useCallback((e: SelectChangeEvent<string>) => {
        const name = e.target.value as SchemaNames;
        setSchemaName(name);
        setData(dataStore[name]);
        setTableUISchemaIndex(0);
        setFormUISchemaIndex(0);
        setUISchemas([
            availableUISchemas[name].form[0].uiSchema,
            availableUISchemas[name].table[0].uiSchema
        ]);
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
    interface DropdownProps {
        id: string;
        title: string;
        value: string;
        values: string[];
        onChange: (e: SelectChangeEvent<string>) => void;
    }
    const Dropdown = ({id, title, value, values, onChange}: DropdownProps) => {
        return (
            <FormControl sx={{width: '140px', margin: '0 10px'}}>
                <InputLabel id={`${id}-select-label`}>{title}</InputLabel>
                <Select
                    labelId={`${id}-select-label`}
                    id={`${id}-select`}
                    value={value}
                    label={title}
                    onChange={onChange}
                >
                    {values.map(key => (
                        <MenuItem
                            value={key}
                            key={key}
                        >
                            {key}
                        </MenuItem>
                    ))}
                </Select>
            </FormControl>
        );
    };

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
                            <Dropdown
                                id={'schema'}
                                title={'Schema'}
                                value={schemaName}
                                values={Object.keys(schemas)}
                                onChange={onSchemaChange}
                            />
                        </ButtonGroup>
                    </CardContent>
                </Card>

                <Card variant="outlined">
                    <CardHeader
                        title="Table"
                        subheader="First instance of AutoView"
                        action={
                            <Dropdown
                                id={'table-ui-schema'}
                                title={'Table UI Schema'}
                                value={schemaName}
                                values={Object.keys(schemas)}
                                onChange={onSchemaChange}
                            />
                        }
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
                                uiSchema={formUISchema}
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
