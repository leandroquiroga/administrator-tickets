const path = require('path');
const fs   = require('fs');

class Ticket {
  constructor(number, desk){
    this.number = number;
    this.desk   = desk;
  }
}

class ControlTickets {
  constructor(){
    this.lastTicket       = 0;
    this.currentlyDay     = new Date().getDate(); 
    this.arrayTickets     = [];
    this.arrayLastTickets = [];
    
    this.init()
  };

  get dataToJson(){
    return {
      lastTicket:       this.lastTicket,
      currentlyDay:     this.currentlyDay,
      arrayTickets:     this.arrayTickets,
      arrayLastTickets: this.arrayLastTickets,
    };
  };

  // Read data
  init(){
    const { lastTicket , currentlyDay, arrayTickets, arrayLastTickets} = require('./../data/db.json');
    
    if(currentlyDay === this.currentlyDay){
      this.arrayTickets     = arrayTickets;
      this.arrayLastTickets = arrayLastTickets;
      this.lastTicket       = lastTicket;

       return
     };
    
     this.saveDB();
  };

  // Save database
  saveDB(){
    const databasePath = path.join(__dirname, '../data/db.json');
    fs.writeFileSync(databasePath, JSON.stringify(this.dataToJson))
  };

  // Next tikect
  nextTicket(){
    this.lastTicket += 1;
    const ticket = new Ticket(this.lastTicket, null);
    this.arrayTickets.push(ticket);

    this.saveDB();

    return `Ticket: ${this.lastTicket}`;
  };

  assistClients(desk){

    // There isn't ticket; 
    if(this.arrayTickets.length === 0){
      console.log(`There isn't ticket`);
      return;
    };

    // Ticket remove it from the list
    const ticket = this.arrayTickets.shift();
    ticket.desk = desk;
     
    // Added a new ticket to array oh the last tickets
    this.arrayLastTickets.unshift(ticket);

    // Deleted the last ticket
    if(this.arrayLastTickets.length > 4) {
      this.arrayLastTickets.slice(-1,1);
    };

    this.saveDB();


    return ticket;
  } 

};

module.exports = ControlTickets;