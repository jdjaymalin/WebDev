function Resume() {
    this.resumeData = data;
    this.firstname,
    this.lastname,
    this.occupation,
    this.experience;
    this.getResume();
}

Resume.prototype = {
    
    getResume: function() {
        /*
        $.getJSON( "http://jdjaymalin.github.io/WebDev/resume/text.json", function( data ) {
            console.log(data);
        });
        */

        console.log(data);
        this.parseResume();
    },

    parseResume: function() {
        this.firstname   = data.firstname;
        this.lastname    = data.lastname;
        this.occupation  = data.occupation;
        this.profile     = data.profile;
        this.experiences  = data.experience;
        this.renderName();
        this.renderOccupation();
        this.renderProfile();
        this.renderExperience();
    },

    renderName: function() {
        $('.name').text(this.firstname + ' ' + this.lastname);
        $('.navbar-brand').text(this.firstname);
    },

    renderOccupation: function() {
        $('.skills').text(this.occupation);
    },

    renderProfile: function() {
        $('#profile-sum').prepend('<p>' + this.profile + '</p>');
    },

    renderExperience: function() {
        var self = this;
        this.experiences.forEach(function(experience) {
            console.log(experience.company.name);
            var tasksList = '';
            $('#exp-sum').append(
                '<div class="col-lg-10">' + 
                    '<h3>' + experience.position + '</h3>' +
                    '<h4>' + experience.company.name + '</h4>' +
                    '<h5>' + experience.start + ' to ' + experience.end  + ' | ' 
                        + experience.company.city + ', ' + experience.company.state + ' ' + experience.company.country + '</h5>' +
                '</div>'
            );
            experience.tasks.forEach(function(task) {
                tasksList = tasksList + '<li>' + task + '</li>';
            });

            $('#exp-sum').append(
                '<div class="col-lg-12" style="padding-left: 5%">' + 
                    '<p class="small">' + experience.jobSummary + '</p>' +
                    '<div class="col-lg-12" style="padding-left: 2%">' + 
                        tasksList + 
                    '</div>' + 
                '</div>'
            );

              /*
            experience.tasks.forEach(function(task) {
            )};
                */
        });
    }
}

var check = new Resume();
