namespace StudentDetails.Migrations
{
    using System;
    using System.Data.Entity;
    using System.Data.Entity.Migrations;
    using System.Linq;
    using StudentDetails.Models;

    internal sealed class Configuration : DbMigrationsConfiguration<StudentDetails.Models.StudentDetailsContext>
    {
        public Configuration()
        {
            AutomaticMigrationsEnabled = false;
        }

        protected override void Seed(StudentDetails.Models.StudentDetailsContext context)
        {
            context.Departments.AddOrUpdate(x => x.Id,
                new Department() { Id = 1, Name = "CSE"},
                new Department() { Id = 2, Name = "ECE"},
                new Department() { Id = 3, Name = "EEE"}
                );


            context.Students.AddOrUpdate(x => x.Id,
                new Student()
                    {
                        Id = 1, 
                        FirstName="Aaron", 
                        LastName="Finch", 
                        DepartmentId = 1, 
                        Email= "finch@gmail.com", 
                        YearEnrolled = 2008,
                        DateOfBirth = DateTime.ParseExact("07/11/1986", "dd/MM/yyyy", null),
                    },
                new Student()
                    {
                        Id = 2,
                        FirstName = "David",
                        LastName = "Warner",
                        DepartmentId = 3,
                        Email = "warner@gmail.com",
                        YearEnrolled = 2007,
                        DateOfBirth = DateTime.ParseExact("07/10/1986", "dd/MM/yyyy", null),
                    },
                    new Student()
                    {
                        Id = 3,
                        FirstName = "Steven",
                        LastName = "Smith",
                        DepartmentId = 2,
                        Email = "smith@gmail.com",
                        YearEnrolled = 2009,
                        DateOfBirth = DateTime.ParseExact("02/06/1989", "dd/MM/yyyy", null),
                    },
                    new Student()
                    {
                        Id = 4,
                        FirstName = "Austin",
                        LastName = "Lynn",
                        DepartmentId = 1,
                        Email = "lynn@gmail.com",
                        YearEnrolled = 2010,
                        DateOfBirth = DateTime.ParseExact("10/04/1990", "dd/MM/yyyy", null),
                    },
                    new Student()
                    {
                        Id = 5,
                        FirstName = "Shane",
                        LastName = "Watson",
                        DepartmentId = 3,
                        Email = "watson@gmail.com",
                        YearEnrolled = 2006,
                        DateOfBirth = DateTime.ParseExact("17/06/1981", "dd/MM/yyyy", null),
                    }
            );
        }
    }
}
