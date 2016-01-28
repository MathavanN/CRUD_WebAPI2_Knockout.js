using System;

namespace StudentDetails.Models
{
    public class StudentDetailsDTO
    {
        public int Id { get; set; }
        public string FirstName { get; set; }
        public string LastName { get; set; }
        public int YearEnrolled { get; set; }
        public DateTime DateOfBirth { get; set; }
        public string DepartmentName { get; set; }
        public int DepartmentId { get; set; }
        public string Email { get; set; }
    }
}