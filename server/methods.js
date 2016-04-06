Meteor.methods({
  parseUpload( data ) {
    //Make sure the data being passed from the client is an array
    check( data, Array );
    
    // view the 'data' being passed from the client in the console
    console.log(data);
    // Iterate over each line of the CSV
    for ( let i = 0; i < data.length; i++ ) {
      let material = data[ i ],
          // check to see if the contact already exist.
          // This is looking for a match based on name and email, but could use different fields.
          exists  = ProjectMaterials.findOne({'materialNum': material.materialNum});
            /*$and: [
              { 'firstName'     : contact.firstName },
              { 'lastName'      : contact.lastName },
              { 'emails.address': contact.email }
            ]
          });*/
      // If there's not an existing contact in the collection,
      // we're going to make a new one with the data from the CSV
      if ( !exists ) {
        ProjectMaterials.insert({
          materialNum: material.materialNum,
          projectID : material.projectID
          /*emails: [{
            address: contact.email // In my collection, contacts have an array of email addresses
          }],*/
        });
        console.warn( 'Materials imported.' );
      } else {
        console.warn( 'Rejected. This material already exists.' );
      }
    }
  }
});