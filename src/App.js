import React, {useState} from "react";
import yaml from "js-yaml";

/* Icons */
import { TiPlus, TiTimes, TiLink } from "react-icons/ti";

/* Custom CSS */
import "./assets/snedit.css";

const initialState = {
    app: {
        core: {
            log_level: "info",
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
        },
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
        ],
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

        configCopy.app.tables = configCopy.app.tables.filter((table) => {
            return table.name !== tableName;
        });

        setConfig(configCopy);
    };

    const downloadConfig = (e) => {
        e.preventDefault();

        let fileName = "sn-edit.yaml";
        let data = yaml.safeDump(config);
        let file = new File([data], fileName, {type: "application/octet-stream"});
        let exportUrl = URL.createObjectURL(file);
        let a = document.createElement("a");
        a.style = "display: none";
        a.href = exportUrl;
        a.download = fileName;
        document.body.appendChild(a);
        a.click();
        URL.revokeObjectURL(exportUrl);
        a.remove();
    };

    const labelStyle = "block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2";
    const inputStyle = "appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500";
    const headerStyle = "text-center font-semibold my-2 uppercase";
    const buttonStyleAdd = "bg-green-500 hover:bg-green-400 text-white font-bold py-2 px-4 rounded my-4 mx-auto";
    const buttonStyleRemove = "bg-red-500 hover:bg-red-400 text-white font-bold py-2 px-4 rounded mt-1 mb-4";
    const docsURL = (url) => <TiLink title={"See docs for more info"} style={{display: "inline-block", cursor: "pointer"}} onClick={() => window.open(url)}/>;

    return <React.Fragment>
        <div className="flex">
            <div className="bg-white shadow-md rounded px-8 pt-6 pb-8 w-1/4" style={{overflowY: "scroll", top: 0, bottom: 0, height: "100vh", flex: 1}}>

                <div>
                    <img alt={"logo.png"} src={"https://docs.sn-edit.com/_assets/sn-edit-logo.png"} style={{width: "52px", height: "52px"}} className="mx-auto mb-0"/>
                    <h1 className="text-center mb-8 font-semibold text-2xl border-2 border-gray-900 px-2 w-10/12 mx-auto">SN-EDIT Configurator</h1>
                </div>

                <form>
                    <h1 className={headerStyle}>Core{docsURL("https://docs.sn-edit.com/#/configuration/README?id=config-parameters")}</h1>
                    <label className={labelStyle}>Root Directory{docsURL("https://docs.sn-edit.com/#/configuration/README?id=appcoreroot_directory")}</label>
                    <input className={inputStyle} type={"text"} onChange={(e) => handleChange(e)} name={"app.core.root_directory"} value={config.app.core.root_directory} /> <br />

                    <label className={labelStyle}>Log Level{docsURL("https://docs.sn-edit.com/#/configuration/README?id=appcorelog_level")}</label>
                    <input className={inputStyle} type={"text"} onChange={(e) => handleChange(e)} name={"app.core.log_level"} value={config.app.core.log_level} /> <br />

                    {/*<label className={labelStyle}>Rate limit{docsURL()}</label>*/}
                    {/*<input className={inputStyle} type={"text"} onChange={(e) => handleChange(e)} name={"app.core.rate_limit"} value={config.app.core.rate_limit} /> <br />*/}

                    <hr />

                <h1 className={headerStyle}>Database{docsURL("https://docs.sn-edit.com/#/configuration/README?id=appcoredb")}</h1>
                    <label className={labelStyle}>Path{docsURL("https://docs.sn-edit.com/#/configuration/README?id=appcoredbpath")}</label>
                    <input className={inputStyle} type={"text"} onChange={(e) => handleChange(e)} name={"app.core.db.path"} value={config.app.core.db.path} /> <br />

                    <label className={labelStyle}>Initialised{docsURL("https://docs.sn-edit.com/#/configuration/README?id=appcoredbinitialised")}</label>
                    <input className={inputStyle} type={"text"} onChange={(e) => handleChange(e)} name={"app.core.db.initialised"} value={config.app.core.db.initialised} /> <br />

                    <hr />

                <h1 className={headerStyle}>Rest{docsURL("https://docs.sn-edit.com/#/configuration/README?id=appcorerest")}</h1>
                    <label className={labelStyle}>Instance URL{docsURL("https://docs.sn-edit.com/#/configuration/README?id=appcoreresturl")}</label>
                    <input className={inputStyle} type={"text"} onChange={(e) => handleChange(e)} name={"app.core.rest.url"} value={config.app.core.rest.url} /> <br />

                    <label className={labelStyle}>Username</label>
                    <input className={inputStyle} type={"text"} onChange={(e) => handleChange(e)} name={"app.core.rest.user"} value={config.app.core.rest.user} /> <br />

                    <label className={labelStyle}>Password</label>
                    <input className={inputStyle} type={"text"} onChange={(e) => handleChange(e)} name={"app.core.rest.password"} value={config.app.core.rest.password} type="password" /> <br />

                    <label className={labelStyle}>Masked{docsURL("https://docs.sn-edit.com/#/configuration/README?id=appcorerestmasked")}</label>
                    <input className={inputStyle} type={"text"} onChange={(e) => handleChange(e)} name={"app.core.rest.masked"} value={config.app.core.rest.masked} /> <br />

                    <label className={labelStyle}>Xor Key{docsURL("https://docs.sn-edit.com/#/configuration/README?id=appcorerestxor_key")}</label>
                    <input className={inputStyle} type={"text"} onChange={(e) => handleChange(e)} name={"app.core.rest.xor_key"} value={config.app.core.rest.xor_key} /> <br />

                    <hr />

                    <h1 className={headerStyle}>Tables{docsURL("https://docs.sn-edit.com/#/configuration/README?id=apptables")}</h1>
                    <button className={buttonStyleAdd} onClick={(e) => addTable(e)}>Add a new table <TiPlus className="inline-block" /></button>

                    {config.app.tables.map((table, index) => {
                        return <div key={"table" + index} className="my-4">
                            <input id={"collapsible" + index} className="toggle" type="checkbox" />
                            <label htmlFor={"collapsible" + index} className="bg-gray-200 hover:text-gray-800 lbl-toggle font-bold text-xl">{table.name}</label>

                            <div className={"collapsible-content"}>
                                <div className={"content-inner bg-gray-100"}>

                                    <label className={labelStyle}>Table name</label>
                                    <input className={inputStyle} type={"text"} onChange={(e) => handleTablePropsChange(table.name, "name", e.target.value)} value={table.name} /><br />

                                    <label className={labelStyle}>Unique key</label>
                                    <input className={inputStyle} type={"text"} onChange={(e) => handleTablePropsChange(table.name, "unique_key", e.target.value)} value={table.unique_key} /><br />

                                    <button className={buttonStyleRemove} onClick={(e) => removeTable(e, table.name)}>Remove {table.name} <TiTimes className="inline-block" /></button><br />

                                    <hr />

                                    <h1 className={headerStyle}>Fields</h1>

                                    <button className={buttonStyleAdd} onClick={(e) => addField(e, table.name)}>Add new fields <TiPlus className="inline-block" /></button><br />

                                    {table.fields.map((field, index2) => {
                                        return <div key={index+"_"+index2}>

                                        <hr />

                                            <label className={labelStyle + " mt-2"}>Field </label>
                                            <input className={inputStyle} type={"text"} onChange={(e) => handleTableFieldsChange(table.name, field.field, "field", e.target.value)} value={field.field} /><br />

                                            <label className={labelStyle + " mt-2"}>Field Extension </label>
                                            <input className={inputStyle} type={"text"} onChange={(e) => handleTableFieldsChange(table.name, field.field, "extension", e.target.value)} value={field.extension} /><br />

                                            <button className={buttonStyleRemove} onClick={(e) => removeField(e, table.name, field.field)}>Remove <TiTimes className="inline-block" /></button>

                                            <hr />

                                        </div>
                                    })}

                                </div>

                            </div>

                        </div>
                    })}

                </form>
            </div>
            <div className="w-3/4" style={{overflowY: "scroll", height: "100vh", flex: 3}}>

                <div className="text-sm xl:text-xl bg-gray-100 md:mx-48 md:my-8 px-10 lg:px-8 py-8 lg:py-6 border border-gray-200 rounded leading-tight focus:outline-none focus:bg-white focus:border-gray-500 shadow-md">
                    <button className="bg-green-500 hover:bg-green-400 text-white font-bold py-2 px-4 rounded float-right" onClick={(e) => downloadConfig(e)}>Download</button>
                    <pre>
                        {yaml.safeDump(config)}
                    </pre>
                </div>

            </div>
        </div>

    </React.Fragment>
};

export default App;
