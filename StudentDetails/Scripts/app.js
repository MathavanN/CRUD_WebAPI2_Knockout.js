var ViewModel = function () {
    var self = this;
    self.viewStudent = ko.observable(false);
    self.editStudentForm = ko.observable(false);
    self.addNewStudentForm = ko.observable(false);
    self.students = ko.observableArray();
    self.departments = ko.observableArray();
    self.error = ko.observable();
    self.detail = ko.observableArray();

    self.DateOfBirth = ko.observable();

    self.formattedDate = ko.computed({
        read: function () {
            return moment(self.detail().DateOfBirth).format('YYYY-MM-DD');
        },
        write: function (value) {
            self.DateOfBirth(moment(value).format());
        }
    });

    self.newStudent = {
        Department: ko.observable(),
        FirstName: ko.observable(),
        LastName: ko.observable(),
        YearEnrolled: ko.observable(),
        DateOfBirth: ko.observable(),
        Email: ko.observable()
    }

    //StudentController
    var studentUri = '/api/Students/';

    //DepartmentController
    var departmentUri = '/api/Departments/';

    //AJAX
    function ajaxHelper(uri, method, data) {
        self.error(''); // Clear error message
        return $.ajax({
            type: method,
            url: uri,
            dataType: 'json',
            contentType: 'application/json',
            data: data ? JSON.stringify(data) : null
        }).fail(function (jqXHR, textStatus, errorThrown) {
            self.error(errorThrown);
        });
    }

    //List All Students
    function getAllStudents() {
        ajaxHelper(studentUri, 'GET').done(function (data) {
            self.students(data);
        });
    }

    //List All Departments
    function getDepartments() {
        ajaxHelper(departmentUri, 'GET').done(function (data) {
            self.departments(data);
        });
    }

    //View Student Details
    self.getStudentDetail = function (item) {
        self.viewStudent(true);
        self.editStudentForm(false);
        self.addNewStudentForm(false);
        getSpecificStudentDetails(item)
    }

    //Update Form for Student
    self.updateStudentDetails = function (item) {
        self.editStudentForm(true);
        self.viewStudent(false);
        self.addNewStudentForm(false);
        //getDepartments();
        getSpecificStudentDetails(item)
    }

    //Show Add New Student Form
    self.addNewStudentButton = function () {
        clearForm();
        self.editStudentForm(false);
        self.viewStudent(false);
        self.addNewStudentForm(true);
    }

    //Add New Student
    self.addStudent = function () {
        var student = {
            DepartmentId: self.newStudent.Department().Id,
            FirstName: self.newStudent.FirstName(),
            LastName: self.newStudent.LastName(),
            YearEnrolled: self.newStudent.YearEnrolled(),
            DateOfBirth: self.newStudent.DateOfBirth(),
            Email: self.newStudent.Email()
        };

        ajaxHelper(studentUri, 'POST', student).done(function (item) {
            self.students.push(item);
            clearForm();
        });
    }

    //Clear Add New Form
    function clearForm() {
        self.newStudent.FirstName('');
        self.newStudent.LastName('');
        self.newStudent.YearEnrolled('');
        self.newStudent.DateOfBirth('');
        self.newStudent.Email('');
    }

    //Update a student
    self.updateStudent = function () {
        var student = {
            DepartmentId: self.detail().DepartmentId,
            FirstName: self.detail().FirstName,
            LastName: self.detail().LastName,
            YearEnrolled: self.detail().YearEnrolled,
            DateOfBirth: self.DateOfBirth(),
            Email: self.detail().Email,
            Id: self.detail().Id
        };
        //console.log(student);
        ajaxHelper(studentUri + student.Id, 'PUT', student).done(function (item) {
            getAllStudents();
            self.editStudentForm(false);
            self.viewStudent(false);
            self.addNewStudentForm(false);
        });
    }

    //Get specific Student Details
    function getSpecificStudentDetails(item) {
        ajaxHelper(studentUri + item.Id, 'GET').done(function (data) {
            self.detail(data);
        });
    }

    //Delete a Student
    self.deleteStudent = function (item) {
        ajaxHelper(studentUri + item.Id, 'DELETE').done(function (data) {
            getAllStudents();
        });
    }

    //Fetch data
    getAllStudents();
    getDepartments();
};

ko.applyBindings(new ViewModel());