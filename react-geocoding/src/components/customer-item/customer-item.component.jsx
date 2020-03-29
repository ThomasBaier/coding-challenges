import React from 'react';
import './customer-item.styles.scss';

const CustomerItem = ( {id, name, street, zip, postfach, city, federalstate}) => (

    <div className='card'>
        <div className='card-header'> 
            <span className='card-header-title'>#{id+1} {name}</span> 
        </div>

        <div className='card-content'>
            <div className='card-detail'>
                <div className='card-detail-key'>Straße: </div>
                <div className='card-detail-value'>{street}</div>
            </div>
            {
                postfach ?
                <div className='card-detail'>
                    <div className='card-detail-key'>Postfach: </div>
                    <div className='card-detail-value'>{postfach}</div>
                </div> 
                : ''
            }
           
            <div className='card-detail'>
                <div className='card-detail-key'>Stadt: </div>
                <div className='card-detail-value'>{zip} {city}</div>
            </div>
            {
                federalstate ? 
                <div className='card-detail'>
                    <div className='card-detail-key'>Bundesland: </div>
                    <div className='card-detail-value'>{federalstate}</div>
                </div> :''
            }
        </div>
    </div>
)

export default CustomerItem;