# Solar Panel Planner - PROJECT BACKLOG

## Functional Requirements

1. Residents' interface
   > Without having a registered account

- A resident can be able to create an appointment by filling a UI form with the following fields: [Name, Email, preffered timeslot, Address(must be validated and should support auto complete)]
- Timeslot be allowed in terms of an hour or more; not less than that.
- A resident can cancel their appointment by providing an email used to create the appointment.
- A resident can check the status of an appointment by providing an email related to the appointment.

2. Admins and planners interface
   > All users that fall under this category must login with an OAuth account.

- planners should be able to view a list of all resident requests with pagination controls. Each paginated view should display relevant request details, including the request's status, timeslot, and contact information.
- Implement a search functionality to allow for quick retrieval of specific resident requests based on teams criteria.
- Admins should have access to resident requests in different views (map and list), each displaying the sequential order of visits. sequential order based on nearing timeslot.
- Provide an option to export the planned visits (regardless of the type of view selected) in a downloadable format (PDF, Excel, etc.) and which will always include details such as visit time slot, resident’s contact information, and address.
- Implement a "Mark as visited" functionality, to signify that a resident has been visited.

3. Appointment Scheduling Algorithm
   > Chingu requires us to use either external api or our own logic to create an optimised route management algorithm
   > The Algorithm planning should be implemented in the backend only.
   > When a new appointment request is added to DB, the route optimisation algorithm needs to execute.

- When admin views the requests, first it should prepare the admin to visit requests that are in the current active hour.
- Then, for those requests ready for visit in that hour, and the admins active location, the external api will determine the route to follow, proritizng the nearest addresses from the admins point.

> Am not that good at comming up with this algorithm, but we can discuss see how to develop it.

4. Exporting appointments from app into files

- The admins should be able to generate the pdf format of the appointment lists, and map view.
- If they choose lists, they should have an option to export only the paginated view, or the entire list.
- If they choose to export the map view, they should get the map exported in landscape view, and the appointments labled with numbers; then under the map, will be cards showing the appointment details in order of the numbers. Appointment details include name, email, address and timeslot.

## Non-Functional Requirements

1. All actions from residents' UI to backend that involve a new or pending appointment should be informed to the resident via email.
2. Before any form submition from residents UI, a recaptcha should be implemented to avoid bots from DDos the app.
3. The backend logic responsible for handling new appointments, should check the appointment management DB, if there has been a record with that email. If yes, just update the record with sent form data and confirm to the resident via email; if no record in DB has the email, then the backend should first send a request to the resident for them to confirm the email (make sure its not dummy), inform them in the UI; only when they have verified the email, should the appointment be added to the DB as a record, so that the route management logic can schedule them a visit.
4. Request management needs to be realtime, so that the admins view can be updated as time progresses.
5. admins page should switch on location service so as to aid in determining the optimum route.

# Entity Relation Tables

> No tables drawn, only text.
> We most probably will need the following tables in our database:

1.  Admin users table - will store relational data about the each admin; can have columns like: id, name, email, role, outh_provider,
2.  Appointments table - will store relational data about appointment requests from the residents. It might have the following columns: id, name, email, address, preferred_timeslot, status, no_of_status_checks, creations_times, cancellation_times, recent_creation_time.
3.  Exports tables - will keep track of the appointments exported count and other relevant info; can have columens like: email_of_admin(primary key), date, appointment_ids_exported, count (number of count for the exported appointments)
