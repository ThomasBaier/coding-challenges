package hello.model;

import java.time.LocalDateTime;

public class Appointment {

    private final LocalDateTime date;
    private final String name;
    private int rating; 

    public Appointment(String customerName, LocalDateTime date) {
        this.date = date;
        this.name = customerName; 
    }

    public LocalDateTime getDate(){
        return this.date;
    }

    public String getName(){
        return this.name;
    }

    public int getRating() {
        return this.rating;
    }

    public void setRating(int rating) {
        this.rating = rating; 
    }

}


