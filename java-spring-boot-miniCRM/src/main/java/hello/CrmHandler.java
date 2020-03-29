package hello;

import java.util.ArrayList;

import java.time.LocalDateTime;
import java.time.LocalTime;
import java.time.ZoneId;
import hello.model.Customer;
import hello.model.Appointment;


public class CrmHandler{

    static private CrmHandler crmHandler = null; 

    private ArrayList<Customer> customerList = new ArrayList<Customer>();
    private ArrayList<Appointment> appointmentList = new ArrayList<Appointment>();
    
    //Singleton
    private void CrmHandler(){
        //load persisted data
    }
    
    public static CrmHandler getCrmHandler(){
        if (crmHandler == null){
           crmHandler = new CrmHandler();     
        }
        return crmHandler;
    }

    public Customer createCustomer(String customerName){
        Customer newCustomer = new Customer(customerName);
        this.customerList.add(newCustomer);
        return newCustomer;
    }

    public Appointment createAppointment(String customerName, String date){
        
        LocalDateTime dateTime = LocalDateTime.parse(date); 
        Appointment newAppointment = new Appointment(customerName, dateTime);
        appointmentList.add(newAppointment);
        return newAppointment;
        
    }

    public ArrayList<Appointment> getAllAppointments(){
        return this.appointmentList;
    }

    public ArrayList<Customer> getAllCustomers(){
        return this.customerList;
    }

    public ArrayList<Appointment> getNextWeekAppointments(){
        ArrayList<Appointment> nextweekList = new ArrayList<Appointment>();
        LocalDateTime now = LocalDateTime.now();
    
        int timeTillnextWeek = 8 - now.getDayOfWeek().getValue();
        System.out.println("TimeTillNextWeek: " + timeTillnextWeek);
        LocalDateTime startNextWeek = LocalDateTime.now().plusDays(timeTillnextWeek).with(LocalTime.of(0,0));
        LocalDateTime endNextWeek = LocalDateTime.now().plusDays(7+timeTillnextWeek).with(LocalTime.of(0,0));
        System.out.println("TimeTillNextWeek: " + timeTillnextWeek + "\nstartnextWeek: " + startNextWeek + "\nendNextWeek: "+ endNextWeek);
        
        for (Appointment currInstance: appointmentList) {
            LocalDateTime td = currInstance.getDate();
            if (td.isBefore(endNextWeek) && td.isAfter(startNextWeek)){
                nextweekList.add(currInstance);
            }
        }
        return nextweekList;   
    }

    public Appointment getNextAppointment(String customerName){
        Appointment nextAppointment = null; 
        long nextAppointmentEpoch = -1; 
        long nowEpoch = LocalDateTime.now().atZone(ZoneId.systemDefault()).toEpochSecond();
        for (Appointment currAppointment: appointmentList) {
            if (currAppointment.getName().equals(customerName) == true)
            {
                long currAppointmentEpoch = currAppointment.getDate().atZone(ZoneId.systemDefault()).toEpochSecond();
                if (currAppointmentEpoch > nowEpoch){
                    if ((nextAppointmentEpoch == -1) || (nextAppointmentEpoch>currAppointmentEpoch)){
                        nextAppointment = currAppointment;
                        nextAppointmentEpoch = currAppointment.getDate().atZone(ZoneId.systemDefault()).toEpochSecond();

                    }    
                }
            }
            
        }
        return nextAppointment;
    }

    public boolean rateLastAppointment(String customerName, int rating){
        Appointment lastAppointment = null; 
        long lastAppointmentEpoch = -1; 
        int min =0; 
        long nowEpoch = LocalDateTime.now().atZone(ZoneId.systemDefault()).toEpochSecond();
        for (int i=0; i< appointmentList.size(); i++){
            Appointment currAppointment = appointmentList.get(i);
            if (currAppointment.getName().equals(customerName) == true)
            {
                long currAppointmentEpoch = currAppointment.getDate().atZone(ZoneId.systemDefault()).toEpochSecond();
                if (currAppointmentEpoch < nowEpoch){
                    if ((lastAppointmentEpoch == -1) || (lastAppointmentEpoch<currAppointmentEpoch)){
                        lastAppointment = currAppointment;
                        lastAppointmentEpoch = currAppointment.getDate().atZone(ZoneId.systemDefault()).toEpochSecond();
                        min = i;

                    }    
                }
            }
            
        }
        if (lastAppointment != null){
            appointmentList.get(min).setRating(rating);
            return true; // Success
        }
        return false; // fail
    }
}