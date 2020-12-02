import { useState, useEffect } from "react";
import {Link} from "react-router-dom";
import axios from "axios";


function TopLevel(){

    const [entries, setEntries] = useState([{
        id: 0,
        name: "Init",
        parentFolderId: null,
        size: 0,
        type: null,
        folder: true
    }]);

    useEffect(() => {
        axios.get("http://localhost:8080").then(res => setEntries(res.data));
    }, []);

    return (
        <>
        <h2>Top Level Folders and Files</h2>
        <table border="1">
            <thead><tr><th>Name</th><th>Size</th><th>Operation</th></tr></thead>

            <tbody>
                {


                    entries.map(entry =>

                        {if (entry.folder == true){
                           return <tr key={entry.id}>
                               <td>\{entry.name}</td>
                               <td>Folder</td>
                               <td></td>
                           </tr>
                        }else{
                            return <tr key={entry.id}>
                                <td>{entry.name}</td>
                                <td>{entry.size} kb</td>
                            </tr>;
                        }}
                        )
                }
            </tbody>
        </table>
        </>
    );


}


export default TopLevel;