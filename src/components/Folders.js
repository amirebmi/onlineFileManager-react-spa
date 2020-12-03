import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { Link } from "react-router-dom";
import axios from "axios";


function Folders() { 
    let  {id}  = useParams(); 

    const [entries, setEntries] = useState([{
        id: 0,
        name: "Init",
        parentFolderId: null,
        size: 0,
        type: null,
        folder: true
    }]);

    useEffect(() => {
        axios.get(`http://localhost:8080/folders/${id}`).then(res => setEntries(res.data));
    }, []);

    return (
        <>
            <h2>Subfolder</h2> 
            <table border="1">
                <thead><tr><th>Name</th><th>Size</th><th>Operation</th></tr></thead>

                <tbody>
                    {
                        entries.map(entry => 
                        // Folder
                        {
                            if (entry.folder == true) {
                                return <tr key={entry.id}>
                                    <td>\ <Link to={`/folders/${entry.id}`}>{entry.name}</Link></td>
                                    <td>Folder</td>
                                    <td></td>
                                </tr>
                                // Files
                            } else {
                                return <tr key={entry.id}>
                                    <td>{entry.name}</td>
                                    <td>{entry.size} kb</td>
                                </tr>;
                            }
                        }
                        )
                    }
                </tbody>
            </table>
        </>
    );
}




export default Folders;