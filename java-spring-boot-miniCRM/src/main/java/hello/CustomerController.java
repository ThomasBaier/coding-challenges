package hello;


import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import hello.model.Appointment;


@RestController
public class CustomerController {

    private final CrmHandler crmhandle = CrmHandler.getCrmHandler();

    @RequestMapping("/customer/appointment/next")
    public Appointment getNextAppointment(@RequestParam(value="name") String name) {
       return crmhandle.getNextAppointment(name);
    }


    @RequestMapping("/customer/appointment/rate")
    public boolean rateLastAppointment(@RequestParam(value="name") String customerName, @RequestParam(value="rating") int rating) 
        {
        return crmhandle.rateLastAppointment(customerName, rating);
    }
   
    

}
