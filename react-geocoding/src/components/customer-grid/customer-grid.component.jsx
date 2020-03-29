import React, { Component } from 'react';
import './customer-grid.styles.scss';
import file from '../../data/testdaten.txt';
import CustomerItem from '../customer-item/customer-item.component';

class CustomerGrid extends Component {
    constructor(){
        super()
        this.state = {
            customerData: [ ],
            googleApiKey: 'AIzaSyA0_RX0dGc9h-VuKjQlsTCeT-yZ1HR3u50'
        }


    }
    async readTextFile(file){
        let response = await fetch(file);
        let txt = await response.text();
        return txt;
    }
    parseCustomerData(data){
        let arr=[]
        data = data.split('\n');
        let address = []
        for(var i=0; i<data.length; i++){
            if (data[i]=== '') {
                let c =''
                if (address.length===3){
                    c={
                        'name': address[0],
                        'street': address[1],
                        'zip': address[2].substring(0,5), 
                        'city':address[2].substring(6),
                        'federalstate': ''}

                } else {
                    c={
                        'name': address[0],
                        'postfach': address[1],
                        'street': address[2],
                        'zip': address[3].substring(0,5),
                        'city':address[3].substring(6),
                        'federalstate': ''}
                }
                arr.push(c)
                address=[]
            } else {
                address.push(data[i])
            }
        }
        // sort array by zip codes
        arr.sort(function(x, y) {
            if (x.zip < y.zip) {
              return -1;
            }
            if (x.zip > y.zip) {
              return 1;
            }
            return 0;
          })
        return arr
    }

    async geocodeFederal(customers){
        let duplicateCheck=[]
        let d = ''
        let check =''
        for (var i=0; i<customers.length; i++) {
            // Checking for duplicates, because of Task hint: 'Please consider that API requests are expensive and limited.'
            d = JSON.stringify(customers[i]);
            check = duplicateCheck.indexOf(d)
            if (check !== -1){
               console.log('duplicate detected', customers[i])
               duplicateCheck.push(d)
               
               customers[i].federalstate = customers[check].federalstate
            } else {
               duplicateCheck.push(d)

                // TODO: Check if batch processing for address data goolge api becomes available to increase performance 
               customers[i].federalstate = await this.callGeocodeApi(customers[i])
            }
        }
        return customers;
    }
    
    parseFederalStateFromResponse(data){
        let test =  data.results[0].address_components;
        for (var i=0; i<test.length; i++){
            if (test[i].types[0] === 'administrative_area_level_1'){
                return test[i].long_name;
            }
        }
        return ''
    }
    async callGeocodeApi(customer){
        // Replace umlauts for google api
        let city = (customer.city ? customer.city.replace(/\u00e4/g, "ae").replace(/\u00fc/g, "ue").replace(/\u00f6/g, "oe") : '')
        let street = customer.street
        let zipcode = customer.zip
        let response = await fetch('https://maps.googleapis.com/maps/api/geocode/json?address='+ city +' '+zipcode+' '+ street+' Deutschland&key='+this.state.googleApiKey+'&language=de')
        let geoData = await response.json();
        let f = ''
        if (geoData && geoData.results.length>0){
             f = this.parseFederalStateFromResponse(geoData); 
        } 
        return f;
    }

    componentDidMount() {
        // TODO: JSON import / export; if 'file' did not change (performance improvement)
        this.readTextFile(file).then(txt => {
            let cData = this.parseCustomerData(txt)
            this.geocodeFederal(cData).then(cData => {
                this.setState({customerData: cData})     
            })
        })
 
    }

    createList = (customerData) => {
        let items = []
        for (var i=0; i<customerData.length; i++){
            items.push(<CustomerItem key={i} id={i} { ...customerData[i]} />)
        }
        return items
    }

    render() {
        return (
            <div className="customer-grid">
                { this.createList(this.state.customerData)                
                }
            </div>
        )
    }
}export default CustomerGrid;
