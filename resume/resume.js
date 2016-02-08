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
        this.education = data.education;
        this.skills  = data.skills;
        this.renderName();
        this.renderOccupation();
        this.renderProfile();
        this.renderExperience();
        this.renderEducation();
        this.renderSkills();
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

        });
    },

    renderSkills: function() {
        var languages = '',
            framework = '',
            environment = '',
            database = '',
            opSystem = '';

        this.skills.languages.forEach(function(lang) {
            languages += '<li>' + lang + '</li>'; 
        });
        this.skills.framework.forEach(function(fw) {
            framework += '<li>' + fw + '</li>'; 
        });
        this.skills.database.forEach(function(db) {
            database += '<li>' + db + '</li>'; 
        });
        this.skills.ide.forEach(function(ide) {
            environment += '<li>' + ide + '</li>'; 
        });
        $('#skillset').append(
            '<div class="row">' +  
                '<div class="col-lg-3">' +  
                    '<h4>Programming Languages</h4>' + 
                    '<div style="padding-left: 5%">' +
                        languages + 
                    '</div>' + 
                '</div>' + 
                '<div class="col-lg-3">' + 
                    '<h4>Technologies and Frameworks</h4>' + 
                    '<div style="padding-left: 5%">' +
                        framework + 
                    '</div>' + 
                '</div>' + 
                '<div class="col-lg-3">' + 
                    '<h4>Database Systems</h4>' + 
                    '<div style="padding-left: 5%">' +
                        database + 
                    '</div>' + 
                '</div>' + 
                '<div class="col-lg-3">' +  
                    '<h4>Development Environment</h4>' + 
                    '<div style="padding-left: 5%">' +
                        environment + 
                    '</div>' + 
                '</div>' + 
            '</div>'
        );
    },

    renderEducation : function() {
        $('#education-list').append(
            '<div class="col-lg-12">' + 
                '<h3>' + this.education.degree + '</h3>' + 
                '<h4>' + this.education.university + '</h4>' + 
                '<h5>' + this.education.start + ' - ' + this.education.end + '</h4>' + 
                '<p style="padding-left: 5%">'  + this.education.summary + '</p>' + 
            '</div>'
        );
    }
}

var check = new Resume();
