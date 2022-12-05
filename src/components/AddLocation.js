import {React, useState} from 'react';
import {AiOutlinePlus} from 'react-icons/ai';
import axios from 'axios';
import updatePreviewImage from '../helpers/updatePreviewImage';
import '../css/AddLocationForm.css';

export default function AddLocation({showForm, updateShowForm, position}) {
    
    const [newLocation, setNewLocation] = useState({
        name: "",
        description: "",
        difficulty: "Easy"
    });

    let handleSubmit = () => {
        updateShowForm();

        let formData = new FormData();
        for(let key in newLocation) {
            formData.append(key, newLocation[key]);
        }
        formData.append('position', `${position[0]} ${position[1]}`);
        formData.append('file', document.querySelector('input[type=file]').files[0]);


        axios.post('http://localhost:8000/api/geoLocations',formData, {headers: {'Content-Type': 'multipart/form-data'}})
            .then(() => {
                window.location.reload();
            })
            .catch(error => {
                if(error.response.status === 400){
                    alert("Empty fields!");
                }
                else{
                    alert(error.message);
                }
            });
    }

    let updateNewLocation = event => {
        setNewLocation({
            ...newLocation,
            [event.target.id]: event.target.value
        });
    }

    const form = (
            <form id="addForm" onSubmit={handleSubmit} encType='multipart/form-data'>
                <button id="close" onClick={updateShowForm}>X</button>
                <h2>Add a Location</h2>
                <label>Name:</label>
                <input type="text" name="name" id="name" value={newLocation.name} onChange={updateNewLocation} placeholder="Name" required/>
                <label>Difficulty:</label>
                <select id="difficulty" onChange={updateNewLocation} value={newLocation.difficulty} required>
                    <option value="Easy">Easy</option>
                    <option value="Normal">Normal</option>
                    <option value="Hard">Hard</option>
                    <option value="Very Hard">Very Hard</option>
                </select>
                <label>Description:</label>
                <input type="text" id="description" onChange={updateNewLocation} value={newLocation.description} placeholder="Description" required/>
                <label>Position:</label>
                <input type="text" id="position" title="Klick on the Map to set the Position" value={`${position[0]} ${position[1]}`} placeholder="Position" readOnly required/>
                <label>Image:</label>
                <img id="preview-image" src="./" onClick={() => document.getElementById("file").click()} alt=""/>
                <button id="upload-button" onClick={e => {document.getElementById("file").click(); e.preventDefault();}}>Upload Image</button>
                <input type="file" onChange={updatePreviewImage} id="file"/>
                <button type="submit" id="submit-button">Add</button>
            </form>
    );

    return (
        <>
        <button className="addLocation-button" onClick={updateShowForm}>
            <AiOutlinePlus />
        </button>
        {showForm && form}
        </>
    )
}