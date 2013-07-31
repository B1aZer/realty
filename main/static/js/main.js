var app = app || {};

var ApartmentList  = Backbone.Collection.extend({
  url: '/aps'
});

app.Apartments = new ApartmentList();

// Our overall **AppView** is the top-level piece of UI.
app.ApartmentsView = Backbone.View.extend({

    el: '#apartments',

    initialize: function() {

        var that = this;
        //this.listenTo(app.Apartments, "all", this.render);
        app.Apartments.fetch({
            success: function(){
                that.$el.removeClass('loader');
                that.render();
            }
        });
        //this.items = app.Apartments; 
    },

    render: function() {
        var that = this;
        app.Apartments.each(function(model){
            /*
            that.$el.append(that.entryTemplate({
                name:model.attributes.name,
                address:model.attributes.address,
                space:model.attributes.space,
            }));
            */
            var appartView = new app.ApartmentView({ model: model });
            that.$el.append(appartView.render().el);
        });
    },

    
});

app.ApartmentView = Backbone.View.extend({

    className: 'col-lg-4',

    entryTemplate: Handlebars.compile( $("#entry-template").html() ),

    inputTemplate: Handlebars.compile( $("#input-template").html() ),

    events: {
        "click .btn-edit": "editFields",
        "click .btn-done": "saveFields"
    },

    initialize: function() {
        this.listenTo(this.model, 'change', this.render);
    },

    render: function() {
        this.$el.html( this.entryTemplate( this.model.toJSON() ) );
        return this;
    },

    editFields: function (e) {
        e.preventDefault();
        var edit = this.inputTemplate( this.model.toJSON() );
        this.$el.html(edit);
    },

    saveFields: function (e) {
        e.preventDefault();
        var name = this.$el.find('.name').val();
        var address = this.$el.find('.address').val();
        var space = this.$el.find('.space').val();
        this.model.save({
            name: name,
            address: address,
            space: space
        });
    }
});


  $(function() {

    // Kick things off by creating the **App**.
    window.temp = new app.ApartmentsView();
    //temp.render();

  });




