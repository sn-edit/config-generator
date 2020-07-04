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

    console.log("RERENDER", config);

    const labelStyle = "block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2";
    const inputStyle = "appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500";
    const headerStyle = "text-center font-semibold";

    return <React.Fragment>
        <div className="flex">

            <form class="bg-white shadow-md rounded px-8 pt-6 pb-8 w-1/4 h-full">

            <h1 className={headerStyle}>Core</h1>
                <label className={labelStyle}>Root Directory:</label>
                <input className={inputStyle} type={"text"} onChange={(e) => handleChange(e)} name={"app.core.root_directory"} value={config.app.core.root_directory} /> <br />

                <label className={labelStyle}>Log Level: </label>
                <input className={inputStyle} type={"text"} onChange={(e) => handleChange(e)} name={"app.core.log_level"} value={config.app.core.log_level} /> <br />

                <label className={labelStyle}>Rate limit: </label>
                <input className={inputStyle} type={"text"} onChange={(e) => handleChange(e)} name={"app.core.rate_limit"} value={config.app.core.rate_limit} /> <br />

            <h1 className={headerStyle}>Database</h1>
                <label className={labelStyle}>Path: </label>
                <input className={inputStyle} type={"text"} onChange={(e) => handleChange(e)} name={"app.core.db.path"} value={config.app.core.db.path} /> <br />

                <label className={labelStyle}>Initialised: </label>
                <input className={inputStyle} type={"text"} onChange={(e) => handleChange(e)} name={"app.core.db.initialised"} value={config.app.core.db.initialised} /> <br />


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

        </form>

            <div className="w-3/4">
                <div className="bg-gray-100 md:mx-32 md:my-8 px-10 py-8 border border-gray-200 rounded leading-tight focus:outline-none focus:bg-white focus:border-gray-500 shadow-md">
                    <pre>
                        {yaml.safeDump(config)}
                    </pre>
                </div>
            </div>

        </div>

    </React.Fragment>
};

export default App;
