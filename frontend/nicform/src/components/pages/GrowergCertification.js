import React, { useState, useRef } from "react";
//import SignatureCanvas from 'react-signature-canvas';
import SignatureCanvas from 'react-signature-canvas';
import style from '../../css/GrowergCertification.module.css';
import 'bootstrap/dist/css/bootstrap.min.css';
//import { write, utils, writeFile } from 'xlsx';
import axios from 'axios';

const GrowergCertification = () => {
    const [message, setMessage] = useState('');
    const [growerName, setGrowerName] = useState('');
    const [contactPerson, setContactPerson] = useState('');
    const [selectedState, setSelectedState] = useState('');
    const [selectedDistrict, setSelectedDistrict] = useState('');
    const [districts, setDistricts] = useState([]);
    const [villageName, setVillageName] = useState('');
    const [landMark, setlandMark] = useState('');
    const [pincode, setPincode] = useState('');
    const [telephoneNumber, setTelephoneNumber] = useState('');
    const [phoneNumber, setPhoneNumber] = useState('');
    const [selectedMember, setSelectedMember] = useState('');
    const [selectedNpop, setSelectedNpop] = useState('');
    const [farmerName, setFarmerName] = useState('');
    const [area, setArea] = useState('');
    const [hetProof, setHetProof] = useState('');
    const [farmers, setFarmers] = useState([]);
    const [selectedRequireCertification, setSelectedRequireCertification] = useState('');
    const [selectedDevlopLocalLang, setSelectedDevlopLocalLang] = useState('');
    const [selectedIqsManual, setSelectedIqsManual] = useState('');
    const [selectedTrainFarmers, setSelectedTrainFarmers] = useState('');
    const [selectedInternalInspec, setselectedInternalInspec] = useState('');
    const [selectedSourceSeed, setSelectedSourceSeed] = useState('');
    const [selectedSouceIrrigation, setSelectedSouceIrrigation] = useState('');
    const [selectedRecordICS, setSelectedRecordICS] = useState('');
    const [selectedNeighbourFarm, setSelectedNeighbourFarm] = useState('');
    const [selectedSubcontractActivity, setSelectedSubcontractActivity] = useState('');
    const [selectedCommonStorage, setSelectedCommonStorage] = useState('');
    const [selectedCommonMarketing, setSelectedCommonMarketing] = useState('');
    const [motivation, setMotivation] = useState('');
    const [packageDetails, setPackageDetails] = useState('');
    const [previousDetails, setPreviousDetails] = useState('');
    const [slno, setSlno] = useState('');
    const [cattle, setCattle] = useState('');
    const [poularity, setPoularity] = useState('');
    const [goat, setGoat] = useState('');
    const [others, setOthers] = useState('');
    const [animals, setAnimals] = useState([]);

    const [signatureDataURL, setSignatureDataURL] = useState('');

    const [checkboxes, setCheckboxes] = useState({

        declaration1: false,
        declaration2: false,
        declaration3: false,
    });
    const [date, setDate] = useState('');
    const sigCanvas = useRef(null);

    const handleCheckboxChange = (e) => {
        const { id, checked } = e.target;
        setCheckboxes((prevState) => ({
            ...prevState,
            [id]: checked,
        }));
    };

    const [files, setFiles] = useState({
        mapOfAllFields: null,
        fieldHistorySheets: null,
        documentationOfICS: null,
        waterSoilPlantTest: null,
        residuesAnalysis: null,
        inputProductLabels: null,
        organicProductLabels: null,
        signature: null
    });

    const handleFileChange = (e) => {
        const { id, files } = e.target;
        setFiles((prevFiles) => ({
            ...prevFiles,
            [id]: files[0],
        }));
    };


    const [step, setStep] = useState(1);


    // const exportToExcel = () => {
    //     const data = [
    //         { "Grower Name": growerName, "Contact Person": contactPerson, "State": selectedState, "District": selectedDistrict, "Village Name": villageName, "Pincode": pincode, "Telephone Number": telephoneNumber, "Phone Number": phoneNumber },
    //         { "Selected Member": selectedMember, "Selected NPOP": selectedNpop, "Selected Require Certification": selectedRequireCertification, "Selected Develop Local Language": selectedDevlopLocalLang, "Selected IQS Manual": selectedIqsManual, "Selected Train Farmers": selectedTrainFarmers, "Selected Source Irrigation": selectedSouceIrrigation, "Selected Internal Inspection": selectedInternalInspec },
    //         { "Farmer Name": farmerName, "Area": area, "Het Proof": hetProof, "Selected Source Seed": selectedSourceSeed, "Selected Record ICS": selectedRecordICS, "Selected Neighbour Farm": selectedNeighbourFarm, "Selected Subcontract Activity": selectedSubcontractActivity, "Selected Common Storage": selectedCommonStorage, "Selected Common Marketing": selectedCommonMarketing, "Motivation": motivation, "Date": date }
    //     ];

    //     const ws = utils.json_to_sheet(data);
    //     const wb = utils.book_new();
    //     utils.book_append_sheet(wb, ws, "Sheet1");
    //     writeFile(wb, "data.xlsx");
    // };





    const stateDistrictMapping = {
        "Andhra Pradesh": ["Anantapur", "Chittoor", "East Godavari", "Guntur"],
        "Arunachal Pradesh": ["Tawang", "West Kameng", "East Kameng"],
        "Assam": ["Baksa", "Barpeta", "Biswanath"],
        "Bihar": ["Araria", "Arwal", "Aurangabad"],
        "Chhattisgarh": ["Raipur", "Bilaspur", "Durg"],
        "Goa": ["North Goa", "South Goa"],
        "Gujarat": ["Ahmedabad", "Surat", "Vadodara"],
        "Haryana": ["Ambala", "Gurgaon", "Hisar"],
        "Himachal Pradesh": ["Shimla", "Kangra", "Solan"],
        "Jharkhand": ["Ranchi", "Dhanbad", "Jamshedpur"],
        "Karnataka": ["Bangalore", "Mysore", "Mangalore"],
        "Kerala": ["Thiruvananthapuram", "Kochi", "Kozhikode"],
        "Madhya Pradesh": ["Bhopal", "Indore", "Gwalior"],
        "Maharashtra": ["Mumbai", "Pune", "Nagpur"],
        "Manipur": ["Imphal East", "Imphal West", "Thoubal"],
        "Meghalaya": ["East Khasi Hills", "West Khasi Hills", "Ri Bhoi"],
        "Mizoram": ["Aizawl", "Lunglei", "Champhai"],
        "Nagaland": ["Dimapur", "Kohima", "Mokokchung"],
        "Odisha": ["Angul", "Boudh", "Balangir", "Bargarh", "Balasore", "Bhadrak", "Cuttack", "Deogarh", "Dhenkanal", "Ganjam", "Gajapati", "Jharsuguda", "Jajpur", "Jagatsinghapur", "Khordha", "Keonjhar", "Kalahandi", "Kandhamal", "Koraput", "Kendrapara", "Malkangiri", "Mayurbhanj", "Nabarangpur", "Nuapada", "Nayagarh", "Puri", "Rayagada", "Sambalpur", "Subarnapur", "Sundargarh"],
        "Punjab": ["Amritsar", "Ludhiana", "Jalandhar"],
        "Rajasthan": ["Jaipur", "Jodhpur", "Udaipur"],
        "Sikkim": ["East Sikkim", "West Sikkim", "North Sikkim"],
        "Tamil Nadu": ["Chennai", "Coimbatore", "Madurai"],
        "Telangana": ["Hyderabad", "Warangal", "Nizamabad"],
        "Tripura": ["Agartala", "Kailashahar", "Udaipur"],
        "Uttar Pradesh": ["Lucknow", "Kanpur", "Ghaziabad"],
        "Uttarakhand": ["Dehradun", "Haridwar", "Nainital"],
        "West Bengal": ["Alipurduar", "Bankura", "Birbhum"]
    };

    const stateMemberMapping = {
        "FARMER": "MEMBER",
        "RANCHER": "ASSOCIATE",
        "GROWER": "PARTNER"
        // Add more mappings if needed
    };

    const stateSourceseedsMapping = {
        "Organic": "type-1",
        "Untreated": "type-2",
        "Others": "type-3"
    }
    const stateSourceIrrigation = {
        "Openwell": "1",
        "Borewell": "2",
        "canal": "3",
        "stream": "4",
        "river": "5"
    }
    const stateYesNoMapping = {
        "Yes": "True",
        "No": "False",
    };

    const states = Object.keys(stateDistrictMapping);
    const handleStateChange = (e) => {
        const selectedState = e.target.value;
        setSelectedState(selectedState);
        setDistricts(stateDistrictMapping[selectedState] || []);
        setSelectedDistrict(""); // Reset the selected district when state changes
    };

    const handleAddFarmer = () => {
        const newFarmer = { farmerName, area, hetProof };
        setFarmers([...farmers, newFarmer]);
        setFarmerName('');
        setArea('');
        setHetProof('');
    };

    const handleAnimals = () => {
        const newAnimals = { slno, cattle, poularity, goat, others };
        setAnimals([...animals, newAnimals]);
        setSlno('');
        setCattle('');
        setPoularity('');
        setGoat('');
        setOthers('');
    };
    const clear = () => sigCanvas.current.clear();

    const handleGrowerNameChange = (e) => setGrowerName(e.target.value);
    const handleContactPersonChange = (e) => setContactPerson(e.target.value);
    const handleDistrictName = (e) => setSelectedDistrict(e.target.value);
    const handleVillageNameChange = (e) => setVillageName(e.target.value);
    const handleLandMarkChange = (e) => setlandMark(e.target.value);
    const handlePinCodeChange = (e) => setPincode(e.target.value);
    const handleTelePhoneChange = (e) => setTelephoneNumber(e.target.value);
    const handlePhoneChange = (e) => setPhoneNumber(e.target.value);
    const handleMemberChange = (e) => setSelectedMember(e.target.value);
    const handleNpopChange = (e) => setSelectedNpop(e.target.value);
    const handleFarmerNameChange = (e) => setFarmerName(e.target.value);
    const handleRequireCertification = (e) => setSelectedRequireCertification(e.target.value);
    const handleDevloplocalLang = (e) => setSelectedDevlopLocalLang(e.target.value);
    const handleIqsManual = (e) => setSelectedIqsManual(e.target.value);
    const handleTrainFarmers = (e) => setSelectedTrainFarmers(e.target.value);
    const handleInternalInspec = (e) => setselectedInternalInspec(e.target.value);
    const handleSourceSeed = (e) => setSelectedSourceSeed(e.target.value);
    const handleSouceIrrigation = (e) => setSelectedSouceIrrigation(e.target.value);
    const handleRecordICS = (e) => setSelectedRecordICS(e.target.value);
    const handleNeighbourFarm = (e) => setSelectedNeighbourFarm(e.target.value);
    const handleSubContractActivity = (e) => setSelectedSubcontractActivity(e.target.value);
    const handleCommonStorage = (e) => setSelectedCommonStorage(e.target.value);
    const handleCommonMarketing = (e) => setSelectedCommonMarketing(e.target.value);
    const handleMotivation = (e) => setMotivation(e.target.value);
    const handlePackageDetails = (e) => setPackageDetails(e.target.value);
    const handlePreviousDetails = (e) => setPreviousDetails(e.target.value);

    const handleStepClick = (stepNumber) => {
        setStep(stepNumber);
    };



    const nextStep = () => {
        setStep(step + 1);
    };

    const backStep = () => {
        setStep(step - 1);
    };


    const captureSignature = () => {
        const dataURL = sigCanvas.current.getTrimmedCanvas().toDataURL('image/png');
        setSignatureDataURL(dataURL);
    };



    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!sigCanvas.current || !sigCanvas.current.getTrimmedCanvas) {
            console.error('sigCanvas.current is not available or getTrimmedCanvas method is not defined');
            // setMessage('Error: Signature is not available');
            return;
        }

        const signature = sigCanvas.current.getTrimmedCanvas().toDataURL('image/png');

        const growerCertificationObj = {
            growerName,
            contactPerson,
            selectedState,
            selectedDistrict,
            villageName,
            pincode,
            landMark,
            telephoneNumber,
            phoneNumber,
            selectedMember,
            selectedNpop,
            farmers,
            selectedRequireCertification,
            selectedDevlopLocalLang,
            selectedIqsManual,
            selectedTrainFarmers,
            selectedSouceIrrigation,
            selectedInternalInspec,
            selectedSourceSeed,
            selectedRecordICS,
            selectedNeighbourFarm,
            selectedSubcontractActivity,
            selectedCommonStorage,
            selectedCommonMarketing,
            animals,
            motivation,
            packageDetails,
            previousDetails,
            checkboxes,
            date,
            signature
            // signatureDataUrl
        };

        const formData = new FormData();
        formData.append('growerCertification', JSON.stringify(growerCertificationObj));

        for (const key in files) {
            if (files[key]) {
                formData.append(key, files[key]);
            }
        }

        try {
            const response = await axios.post('http://localhost:8000/api/growerCertification', formData, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                },
            });

            console.log('API Response:', response); // Log the response

            if (response.status === 200) {
                setMessage('Grower added successfully');
                console.log(response.data);
            } else {
                setMessage(`Error: ${response.data.message}`);
                console.error('Error Response:', response.data);
            }
        } catch (error) {
            setMessage(`Error: ${error.message}`);
            console.error('Catch Error:', error); // Log the caught error
        }
    };



    return (
        <div className={style.container}>
            <div className={style.headings}>
                <label htmlFor="formHeading"></label>Application Form for Grower Group Certification
            </div>


            {/* <div className={style.buttonContainer}>
                {[1, 2, 3, 4, 5].map((num) => (
                    <button
                        key={`${num}`}
                        id={`${num}`}
                        className={`${style.button} ${step === num ? style.activeButton : ''}`}
                        onClick={() => handleStepClick(num)}
                    >
                        {num}
                    </button>
                ))}
            </div> */}

            {/* <div className={style.buttonContainer}>
                {[1, 2, 3, 4, 5].map((num, index) => (
                    <div key={num} className={style.buttonWrapper}>
                        <button
                            id={`${num}`}
                            className={`${style.button} ${step === num ? style.activeButton : ''}`}
                            onClick={() => handleStepClick(num)}
                        >
                            {num}
                        </button>
                        {index < 4 && step === num ? <div className={style.arrow}></div> : null}
                    </div>
                ))}
            </div> */}

            <div className={style.buttonContainer}>
                {[1, 2, 3, 4, 5].map((num, index) => (
                    <div key={num} className={style.buttonWrapper}>
                        <button
                            id={`${num}`}
                            className={`${style.button} ${step >= num ? style.activeButton : ''}`}
                            onClick={() => handleStepClick(num)}
                        >
                            {num}
                        </button>
                        {index < 4 && step > num ? <div className={style.arrow}></div> : null}
                    </div>
                ))}
            </div>

            <div className={style.container}>
                <div className={style.panel} panel-primary>
                    <form onSubmit={handleSubmit}>
                        {step === 1 && (
                            <div className="form-group" id="form-1">
                                <div className="row">
                                    <div className="col-md-3">
                                        <label className={style.label} htmlFor="grower_name">Grower Name <label htmlFor="mandatory" id={style.starMark}>*</label></label>
                                        <input
                                            type="text"
                                            className="form-control"
                                            placeholder="grower_name"
                                            id="grower_name"
                                            value={growerName}
                                            onChange={handleGrowerNameChange}
                                            required
                                        />

                                    </div>

                                    <div className="col-md-3">
                                        <label htmlFor="contact_person" className={style.label}>Contact Person
                                            <label htmlFor="mandatory" id={style.starMark}>*</label>
                                        </label>
                                        <input
                                            type="text"
                                            className="form-control"
                                            placeholder="name_of_contact_person"
                                            id="contact_person"
                                            name="contact_person"
                                            onChange={handleContactPersonChange}
                                            value={contactPerson}
                                            required
                                        />
                                    </div>

                                    <div className="col-md-3">
                                        <label htmlFor="state" className={style.label}>State
                                            <label htmlFor="mandatory" id={style.starMark}>*</label>
                                        </label>
                                        <select
                                            className="form-control"
                                            id="state"
                                            value={selectedState}
                                            onChange={handleStateChange}
                                        >
                                            <option value="" disabled>Select your state</option>
                                            {states.map((state, index) => (
                                                <option key={index} value={state}>{state}</option>
                                            ))}
                                        </select>
                                    </div>

                                    <div className="col-md-3">
                                        <label htmlFor="districts" className={style.label}>Districts
                                            <label htmlFor="mandatory" id={style.starMark}>*</label>
                                        </label>
                                        <select
                                            className="form-control"
                                            id="district"
                                            value={selectedDistrict}
                                            onChange={handleDistrictName}
                                            disabled={!selectedState}
                                        >
                                            <option value="" disabled>Select your district</option>
                                            {districts.map((district, index) => (
                                                <option key={index} value={district}>{district}</option>
                                            ))}
                                        </select>
                                    </div>
                                </div>
                                <div className="row">
                                    <div className="col-md-3">
                                        <label htmlFor="village_name" className={style.label}>Village Name
                                            <label htmlFor="mandatory" id={style.starMark}>*</label>
                                        </label>
                                        <input
                                            type="text"
                                            className="form-control"
                                            placeholder="name_of_Village"
                                            id="village_name"
                                            name="village_name"
                                            onChange={handleVillageNameChange}
                                            value={villageName}
                                            required
                                        />
                                    </div>
                                    <div className="col-md-3">
                                        <label htmlFor="pincode" className={style.label}>Pincode
                                            <label htmlFor="mandatory" id={style.starMark}>*</label>
                                        </label>
                                        <input type="number"
                                            className="form-control"
                                            id="pincode" name="pincode" maxlength="6"
                                            pattern="[0-9]{6}"
                                            placeholder="Enter pincode"
                                            onChange={handlePinCodeChange}
                                            value={pincode}

                                            required
                                        />
                                    </div>

                                    <div className="col-md-3">
                                        <label htmlFor="landmark" className={style.label}>Landmark
                                            <label htmlFor="mandatory" id={style.starMark}>*</label>
                                        </label>
                                        <input type="text"
                                            id="landmark"
                                            name="landmark"
                                            className="form-control"
                                            placeholder="Enter landmark"
                                            onChange={handleLandMarkChange}
                                            value={landMark}
                                        />
                                    </div>
                                    <div className="col-md-3">
                                        <label htmlFor="telephone_number" className={style.label}>TelePhone Number
                                            <label htmlFor="mandatory" id={style.starMark}>*</label>
                                        </label>
                                        <input type="tel"

                                            inputmode="numeric"
                                            maxlength="10"
                                            className="form-control"
                                            placeholder="Enter Tele. Number"
                                            onChange={handleTelePhoneChange}
                                            value={telephoneNumber}
                                        />

                                    </div>
                                </div>

                                <div className="row">
                                    <div className="col-md-3">
                                        <label htmlFor="phone_number" className={style.label}>Phone Number
                                            <label htmlFor="mandatory" id={style.starMark}>*</label>
                                        </label>
                                        <input type="tel"

                                            inputmode="numeric"
                                            maxlength="10"
                                            className="form-control"
                                            placeholder="Enter phone Number"
                                            onChange={handlePhoneChange}
                                            value={phoneNumber}
                                        />

                                    </div>
                                    <div className="col-md-3">
                                        <label htmlFor="member_type" className={style.label}>Member Type
                                            <label htmlFor="mandatory" id={style.starMark}>*</label>
                                        </label>
                                        <select
                                            id="memberSelect"
                                            className="form-control"
                                            value={selectedMember}
                                            onChange={handleMemberChange}
                                        >
                                            <option value="" disabled>Select a member type</option>
                                            {Object.keys(stateMemberMapping).map((key) => (
                                                <option key={key} value={key}>{key}</option>
                                            ))}
                                        </select>
                                    </div>
                                    <div className="col-md-3">
                                        <label htmlFor="Npop_type" className={style.label}>Are you NPOP Type
                                            <label htmlFor="mandatory" id={style.starMark}>*</label> </label>
                                        <select name="Npop_type" id="Npop_type"
                                            className="form-control"
                                            value={selectedNpop}
                                            onChange={handleNpopChange}
                                        >
                                            <option value="" disabled>Select Your Choice</option>
                                            {Object.keys(stateYesNoMapping).map((key) => (
                                                <option key={key} value={key}>{key}</option>
                                            ))}

                                        </select>
                                    </div>
                                </div>

                                <div className="row">
                                    <div className="col-md-3">
                                        <label htmlFor="farmer_name" className={style.label}>Farmer Name:
                                            <label htmlFor="mandatory" id={style.starMark}>*</label>
                                        </label>
                                        <input
                                            className="form-control"
                                            type="text"
                                            value={farmerName}
                                            onChange={handleFarmerNameChange}
                                        />
                                    </div>
                                    <div className="col-md-3">
                                        <label htmlFor="area" className={style.label}>Area: <label htmlFor="mandatory" id={style.starMark}>*</label></label>
                                        <input
                                            className="form-control"
                                            type="text"
                                            value={area}
                                            onChange={(e) => setArea(e.target.value)}
                                        />
                                    </div>
                                    <div className="col-md-3">
                                        <label htmlFor="het_proof" className={style.label}>Het Proof:
                                            <label htmlFor="mandatory" id={style.starMark}>*</label>
                                        </label>
                                        <input
                                            className="form-control"
                                            type="text"
                                            value={hetProof}
                                            onChange={(e) => setHetProof(e.target.value)}
                                        />
                                    </div>
                                    <div className="col-md-2">
                                        <button className="form-control" type="button" onClick={handleAddFarmer}>Add</button>
                                    </div>
                                </div>

                                <div className="row">
                                    <div className={style.tablecontainer}>
                                        <table className={style.table}>
                                            <thead className={style.thead}>
                                                <tr className={style.tr}>
                                                    <th className={style.th}>Farmer Name</th>
                                                    <th className={style.th}>Area</th>
                                                    <th className={style.th}>Het Proof</th>
                                                </tr>
                                            </thead>
                                            <tbody className={style.tbody}>
                                                {farmers.map((farmer, index) => (
                                                    <tr key={index} className={style.tr}>
                                                        <td className={style.td}>{farmer.farmerName}</td>
                                                        <td className={style.td}>{farmer.area}</td>
                                                        <td className={style.td}>{farmer.hetProof}</td>
                                                    </tr>
                                                ))}
                                            </tbody>
                                        </table>

                                    </div>

                                </div>

                                <div className="row">
                                    {/* <div className="col-md-2">
                                    <label htmlFor="require_certification" className={style.label}>Member Type</label>
                                    <select
                                        id="require_certification"
                                        className="form-control"
                                        value={selectedRequireCertification}
                                        onChange={handleMemberChange}
                                    >
                                        <option value="" disabled>Select a member type</option>
                                        {Object.keys(stateMemberMapping).map((key) => (
                                            <option key={key} value={key}>{key}</option>
                                        ))}
                                    </select>
                                </div> */}

                                    <div className="row">


                                        <div className="col-md-3">
                                            <label htmlFor="require_certification" className={style.label}>Are you NPOP Type
                                                <label htmlFor="mandatory" id={style.starMark}>*</label></label>
                                            <select name="require_certification" id="require_certification"
                                                className="form-control"
                                                value={selectedRequireCertification}
                                                onChange={handleRequireCertification}
                                            >
                                                <option value="" disabled>Select Your Choice</option>
                                                {Object.keys(stateYesNoMapping).map((key) => (
                                                    <option key={key} value={key}>{key}</option>
                                                ))}

                                            </select>
                                        </div>


                                        <div className="col-md-3">
                                            <label htmlFor="devlop_localLang" className={style.label}>Aware Of Group of Certification
                                                <label htmlFor="mandatory" id={style.starMark}>*</label> </label>
                                            <select name="devlop_localLang" id="devlop_localLang"
                                                className="form-control"
                                                value={selectedDevlopLocalLang}
                                                onChange={handleDevloplocalLang}
                                            >
                                                <option value="" disabled>Select Your Choice</option>
                                                {Object.keys(stateYesNoMapping).map((key) => (
                                                    <option key={key} value={key}>{key}</option>
                                                ))}

                                            </select>
                                        </div>
                                        <div className="col-md-3">
                                            <label htmlFor="IqsManual" className={style.label}>Are you IqsManual  Type
                                                <label htmlFor="mandatory" id={style.starMark}>*</label> </label>
                                            <select name="IqsManual" id="IqsManual"
                                                className="form-control"
                                                value={selectedIqsManual}
                                                onChange={handleIqsManual}
                                            >
                                                <option value="" disabled>Select Your Choice</option>
                                                {Object.keys(stateYesNoMapping).map((key) => (
                                                    <option key={key} value={key}>{key}</option>
                                                ))}

                                            </select>
                                        </div>
                                        <div className="col-md-3">
                                            <label htmlFor="train_farmers" className={style.label}>Do you conduct train Farmer
                                                <label htmlFor="mandatory" id={style.starMark}>*</label> </label>
                                            <select name="train_farmers" id="train_farmers"
                                                className="form-control"
                                                value={selectedTrainFarmers}



                                                onChange={handleTrainFarmers}
                                            >
                                                <option value="" disabled>Select Your Choice</option>
                                                {Object.keys(stateYesNoMapping).map((key) => (
                                                    <option key={key} value={key}>{key}</option>
                                                ))}

                                            </select>
                                        </div>
                                        {/* <div className="col-md-3">
                                            <label htmlFor="source_irigation" className={style.label}>Source of Irigation </label>
                                            <select name="source_irigation" id="source_irigation"
                                                className="form-control"
                                                value={selectedSouceIrrigation}



                                                onChange={handleSouceIrrigation}
                                            >
                                                <option value="" disabled>Select Your Choice</option>
                                                {Object.keys(stateSourceIrrigation).map((key) => (
                                                    <option key={key} value={key}>{key}</option>
                                                ))}

                                            </select>
                                        </div> */}

                                    </div>



                                </div>

                                {/* Other content can go here */}
                                <div style={{ position: 'relative', height: '90px', padding: '20px' }}>
                                    <button
                                        style={{ position: 'absolute', bottom: '10px', right: '10px' }}
                                        className="btn btn-primary"
                                        type="button"
                                        onClick={nextStep}
                                    >
                                        Next
                                    </button>
                                </div>


                                {/* <button className="btn btn-primary" type="button" onClick={nextStep}>Next</button> */}
                            </div>
                        )}



                        {step === 2 && (
                            <div className="form-group" id="form-2">
                                <div className="row">
                                    <div className="col-md-3">
                                        <label htmlFor="source_irigation" className={style.label}>Source of Irigation
                                            <label htmlFor="mandatory" id={style.starMark}>*</label>
                                        </label>
                                        <select name="source_irigation" id="source_irigation"
                                            className="form-control"
                                            value={selectedSouceIrrigation}



                                            onChange={handleSouceIrrigation}
                                        >
                                            <option value="" disabled>Select Your Choice</option>
                                            {Object.keys(stateSourceIrrigation).map((key) => (
                                                <option key={key} value={key}>{key}</option>
                                            ))}

                                        </select>
                                    </div>
                                    <div className="col-md-3">
                                        <label htmlFor="internal_inspec" className={style.label}>Do you Internal Inspection
                                            <label htmlFor="mandatory" id={style.starMark}>*</label> </label>
                                        <select name="internal_inspec" id="internal_inspec"
                                            className="form-control"
                                            value={selectedInternalInspec}



                                            onChange={handleInternalInspec}
                                        >
                                            <option value="" disabled>Select Your Choice</option>
                                            {Object.keys(stateYesNoMapping).map((key) => (
                                                <option key={key} value={key}>{key}</option>
                                            ))}

                                        </select>
                                    </div>
                                    <div className="col-md-3">
                                        <label htmlFor="seed_source" className={style.label}>Source Of Seed
                                            <label htmlFor="mandatory" id={style.starMark}>*</label>
                                        </label>
                                        <select name="seed_source" id="seed_source"
                                            className="form-control"
                                            value={selectedSourceSeed}



                                            onChange={handleSourceSeed}
                                        >
                                            <option value="" disabled>Select Your Choice</option>
                                            {Object.keys(stateSourceseedsMapping).map((key) => (
                                                <option key={key} value={key}>{key}</option>
                                            ))}

                                        </select>
                                    </div>
                                    <div className="col-md-3">
                                        <label htmlFor="records_ICS">Do you Keep record ICS Activity
                                            <label htmlFor="mandatory" id={style.starMark}>*</label>
                                        </label>
                                        <select name="records_ICS"
                                            id="records_ICS"
                                            className="form-control"
                                            value={selectedRecordICS}
                                            onChange={handleRecordICS}
                                        >
                                            <option value="" disabled>Select Your Choice</option>
                                            {Object.keys(stateYesNoMapping).map((key) => (
                                                <option key={key} value={key}>{key}</option>
                                            ))}

                                        </select>
                                    </div>


                                </div>

                                <div className="row">
                                    <div className="col-md-3">
                                        <label htmlFor="neibour_farm" className={style.label}>Crop Produced in Nehibour Farm
                                            <label htmlFor="mandatory" id={style.starMark}>*</label>
                                        </label>
                                        <select name="neibour_farm" id="neibour_farm"
                                            className="form-control"
                                            value={selectedNeighbourFarm}



                                            onChange={handleNeighbourFarm}
                                        >
                                            <option value="" disabled>Select Your Choice</option>
                                            {Object.keys(stateYesNoMapping).map((key) => (
                                                <option key={key} value={key}>{key}</option>
                                            ))}

                                        </select>
                                    </div>
                                    <div className="col-md-3">
                                        <label htmlFor="subcontract_activity" className={style.label}>Do you have Subcontact Activity
                                            <label htmlFor="mandatory" id={style.starMark}>*</label>
                                        </label>
                                        <select name="subcontract_activity" id="subcontract_activity"
                                            className="form-control"
                                            value={selectedSubcontractActivity}



                                            onChange={handleSubContractActivity}
                                        >
                                            <option value="" disabled>Select Your Choice</option>
                                            {Object.keys(stateYesNoMapping).map((key) => (
                                                <option key={key} value={key}>{key}</option>
                                            ))}

                                        </select>
                                    </div>
                                    <div className="col-md-3">
                                        <label htmlFor="common_storage" className={style.label}>Is there Common Storage
                                            <label htmlFor="mandatory" id={style.starMark}>*</label>
                                        </label>
                                        <select name="common_storage" id="common_storage"
                                            className="form-control"
                                            value={selectedCommonStorage}



                                            onChange={handleCommonStorage}
                                        >
                                            <option value="" disabled>Select Your Choice</option>
                                            {Object.keys(stateYesNoMapping).map((key) => (
                                                <option key={key} value={key}>{key}</option>
                                            ))}

                                        </select>
                                    </div>

                                    <div className="col-md-3">
                                        <label htmlFor="common_marketing" className={style.label}>Is there Common Marketing Group
                                            <label htmlFor="mandatory" id={style.starMark}>*</label>
                                        </label>
                                        <select name="common_marketing" id="common_marketing"
                                            className="form-control"
                                            value={selectedCommonMarketing}



                                            onChange={handleCommonMarketing}
                                        >
                                            <option value="" disabled>Select Your Choice</option>
                                            {Object.keys(stateYesNoMapping).map((key) => (
                                                <option key={key} value={key}>{key}</option>
                                            ))}

                                        </select>
                                    </div>


                                </div>



                                <div className="row">
                                    <div className="col-md-2">
                                        <label htmlFor="sl_no" className={style.label}>sl no.</label>
                                        <input
                                            className="form-control"
                                            type="text"
                                            value={slno}
                                            onChange={(e) => setSlno(e.target.value)}
                                        />
                                    </div>
                                    <div className="col-md-2">
                                        <label htmlFor="cattle" className={style.label}>No. of Cattle</label>
                                        <input
                                            className="form-control"
                                            type="text"
                                            value={cattle}
                                            onChange={(e) => setCattle(e.target.value)}
                                        />
                                    </div>
                                    <div className="col-md-2">
                                        <label htmlFor="poularity" className={style.label}>No. of poularity</label>
                                        <input
                                            className="form-control"
                                            type="text"
                                            value={poularity}
                                            onChange={(e) => setPoularity(e.target.value)}
                                        />
                                    </div>

                                    <div className="col-md-2">
                                        <label htmlFor="goat" className={style.label}>No. of Goat</label>
                                        <input
                                            className="form-control"
                                            type="text"
                                            value={goat}
                                            onChange={(e) => setGoat(e.target.value)}
                                        />
                                    </div>
                                    <div className="col-md-2">
                                        <label htmlFor="others" className={style.label}>No. others</label>
                                        <input
                                            className="form-control"
                                            type="text"
                                            value={others}
                                            onChange={(e) => setOthers(e.target.value)}
                                        />
                                    </div>
                                    <div className="col-md-2">
                                        <button className="form-control" type="button" onClick={handleAnimals}>Add</button>
                                    </div>
                                </div>
                                <div className="row">
                                    <div className={style.tablecontainer}>
                                        <table className={style.table}>
                                            <thead className={style.thead}>
                                                <tr className={style.tr}>
                                                    <th className={style.th}>sl no.</th>
                                                    <th className={style.th}>Cattle</th>
                                                    <th className={style.th}>Goat</th>
                                                    <th className={style.th}>poularity</th>
                                                    <th className={style.th}>others</th>
                                                </tr>
                                            </thead>
                                            <tbody className={style.tbody}>
                                                {animals.map((animal, index) => (
                                                    <tr key={index} className={style.tr}>
                                                        <td className={style.td}>{animal.slno}</td>
                                                        <td className={style.td}>{animal.cattle}</td>
                                                        <td className={style.td}>{animal.poularity}</td>
                                                        <td className={style.td}>{animal.goat}</td>
                                                        <td className={style.td}>{animal.others}</td>
                                                    </tr>
                                                ))}
                                            </tbody>
                                        </table>

                                    </div>

                                </div>

                                <div className="row">
                                    <div className="col-md-3">
                                        <label htmlFor="motivation" className={style.label}>What Is Your Motivation</label>
                                        <input type="textarea"
                                            className="form-control"
                                            name="motivation"
                                            id="motivation"
                                            rows='4'
                                            cols='50'
                                            value={motivation}
                                            onChange={handleMotivation}
                                        />
                                    </div>
                                    <div className="col-md-3">
                                        <label htmlFor="package_details" className={style.label}>Package Certification Details Grower
                                            <label htmlFor="mandatory" id={style.starMark}>*</label>
                                        </label>
                                        <input type="textarea"
                                            className="form-control"
                                            name="package_details"
                                            id="package_details"
                                            rows='4'
                                            cols='50'
                                            value={packageDetails}
                                            onChange={handlePackageDetails}
                                        />
                                    </div>

                                    <div className="col-md-3">
                                        <label htmlFor="previous_details" className={style.label}>Package Certification Details Grower
                                            <label htmlFor="mandatory" id={style.starMark}>*</label>
                                        </label>
                                        <input type="textarea"
                                            className="form-control"
                                            name="previous_details"
                                            id="previous_details"
                                            rows='4'
                                            cols='50'
                                            value={previousDetails}
                                            onChange={handlePreviousDetails}
                                        />
                                    </div>
                                </div>



                                <div className="btn-container">
                                    {/* <button className="btn btn-primary" type="button" onClick={backStep}>Back</button> */}

                                    <div style={{ position: 'relative', height: '70px', padding: '20px', display: 'flex', justifyContent: 'space-between' }}>
                                        <button
                                            style={{ position: 'absolute', bottom: '10px', left: '10px' }}
                                            className="btn btn-primary"
                                            type="button"
                                            onClick={backStep}
                                        >
                                            Back
                                        </button>
                                        <button
                                            style={{ position: 'absolute', bottom: '10px', right: '10px' }}
                                            className="btn btn-primary"
                                            type="button"
                                            onClick={nextStep}
                                        >
                                            Next
                                        </button>
                                    </div>
                                </div>


                            </div>



                        )}

                        {step === 3 && (
                            <div className="form-group" id="form-3">

                                <div className={style.container}>
                                    <div className={style.panel} panel-primary>
                                        {/* <div className={style.headings}>
                                            <label htmlFor="formHeading"></label>DECLARATION
                                        </div> */}

                                        <div className="row">
                                            <div className="col-md-3">
                                                <label htmlFor="map_fields" className="form-label">Attach Map Of All Fields <label htmlFor="mandatory" id={style.starMark}>*</label></label>
                                                <input
                                                    type="file"
                                                    id="mapOfAllFields"
                                                    onChange={handleFileChange}
                                                    className="form-control"
                                                />
                                            </div>
                                            <div className="col-md-3">
                                                <label htmlFor="map_fields" className="form-label">Field History Sheets <label htmlFor="mandatory" id={style.starMark}>*</label></label>
                                                <input
                                                    type="file"
                                                    id="fieldHistorySheets"
                                                    onChange={handleFileChange}
                                                    className="form-control"
                                                />
                                            </div>
                                            <div className="col-md-3">
                                                <label htmlFor="map_fields" className="form-label">Documentation Of ICS
                                                    <label htmlFor="mandatory" id={style.starMark}>*</label>
                                                </label>
                                                <input
                                                    type="file"
                                                    id="documentationOfICS"
                                                    onChange={handleFileChange}
                                                    className="form-control"
                                                />
                                            </div>
                                            <div className="col-md-3">
                                                <label htmlFor="map_fields" className="form-label">Water/Soil And Plant Test
                                                    <label htmlFor="mandatory" id={style.starMark}>*</label>
                                                </label>
                                                <input
                                                    type="file"
                                                    id="waterSoilPlantTest"
                                                    onChange={handleFileChange}
                                                    className="form-control"
                                                />
                                            </div>
                                            <div className="col-md-3">
                                                <label htmlFor="map_fields" className="form-label">Residues Analysis
                                                    <label htmlFor="mandatory" id={style.starMark}>*</label>
                                                </label>
                                                <input
                                                    type="file"
                                                    id="residuesAnalysis"
                                                    onChange={handleFileChange}
                                                    className="form-control"
                                                />
                                            </div>
                                            <div className="col-md-3">
                                                <label htmlFor="map_fields" className="form-label">Input Product Labels
                                                    <label htmlFor="mandatory" id={style.starMark}>*</label>
                                                </label>
                                                <input
                                                    type="file"
                                                    id="inputProductLabels"
                                                    onChange={handleFileChange}
                                                    className="form-control"
                                                />
                                            </div>
                                            <div className="col-md-3">
                                                <label htmlFor="map_fields" className="form-label">Organic Product Labels
                                                    <label htmlFor="mandatory" id={style.starMark}>*</label>
                                                </label>
                                                <input
                                                    type="file"
                                                    id="organicProductLabels"
                                                    onChange={handleFileChange}
                                                    className="form-control"
                                                />
                                            </div>

                                        </div>
                                        <div className="row">
                                            <div className="col-md-3">
                                                <label htmlFor="date">Date</label>
                                                <input
                                                    type="date"
                                                    className="form-control"
                                                    id="date"
                                                    value={date}
                                                    onChange={(e) => setDate(e.target.value)}
                                                />
                                            </div>
                                        </div>
                                        <div className="btn-container">
                                            {/* <button className="btn btn-primary" type="button" onClick={backStep}>Back</button>
                                            <button className="btn btn-primary" type="button" onClick={nextStep}>Next</button> */}

                                            <div style={{ position: 'relative', height: '70px', padding: '20px', display: 'flex', justifyContent: 'space-between' }}>
                                                <button
                                                    style={{ position: 'absolute', bottom: '10px', left: '10px' }}
                                                    className="btn btn-primary"
                                                    type="button"
                                                    onClick={backStep}
                                                >
                                                    Back
                                                </button>
                                                <button
                                                    style={{ position: 'absolute', bottom: '10px', right: '10px' }}
                                                    className="btn btn-primary"
                                                    type="button"
                                                    onClick={nextStep}
                                                >
                                                    Next
                                                </button>
                                            </div>

                                        </div>



                                    </div>

                                    {/* <label htmlFor="">I confirm that all particulars submitted are true to the best of my knowledge &belief.</label> */}


                                </div>

                            </div>
                        )}

                        {step === 4 && (
                            <div className="form-group" id="form-4">
                                <div className={style.container}>
                                    <div className={style.panel} panel-primary>
                                        <div className={style.declarationContainer}>
                                            <div className={style.declarationRow}>
                                                <input
                                                    type="checkbox"
                                                    id="declaration1"
                                                    checked={checkboxes.declaration1}
                                                    onChange={handleCheckboxChange}
                                                    className={style.checkbox}
                                                />
                                                <label htmlFor="declaration1" className={style.label}>
                                                    I confirm that all particulars submitted are true to the best of my knowledge & belief.
                                                </label>
                                            </div>
                                            <div className={style.declarationRow}>
                                                <input
                                                    type="checkbox"
                                                    id="declaration2"
                                                    checked={checkboxes.declaration2}
                                                    onChange={handleCheckboxChange}
                                                    className={style.checkbox}
                                                />
                                                <label htmlFor="declaration2" className={style.label}>
                                                    I agree to provide access to further information/products needed by OSOCA at any time so as to check compliance with the required standards.
                                                </label>
                                            </div>
                                            <div className={style.declarationRow}>
                                                <input
                                                    type="checkbox"
                                                    id="declaration3"
                                                    checked={checkboxes.declaration3}
                                                    onChange={handleCheckboxChange}

                                                    className={style.checkbox}
                                                />
                                                <label htmlFor="declaration3" className={style.label}>
                                                    I understand that submission of this application in no way implies granting of certification by OSOCA.
                                                </label>
                                            </div>




                                        </div>
                                        <div>
                                            <SignatureCanvas

                                                ref={sigCanvas}
                                                canvasProps={{ width: 300, height: 200, className: 'sigCanvas' }}
                                            />
                                            <button onClick={clear}>Clear</button>

                                        </div>
                                        <div className="btn-container">
                                            <button onClick={captureSignature}>Capture Signature</button>
                                            {/* <button className="btn btn-primary" type="button" onClick={backStep}>Back</button>
                                            <button className="btn btn-primary" type="button" onClick={nextStep}>Next</button> */}
                                            <div style={{ position: 'relative', height: '70px', padding: '20px', display: 'flex', justifyContent: 'space-between' }}>
                                                <button
                                                    style={{ position: 'absolute', bottom: '10px', left: '10px' }}
                                                    className="btn btn-primary"
                                                    type="button"
                                                    onClick={backStep}
                                                >
                                                    Back
                                                </button>
                                                <button
                                                    style={{ position: 'absolute', bottom: '10px', right: '10px' }}
                                                    className="btn btn-primary"
                                                    type="button"
                                                    onClick={nextStep}
                                                >
                                                    Next
                                                </button>
                                            </div>

                                        </div>
                                    </div>
                                </div>
                            </div>
                        )

                        }

                        {step === 5 && (
                            <div>

                                <div className="row" style={{ margin: '20px', fontFamily: 'Arial, sans-serif' }}>
                                    <div className="col-md-8" style={{ border: '1px solid #ddd', padding: '20px', borderRadius: '5px' }}>
                                        <center><strong><u>Dealer Details</u></strong></center>
                                        <table className="table table-striped" style={{ width: '100%', marginTop: '20px' }}>
                                            <tbody>
                                                <tr>

                                                    <td><strong>Date of Application</strong></td>
                                                    <td className="ng-binding">{date}</td>
                                                </tr>
                                                <tr>

                                                    <td><strong>Name Of The Grower</strong></td>
                                                    <td className="ng-binding">{growerName}</td>
                                                </tr>
                                                <tr>

                                                    <td><strong>Contact Person</strong></td>
                                                    <td className="ng-binding">{contactPerson}</td>
                                                </tr>
                                                <tr>

                                                    <td><strong>Owner Name</strong></td>
                                                    <td className="ng-binding">JAYANT</td>
                                                </tr>
                                                <tr>

                                                    <td><strong>State</strong></td>
                                                    <td className="ng-binding">{selectedState}</td>
                                                </tr>
                                                <tr>

                                                    <td><strong>District</strong></td>
                                                    <td className="ng-binding">{selectedDistrict}</td>
                                                </tr>

                                            </tbody>
                                        </table>
                                    </div>
                                    <div className="col-md-4" style={{ padding: '20px', textAlign: 'center' }}>
                                        <img
                                            src={signatureDataURL}
                                            alt="Signature Preview"
                                            style={{ maxWidth: "100%", height: "auto", border: "1px solid #ddd", padding: "5px", borderRadius: "4px" }}
                                        />
                                        <p><strong>Dealer Signature</strong></p>
                                        <center><strong style={{ color: '#1000ff' }}><u>Uploaded Documents</u></strong></center>
                                        <ul className="fa-ul" style={{ listStyleType: 'none', paddingLeft: '0', marginTop: '20px' }}>
                                            <li><span className="fa-li"><i className="fa fa-check-square"></i></span>
                                                {/* <a href="../../public/uploads/fertDealer/ODFE2023DL1159-IDP.pdf" target="_blank">Identity Proof</a> */}
                                                {Object.keys(files).map((key) => (
                                                    <ul key={key}>
                                                        {/* <li>{key.replace(/([A-Z])/g, ' $1').replace(/^./, str => str.toUpperCase()).replace('Of', 'of')}:</li> */}
                                                        <li>
                                                            {files[key] ? (
                                                                <a href={URL.createObjectURL(files[key])} target="_blank" rel="noopener noreferrer">{key.replace(/([A-Z])/g, ' $1').replace(/^./, str => str.toUpperCase()).replace('Of', 'of')}:</a>
                                                            ) : (
                                                                'No file uploaded'
                                                            )}
                                                        </li>
                                                    </ul>
                                                ))}
                                            </li>


                                        </ul>
                                    </div>
                                </div>

                                {/* Preview Section */}
                                <div className={style.previewcontainer}>

                                    <div className={style.previewrow}>
                                        <div className={`${style.previewsection} col-md-4`}>
                                            <table className={style.previewtable}>
                                                <thead>
                                                    <tr>
                                                        <th colSpan="2" style={{ textAlign: 'center', fontWeight: 'bold', fontSize: '15px' }}>Grower Data</th>
                                                    </tr>
                                                </thead>
                                                <tbody>
                                                    <tr>
                                                        <td>Grower Name:</td>
                                                        <td>{growerName}</td>
                                                    </tr>
                                                    <tr>
                                                        <td>Contact Person:</td>
                                                        <td>{contactPerson}</td>
                                                    </tr>
                                                    <tr>
                                                        <td>State:</td>
                                                        <td>{selectedState}</td>
                                                    </tr>
                                                    <tr>
                                                        <td>District:</td>
                                                        <td>{selectedDistrict}</td>
                                                    </tr>
                                                    <tr>
                                                        <td>Village Name:</td>
                                                        <td>{villageName}</td>
                                                    </tr>
                                                    <tr>
                                                        <td>Pincode:</td>
                                                        <td>{pincode}</td>
                                                    </tr>
                                                    <tr>
                                                        <td>Telephone Number:</td>
                                                        <td>{telephoneNumber}</td>
                                                    </tr>
                                                    <tr>
                                                        <td>Phone Number:</td>
                                                        <td>{phoneNumber}</td>
                                                    </tr>
                                                </tbody>
                                            </table>
                                        </div>
                                        {/* <div className={style.previewsection} >
                                            <table className={style.previewtable}>
                                                <thead>
                                                    <tr>
                                                        <th colSpan="2">File Previews:</th>
                                                    </tr>
                                                </thead>
                                                <tbody>
                                                    {Object.keys(files).map((key) => (
                                                        <tr key={key}>
                                                            <td>{key.replace(/([A-Z])/g, ' $1').replace(/^./, str => str.toUpperCase()).replace('Of', 'of')}:</td>
                                                            <td>
                                                                {files[key] ? (
                                                                    <a href={URL.createObjectURL(files[key])} target="_blank" rel="noopener noreferrer">View File</a>
                                                                ) : (
                                                                    'No file uploaded'
                                                                )}
                                                            </td>
                                                        </tr>
                                                    ))}
                                                </tbody>
                                            </table>

                                        </div> */}



                                    </div>

                                    <div className={style.previewrow}>
                                        <div className={style.previewsection}>
                                            <table className={style.previewtable}>
                                                <thead>
                                                    <tr>
                                                        <th colSpan="3" style={{ textAlign: 'center', fontWeight: 'bold', fontSize: '15px' }}>Farmer Details</th>
                                                    </tr>
                                                    <tr>
                                                        <th style={{ textAlign: 'center', fontWeight: 'bold', fontSize: '13px' }}>Farmer Name</th>
                                                        <th style={{ textAlign: 'center', fontWeight: 'bold', fontSize: '13px' }}>Area</th>
                                                        <th style={{ textAlign: 'center', fontWeight: 'bold', fontSize: '13px' }}>Het Proof</th>
                                                    </tr>
                                                </thead>
                                                <tbody>
                                                    <tr>
                                                        <td>{farmerName}</td>
                                                        <td>{area}</td>
                                                        <td>{hetProof}</td>
                                                    </tr>
                                                </tbody>
                                            </table>
                                        </div>
                                    </div>





                                    <div className={style.previewrow}>
                                        <div className={style.previewsection}>
                                            <table className={style.previewtable}>
                                                <thead>
                                                    <tr>
                                                        <th colSpan="2" style={{ textAlign: 'center', fontWeight: 'bold', fontSize: '13px' }}>Previews:</th>
                                                    </tr>
                                                </thead>
                                                <tbody>
                                                    <tr>
                                                        <td>Selected Source Seed:</td>
                                                        <td>{selectedSourceSeed}</td>
                                                    </tr>
                                                    <tr>
                                                        <td>Selected Record ICS:</td>
                                                        <td>{selectedRecordICS}</td>
                                                    </tr>
                                                    <tr>
                                                        <td>Selected Neighbour Farm:</td>
                                                        <td>{selectedNeighbourFarm}</td>
                                                    </tr>
                                                    <tr>
                                                        <td>Selected Subcontract Activity:</td>
                                                        <td>{selectedSubcontractActivity}</td>
                                                    </tr>
                                                    <tr>
                                                        <td>Selected Common Storage:</td>
                                                        <td>{selectedCommonStorage}</td>
                                                    </tr>
                                                    <tr>
                                                        <td>Selected Common Marketing:</td>
                                                        <td>{selectedCommonMarketing}</td>
                                                    </tr>
                                                    <tr>
                                                        <td>Motivation:</td>
                                                        <td>{motivation}</td>
                                                    </tr>
                                                </tbody>
                                            </table>
                                        </div>
                                        <div className={style.previewsection}>
                                            <table className={style.previewtable}>
                                                <thead>
                                                    <tr>
                                                        <th colSpan="2" style={{ textAlign: 'center', fontWeight: 'bold', fontSize: '13px' }}>Preview:</th>
                                                    </tr>
                                                </thead>
                                                <tbody>
                                                    <tr>
                                                        <td>Selected Member:</td>
                                                        <td>{selectedMember}</td>
                                                    </tr>
                                                    <tr>
                                                        <td>Selected NPOP:</td>
                                                        <td>{selectedNpop}</td>
                                                    </tr>
                                                    <tr>
                                                        <td>Selected Require Certification:</td>
                                                        <td>{selectedRequireCertification}</td>
                                                    </tr>
                                                    <tr>
                                                        <td>Selected Develop Local Language:</td>
                                                        <td>{selectedDevlopLocalLang}</td>
                                                    </tr>
                                                    <tr>
                                                        <td>Selected IQS Manual:</td>
                                                        <td>{selectedIqsManual}</td>
                                                    </tr>
                                                    <tr>
                                                        <td>Selected Train Farmers:</td>
                                                        <td>{selectedTrainFarmers}</td>
                                                    </tr>
                                                    <tr>
                                                        <td>Selected Source Irrigation:</td>
                                                        <td>{selectedSouceIrrigation}</td>
                                                    </tr>
                                                    <tr>
                                                        <td>Selected Internal Inspection:</td>
                                                        <td>{selectedInternalInspec}</td>
                                                    </tr>

                                                </tbody>
                                            </table>
                                        </div>

                                    </div>










                                </div>







                                <div className="btn-container">

                                    {/* <button className="btn btn-primary" type="button" onClick={nextStep} >next</button>
                                    <button type="submit" className="btn btn-primary" >Submit</button> */}
                                    <div style={{ position: 'relative', height: '70px', padding: '20px', display: 'flex', justifyContent: 'space-between' }}>
                                                <button
                                                    style={{ position: 'absolute', bottom: '10px', left: '10px' }}
                                                    className="btn btn-primary"
                                                    type="button"
                                                    onClick={backStep}
                                                >
                                                    Back
                                                </button>
                                                {/* <button
                                                    style={{ position: 'absolute', bottom: '10px', right: '10px' }}
                                                    className="btn btn-primary"
                                                    type="submit"
                                                    
                                                >
                                                   Submit
                                                </button> */}
                                                 <button type="submit" className="btn btn-primary"  style={{ position: 'absolute', bottom: '10px', right: '10px' }}>Submit</button>
                                            </div>
                                    {/* <button onClick={exportToExcel}>Export to Excel</button> */}
                                    {message && <p>{message}</p>}
                                </div>
                            </div>




                        )}

                    </form>
                </div>
            </div>
        </div>
    );
};

export default GrowergCertification;
