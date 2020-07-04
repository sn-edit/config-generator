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

    const labelStyle = "block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2";
    const inputStyle = "appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500";
    const headerStyle = "text-center font-semibold";

    return <React.Fragment>
        <div className="flex">
            <div className="bg-white shadow-md rounded px-8 pt-6 pb-8 w-1/4" style={{overflowY: "scroll", top: 0, bottom: 0, height: "100vh", flex: 1}}>
                <form>
                    <h1 className={headerStyle}>Core</h1>
                    <label className={labelStyle}>Root Directory:</label>
                    <input className={inputStyle} type={"text"} onChange={(e) => handleChange(e)} name={"app.core.root_directory"} value={config.app.core.root_directory} /> <br />

                    <label className={labelStyle}>Log Level: </label>
                    <input className={inputStyle} type={"text"} onChange={(e) => handleChange(e)} name={"app.core.log_level"} value={config.app.core.log_level} /> <br />

                    <label className={labelStyle}>Rate limit: </label>
                    <input className={inputStyle} type={"text"} onChange={(e) => handleChange(e)} name={"app.core.rate_limit"} value={config.app.core.rate_limit} /> <br />

                    <hr />

                <h1 className={headerStyle}>Database</h1>
                    <label className={labelStyle}>Path: </label>
                    <input className={inputStyle} type={"text"} onChange={(e) => handleChange(e)} name={"app.core.db.path"} value={config.app.core.db.path} /> <br />

                    <label className={labelStyle}>Initialised: </label>
                    <input className={inputStyle} type={"text"} onChange={(e) => handleChange(e)} name={"app.core.db.initialised"} value={config.app.core.db.initialised} /> <br />

                    <hr />

                <h1 className={headerStyle}>Rest</h1>
                    <label className={labelStyle}> Instance URL: </label>
                    <input className={inputStyle} type={"text"} onChange={(e) => handleChange(e)} name={"app.core.rest.url"} value={config.app.core.rest.url} /> <br />

                    <label className={labelStyle}>Username: </label>
                    <input className={inputStyle} type={"text"} onChange={(e) => handleChange(e)} name={"app.core.rest.user"} value={config.app.core.rest.user} /> <br />

                    <label className={labelStyle}>Password: </label>
                    <input className={inputStyle} type={"text"} onChange={(e) => handleChange(e)} name={"app.core.rest.password"} value={config.app.core.rest.password} type="password" /> <br />

                    <label className={labelStyle}>Masked: </label>
                    <input className={inputStyle} type={"text"} onChange={(e) => handleChange(e)} name={"app.core.rest.masked"} value={config.app.core.rest.masked} /> <br />

                    <label className={labelStyle}>Xor Key: </label>
                    <input className={inputStyle} type={"text"} onChange={(e) => handleChange(e)} name={"app.core.rest.xor_key"} value={config.app.core.rest.xor_key} /> <br />

                    {config.app.core.tables.map((table, index) => {
                        return <div key={"table" + index}>
                            <hr />
                            <h1 className={headerStyle}>{table.name}</h1>
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
            </div>
            <div className="w-3/4" style={{overflowY: "scroll", height: "100vh", flex: 3}}>
                <pre className="text-sm xl:text-xl bg-gray-100 md:mx-48 md:my-8 px-10 lg:px-8 py-8 lg:py-6 border border-gray-200 rounded leading-tight focus:outline-none focus:bg-white focus:border-gray-500 shadow-md">
                    {yaml.safeDump(config)}
                </pre>
            </div>
        </div>

    </React.Fragment>
};

export default App;
