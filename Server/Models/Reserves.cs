
using System.ComponentModel.DataAnnotations;

namespace Server.Models;


public class Reserves {

    [Key]
    [Required]
    public int Id {get; set;}

    public int CabainId {get; set;}

    public DateTime StartDate {get; set;}
    public DateTime EndDate {get; set;}

     public Cabain? Cabain { get; set; } 

}