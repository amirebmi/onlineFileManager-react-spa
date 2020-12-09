import { useState, useEffect } from "react";
import { Link } from "react-router-dom";

import { useHistory } from "react-router-dom";
import axios from "axios";


function TopLevel() {

    let history = useHistory();

    const [entries, setEntries] = useState([]);



    useEffect(() => {
        axios.get("http://localhost:8080").then(res => setEntries(res.data));
    }, []);



    return (
        <>
            <h2>Index /</h2>
            <table border="1">
                <thead><tr><th>Name</th><th>Type</th></tr></thead>

                <tbody>
                    {
                        entries.map(entry =>
                        // Folder
                        {
                            if (entry.folder === true) {
                                return <tr key={entry.id}>
                                    <td>\ <Link to={`/folders/${entry.id}`}>{entry.name}</Link></td>
                                    <td>Folder</td>
                                </tr>
                                // Files
                            } else {
                                return <tr key={entry.id}>
                                    <td>{entry.name}</td>
                                    <td>File</td>
                                </tr>;
                            }
                        }
                        )
                    }
                </tbody>
            </table>
            <br />

            <Link to={`/newfolder/${0}`}><button>Create Folder</button></Link>

        </>
    );


}

export default TopLevel;