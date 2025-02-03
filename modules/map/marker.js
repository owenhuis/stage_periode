import { Marker } from 'react-leaflet/Marker';
import { Tooltip } from 'react-leaflet/Tooltip';
import L from 'leaflet';

import blueMarker from 'assets/img/markers/blueMarker.svg';
import darkGreenMarker from 'assets/img/markers/darkGreenMarker.svg';
import lightGreenMarker from 'assets/img/markers/LightGreenMarker.svg';
import orangeMarker from 'assets/img/markers/orangeMarker.svg';
import purpleMarker from 'assets/img/markers/purpleMarker.svg';
import redMarker from 'assets/img/markers/redMarker.svg';
import yellowMarker from 'assets/img/markers/yellowMarker.svg';

const ModalityMarker = (props) => {

    const images = {
        1: redMarker,
        2: orangeMarker,
        3: yellowMarker,
        4: darkGreenMarker,
        5: blueMarker,
        6: purpleMarker,
        7: lightGreenMarker
    };

    const icon = new L.icon({
        iconUrl: images[props.categoryId],
        iconRetinaUrl: images[props.categoryId],
        iconAnchor: [25, 55],
        popupAnchor: [10, -44],
        tooltipAnchor: [15,-35],
        iconSize: [50, 55]
    });
    return (
        <Marker icon={icon} position={[props.latitude, props.longitude]}>
            <Tooltip >{props.title}</Tooltip>
        </Marker>);

};

export default ModalityMarker; 