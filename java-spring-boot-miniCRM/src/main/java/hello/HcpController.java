package hello;


import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import java.util.ArrayList;

import hello.model.Customer;
import hello.model.Appointment;


@RestController
public class HcpController {

    private final CrmHandler crmhandle = CrmHandler.getCrmHandler();

    @RequestMapping("/hcp/customer/create")
    public Customer createCustomer(@RequestParam(value="name") String name) {
       return crmhandle.createCustomer(name);
    }

    //Nor a Requirment but nessessary for Dropdown in Frontend    
    @RequestMapping("/hcp/customer/all")
    public ArrayList<Customer> getAllCustomers() {
       return crmhandle.getAllCustomers();
    }

    @RequestMapping("/hcp/appointment/create")
    public Appointment createAppointment(@RequestParam(value="name") String customerName, @RequestParam(value="date") String date) 
        {
        return crmhandle.createAppointment(customerName, date);
    }
    
    @RequestMapping("/hcp/appointment/all")
    public ArrayList<Appointment> getAllAppointments() {
       return crmhandle.getAllAppointments();
    }


    @RequestMapping("/hcp/appointment/nextweek")
    public ArrayList<Appointment> getNextWeekAppointments() {
        return crmhandle.getNextWeekAppointments();
    }
    

}