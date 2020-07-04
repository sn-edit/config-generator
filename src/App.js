import React, {useState} from "react";
import yaml from "js-yaml";

const initialState = {
    app: {
        core: {
            log_level: "info",
            rate_limit: 2,
            db: {
                path: "/path/to/db/file",
                initialised: false,
            },
            rest: {
                masked: false,
                user: "username",
                password: "password",
                url: "https://dev111.service-now.com",
                xor_key: "xor_key"
            },
            root_directory: "/path/to/scripts/folder/tmp",
            tables: [
                {
                    name: "sys_script",
                    unique_key: "sys_name",
                    fields:
                        [
                            {
                                extension: "txt",
                                field: "sys_id"
                            },
                            {
                                extension: "js",
                                field: "script"
                            },
                            {
                                extension: "txt",
                                field: "sys_name"
                            }
                        ]
                },
                {
                    name: "sys_script_include",
                    unique_key: "sys_name",
                    fields:
                        [
                            {
                                extension: "txt",
                                field: "sys_id"
                            },
                            {
                                extension: "js",
                                field: "script"
                            },
                            {
                                extension: "txt",
                                field: "sys_name"
                            }
                        ]
                }
                //....
            ]
        },
    }
};

// const tables = [
//     {
//         name: "sys_script",
//         unique_key: "sys_name",
//         fields:
//             [
//                 {
//                     extension: "txt",
//                     field: "sys_id"
//                 },
//                 {
//                     extension: "js",
//                     field: "script"
//                 },
//                 {
//                     extension: "txt",
//                     field: "sys_name"
//                 }
//             ]
//     },
//     {
//         name: "sys_script_include",
//         unique_key: "sys_name",
//         fields:
//             [
//                 {
//                     extension: "txt",
//                     field: "sys_id"
//                 },
//                 {
//                     extension: "js",
//                     field: "script"
//                 },
//                 {
//                     extension: "txt",
//                     field: "sys_name"
//                 }
//             ]
//     }
//     //....
// ];

const App = () => {
    const [config, setConfig] = useState(initialState);

    const handleChange = (evt) => {
        const { name, value } = evt.target;
        let temp = {...config};
        set(temp, name, value);
        setConfig(temp);
    };

    const set = (obj, path, value) => {
        let parts = path.split(".");
        let last = parts.pop();
        let lastObj = parts.reduce((acc, cur) => acc[cur], obj);
        lastObj[last] = value;
    }

    const addTable = (e) => {
        e.preventDefault();

        let configCopy = {...config};
        const { tables } = configCopy.app.core;

        let template = {
            name: "",
            unique_key: "",
            fields:
                [
                    {
                        extension: "txt",
                        field: "sys_id"
                    },
                ]
        };

        tables.push(template);
        setConfig(configCopy);
    }

    const addField = (e, tableName) => {
        e.preventDefault();

        let configCopy = {...config};
        const { tables } = configCopy.app.core;

        tables.map((table) => {
            if (table.name === tableName) {
                let fieldsTemplate = {
                    field: "",
                    extension: ""
                };

                table.fields.push(fieldsTemplate);
            }
        });

        setConfig(configCopy);
    };

    const handleTablePropsChange = (tableName, prop, value) => {
        let configCopy = {...config};
        const {tables} = configCopy.app.core;

        tables.map((table) => {
            if (table.name === tableName) {
                table[prop] = value;
            }
        });

        setConfig(configCopy);
    };

    const handleTableFieldsChange = (tableName, fieldName, prop, value) => {
        let configCopy = {...config};
        const { tables } = configCopy.app.core;

        tables.map((table) => {
            if (table.name === tableName) {
                table.fields.map((field) => {
                    if (field.field === fieldName) {
                        field[prop] = value;
                    }
                });
            }
        });

        setConfig(configCopy);
    };

    const removeField = (e, tableName, fieldName) => {
        e.preventDefault();
        let configCopy = {...config};
        const { tables } = configCopy.app.core;

        tables.map((table) => {
            if (table.name === tableName) {
                table.fields = table.fields.filter((field) => {
                    return field.field !== fieldName;
                });
            }
        });

        setConfig(configCopy);
    };

    const removeTable = (e, tableName) => {
        e.preventDefault();
        let configCopy = {...config};

        configCopy.app.core.tables = configCopy.app.core.tables.filter((table) => {
            return table.name !== tableName;
        });

        setConfig(configCopy);
    };

    return <React.Fragment>
        <form>
            <h1>Core</h1>
            Root Directory: <input type={"text"} onChange={(e) => handleChange(e)} name={"app.core.root_directory"} value={config.app.core.root_directory} /> <br />
            Log Level: <input type={"text"} onChange={(e) => handleChange(e)} name={"app.core.log_level"} value={config.app.core.log_level} /> <br />
            Rate limit: <input type={"text"} onChange={(e) => handleChange(e)} name={"app.core.rate_limit"} value={config.app.core.rate_limit} /> <br />
            <h1>Database</h1>
            Path: <input type={"text"} onChange={(e) => handleChange(e)} name={"app.core.db.path"} value={config.app.core.db.path} /> <br />
            Initialised: <input type={"text"} onChange={(e) => handleChange(e)} name={"app.core.db.initialised"} value={config.app.core.db.initialised} /> <br />
            <h1>Rest</h1>
            Instance URL: <input type={"text"} onChange={(e) => handleChange(e)} name={"app.core.rest.url"} value={config.app.core.rest.url} /> <br />
            Username: <input type={"text"} onChange={(e) => handleChange(e)} name={"app.core.rest.user"} value={config.app.core.rest.user} /> <br />
            Password: <input type={"text"} onChange={(e) => handleChange(e)} name={"app.core.rest.password"} value={config.app.core.rest.password} /> <br />
            Masked: <input type={"text"} onChange={(e) => handleChange(e)} name={"app.core.rest.masked"} value={config.app.core.rest.masked} /> <br />
            Xor Key: <input type={"text"} onChange={(e) => handleChange(e)} name={"app.core.rest.xor_key"} value={config.app.core.rest.xor_key} /> <br />
            <h1>Tables</h1><button onClick={(e) => addTable(e)}>Add a new table</button>
            {config.app.core.tables.map((table, index) => {
                return <div key={"table" + index}>
                    <hr />
                    <h1>{table.name}</h1>
                    <button onClick={(e) => removeTable(e, table.name)}>Remove table {table.name}</button><br />
                    Table name <input type={"text"} onChange={(e) => handleTablePropsChange(table.name, "name", e.target.value)} value={table.name} /><br />
                    Unique key <input type={"text"} onChange={(e) => handleTablePropsChange(table.name, "unique_key", e.target.value)} value={table.unique_key} /><br />

                    <h1>Fields</h1>
                    <button onClick={(e) => addField(e, table.name)}>Add field</button>
                    {table.fields.map((field, index2) => {
                        return <div key={index+"_"+index2}>
                            <button onClick={() => removeField(e, table.name, field.field)}>Remove field {field.field}</button><br />
                            Field <input type={"text"} onChange={(e) => handleTableFieldsChange(table.name, field.field, "field", e.target.value)} value={field.field} /><br />
                            Field Extension <input type={"text"} onChange={(e) => handleTableFieldsChange(table.name, field.field, "extension", e.target.value)} value={field.extension} /><br />
                        </div>
                    })}
                    <hr />
                </div>
            })}
        </form>
        {/* this here goes to the right */}
        <pre>
            {yaml.safeDump(config)}
        </pre>
    </React.Fragment>
};

export default App;
