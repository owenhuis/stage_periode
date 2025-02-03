import React, { useEffect,useRef, useState } from 'react';
import request from 'utils/request';
import { Button } from '@progress/kendo-react-buttons';
import {menuIcon } from '@progress/kendo-svg-icons';
import { Switch } from '@progress/kendo-react-inputs';

const PaneelV2 = (props) => {
    
    const referenceController1 = useRef();
    const [records, setRecords] = useState([]);
    const [Display, setDisplay] = useState('initial');
    const [MarkerScreen, setMarkerScreen] = useState('none');
    const [CategorieScreen, setCategorieScreen] = useState('none');
    const [markerEditScreen, setMarkerEditScreen] = useState('none');
    const [newMarkerScreen, setNewMarkerScreen] = useState('none');
    const [deleteMarkerScreen, setDeleteMarkerScreen] = useState('none');
    const [itemExists, setItemExists] = useState('none');
    const [deleteItem, setDeleteItem]= useState('none');
    const [newCategorieScreen, setNewCategorieScreen] = useState('none');
    const [categorieEditScreen, setCategorieEditScreen] = useState('none');
    const [deleteCategorieScreen, setDeleteCategorieScreen] = useState('none');
    const [categorieExists, setCategorieExists] = useState('none');
    const [deleteCategorie, setDeleteCategorie] = useState('none');
    const [info, setInfo] = useState({locationId: '',categoryId: '',title: '',content: null,longitude: '',latitude: ''});
    
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
    
    const [switch6, setSwitch6] = useState(true);
    const [switch5, setSwitch5] = useState(true);
    const [switch4, setSwitch4] = useState(true);
    const [switch3, setSwitch3] = useState(true);
    const [switch2, setSwitch2] = useState(true);
    const [switch1, setSwitch1] = useState(true);
    const [switch0, setSwitch0] = useState(true);
    
    const referenceCategory6 = useRef();
    const referenceCategory5 = useRef();
    const referenceCategory4 = useRef();
    const referenceCategory3 = useRef();
    const referenceCategory2 = useRef();
    const referenceCategory1 = useRef();
    const referenceCategory0 = useRef();
    
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
                props.map.setView([52, 5], 8);
            }
            else if (switch3){
                props.map.setView([52, 5], 9);
            }
            else if (switch4){
                props.map.setView([52, 5], 10);
            }
            else if (switch5){
                props.map.setView([51.87, 4.48], 14);
            }
            else {
                props.map.setView([51.8461,4.521], 100);
            }
        }
    }, [props.markers, props.map]);
    
    
    
    const markers = (event) => {
        let lijst = [];
        if(referenceCategory1 && referenceCategory2 && referenceCategory3 && referenceCategory4 && referenceCategory5 && referenceCategory6){
            setSwitch0(true);
        }
        if(referenceCategory1.current.value === false){
            setSwitch1(false);
            setSwitch0(false);
        }
        if(referenceCategory2.current.value === false){
            setSwitch2(false);
            setSwitch0(false);
        }
        if(referenceCategory3.current.value === false){
            setSwitch3(false);
            setSwitch0(false);
        }
        if(referenceCategory4.current.value === false){
            setSwitch4(false);
            setSwitch0(false);
        }
        if(referenceCategory5.current.value === false){
            setSwitch5(false);
            setSwitch0(false);
        } 
        if(referenceCategory6.current.value === false){
            setSwitch6(false);
            setSwitch0(false);
        }
        
        
        for (let i= 0; i < records.length; i++){
            
            if(event.target.props.id === '0' &&  referenceCategory0.current.value ){
                lijst.push(records[i]);
                setSwitch0(true);
                setSwitch5(true);
                setSwitch4(true);
                setSwitch6(true);
                setSwitch3(true);
                setSwitch2(true);
                setSwitch1(true);
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
        }console.log(records);
        if(referenceCategory0.current.value === false && event.target.props.id === '0'){
            setSwitch0(false);
            setSwitch1(false);
            setSwitch2(false);
            setSwitch3(false);
            setSwitch4(false);
            setSwitch5(false);
            setSwitch6(false);
            lijst = [];
        }
        
        
        props.setMarkers(lijst);
        
        return event;
    };
    
    const menuKlapper = () => {
        if (Display === 'initial'){
            setDisplay('none');
            setMarkerScreen('none');
            setNewMarkerScreen('none');
            setMarkerEditScreen('none');
            setDeleteMarkerScreen('none');
            setCategorieScreen('none');
        }
        if (Display === 'none'){
            setDisplay('initial');
            setCategorieScreen('none');
            setMarkerScreen('none');
            setNewMarkerScreen('none');
            setMarkerEditScreen('none');
            setDeleteMarkerScreen('none');
        }
        
    };
        
    const clientsChange = () => {
        if (MarkerScreen === 'none'){
        setMarkerScreen('initial');
        setCategorieScreen('none');
        setNewCategorieScreen('none');
        setCategorieEditScreen('none');
        setDeleteCategorieScreen('none');
        setItemExists('none');
        setCategorieExists('none');
        setDeleteItem('none');
        setDeleteCategorie('none');
        }
        if (MarkerScreen === 'initial'){
            setMarkerScreen('none');
            setNewMarkerScreen('none');
            setMarkerEditScreen('none');
            setDeleteMarkerScreen('none');
            setNewCategorieScreen('none');
            setCategorieEditScreen('none');
            setDeleteCategorieScreen('none');
            setItemExists('none');
            setCategorieExists('none');
            setDeleteItem('none');
            setDeleteCategorie('none');
        }
    };

    const categoriesChange = () => {
        if (CategorieScreen === 'none'){
            setCategorieScreen('initial');
            setNewCategorieScreen('none');
            setCategorieEditScreen('none');
            setDeleteCategorieScreen('none');
            setMarkerScreen('none');
            setNewMarkerScreen('none');
            setMarkerEditScreen('none');
            setDeleteMarkerScreen('none');
            setItemExists('none');
            setCategorieExists('none');
            setDeleteItem('none');
            setDeleteCategorie('none');
        }
        if (CategorieScreen === 'initial'){
            setCategorieScreen('none');
            setMarkerScreen('none');
            setNewMarkerScreen('none');
            setMarkerEditScreen('none');
            setDeleteMarkerScreen('none');
            setCategorieEditScreen('none');
            setDeleteCategorieScreen('none');
            setNewCategorieScreen('none');
            setItemExists('none');
            setCategorieExists('none');
            setDeleteItem('none');
            setDeleteCategorie('none');
        }
    };
    
    const buttonCheck = (item) => {
        if (item === 'new'){
            setNewMarkerScreen('initial');
            setMarkerEditScreen('none');
            setDeleteMarkerScreen('none');
        }
        if (item === 'edit'){
            setNewMarkerScreen('none');
            setMarkerEditScreen('initial');
            setDeleteMarkerScreen('none');
        }
        if (item === 'delete') {
            setDeleteMarkerScreen('initial');
            setNewMarkerScreen('none');
            setMarkerEditScreen('none');
        }
    };
    const buttonCheck2 = (item) => {
        if (item === 'new'){
            setNewCategorieScreen('initial');
            setCategorieEditScreen('none');
            setDeleteCategorieScreen('none');
        }
        if (item === 'edit'){
            setNewCategorieScreen('none');
            setCategorieEditScreen('initial');
            setDeleteCategorieScreen('none');
        }
        if (item === 'delete') {
            setDeleteCategorieScreen('initial');
            setNewCategorieScreen('none');
            setCategorieEditScreen('none');
        }
    };
    const namenCheck = (name) => {
        name.preventDefault();
        for (let i= 0; i < records.length; i++){
            if (name.target[0].value === records[i].title){
                setInfo(records[i]);
                setItemExists('none');
                return setItemExists('initial');
            }
            else{
                setItemExists('none');
            }
        }
    };

    const categorieCheck = (categorie) => {
        console.log(categorie.target[0].value);
        categorie.preventDefault();
        for (let i= 0; i < records.length; i++){
            if (categorie.target[0].value === records[i].title){
                console.log(records[i]);
                console.log('werkt');
                return setCategorieExists('initial');
            }
            else{
                setCategorieExists('none');
            }
        }
    };
    const deleteCheck = (company) => {
        company.preventDefault();
        for (let i= 0; i < records.length; i++){
            if (company.target[0].value === records[i].title){
                return setDeleteItem('initial');
            }
            else{
                setDeleteItem('none');
            }
        }
    };
    const deleteCheck2 = (categorie) => {
        categorie.preventDefault();
        for (let i= 0; i < records.length; i++){
            if (categorie.target[0].value === records[i].title){
                return setDeleteCategorie('initial');
            }
            else{
                setDeleteCategorie('none');
            }
        }
    };
    const verwijderen = (company) => {
        company.preventDefault();
        for (let i= 0; i < records.length; i++){
            if (company.target[0].value === records[i].title){
                return records.delete(records[i]);
            }
        }
    };
    
    const verwijderen2 = (categorie) => {
        categorie.preventDefault();
        for (let i= 0; i < records.length; i++){
            if (categorie.target[0].value === records[i].title){
                return records.delete(records[i]);
            }
        }
    };
    return  <div>
    
            <Button svgIcon={menuIcon} fillMode="flat" onClick={menuKlapper} style={{height: 50, width: 50}} />  
            <div className="menu" style={{display: Display}} >
                
                <div className="button0" style={{background: 'white', width: 250} } >
                    <div className="buttonName0" style={{}}>
                       All Markers
                        
                     </div>
                     <Switch id="0" ref={referenceCategory0} checked={switch0}  onChange={markers} className="paneelswitch0" style={{marginleft: 50}} />
                </div>
                
                <div className="button6" style={{background: 'white', width: 250} } >
                    <div className="buttonName6" style={{marginright: 50}}>
                       <div className='BR_Color' /> Barge & Rail Operator
                        
                     </div>
                     <Switch id="6" className="paneelswitch6" checked={switch6}  onChange={markers} ref={referenceCategory6} style={{marginleft: 50}} />
                </div>
                
                <div className="button3" style={{background: 'white', width: 250} } >
                    <div className="buttonName3"  style={{marginright: 75}}>
                       <div className='BO_Color' /> Barge Operator
                        
                     </div>
                     <Switch id="3" className="paneelswitch3" checked={switch3}  onChange={markers} ref={referenceCategory3} style={{fontsize:1}} />
                </div>

                <div className="button5" style={{background: 'white', width: 250} } >
                    <div className="buttonName5"  style={{marginright: 50}}>
                        <div className='OC_Color' /> Other Client
                        
                     </div>
                     <Switch id="5" onChange={markers} checked={switch5} ref={referenceCategory5} className="paneelswitch5"   style={{fontsize: 5}} />
                </div>

                <div className="button4" style={{background: 'white', width: 250} } >
                    <div className="buttonName4"  style={{marginright: 50}}>
                      <div className='RO_Color' /> Rail Operator
                        
                     </div>
                     <Switch id="4" className="paneelswitch4" checked={switch4}  onChange={markers} ref={referenceCategory4} style={{marginleft: 50}} />
                </div>
                
                <div className="button2" style={{background: 'white', width: 250} } >
                    <div className="buttonName2"  style={{marginright: 50}}>
                       <div className='TC_Color' /> Trucking Company
                        
                     </div>
                     <Switch id="2" className="paneelswitch2" checked={switch2}  onChange={markers} ref={referenceCategory2}  style={{marginleft: 50}} />
                </div>
                
                <div className="button1" style={{background: 'white', width: 250} } >
                    <div className="buttonName1"  style={{marginright: 50}}>
                        <div className='T_Color' /> Terminal
                        
                     </div>
                     <Switch id="1" className="paneelswitch1" checked={switch1} onChange={markers} ref={referenceCategory1} style={{marginleft: 50}} />
                </div>
                <div className="newMarkerButton" style={{background: 'white', width: 250}}>
                    <button className="markerButton" onClick={clientsChange} style={{width: 230}}> clients</button>
                </div>
                <div className="newMarkerTypeButton"  style={{background: 'white', width: 250}}>
                    <button className="markerTypeButton" onClick={categoriesChange} style={{width: 230}}> categories </button>
                </div>
            </div>
            <div className="displayNewMarkerEditScreen" style={{display: MarkerScreen}} >
                <div className="editNew">
                <button className="editButton" onClick={() => buttonCheck('edit')} > edit marker</button>
                <button className="newButton" onClick={() => buttonCheck('new')}> new marker</button>
                <button className="deleteButton" onClick={() => buttonCheck('delete')}> delete marker</button>

                    <div style={{display: newMarkerScreen}}>
                        <div className="markerNewScreen" style={{background: 'white', width: 250}} >
                            <form style={{display: 'flow'}}>
                                <input type="text" placeholder="naam van bedrijf" min="1" maxLength="200" style={{width: 250}} required /> <br />

                                    <input type="radio" id="bro" name="class" value="BRO" className="classVraag" style={{display: 'inline-flex'}} required/>
                                    <label>barge & rail operator </label> <br />
                                    <input type="radio" id="bo" name="class" value="BO" className="classVraag" style={{display: 'inline-flex'}} required />
                                    <label>barge operator </label> <br />
                                    <input type="radio" id="oc" name="class" value="OC" className="classVraag" style={{display: 'inline-flex'}} required/>
                                    <label>other client </label> <br />
                                    <input type="radio" id="ro" name="class" value="RO" className="classVraag" style={{display: 'inline-flex'}} required/>
                                    <label>rail operator </label> <br/> 
                                    <input type="radio" id="tc" name="class" value="TC" className="classVraag" style={{display: 'inline-flex'}} required/>
                                    <label>trucking company </label> <br />
                                    <input type="radio" id="tm" name="class" value="TM" className="classVraag" style={{display: 'inline-flex'}} required/>
                                    <label>terminal </label> <br />

                                <input type="number" placeholder="locatie graad latitude" style={{width: 250}} required/>
                                <input type="number" placeholder="locatie graad longitude" style={{width: 250}} required/>
                                <input type="submit" value="marker plaatsen"  className="opslaanKnop" style={{width: 250}} />
                                <input type="reset" value="sluiten en invoer verwijderen" className="opslaanKnop"  onClick={clientsChange} style={{width: 250}}/>
                            </form>
                        </div>
                    </div>
                    <div style={{display: markerEditScreen}}>
                        <div className="markerNewScreen" style={{background: 'white', width: 250, margin: 5}} >

                            <form id="formName1" onSubmit={namenCheck}>
                                <input type="text" placeholder="naam van bedrijf" maxLength="200" style={{width: 250}} required/>
                                <input type="submit" form="formName1" value="bestaan check" />
                            </form>

                            <div className="aanpassing display" style={{display: itemExists}}>
                                <form style={{display: 'flow'}}>
                                    <input type="text" placeholder=" niewe naam van bedrijf" min="1" maxLength="200" defaultValue={info.title} style={{width: 250}} required /> <br />

                                        <input type="radio" id="6" name="class" className="classVraag" checked={(info.categoryId === 6) && true} style={{display: 'inline-flex'}} required />
                                        <label>barge & rail operator </label> <br /> 
                                        <input type="radio" id="3" name="class" className="classVraag" checked={(info.categoryId === 3) && true} style={{display: 'inline-flex'}} />
                                        <label>barge operator </label> <br />
                                        <input type="radio" id="5" name="class" className="classVraag" checked={(info.categoryId === 5) && true} style={{display: 'inline-flex'}} />
                                        <label>other client </label> <br />
                                        <input type="radio" id="4" name="class" className="classVraag" checked={(info.categoryId === 4) && true} style={{display: 'inline-flex'}} />
                                        <label>rail operator </label> <br/> 
                                        <input type="radio" id="2" name="class" className="classVraag" checked={(info.categoryId === 2) && true} style={{display: 'inline-flex'}} />
                                        <label>trucking company </label> <br />
                                        <input type="radio" id="1" name="class" className="classVraag" checked={(info.categoryId === 1) && true}  style={{display: 'inline-flex'}} />
                                        <label>terminal </label> <br />

                                    <input type="number" placeholder="nieuwe locatie graad latitude" defaultValue={info.latitude} style={{width: 250}} required/>
                                    <input type="number" placeholder="nieuwe locatie graad longitude" defaultValue={info.longitude} style={{width: 250}} required/>
                                    <input type="submit" value="aangepaste marker plaatsen"  className="opslaanKnop" style={{width: 250}} />
                                    <input type="reset" value="sluiten en invoer verwijderen" className="opslaanKnop"  onClick={clientsChange} style={{width: 250}}/>
                                </form>
                            </div>
                        </div>
                    </div>
                    <div style={{display:deleteMarkerScreen}}>
                        <div className="markerNewScreen" style={{background: 'white', width: 250, margin: 5}} >
                            <form  onSubmit={deleteCheck}>
                                <input type="text" placeholder="naam van bedrijf" maxLength="200" style={{width: 250}} required/>
                                <input type="submit"  value="bestaan check" />
                            </form>
                            <div className="deleteConfirm" style={{display: deleteItem}} >
                                <form  onSubmit={verwijderen} style={{display: 'flow'}}>
                                <input type="checkbox" value="want to delete?"required />
                                <label>want to delete?</label> <br />
                                <input type="submit"  value="delete" style={{width: 250}} />
                                </form>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div className="displayNewEditCategorieScreen" style={{display: CategorieScreen}}>
                <div className="editNew" >
                <button className="editButton" onClick={() => buttonCheck2('edit')} > edit categorie</button>
                <button className="newButton" onClick={() => buttonCheck2('new')}> new categorie</button>
                <button className="deleteButton" onClick={() => buttonCheck2('delete')}> delete categorie</button>
                    <div style={{display: newCategorieScreen}}>
                        <div className="markerNewScreen" style={{background: 'white', width: 250, margin: 5}} >
                            <form style={{display: 'flow'}}>
                                <input type="text" placeholder="categorie naam" min="1" maxLength="200" style={{width: 250}} required /> <br />
                                <input type="submit" value="categorie maken"  className="opslaanKnop" style={{width: 250}} />
                                <input type="reset" value="sluiten en invoer verwijderen" className="opslaanKnop"  onClick={categoriesChange} style={{width: 250}}/>
                            </form>
                        </div>
                    </div>
                    <div style={{display: categorieEditScreen}}>
                        <div className="markerNewScreen" style={{background: 'white', width: 250, margin: 5}} >

                            <form onSubmit={categorieCheck}>
                                <input type="text" placeholder="naam van categorie" maxLength="200" style={{width: 250}} required/>
                                <input type="submit" value="bestaan check" />
                            </form>

                            <div className="aanpassing display" style={{display: categorieExists}}>
                                <form style={{display: 'flow'}}>
                                    <input type="text" placeholder=" niewe naam van categorie" min="1" maxLength="200" style={{width: 250}} /> <br />

                                    <input type="submit" value="categorie aanpassen"  className="opslaanKnop" style={{width: 250}} />
                                    <input type="reset" value="sluiten en invoer verwijderen" className="opslaanKnop"  onClick={categoriesChange} style={{width: 250}}/>
                                </form>
                            </div>
                        </div>
                    </div>
                    <div style={{display:deleteCategorieScreen}}>
                        <div className="markerNewScreen" style={{background: 'white', width: 250, margin: 5}} >
                            <form  onSubmit={deleteCheck2}>
                                <input type="text" placeholder="naam van categorie" maxLength="200" style={{width: 250}} required/>
                                <input type="submit"  value="bestaan check" />
                            </form>
                            <div className="deleteConfirm" style={{display: deleteCategorie}} >
                                <form  onSubmit={verwijderen2} style={{display: 'flow'}}>
                                <input type="checkbox" value="want to delete?"required />
                                <label>want to delete?</label> <br />
                                <input type="submit"  value="delete" style={{width: 250}} />
                                </form>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>;
};

export default PaneelV2;