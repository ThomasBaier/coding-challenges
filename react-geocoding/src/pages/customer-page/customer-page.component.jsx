import React from 'react';
import './customer-page.styles.scss';
import CustomerGrid from '../../components/customer-grid/customer-grid.component'
function CustomerPage() {
    return (
        <div className="customer-page">
            <h1>Customer Data Test Project</h1>
            <p>This is the Coding Challenge for Full-Stack Developer:</p>
            <CustomerGrid></CustomerGrid>
        </div>
    );
  }

  export default CustomerPage;