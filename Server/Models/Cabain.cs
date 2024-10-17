

using System.ComponentModel.DataAnnotations;

namespace Server.Models;

public class Cabain {

    [Key]
    [Required]
    public int Id {get; set;}

    [Required]
    public string? CabainName {get; set;}

    public decimal Price {get; set;}

    public string? Wifi {get; set;}
    public string? HotWater {get; set;}

    public byte Capacity {get; set;}


    public ICollection<Reserves>? Reservations { get; set; }
}