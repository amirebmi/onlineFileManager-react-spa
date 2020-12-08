import { useState, useEffect } from "react";
import { useParams, useHistory } from "react-router-dom";
import { Link } from "react-router-dom";
import axios from "axios";


function Folders() {
    let history = useHistory();
    let { id } = useParams();

    const [entries, setEntries] = useState([]);
    const [a, setA] = useState("");

    useEffect(async () => {
        let res = await axios.get(`http://localhost:8080/folders/${id}`);
        setEntries(res.data);

        let res2 = await axios.get(`http://localhost:8080/folders/parentName/${id}`);
        setA(res2.data);



    }, [id]);

    return (
        <>
            <h2>{a}</h2>
            <table border="1">
                <thead><tr><th>Name</th><th>Size</th><th>Operation</th></tr></thead>

                <tbody>
                    {

                        entries.map(entry =>
                        // Folder
                        {
                            if (entry.folder === true) {
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


            <p>

                <button
                onClick = {async () => {
                    let pFolder = await axios.get(`http://localhost:8080/folders/parentInfo/${id}`)
                    
                    let parentId = pFolder.data.id;
                    if (parentId === null){
                        history.push("/")
                    } else{
                        history.push(`/folders/${parentId}`)
                    }
                    
                }}
                >Back</button>

                <Link to={`/newfolder/${id}`}><button>Create Folder</button></Link>

            </p>



        </>
    );
}




export default Folders;