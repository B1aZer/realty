var app = app || {};

var ApartmentList  = Backbone.Collection.extend({
  url: '/aps'
});

app.Apartments = new ApartmentList();

// Our overall **AppView** is the top-level piece of UI.
app.ApartmentsView = Backbone.View.extend({

    el: '#apartments',

    entryTemplate: Handlebars.compile( $("#entry-template").html() ),

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
            console.log(model);
            that.$el.append(that.entryTemplate({
                name:model.attributes.name,
                address:model.attributes.address,
                space:model.attributes.space,
            }));
        });

        /*
        this.html(this.entryTemplate({
          completed: completed,
          remaining: remaining
        }));
        */
    },
    
});

app.ApartmentView = Backbone.View.extend({
    entryTemplate: Handlebars.compile( $("#entry-template").html() ),
    render: function() {
    /*
        this.html(this.entryTemplate({
            this.model.attributes;
        }));
        return this;
        */
    },
});


  $(function() {

    // Kick things off by creating the **App**.
    window.temp = new app.ApartmentsView();
    //temp.render();

  });




