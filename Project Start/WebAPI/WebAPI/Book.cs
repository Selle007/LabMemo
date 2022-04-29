using System.ComponentModel.DataAnnotations;
namespace WebAPI
{
    public class Book
    {
        [Key]
        public int ISBN{ get; set; }
        public String BookName{ get; set; } =String.Empty;  
        public String AuthorName { get; set; } = String.Empty;
        public String BookDescription { get; set; } = String.Empty;
        public String Category { get; set; } = String.Empty;
        public int Amount { get; set; }
        public int Price { get; set; }

    }
}
