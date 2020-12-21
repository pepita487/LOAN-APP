import React , { useState, useEffect } from 'react';
import '../node_modules/bootstrap/dist/css/bootstrap.min.css';
import './App.css';


function App() {
  const [taxId, setTaxId] = useState('')
  const [businessName, setBusinessName] = useState('')
  const [requestedAmount, setRequestedAmount] = useState('')
  const [loanResponse, setLoanResponse] = useState('')
  const [isError, setIsError] = useState({
                                            "taxId": "", 
                                            "businessName": "",   
                                            "requestedAmount": ""})
  const [stateButton, setStateButton] = useState('disabled')
  const [alert, setAlert] = useState('')

  const onSubmitClick = (e)=>{
    let alert = '';

    e.preventDefault();
    let opts = {
      'taxId': taxId,
      'businessName': businessName,
      'requestedAmount': requestedAmount,
      'loanResponse': loanResponse
    }
    console.log(opts)
    fetch('/loan', {
      method: 'post',
      body: JSON.stringify(opts)
    }).then(r => r.json())
    .then(data => {
      if (data.response){
        setLoanResponse(data.response)
        console.log(data.response)  
        alert = data.response == "Declined" ? (<div class="alert alert-danger col-sm-6" role="alert">
        Declined
        </div>) : data.response == "Approved" ? (<div class="alert alert-success col-sm-6" role="alert">
        Approved
        </div>) : (<div class="alert alert-info col-sm-6" role="alert">
        Undecided
        </div>);    
        setAlert(alert);    
      }
    })
  }

  const regExp = RegExp(
    /^([07][1-7]|1[0-6]|2[0-7]|[35][0-9]|[468][0-8]|9[0-589])-?\d{7}$/
  )

  const formValChange = (e) => {
    e.preventDefault();
    const { name, value } = e.target;
    let isErrorO = {
      "taxId": "", 
      "businessName": "",   
      "requestedAmount": ""};
    let flagError = false;
    

    switch (name) {
        case "taxId":
          if(regExp.test(value)){
            isErrorO[name]= "";
            flagError = false;
          }else{
            isErrorO[name]= "TaxId Invalid";
            flagError = true;
          }
          setTaxId(value);
          break;
        case "businessName":
          if(value.length < 4){
            isErrorO[name]= "Atleast 4 characaters required";
            flagError = true;
          }else{
            isErrorO[name]= "";
            flagError = false;
          }
          setBusinessName(value);
          break;
        case "requestedAmount":
          if(value < 0){
            isErrorO[name]= "Amount must be greater than zero";
            flagError = true;
          }else{
            isErrorO[name]= "";
            flagError = false;
          }
          setRequestedAmount(value);
            break;
        default:
            break;
    }
    if(flagError){
      setStateButton('disabled');
    }else{
      setStateButton('');
    }
    setIsError(isErrorO);

};

  return (

    <div className="col-sm-10 center">
      <h2>Loan Form</h2>
      <br></br>
      {alert}
      <form action="#" className="form-horizontal">
        <div >
        <label className="control-label col-sm-2">Tax Id:</label>
          <div className="col-sm-6"> 
              <input type="text" 
                name = "taxId"
                placeholder="taxId"                  
                className={isError.taxId.length > 0 ? "is-invalid form-control" : "form-control"}       
                onChange={formValChange}            
                value={taxId} 
              />
              {isError.taxId.length > 0 && (
                <span className="invalid-feedback">{isError.taxId}</span>
              )}
            </div>
          <label  className="control-label col-sm-2">Business Name:</label>
          <div className="col-sm-6"> 
            <input type="text" 
              name = "businessName"
              placeholder="businessName"                   
              className={isError.businessName.length > 0 ? "is-invalid form-control" : "form-control"}   
              onChange={formValChange}            
              value={businessName} 
            />
            {isError.businessName.length > 0 && (
                <span className="invalid-feedback">{isError.businessName}</span>
              )}
          </div>
          <label className="control-label col-sm-2">Amount:</label>
          <div className="col-sm-6"> 
            <input type="number" 
              name = "requestedAmount"    
              className={isError.requestedAmount.length > 0 ? "is-invalid form-control" : "form-control"}   
              placeholder="requestedAmount"             
              onChange={formValChange}            
              value={requestedAmount} 
            />
            {isError.requestedAmount.length > 0 && (
                <span className="invalid-feedback">{isError.requestedAmount}</span>
              )}
          </div>
        </div>
        <br></br>
        <button onClick={onSubmitClick} type="submit" className="btn btn-primary center" disabled={stateButton}>
          Submit
        </button>
      </form>
        
  </div>
  )
}

export default App;