// dit is het originele bedieningspaneel en ia nu niet meer in gebruik

import React, { useEffect,useRef, useState } from 'react';
import {ExpansionPanel,  ExpansionPanelContent } from '@progress/kendo-react-layout';
import { Reveal } from '@progress/kendo-react-animation';
import { Switch } from '@progress/kendo-react-inputs';
import request from 'utils/request';


//  props.setMarkers()

const Paneel = (props) => {
    const [expanded, setExpanded] = useState(true);       
    const referenceController1 = useRef();
    const [records, setRecords] = useState([]);
    
    // switch losse values
    const [switch6, setSwitch6] = useState([]);
    const [switch5, setSwitch5] = useState([]);
    const [switch4, setSwitch4] = useState([]);
    const [switch3, setSwitch3] = useState([]);
    const [switch2, setSwitch2] = useState([]);
    const [switch1, setSwitch1] = useState([]);

    const referenceCategory6 = useRef();
    const referenceCategory5 = useRef();
    const referenceCategory4 = useRef();
    const referenceCategory3 = useRef();
    const referenceCategory2 = useRef();
    const referenceCategory1 = useRef();

    //functie
    const fetchRecords = () => {        
        referenceController1.current = new AbortController();

        const requestConfig = {
            signal: referenceController1.current.signal            
        };       
        request.get('/locations', requestConfig).then(response => {
            setRecords(response);
            props.setMarkers(response);
            props.setSize(response);
            props.setZoom(response);
            props.setLatitude(response);
            props.setLongitude(response);
            props.map(response);
            props.markers(response);
            console.log(response);
        }).catch(() => {
            //not in use
        });         
    };

    useEffect(() => {
        fetchRecords();
        
    }, []);
    useEffect(() => {
        if(props.map) {
            if (switch1){
                props.map.setView([51, 5], 5);
            }
            else if (switch2){
                props.map.setView([51, 7], 7);   
            }
            else if (switch6){
                props.map.setView([50, 5], 7);
            }
            else if (switch3){
                props.map.setView([50, 5], 7);
            }
            else if (switch4){
                props.map.setView([50, 5], 7);
            }
            else if (switch5){
                props.map.setView([51.879875, 4.426675], 25);
            }
            else {
                props.map.setView([51.8461,4.521], 100);
            }
        }
    }, [props.markers, props.map]);
    
    const zoomIn = (values) => {
//    console.log(values.longitude, values.latitude);
    props.map.setView([values.latitude, values.longitude], 50);
    
    };
    
    const renderButton = (values, state) => {
        if (state){
            return (
                <button onClick={() => zoomIn(values)}  className='blokje'>
                    {values.title}
                </button>
            );
        }
        else{
            return (
                <button className='blokje'>
                    {values.title}
                </button>);
        }
    };
    
    const getButtonCheck = (type, state) => {
        const buttons = [];
        
        for(let i = 0; i < records.length; i++) {
            if (records[i].categoryId === type){
                buttons.push(renderButton(records[i], state));
            }
        }  
        return buttons;
    };

    const switchChange = (event) => {
        const lijst = [];
        // loop over records
        for (let i= 0; i < records.length; i++){
            
            if (referenceCategory1.current.value === false){
                setSwitch1(false);
            }
            if (referenceCategory2.current.value === false){
                setSwitch2(false);
            }
            if (referenceCategory3.current.value === false){
                setSwitch3(false);
            }
            if (referenceCategory4.current.value === false){
                setSwitch4(false);
            }
            if (referenceCategory5.current.value === false){
                setSwitch5(false);
            }
            if (referenceCategory6.current.value === false){
                setSwitch6(false);
            }

            if(referenceCategory5.current.value && records[i].categoryId  === 5) {
               lijst.push(records[i]);
                setSwitch5(true);
            }
            if(referenceCategory4.current.value && records[i].categoryId  === 4) {
               lijst.push(records[i]);
               setSwitch4(true);
            }
            if(referenceCategory6.current.value && records[i].categoryId  === 6) {
               lijst.push(records[i]);
                setSwitch6(true);
            }
            if(referenceCategory3.current.value && records[i].categoryId  === 3) {
               lijst.push(records[i]);
               setSwitch3(true);
            }
            if(referenceCategory2.current.value && records[i].categoryId  === 2) {
               lijst.push(records[i]);
               setSwitch2(true);
            }
            if(referenceCategory1.current.value && records[i].categoryId  === 1) {
                lijst.push(records[i]);
                setSwitch1(true);
            }
        }
        
        props.setMarkers(lijst);
        
        return event;
    };

    const paneelChange = (event) => {
        return setExpanded(!event.expanded);
    };
    
    return (

        <ExpansionPanel
        title={props.name}
        expanded={expanded}
        onAction={paneelChange }
        >
            <Reveal>
              {expanded && (
                <ExpansionPanelContent>
                    <div className="categorieën">
                        <div className='BR'>
                            <div className='BR_Title'>
                                <div className='BR_Color' />
                                <div className='title'>
                                    Barge & Rail Operator
                                </div>
                                <div className='BR_Button'>
                                    <Switch ref={referenceCategory6} onChange={switchChange} id={'6'} defaultChecked={switch6} onLabel={''} offLabel={' '} size={'small'} trackRounded={'medium'} thumbRounded={'medium'} />
                                </div>
                            </div>
                            <div className='content'>
                                {getButtonCheck(6, switch6)}
                            </div>
                        </div>
                        <div className='BO'>
                            <div className='BO_Title'>
                                <div className='BO_Color' />
                                <div className='title'>
                                    Barge Operator
                                </div>
                                <div className='BO_Button'>
                                    <Switch ref={referenceCategory3} onChange={switchChange} id={'3'} defaultChecked={switch3} onLabel={''} offLabel={' '} size={'small'} trackRounded={'medium'} thumbRounded={'medium'} />
                                </div>
                            </div>
                            <div className='content'>
                                {getButtonCheck(3,switch3)}
                            </div>
                        </div>
                        <div className='OtherC'>
                            <div className='OC_Title'>
                                <div className='OC_Color' />
                                <div className='title'>
                                    Other Client
                                </div>
                                <div className='OC_Button'>
                                    <Switch ref={referenceCategory5} onChange={switchChange} id={'5'} defaultChecked={switch5} onLabel={''} offLabel={' '} size={'small'} trackRounded={'medium'} thumbRounded={'medium'} />
                                </div>
                            </div>
                            <div className='content'>
                                {getButtonCheck(5,switch5)}
                            </div>
                        </div>
                        <div className='RO'>
                            <div className='RO_Title'>
                                <div className='RO_Color' />
                                <div className='title'>
                                    Rail Operator
                                </div>
                                <div className='RO_Button'>
                                    <Switch ref={referenceCategory4} onChange={switchChange} id={'4'} defaultChecked={switch4} onLabel={''} offLabel={' '} size={'small'} trackRounded={'medium'} thumbRounded={'medium'} />
                                </div>
                            </div> 
                            <div className='content'>
                                {getButtonCheck(4,switch4)}
                            </div>
                        </div>
                        <div className='TC'>
                            <div className='TC_Title'>
                                <div className='TC_Color' />
                                <div className='title'>
                                    Trucking Company
                                </div>
                                <div className='TC_Button'>
                                    <Switch ref={referenceCategory2} onChange={switchChange} id={'2'} defaultChecked={switch2} onLabel={''} offLabel={' '} size={'small'} trackRounded={'medium'} thumbRounded={'medium'} />
                                </div>
                            </div>
                            <div className='content'>
                                {getButtonCheck(2,switch2)}
                            </div>
                        </div>
                    </div>
                    <div className='Terminal'>
                        <div className='T_Title'>
                            <div className='T_Color' />
                            <div className='title'>
                                Terminal
                            </div> 
                            <div className='T_Button'>
                                    <Switch ref={referenceCategory1} onChange={switchChange} id={'1'} defaultChecked={switch1} onLabel={''} offLabel={' '} size={'small'} trackRounded={'medium'} thumbRounded={'medium'} />
                            </div>
                        </div>
                        <div className='content'>
                            {getButtonCheck(1,switch1)}
                        </div>
                    </div>
                </ExpansionPanelContent>
              )}
            </Reveal>
        </ExpansionPanel>

    );
};

export default Paneel;