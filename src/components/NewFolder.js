import { useState, useEffect } from "react";
import { useParams, useHistory } from "react-router-dom";
import { Link } from "react-router-dom";
import axios from "axios";


function NewFolder() {

    let history = useHistory();
    let { id } = useParams();

    const [name, setFolder] = useState("");
    const [parentFolderId, setParentFolderId] = useState(id);

    

    const onSubmit = function (e) {
        e.preventDefault();

        if (id === "0") {
            axios.post("http://localhost:8080/folders", {
                name,
            }).then(() => history.push("/"));
        } else {
            axios.post("http://localhost:8080/folders", {
                name,
                parentFolderId,
            }).then(() => history.push(`/folders/${id}`));
        }

    };

    return (
        <>
            <h2>Create a New Folder</h2>
            <form onSubmit={onSubmit}>

                Folder Name: <input type="text" name="name" value={name} onChange={e => setFolder(e.target.value)} />
                
                <button>Create Folder</button>
            </form>
        </>
    );

}

export default NewFolder;