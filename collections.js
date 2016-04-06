ProjectList = new Mongo.Collection('projects');
ProjectMaterials = new Mongo.Collection('materials');

var projectSchema = new SimpleSchema({

  name: {
    type: String,
    label: "Project Name",
    optional: true,
    max: 200
  },

  division:{
  	type: String,
  	label: "Division",
    optional: true,
  	max: 200,
  	allowedValues: ["Brita", "Burt's Bees", "Charcoal", "Foods", "Glad", "Home Care", "Laundry", "Litter"]
  },

  description: {
    type: String,
    label: "Description",
    max: 1000,
    optional: true
  },

  scopeDate: {
    type: Date,
    label: "Scope Date",
    optional: true,
  },

   status: {
   	type: Number,
   	label: "Status",
   	optional: true,
   	max: 3,
   	autoValue: function(){
   		if (this.isInsert) {
   			return 1;
   		}
    }
  },

  scopeBizIntent:{
      type: [Object],
      optional: true,
    },
        "scopeBizIntent.$.text":{
          type: String ,
          optional: true     
        },

        "scopeBizIntent.$.updatedAt": {
            type: Date,
            autoValue: function() {
              if (this.isUpdate) {
                return new Date();
              }
            },
            denyInsert: true,
            optional: true
        },

        "scopeBizIntent.$.followUp":{
          type: Boolean
        },

  scopePreReq:{
      type: [Object],
      optional: true,
    },
        "scopePreReq.$.text":{
          type: String ,
          optional: true     
        },

        "scopePreReq.$.updatedAt": {
            type: Date,
            autoValue: function() {
              if (this.isUpdate) {
                return new Date();
              }
            },
            denyInsert: true,
            optional: true
        },

        "scopePreReq.$.followUp":{
          type: Boolean
        },

  projectTeamMembers: {
      type: [String],
      optional: true,
      allowedValues: ["John","Joe","Mary","Ben","Bob"]
    },
});

ProjectList.attachSchema(projectSchema);