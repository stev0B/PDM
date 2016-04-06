  Template.projectDetail.created=function(){
  this.editMode=new ReactiveVar(false);
  };

  Template.projectList.helpers({
    
    'project': function(){
      return ProjectList.find();
    }

  })

  Template.projectDetail.helpers({
    'material': function(){
      var currentProject = this._id;
      return ProjectMaterials.find({projectID: currentProject}, {sort: {materialNum: 1}})
    },

    'lines': function(){
      return this.textAreaField.split("\n");
    },

/*    'selectedClass': function(){
      var matId = this._id;
      var selectedMat = Session.get('selectedMat');
      if (matId == selectedMat){
        return "selected"
      }
    },*/

    editMode:function(){
    return Template.instance().editMode.get();
    },

    'formatDate': function(date) {
    return moment(date).format('MM/DD/YYYY');
    },

    'this.followUp': function(followUp){
      return followUp === "true"
    }
  })

  Template.projectDetail.events({

  'click [data-action="task/matRemove"]': function(event){
    event.preventDefault();
    var materialId = this._id;
    ProjectMaterials.remove({ _id: materialId });
    Bert.alert( 'Material Removed', 'danger', 'growl-top-right', 'fa-trash' );
  },

/*  'click .matRow': function(){
      var matId = this._id;
      Session.set('selectedMat', matId);
  },

  'click [data-action="task/removeMat"]': function(){
    var selectedMat = Session.get('selectedMat');
    ProjectMaterials.remove(selectedMat);
    Bert.alert( 'Material Removed', 'danger', 'growl-top-right', 'fa-trash' );
  },

  /*'click #yourbutton':function(event,template) {
        var state = MyCollection.findOne({}).state
        MyCollection.update({}, {$set:{state:!state}});
  },*/

  'click [data-action="task/Display"]': function(event,template) {
    var editMode=template.editMode.get();
    template.editMode.set(!editMode);
    Bert.alert( 'Display Mode', 'info', 'growl-top-right');
  },

    'click [data-action="task/Edit"]': function(event,template) {
    var editMode=template.editMode.get();
    template.editMode.set(!editMode);
    Bert.alert( 'Edit Mode', 'info', 'growl-top-right');
  }

  })

  Template.addMaterial.events({
    
    'submit form': function(event){
    event.preventDefault();
    var materialNum = $('[name="materialNum"]').val();
    var currentProject = this._id;
    ProjectMaterials.insert({
        materialNum: materialNum,
        createdAt: new Date(),
        projectID: currentProject
    });
    $('[name="materialNum"]').val('');

  }

  })

  Template.upload.onCreated( () => {
  Template.instance().uploading = new ReactiveVar( false );
});

Template.upload.helpers({
  uploading() {
    return Template.instance().uploading.get();
  }
});

Template.upload.events({
  'change [name="uploadCSV"]' ( event, template ) {
    template.uploading.set( true );

    Papa.parse( event.target.files[0], {
      header: true,
      complete(results, file) {
        Meteor.call('parseUpload', results.data, (error, response) => {
          if ( error ) {
            console.log( error.reason );
          } else {
            template.uploading.set( false );
            Bert.alert( 'Materials Imported', 'success', 'growl-top-right' );
          }
        });
      }
    });
  }
});

/* -- Autoform Hooks -- */
AutoForm.hooks({
  insertProjectForm: {
    onSuccess: function(doc) {
      Router.go('projectDetail', {_id: this.docId});
    }
  }
});

AutoForm.hooks({
  editCollectionForm: {
    before: {
      update: function(doc) {
        var ref;
        if (((ref = doc.$set) != null ? ref.items : void 0) != null) {
          doc.$set.items = _.without(doc.$set.items, null);
        }
        return doc;
      }
    }
  }
});