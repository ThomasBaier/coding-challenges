#Projekt miniCRM

For hearing care professional (hcp) and there customers
The task is to build a simple web service (API) which allows audiologists (hearing care
professionals) to manage their customers appointments – a mini CRM.

## User Stories

- as an audiologist I want to create a new customer entry
- as an audiologist I want to create appointments with a customer
- as an audiologist I want to get a list of all appointments and their ratings
- as an audiologist I want to get a list of the next week’s appointments
- as a customer I want to get the next appointment
- as a customer I want to rate the last appointment

## Requirements
- The API must use JSON, HTTP and be written in Java, preferable based on Spring.
- The data should (Nice to Have) be persisted and survive a server restart.
- Authentication / Authorization is NOT required.
- User Interface is NOT a must.

The Code used the following project as a rollmodel:
https://spring.io/guides/gs/rest-service/

## Exectuion:
To execute the Code, build it with gradle by following comand:

- cd complete
- ./gradlew build && java -jar build/libs/gs-rest-service-0.1.0.jar

if successful a webservice is now reachable under localhost:8080
with following Endpoints: 

- http://localhost:8080/hcp/customer/create?name=karl
- http://localhost:8080/hcp/customer/all
- http://localhost:8080/hcp/appointment/create?-name=karl&date=2018-09-24T10:15:30
- http://localhost:8080/hcp/appointment/nextweek
- http://localhost:8080/hcp/appointment/all
- http://localhost:8080/customer/appointment/rate?name=karl&rating=5
- http://localhost:8080/customer/appointment/next?name=karl


## Further Steps:

- switch to a more sophisticated data storage like mysql or JAVA JPA
- Extend the Testing
- Link the Appointments "customername" to the "Customer" who are really created
- Create only Appointments for Customers which are created
- Add Error Handling: to catch wrong formated or typed input parameters and return a soundfull errormessage
- Group up belongig Classes, Controller and Data Classes in folders
- change the project name;)
- Add a Frontend prefered React or Angular5 
