import Search from './components/Search';
import AddLocation from './components/AddLocation';
import Map from './components/Map';
import { useState, useEffect } from 'react';
import Location from './components/Location';
import GetMapPosition from './helpers/getMapPosition';
import LocationMarker from './components/LocationMarker';
import { AiOutlineLoading3Quarters } from 'react-icons/ai';
import axios from 'axios';
import './css/App.css';

export default function App() {
  let startPosition = [51.424367, 9.7252024]; //Center Of Germany
  const [position, setPosition] = useState(startPosition);
  const [locations, setLocations] = useState([]);
  const [showForm, setShowForm] = useState(false);
  const [isLoaded, setIsLoaded] = useState(false);

  /**
   * Updates the show Form
   */
  let updateShowForm = () => {
    setShowForm(!showForm);
  }

  /**
   *Initial lode Locations
  */
  useEffect(() => {
    axios.get('http://localhost:8000/api/geoLocations').then((response) => {
      setLocations(response.data);
      setIsLoaded(true);
    }).catch(err => {
      alert(err.message);
    })
  }, [])


  return (
    <>
      {!isLoaded && <div className="loading-screen"><AiOutlineLoading3Quarters className="loading-symbol" /></div>}
      <Search setPosition={setPosition} />
      <AddLocation showForm={showForm} updateShowForm={updateShowForm} position={position} />
      <Map position={position} zoom={6}>
        <GetMapPosition setPosition={setPosition} />
        <LocationMarker setPosition={setPosition} />
        {locations.map((location, index) => <Location key={index} id={location.id} name={location.name} difficulty={location.difficulty} description={location.description} image={location.image} position={location.position.split(" ")} />)}
      </Map>
    </>
  );
}