import React, {useEffect, useState} from "react";
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

    return <React.Fragment>
        <form>
            <h1>Core</h1>
            Log Level: <input type={"text"} name={"log_level"} value={config.app.core.root_directory} /> <br />
            Log Level: <input type={"text"} name={"log_level"} value={config.app.core.log_level} /> <br />
            Rate limit: <input type={"text"} name={"log_level"} value={config.app.core.rate_limit} /> <br />
            <h1>Database</h1>
            Path: <input type={"text"} name={"log_level"} value={config.app.core.db.path} /> <br />
            Initialised: <input type={"text"} name={"log_level"} value={config.app.core.db.initialised} /> <br />
            <h1>Rest</h1>
            Instance URL: <input type={"text"} name={"log_level"} value={config.app.core.rest.url} /> <br />
            Username: <input type={"text"} name={"log_level"} value={config.app.core.rest.user} /> <br />
            Password: <input type={"text"} name={"log_level"} value={config.app.core.rest.password} /> <br />
            Masked: <input type={"text"} name={"log_level"} value={config.app.core.rest.masked} /> <br />
            Xor Key: <input type={"text"} name={"log_level"} value={config.app.core.rest.xor_key} /> <br />
            <h1>Tables</h1>
            <p>In progress...</p>
        </form>
    </React.Fragment>
};

export default App;
