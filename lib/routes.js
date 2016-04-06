/* Routings */
Router.route('/', {
    name: 'projectList',
    template: 'projectList'
});

Router.route('/project/:_id', {
      name: 'projectDetail',
      template: 'projectDetail',
      data: function(){
        var currentProject = this.params._id;
        return ProjectList.findOne({ _id: currentProject });
    }
});

Router.route('/goldStandard');
Router.route('/dataDictionary');
Router.route('/dataQuality');

Router.configure({
    layoutTemplate: 'main'
});

