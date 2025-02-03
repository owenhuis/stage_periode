//react import \/
import React, { useState } from 'react';
//import Paneel from 'modules/paneel/paneel';
import Paneelv2 from 'modules/paneel/paneelv2';
import L from 'leaflet';
import ModalityMarker from 'modules/map/marker';
import lightGreenMarker from 'assets/img/markers/LightGreenMarker.svg';
import { Marker } from 'react-leaflet/Marker';
import { Tooltip } from 'react-leaflet/Tooltip';
// kaart import\/
import { MapContainer, TileLayer } from 'react-leaflet';
import { ZoomControl } from 'react-leaflet/ZoomControl';

const Layout = () => { 
    const [markers, setMarkers] = useState([]);
    const [map, setMap] = useState(null);
    // setState       markers en setMarkers
    
    const icon = new L.icon({
            iconUrl: lightGreenMarker,
            iconRetinaUrl: lightGreenMarker,
            iconAnchor: [25, 55],
            popupAnchor: [10, -44],
            tooltipAnchor: [15,-35],
            iconSize: [50, 55]
        });
        
//      dit is de aanroep voor de originele bedieningspaneel staat op plaats van paneel2 en wordt nu niet meer gebruikt
//                <div className="paneel">
//                <Paneel setMarkers={setMarkers} map={map} markers={markers}  />
//            </div>
            

        
// zoom knop moet rechts onder in komen te staan!

    return(
        
        <React.Fragment>
        <div>
            <MapContainer 
                className='map' 
                center={[51, 5]} 
                style={{ height: 1065, width: 1920 }} 
                zoom={5.01} 
                ref={setMap}
                zoomControl={false}
                
            >
                <ZoomControl position='bottomright' />
            
                <TileLayer
                  attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                  url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                />
                {markers.map((pin, key) => 
                    <ModalityMarker   key={key} longitude={pin.longitude} latitude={pin.latitude}  title={pin.title} categoryId={pin.categoryId} /> 
                )}
                <Marker icon={icon} position={[51.8461,4.521]}>
                    <Tooltip> MODALITY </Tooltip>
                </Marker>

            </MapContainer>
            
        </div>
        
        <div className="paneelv2">
            <Paneelv2 setMarkers={setMarkers} map={map} markers={markers} />
        </div>

        </React.Fragment> 
    );

};
export default Layout;