var app = app || {};

app.Apartment = Backbone.Model.extend({
    urlRoot: '/aps/'
});


var ApartmentList  = Backbone.Collection.extend({
    url: '/aps',
    filterByName: function (value) {
        return this.models.filter( function (item) {
            return item.get('name').indexOf(value) >= 0; 
        });
    } 
});

app.Apartments = new ApartmentList();

// Our overall **AppView** is the top-level piece of UI.
app.ApartmentsView = Backbone.View.extend({

    el: '#apartments',

    inputTemplate: Handlebars.compile( $("#input-template").html() ),

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

    model: app.Apartment,

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

    filterByColl: function (coll) {
        var that = this;
        this.$el.html('');
        _.each( coll, function (model) {
            var appartView = new app.ApartmentView({ model: model });
            that.$el.append(appartView.render().el);
        });
    },

    addOne: function() {
        //var tpl = this.inputTemplate({});
        var nm = new app.Apartment({});
        var newitem = new app.ApartmentView ({model:nm});
        //this.$el.prepend(tpl);
        this.$el.prepend( newitem.renderEdit().el );
    }
    
});

app.ApartmentView = Backbone.View.extend({

    className: 'col-lg-3',

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

    renderEdit: function() {
        this.$el.html( this.inputTemplate  );
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
    //
    $('.carousel').carousel({
      interval: 4000
    })

    $(document).on('click','.search-go', function (e) {
        e.preventDefault();
        var value = $('.input-search').val();
        var coll = app.Apartments.filterByName(value);
        console.log(coll);
        temp.filterByColl(coll);
    });
    
    $(document).on('click','.add-apps', function (e) {
        e.preventDefault();
        temp.addOne();
    });

  });




