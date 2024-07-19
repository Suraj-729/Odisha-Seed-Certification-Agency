import React, { useState, useRef, useEffect } from 'react';
import style from '../../css/inputVerify.module.css' // Correct path to inputVerify.module.css
import 'bootstrap/dist/css/bootstrap.min.css';



const InputVerify = () => {


  const [organization, setOrganization] = useState('');
  const [personName, setPersonName] = useState('');
  const [address, setAddress] = useState('');
  const [phone, setPhone] = useState('');
  const [email, setEmail] = useState('');
  // const [fax, setFax] = useState('');
  const [companyProfile, setCompanyProfile] = useState(null);
  const [numProducts, setNumProducts] = useState('');
  const [showCheckboxes, setShowCheckboxes] = useState(false);
  const [selectedUnits, setSelectedUnits] = useState([]);

  const [technicalName, setTechnicalName] = useState('');
  const [ratio, setRatio] = useState('');
  const [technicalItems, setTechnicalItems] = useState([]);

  const [slno, setSlno] = useState('');
  const [inputs, setInputs] = useState('');
  const [plantSource, setPlantSource] = useState('');
  const [animalSource, setAnimalSource] = useState('');
  const [microbial, setMicrobial] = useState('');
  const [mineral, setMineral] = useState('');
  const [records, setRecords] = useState([]);

  const [locationName, setLocationName] = useState('');
  const [location, setLocation] = useState('');
  const [storageType, setStorageType] = useState('');
  const [materialsStored, setMaterialsStored] = useState('');
  const [responsiblePerson, setResponsiblePerson] = useState('');
  const [addressData, setaddressData] = useState([]);

  const [firstDropdown, setFirstDropdown] = useState('');
  const [secondDropdown, setSecondDropdown] = useState(null);
  const [showSecondDropdown, setShowSecondDropdown] = useState(false);
  const [descriptionProcessingActivity, setDescriptionProcessingActivity] = useState(null);

  const [productName, setProductName] = useState('');
  const [products, setProducts] = useState([]);



  const options = [
    { id: '1', label: 'Manufacturing' },
    { id: '2', label: 'Repacking And Labeling' },
    { id: '3', label: 'Marketing' },
  ];

  const [declarationChecked1, setDeclarationChecked1] = useState(false);
  const [date, setDate] = useState('');
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) {
      alert("NO canvas");
      return;
    }
    const context = canvas.getContext('2d');
    context.strokeStyle = 'red';
    context.lineWidth = 2;

    let isDrawing = false;
    let lastX = 0;
    let lastY = 0;

    const draw = (event) => {
      if (!isDrawing) return;
      context.beginPath();
      context.moveTo(lastX, lastY);
      context.lineTo(event.offsetX, event.offsetY);
      context.stroke();
      [lastX, lastY] = [event.offsetX, event.offsetY];
    };

    const handleMouseDown = (event) => {
      isDrawing = true;
      [lastX, lastY] = [event.offsetX, event.offsetY];
    };

    const handleMouseMove = (event) => {
      if (!isDrawing) return;
      draw(event);
    };

    const handleMouseUpOrOut = () => {
      isDrawing = false;
    };

    canvas.addEventListener('mousedown', handleMouseDown);
    canvas.addEventListener('mousemove', handleMouseMove);
    canvas.addEventListener('mouseup', handleMouseUpOrOut);
    canvas.addEventListener('mouseout', handleMouseUpOrOut);

    return () => {
      canvas.removeEventListener('mousedown', handleMouseDown);
      canvas.removeEventListener('mousemove', handleMouseMove);
      canvas.removeEventListener('mouseup', handleMouseUpOrOut);
      canvas.removeEventListener('mouseout', handleMouseUpOrOut);
    };
  }, []);
  const [message, setMessage] = useState('');
  const handleDescriptionProcessingActivityChange = (e) => setDescriptionProcessingActivity(e.target.files[0]);
  const handleOrganizationChange = (e) => setOrganization(e.target.value);
  const handlePersonNameChange = (e) => setPersonName(e.target.value);
  const handleAddressChange = (e) => setAddress(e.target.value);
  const handlePhoneChange = (e) => setPhone(e.target.value);
  const handleEmailChange = (e) => setEmail(e.target.value);
  // const handleFaxChange = (e) => setFax(e.target.value);
  const handleCompanyProfileChange = (e) => setCompanyProfile(e.target.files[0]);
  const handleNumProductsChange = (e) => setNumProducts(e.target.value);

  const toggleCheckboxArea = () => {
    setShowCheckboxes(!showCheckboxes);
  };

  const handleCheckboxChange = (optionId) => {
    if (selectedUnits.includes(optionId)) {
      setSelectedUnits(selectedUnits.filter(id => id !== optionId));
    } else {
      setSelectedUnits([...selectedUnits, optionId]);
    }
  };

  const closeCheckboxes = () => {
    setShowCheckboxes(false);
  };

  const addProduct = () => {
    setProducts([...products, { id: products.length + 1, name: productName }]);
    setProductName('');
  };


  const addTechnicalNameAndRatio = () => {
    setTechnicalItems([...technicalItems, { name: technicalName, ratio }]);
    setTechnicalName('');
    setRatio('');
  };


  const addRecord = () => {
    const newRecord = { slno, inputs, plantSource, animalSource, microbial, mineral };
    setRecords([...records, newRecord]);
    // Clear the inputs after adding the record
    setSlno('');
    setInputs('');
    setPlantSource('');
    setAnimalSource('');
    setMicrobial('');
    setMineral('');
  };

  const addAdressData = () => {
    const newRecord = { locationName, location, storageType, materialsStored, responsiblePerson };
    setaddressData([...addressData, newRecord]);
    setLocationName('');
    setLocation('');
    setStorageType('');
    setMaterialsStored('');
    setResponsiblePerson('');
  };

  const handleFirstDropdownChange = (event) => {
    const value = event.target.value;
    setFirstDropdown(value);
    if (value === 'yes') {
      setShowSecondDropdown(true);
    } else {
      setShowSecondDropdown(false);
      setSecondDropdown(null);
    }
  };

  const handleSecondDropdownChange = (event) => {
    setSecondDropdown(event.target.value);
  };

  
  const handleSubmit = async (e) => {
    e.preventDefault();
    


    e.preventDefault();

    const canvas = canvasRef.current;
    const signatureDataUrl = canvas.toDataURL(); // Get the signature as a data URL
    console.log(signatureDataUrl);

    const formData = new FormData();
    formData.append('organization_name', organization);
    formData.append('person_name', personName);
    formData.append('address', address);
    formData.append('phone', phone);
    formData.append('email', email);
    // formData.append('fax', fax);
    formData.append('companyProfile', companyProfile);
    formData.append('numProducts', numProducts);
    // formData.append('selectedUnits', selectedUnits)
    //console.log('Selected Units:', JSON.stringify(selectedUnits));
    formData.append('selectedUnits', JSON.stringify({ "data": selectedUnits }));
    // Convert array to string for FormData
    formData.append('products', JSON.stringify(products));
    formData.append('technicalItems', JSON.stringify(technicalItems));

    formData.append('handleFirstDropdownChange', handleFirstDropdownChange);
    formData.append('handleSecondDropdownChange', handleSecondDropdownChange);
    formData.append('descriptionProcessingActivity', descriptionProcessingActivity);

    formData.append('records', JSON.stringify(records));
    formData.append('addressData', JSON.stringify(addressData));
    formData.append('declarationChecked1', declarationChecked1);
    formData.append('date', date);
    formData.append('signature', signatureDataUrl);
    

    console.log('products', products);





    try {
      const response = await fetch('http://localhost:5000/api/organizations', {
        method: 'POST',
        body: formData,
      });

      if (response.ok) {
        const result = await response.json();
        setMessage('Organization added successfully!');
        console.log(result);
      } else {
        const error = await response.json();
        setMessage(`Error: ${error}`);
      }
    } catch (error) {
      setMessage(`Error: ${error.message}`);
    }

    try {
      const response = await fetch('http://localhost:5000/api/records', {
        method: 'POST',
        body: formData,
      });

      if (response.ok) {
        const result = await response.json();
        setMessage('Record added successfully!');
        console.log(result);
      } else {
        const error = await response.json();
        setMessage(`Error: ${error}`);
      }
    } catch (error) {
      setMessage(`Error: ${error.message}`);
    }
  };



  return (
     <div className={style.container}>

      <div className="container-fluid  ">
        <div className="panel panel-primary ">
          <div className="panel-body ">
            <form onSubmit={handleSubmit}>
              <div className="form-group">
                <div className="row">
                  <div className="col-md-3">
                    <label htmlFor="organization_name">Organization:</label>
                    <input
                      type="text"
                      className="form-control"
                      placeholder="Company Name"
                      id="organization_name"
                      name="organization_name"
                      value={organization}
                      onChange={handleOrganizationChange}
                      required
                    />
                  </div>
                  <div className="col-md-3">
                    <label htmlFor="person_name">Name of Person:</label>
                    <input
                      type="text"
                      className="form-control"
                      placeholder="Name of Person"
                      id="person_name"
                      name="person_name"
                      value={personName}
                      onChange={handlePersonNameChange}
                      required
                    />
                  </div>
                  <div className="col-md-3">
                    <label htmlFor="address">
                      <b>Address Organization:
                        <span style={{ color: 'red' }}>*</span>
                      </b>
                      <br />
                    </label>
                    <input
                      type="text"
                      className="form-control"
                      id="address"
                      placeholder="Enter Address"
                      name="address"
                      value={address}
                      onChange={handleAddressChange}
                      required
                    />
                  </div>
                  <div className="col-md-3">
                    <label htmlFor="phone">
                      <b>Phone Number:
                        <span style={{ color: 'red' }}>*</span>
                      </b>
                    </label>
                    <input
                      type="text"
                      className="form-control"
                      id="phone"
                      placeholder="Phone No"
                      name="phone"
                      value={phone}
                      onChange={handlePhoneChange}
                      minLength="10"
                      maxLength="10"
                      pattern="^[6-9][0-9]{9}$"
                      required
                    />
                    <span style={{ color: 'red' }}>
                      {phone && !/^[6-9][0-9]{9}$/.test(phone) && "Enter a valid phone number!"}
                    </span>
                  </div>
                </div>
                <div className='row from-row'>
                  <div className="col-md-3">
                    <label htmlFor="phone">
                      <b>Phone Number:
                        <span style={{ color: 'red' }}>*</span>
                      </b>
                    </label>
                    <input
                      type="text"
                      className="form-control"
                      id="phone"
                      placeholder="Phone No"
                      name="phone"
                      value={phone}
                      onChange={handlePhoneChange}
                      minLength="10"
                      maxLength="10"
                      pattern="^[6-9][0-9]{9}$"
                      required
                    />
                    <span style={{ color: 'red' }}>
                      {phone && !/^[6-9][0-9]{9}$/.test(phone) && "Enter a valid phone number!"}
                    </span>
                  </div>
                  <div className="col-md-3">
                    <label htmlFor="email">
                      <b>Email Id (Optional):</b>
                    </label>
                    <input
                      type="email"
                      className="form-control"
                      id="email"
                      placeholder="Email Id"
                      name="email"
                      value={email}
                      onChange={handleEmailChange}
                    />
                    <span style={{ color: 'red' }}>
                      {email && !/^[a-z]+[a-zA-Z0-9_.-]+@[a-z]+\.[a-z.]{2,5}$/.test(email) && "Enter a valid Email ID."}
                    </span>
                  </div>
                  {/* <div className="col-md-3">
                    <label htmlFor="fax">
                      <b>Fax Number <span style={{ color: 'red' }}>*</span>:</b>
                    </label>
                    <input
                      type="text"
                      className="form-control"
                      id="fax"
                      placeholder="Fax Number"
                      name="fax"
                      value={fax}
                      onChange={handleFaxChange}
                      minLength="10"
                      maxLength="10"
                      pattern="^[6-9][0-9]{9}$"
                      required
                    />
                    <span style={{ color: 'red' }}>
                      {fax && !/^[6-9][0-9]{9}$/.test(fax) && "Enter a valid fax number!"}
                    </span>
                  </div> */}
                  <div className="col-md-3">
                    <label htmlFor="companyProfile">
                      Company Profile: <span style={{ color: 'red' }}>*</span>
                    </label>
                    <input
                      type="file"
                      className="form-control"
                      id="companyProfile"
                      name="companyProfile"
                      onChange={handleCompanyProfileChange}
                      required
                    />
                  </div>
                  <div className="col-md-3">
                    <label htmlFor="numProducts">Number of products to approve:</label>
                    <input
                      type="number"
                      className="form-control"
                      id="numProducts"
                      name="numProducts"
                      value={numProducts}
                      onChange={handleNumProductsChange}
                    />
                  </div>
                </div>
                <div className="row">
                  <div className="col-md-3">
                    <div onSubmit={handleSubmit}>
                      <label htmlFor="type_activities">
                        <b>Type Of Activities</b>
                      </label>
                      <div
                        id="myMultiselect"
                        className="multiselect"
                        onMouseLeave={closeCheckboxes}
                      >
                        <div
                          id="mySelectLabel"
                          className="selectBox"
                          onClick={toggleCheckboxArea}
                        >
                          <div className="form-select">
                            {selectedUnits.length === 0
                              ? '--Select--'
                              : selectedUnits.map((id) => options.find(opt => opt.id === id)?.label).join(', ')}
                          </div>
                          <div className="overSelect"></div>
                        </div>
                        {showCheckboxes && (
                          <div id="checkboxes">
                            {options.map((option) => (
                              <label key={option.id}>
                                <input
                                  type="checkbox"
                                  value={option.id}
                                  checked={selectedUnits.includes(option.id)}
                                  onChange={() => handleCheckboxChange(option.id)}
                                />
                                {option.label}
                              </label>
                            ))}
                          </div>
                        )}
                      </div>

                    </div>
                  </div>

                  <div className='col-md-3'>


                    <label htmlFor=''>Product List</label>
                    <div>
                      <input
                        type="text"
                        value={productName}
                        onChange={(e) => setProductName(e.target.value)}
                        placeholder="Enter product name"
                      />
                      <table>
                        <thead>
                          <tr>
                            <th>Sl no.</th>
                            <th>Product Name</th>
                          </tr>
                        </thead>
                        <tbody>
                          {products.map((product, index) => (
                            <tr key={product.id}>
                              <td>{index + 1}</td>
                              <td>{product.name}</td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                      <button onClick={addProduct}>Add</button>
                    </div>



                  </div>


                </div>

                <div className='row'>
                  <div className="col-md-3">
                    <label htmlFor="technicalName">
                      Product Technical Name:
                      <span style={{ color: 'red' }}>*</span>
                    </label>
                    <input
                      type="text"
                      className="form-control"
                      placeholder="Technical Name"
                      id="technicalName"
                      value={technicalName}
                      onChange={(e) => setTechnicalName(e.target.value)}
                      required
                    />
                  </div>

                  <div className="col-md-2">
                    <label htmlFor="ratio">
                      Ratio:
                      <span style={{ color: 'red' }}>*</span>
                    </label>
                    <input
                      type="text"
                      className="form-control"
                      placeholder="Ratio"
                      id="ratio"
                      value={ratio}
                      onChange={(e) => setRatio(e.target.value)}
                      required
                    />
                  </div>

                  <div className="col-md-1" id="add_button">
                    <button
                      className="btn btn-primary"
                      id="add-btn"
                      style={{
                        marginTop: '25px',
                        marginLeft: '30px',
                        borderRadius: '50px',
                        fontWeight: 'bolder',
                        paddingTop: '3px',
                        height: '34px',
                        width: '34px',
                      }}
                      onClick={addTechnicalNameAndRatio}
                    >
                      +
                    </button>
                  </div>

                  <div className="col-md-3">
                    <label>Technical Names and Ratios:</label>
                    <div className="table-container">
                      <table className="table table-striped">
                        <thead>
                          <tr>
                            <th>No.</th>
                            <th>Technical Name</th>
                            <th>Ratio</th>
                          </tr>
                        </thead>
                        <tbody>
                          {technicalItems.map((item, index) => (
                            <tr key={index}>
                              <td>{index + 1}</td>
                              <td>{item.name}</td>
                              <td>{item.ratio}</td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  </div>
                </div>

                <div className="row">
                  <div className="col-md-2">
                    <label htmlFor="slno">Slno.:</label>
                    <input
                      type="text"
                      className="form-control"
                      id="slno"
                      value={slno}
                      onChange={(e) => setSlno(e.target.value)}
                      required
                    />
                  </div>
                  <div className="col-md-2">
                    <label htmlFor="inputs">Inputs:</label>
                    <input
                      type="text"
                      className="form-control"
                      id="inputs"
                      value={inputs}
                      onChange={(e) => setInputs(e.target.value)}
                      required
                    />
                  </div>
                  <div className="col-md-2">
                    <label htmlFor="plantSource">Plant Source:</label>
                    <input
                      type="text"
                      className="form-control"
                      id="plantSource"
                      value={plantSource}
                      onChange={(e) => setPlantSource(e.target.value)}
                      required
                    />
                  </div>
                  <div className="col-md-2">
                    <label htmlFor="animalSource">Animal Source:</label>
                    <input
                      type="text"
                      className="form-control"
                      id="animalSource"
                      value={animalSource}
                      onChange={(e) => setAnimalSource(e.target.value)}
                      required
                    />
                  </div>
                  <div className="col-md-2">
                    <label htmlFor="microbial">Microbial:</label>
                    <input
                      type="text"
                      className="form-control"
                      id="microbial"
                      value={microbial}
                      onChange={(e) => setMicrobial(e.target.value)}
                      required
                    />
                  </div>
                  <div className="col-md-2">
                    <label htmlFor="mineral">Mineral:</label>
                    <input
                      type="text"
                      className="form-control"
                      id="mineral"
                      value={mineral}
                      onChange={(e) => setMineral(e.target.value)}
                      required
                    />
                  </div>
                  <div className="col-md-2">
                    <button className="btn btn-primary" id="add-btn" onClick={addRecord}>
                      Add
                    </button>
                  </div>
                </div>


                <div className="row">
                  <div className="col-md-12">
                    <label>Added Records:</label>
                    <div className="table-container">
                      <table className="table table-striped">
                        <thead>
                          <tr>
                            <th>Slno.</th>
                            <th>Inputs</th>
                            <th>Plant Source</th>
                            <th>Animal Source</th>
                            <th>Microbial</th>
                            <th>Mineral</th>
                          </tr>
                        </thead>
                        <tbody>
                          {records.map((record, index) => (
                            <tr key={index}>
                              <td>{record.slno}</td>
                              <td>{record.inputs}</td>
                              <td>{record.plantSource}</td>
                              <td>{record.animalSource}</td>
                              <td>{record.microbial}</td>
                              <td>{record.mineral}</td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  </div>
                </div>

                <div className="row">
                  <div className="col-md-2">
                    <label htmlFor="locationName">Location Name:</label>
                    <input
                      type="text"
                      className="form-control"
                      id="locationName"
                      value={locationName}
                      onChange={(e) => setLocationName(e.target.value)}
                      required
                    />
                  </div>
                  <div className="col-md-2">
                    <label htmlFor="location">Address:</label>
                    <input
                      type="text"
                      className="form-control"
                      id="location"
                      value={location}
                      onChange={(e) => setLocation(e.target.value)}
                      required
                    />
                  </div>
                  <div className="col-md-2">
                    <label htmlFor="storageType">Type Of Storage:</label>
                    <input
                      type="text"
                      className="form-control"
                      id="storageType"
                      value={storageType}
                      onChange={(e) => setStorageType(e.target.value)}
                      required
                    />
                  </div>
                  <div className="col-md-2">
                    <label htmlFor="materialsStored">Materials Stored:</label>
                    <input
                      type="text"
                      className="form-control"
                      id="materialsStored"
                      value={materialsStored}
                      onChange={(e) => setMaterialsStored(e.target.value)}
                      required
                    />
                  </div>
                  <div className="col-md-2">
                    <label htmlFor="responsiblePerson">Responsible Person:</label>
                    <input
                      type="text"
                      className="form-control"
                      id="responsiblePerson"
                      value={responsiblePerson}
                      onChange={(e) => setResponsiblePerson(e.target.value)}
                      required
                    />
                  </div>
                  <div className="col-md-2">
                    <button className="btn btn-primary" id="add-btn" onClick={addAdressData}>
                      Add
                    </button>
                  </div>
                </div>

                <div className="row">
                  <div className="col-md-12">
                    <label>Added Records:</label>
                    <div className="table-container">
                      <table className="table table-striped">
                        <thead>
                          <tr>
                            <th>Location Name</th>
                            <th>Address</th>
                            <th>Type Of Storage</th>
                            <th>Materials Stored</th>
                            <th>Responsible Person</th>
                          </tr>
                        </thead>
                        <tbody>
                          {addressData.map((record, index) => (
                            <tr key={index}>
                              <td>{record.locationName}</td>
                              <td>{record.address}</td>
                              <td>{record.storageType}</td>
                              <td>{record.materialsStored}</td>
                              <td>{record.responsiblePerson}</td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  </div>
                </div>

                <div className="row">
                  <div className="col-md-3">
                    <div className="form-group">
                      <label htmlFor="nonOrganicInputs">Any Non-Organic Inputs being produced?</label>
                      <select
                        className="form-control"
                        id="nonOrganicInputs"
                        value={firstDropdown}
                        onChange={handleFirstDropdownChange}
                      >
                        <option value="" disabled>
                          Select an option
                        </option>
                        <option value="yes">Yes</option>
                        <option value="no">No</option>
                      </select>
                    </div>
                  </div>

                  {showSecondDropdown && (
                    <div className="col-md-3">
                      <label htmlFor="additionalInput">Do you need additional inputs?</label>
                      <select
                        className="form-control"
                        id="additionalInput"
                        value={secondDropdown || ''}
                        onChange={handleSecondDropdownChange}
                      >
                        <option value="" disabled>
                          Select an option
                        </option>
                        <option value="yes">Yes</option>
                        <option value="no">No</option>
                      </select>
                    </div>
                  )}

                  {secondDropdown === 'yes' && (
                    <div className="alert alert-success mt-3">
                      <strong>Note:</strong> Additional inputs are required.
                    </div>
                  )}

                  <div className="col-md-3">
                    <label htmlFor="descriptionProcessingActivity">
                      Description Processing Activity:
                      <span style={{ color: 'red' }}>*</span>
                    </label>
                    <input
                      type="file"
                      className="form-control"
                      placeholder="Enter description of processing activity"
                      id="descriptionProcessingActivity"
                      onChange={handleDescriptionProcessingActivityChange}
                      required
                    />
                  </div>
                </div>
                <div className="row">
                  <div className="form-check">
                    <input
                      className="form-check-input"
                      type="checkbox"
                      id="declarationCheckbox1"
                      checked={declarationChecked1}
                      onChange={(e) => setDeclarationChecked1(e.target.checked)}
                    />
                    <label className="form-check-label" htmlFor="declarationCheckbox1">
                      I confirm that all information given in this form is true. Changes or deviations from the given information will be immediately communicated to OSOCA
                    </label>
                  </div>
                </div>

                <div className="row">
                  <div className="col-md-2">
                    <div className="form-group">
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


                </div>

                <div className="row">
                  <div className="form-group">
                    <label htmlFor="signature">Signature</label>
                    <canvas
                      id="signature"
                      className="signature-pad"
                      width="400"
                      height="200"
                    
                      ref={canvasRef}
                    ></canvas>
                  </div>
                 
                </div>

              </div>
              <button type="submit" className="btn btn-primary" onClick={handleSubmit}>Submit</button>

              {message && <p>{message}</p>}
            </form>
          </div>
        </div>
      </div>


    </div>
  );
};

export default InputVerify;
